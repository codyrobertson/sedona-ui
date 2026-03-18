/**
 * Risograph Halftone Plugin for Chart.js v2.0 — Clean Rewrite
 *
 * Everything is riso-treated: halftone fill, stippled line, stippled grid,
 * ink-trapped text. One print head drives all animation.
 *
 * Performance: tone/sqrt lookup tables, curve lookup, canvas pooling,
 * inlined PRNG, precomputed reciprocals, cached paper texture.
 */
(function (global) {
  'use strict';
  const { noise2d, fbm, lerp } = Perlin;
  const TAU = 6.283185307;

  // ═══════════════════════════════════════════════════════════════════
  //  DEFAULTS
  // ═══════════════════════════════════════════════════════════════════
  const DEFAULTS = {
    paper: {
      enabled: true, color: '#f0ebe1',
      fiberStrength: 0.45, fiberAngle: 0.15,
      toothStrength: 0.35, grainStrength: 0.25,
      speckDensity: 0.003, warmShift: 0.1,
    },
    halftone: {
      enabled: true, color: '#6b93d6', cellSize: 3,
      dotSizeRange: [0.6, 2.0], noiseScale: 0.03,
      bleed: 0.04, squareThreshold: 0.30,
      densityPower: 1.3, densityFloor: 0.08,
    },
    typography: {
      enabled: true,
      fontFamily: '"DM Serif Display", Georgia, serif',
      color: '#7a8599', letterSpacing: 3,
    },
  };

  // ═══════════════════════════════════════════════════════════════════
  //  UTILITIES
  // ═══════════════════════════════════════════════════════════════════
  let _mc = null, _ms = '';
  function merge(defaults, user) {
    const s = JSON.stringify(user || {});
    if (_mc && _ms === s) return _mc;
    const o = {};
    for (const k of Object.keys(defaults)) {
      const d = defaults[k];
      o[k] = (typeof d === 'object' && d !== null && !Array.isArray(d))
        ? { ...d, ...(user?.[k] || {}) } : (user?.[k] !== undefined ? user[k] : d);
    }
    _mc = o; _ms = s; return o;
  }

  function hexToRgb(h) {
    return [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  }

  function mixColors(a, b) {
    const [r1,g1,b1] = hexToRgb(a), [r2,g2,b2] = hexToRgb(b);
    return `rgb(${r1*r2/255|0},${g1*g2/255|0},${b1*b2/255|0})`;
  }

  // ── Tone lookup table ──────────────────────────────────────────────
  const TT_SIZE = 512;
  let _tt = null, _tp = -1, _tf = -1;
  function toneTable(pow, floor) {
    if (_tt && _tp === pow && _tf === floor) return _tt;
    const t = new Float32Array(TT_SIZE + 1), dr = 1 - floor;
    for (let i = 0; i <= TT_SIZE; i++) t[i] = 1 - Math.pow(i / TT_SIZE, pow) * dr;
    _tt = t; _tp = pow; _tf = floor; return t;
  }

  // ── Sqrt lookup table ──────────────────────────────────────────────
  const SQ_SIZE = 512;
  let _sq = null;
  function sqrtLookup() {
    if (_sq) return _sq;
    _sq = new Float32Array(SQ_SIZE + 1);
    for (let i = 0; i <= SQ_SIZE; i++) _sq[i] = Math.sqrt(i / SQ_SIZE);
    return _sq;
  }
  function fSqrt(x) {
    if (x <= 0) return 0; if (x >= 1) return Math.sqrt(x);
    return sqrtLookup()[(x * SQ_SIZE) | 0];
  }

  // ── Curve Y lookup (cached per frame) ──────────────────────────────
  let _cl = null, _ck = '';
  function curveLookup(data, xs, ys, L, R) {
    const k = L + '|' + R + '|' + data.length;
    if (_cl && _ck === k) return _cl;
    const gx = (d,i) => typeof d==='object'&&'x' in d ? d.x : i;
    const gy = d => typeof d==='object'&&'y' in d ? d.y : d;
    const n = data.length, w = R - L, step = 2;
    const samps = ((w/step)|0)+2, raw = new Float32Array(samps);
    for (let i = 0; i < samps; i++) {
      const dx = xs.getValueForPixel(L + i*step);
      let cy = gy(data[0]);
      if (dx > gx(data[0],0) && dx < gx(data[n-1],n-1)) {
        for (let j = 0; j < n-1; j++) {
          const x0=gx(data[j],j), x1=gx(data[j+1],j+1);
          if (dx>=x0 && dx<=x1) { cy = gy(data[j])+(dx-x0)/(x1-x0)*(gy(data[j+1])-gy(data[j])); break; }
        }
      } else if (dx >= gx(data[n-1],n-1)) cy = gy(data[n-1]);
      raw[i] = ys.getPixelForValue(cy);
    }
    const lu = new Float32Array(w+2), inv = 1/step;
    for (let px = 0; px <= w; px++) {
      const fi = px*inv, idx = fi|0, fr = fi-idx;
      lu[px] = idx+1<samps ? raw[idx]*(1-fr)+raw[idx+1]*fr : raw[idx];
    }
    _cl = lu; _ck = k; return lu;
  }

  // ── Canvas pool ────────────────────────────────────────────────────
  const _pool = [];
  function getCanvas(w,h) {
    for (let i=0;i<_pool.length;i++) if (_pool[i].width===w&&_pool[i].height===h) return _pool.splice(i,1)[0];
    const c = document.createElement('canvas'); c.width=w; c.height=h; return c;
  }
  function putCanvas(c) { if (_pool.length < 6) _pool.push(c); }

  // ═══════════════════════════════════════════════════════════════════
  //  ANIMATION STATE
  // ═══════════════════════════════════════════════════════════════════
  const _a = { active: false, progress: 1, start: 0, dur: 2500, chart: null };

  function startAnim(chart, dur) {
    _a.chart = chart; _a.dur = dur || 2500; _a.progress = 0; _a.active = true;
    // Pre-cache paper texture
    const opts = merge(DEFAULTS, chart.options.plugins?.risograph);
    generatePaper(chart.width, chart.height, opts.paper);
    _a.start = performance.now();
    _tick();
  }
  function _tick() {
    if (!_a.active) return;
    _a.progress = Math.min(1, (performance.now() - _a.start) / _a.dur);
    _ms = ''; // invalidate merge cache
    _a.chart.update('none');
    if (_a.progress < 1) requestAnimationFrame(_tick);
    else _a.active = false;
  }

  // Compute print head X from progress (used by ALL renderers)
  function getPrintHeadX(chart) {
    const { left } = chart.chartArea;
    const cw = chart.chartArea.right - left;
    // Extends 40% past right edge so emergence completes before progress=1
    return left + _a.progress * (cw + cw * 0.4);
  }

  // ═══════════════════════════════════════════════════════════════════
  //  1. PAPER TEXTURE (cached, 75% res)
  // ═══════════════════════════════════════════════════════════════════
  let _pc = null, _pk = '';

  function generatePaper(w, h, o) {
    const k = w+'|'+h+'|'+o.color+'|'+o.fiberStrength+'|'+o.fiberAngle+'|'+
              o.toothStrength+'|'+o.grainStrength+'|'+o.speckDensity+'|'+o.warmShift;
    if (_pc && _pk === k) return _pc;

    const sc = 0.75, sw = (w*sc)|0, sh = (h*sc)|0;
    const cv = getCanvas(sw, sh), cx = cv.getContext('2d');
    const [bR,bG,bB] = hexToRgb(o.color || '#f0ebe1');
    const img = cx.createImageData(sw, sh), px = img.data;
    const fS=o.fiberStrength||0, tS=o.toothStrength||0, gS=o.grainStrength||0;
    const wm=o.warmShift||0, cosA=Math.cos(o.fiberAngle||0.15), sinA=Math.sin(o.fiberAngle||0.15);
    const spT = o.speckDensity||0.003;
    let rs = 31415;

    for (let y = 0; y < sh; y++) {
      const yo = y*sw*4, ys = y*sinA, yc = y*cosA;
      for (let x = 0; x < sw; x++) {
        let mod = 0;
        if (fS > 0.001) mod += noise2d((x*cosA-ys)*0.04, (x*sinA+yc)*0.01) * fS;
        if (tS > 0.001) mod += noise2d(x*0.012, y*0.012) * tS;
        if (gS > 0.001) mod += noise2d(x*0.28, y*0.28) * gS;
        let wv = 0;
        if (wm > 0.001) wv = noise2d(x*0.004, y*0.005) * wm;
        mod *= 35;
        rs = (rs*1664525+1013904223)&0x7fffffff;
        const sp = (rs/0x7fffffff) < spT ? -20 : 0;
        const i = yo + (x<<2);
        const r=bR+mod+wv*80+sp, g=bG+mod+wv*10+sp, b=bB+mod-wv*50+sp;
        px[i]=r<0?0:r>255?255:r; px[i+1]=g<0?0:g>255?255:g; px[i+2]=b<0?0:b>255?255:b; px[i+3]=255;
      }
    }
    cx.putImageData(img, 0, 0);
    const fc = getCanvas(w, h), fx = fc.getContext('2d');
    fx.imageSmoothingEnabled = true; fx.imageSmoothingQuality = 'high';
    fx.drawImage(cv, 0, 0, w, h);
    putCanvas(cv);
    _pc = fc; _pk = k; return fc;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  2. HALFTONE RENDERER
  // ═══════════════════════════════════════════════════════════════════
  function renderHalftone(ctx, chart, opts, dsIdx, seed, phx) {
    const { left, right, top, bottom } = chart.chartArea;
    const data = chart.data.datasets[dsIdx || 0].data;
    const cs = opts.cellSize, maxD = opts.dotSizeRange[1];
    const bleed = opts.bleed, sqT = opts.squareThreshold;
    const dP = opts.densityPower||1.3, dF = opts.densityFloor!==undefined?opts.densityFloor:0.08;
    const oX = opts.offsetX||0, oY = opts.offsetY||0;
    const sqLo = sqT*0.5, sqHi = sqT*1.5;
    const invSq = sqHi>sqLo ? 1/(sqHi-sqLo) : 1;
    const invBl = bleed>0 ? 1/bleed : 0;
    const sqSc = 1.08*cs, hc = cs*0.5;
    const cw = right - left;
    const cl = curveLookup(data, chart.scales.x, chart.scales.y, left, right);
    const tt = toneTable(dP, dF);
    const emW = cw * 0.12, invEm = 1/emW;
    const totalSweep = cw + emW * 3.5;
    const printX = phx !== undefined ? phx : left + totalSweep;
    let rs = seed || 12345;

    ctx.fillStyle = opts.color;
    ctx.beginPath();

    for (let py = bottom; py > top - 15; py -= cs) {
      const ri = (((bottom-py)/cs+0.5)|0);
      const rowSh = (ri&1) * hc;
      for (let px = left-cs; px < right+cs; px += cs) {
        const cx = px + rowSh;
        const li = (cx-left)|0;
        if (li < 0 || li > cw) continue;

        // Skip past print head (advance PRNG deterministically)
        if (cx > printX) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }

        // Curve edge bleed: Perlin noise makes the top boundary (near curve) irregular
        // Baseline stays clean at bottom — no downward bleed
        const curveNoise = noise2d(cx * 0.06, py * 0.02) * 1.5;
        const effCurveY = cl[li] + curveNoise;

        const th = bottom - effCurveY;
        if (th <= 0) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }

        const t = (bottom - py) / th;
        if (t > 1 + bleed) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }
        if (t < 0) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }

        const tc = t > 1 ? 1 : t;

        // Tone from lookup
        let tone = t > 1 ? dF*(1-(t-1)*invBl)*(1-(t-1)*invBl) : tt[(tc*TT_SIZE)|0];

        // Emergence (always applied — no branch = no jump)
        const dist = printX - cx;
        let em = (dist - tc * emW * 0.3) * invEm;
        em = em < 0 ? 0 : em > 1 ? 1 : em;
        tone *= em;

        const r = maxD * tone;
        if (r < 0.12) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }

        // Jitter
        const jA = 0.04 + 0.24 * fSqrt(tc);
        const jS = jA * cs * 2;
        rs=(rs*1664525+1013904223)&0x7fffffff;
        const jx = cx + oX + (rs/0x7fffffff - 0.5) * jS;
        rs=(rs*1664525+1013904223)&0x7fffffff;
        const jy = py + oY + (rs/0x7fffffff - 0.5) * jS;

        // Shape
        rs=(rs*1664525+1013904223)&0x7fffffff;
        const useC = tc > sqHi || t > 1 || (tc > sqLo && (rs/0x7fffffff) < (tc-sqLo)*invSq);
        if (!useC) {
          const s = sqSc * fSqrt(tone), hs = s*0.5;
          ctx.rect(jx-hs, jy-hs, s, s);
        } else {
          ctx.moveTo(jx+r, jy); ctx.arc(jx, jy, r, 0, TAU);
        }
      }
    }
    ctx.fill();
    // Store print head for line/grid/text
    if (!chart._phx || printX > chart._phx) chart._phx = printX;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  2b. BAR HALFTONE — fills each bar rectangle with halftone dots
  // ═══════════════════════════════════════════════════════════════════
  function renderBarHalftone(ctx, chart, opts, dsIdx, seed, phx) {
    const meta = chart.getDatasetMeta(dsIdx || 0);
    if (!meta?.data) return;
    const cs = opts.cellSize, maxD = opts.dotSizeRange[1];
    const dP = opts.densityPower||1.3, dF = opts.densityFloor!==undefined?opts.densityFloor:0.08;
    const tt = toneTable(dP, dF);
    const sqSc = 1.08*cs, hc = cs*0.5;
    const { left, right, bottom } = chart.chartArea;
    const cw = right - left;
    // Emergence width for the growth animation (how fast bar fills after print head arrives)
    const growW = cw * 0.18;
    let rs = seed || 12345;

    ctx.fillStyle = opts.color;
    ctx.beginPath();

    for (let bi = 0; bi < meta.data.length; bi++) {
      const bar = meta.data[bi];
      if (!bar) continue;
      const bx = bar.x - bar.width/2, by = bar.y;
      const bw = bar.width, bh = bottom - bar.y;
      if (bh <= 0) continue;

      // Per-bar growth: bar grows upward as print head passes its center
      // barGrow: 0 = not started, 1 = full height
      let barGrow = 1;
      if (phx !== undefined) {
        barGrow = (phx - (bar.x - bw * 0.3)) / growW;
        if (barGrow <= 0) continue; // print head hasn't reached this bar
        if (barGrow > 1) barGrow = 1;
      }
      const animTop = bottom - bh * barGrow; // current top edge of growing bar
      const emH = bh * 0.15; // emergence zone at the growth edge (top of bar)

      for (let py = bottom; py > animTop; py -= cs) {
        const ri = (((bottom-py)/cs+0.5)|0);
        const rowSh = (ri&1) * hc;
        for (let px = bx; px < bx + bw; px += cs) {
          const cx = px + rowSh;

          const t = (bottom - py) / bh;
          const tc = t > 1 ? 1 : t;
          let tone = tt[(tc*TT_SIZE)|0];

          // Emergence: fade at the growing top edge
          if (barGrow < 1) {
            const distFromTop = py - animTop;
            let em = distFromTop / Math.max(emH, 4);
            if (em > 1) em = 1;
            if (em <= 0) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }
            tone *= em;
          }

          const r = maxD * tone;
          if (r < 0.12) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }

          rs=(rs*1664525+1013904223)&0x7fffffff;
          const jx = cx + (rs/0x7fffffff-0.5)*cs*0.3;
          rs=(rs*1664525+1013904223)&0x7fffffff;
          const jy = py + (rs/0x7fffffff-0.5)*cs*0.3;

          if (tc < 0.3) {
            const s = sqSc * fSqrt(tone), hs = s*0.5;
            ctx.rect(jx-hs, jy-hs, s, s);
          } else {
            ctx.moveTo(jx+r, jy); ctx.arc(jx, jy, r, 0, TAU);
          }
        }
      }
    }
    ctx.fill();
    if (!chart._phx || (phx && phx > chart._phx)) chart._phx = phx;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  2c. SCATTER HALFTONE — filled halftone circle at each point
  // ═══════════════════════════════════════════════════════════════════
  function renderScatterHalftone(ctx, chart, opts, dsIdx, seed, phx) {
    const meta = chart.getDatasetMeta(dsIdx || 0);
    if (!meta?.data) return;
    const cs = opts.cellSize, maxD = opts.dotSizeRange[1], hc = cs * 0.5;
    const dP = opts.densityPower||1.3, dF = opts.densityFloor!==undefined?opts.densityFloor:0.08;
    const tt = toneTable(dP, dF);
    let rs = seed || 12345;
    const pointRadius = 14;
    const { left, right } = chart.chartArea;
    const cw = right - left;
    const emW = cw * 0.12;

    ctx.fillStyle = opts.color;
    ctx.beginPath();

    for (let pi = 0; pi < meta.data.length; pi++) {
      const pt = meta.data[pi];
      if (!pt) continue;
      if (phx !== undefined && pt.x > phx + emW) continue;

      // Per-point emergence: fade in as print head passes point center
      let ptEm = 1;
      if (phx !== undefined) {
        ptEm = (phx - pt.x) / emW;
        if (ptEm <= 0) continue;
        if (ptEm > 1) ptEm = 1;
      }

      const pcx = pt.x, pcy = pt.y;

      for (let py = pcy - pointRadius; py <= pcy + pointRadius; py += cs) {
        const ri = (((pcy-py)/cs+0.5)|0);
        const rowSh = (ri&1) * hc;
        for (let px = pcx - pointRadius; px <= pcx + pointRadius; px += cs) {
          const cx = px + rowSh;
          const dx = cx - pcx, dy = py - pcy;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist > pointRadius) continue;

          const t = dist / pointRadius; // 0 at center, 1 at edge
          const tc = t > 1 ? 1 : t;
          let tone = tt[(tc*TT_SIZE)|0] * ptEm;
          const r = maxD * tone;
          if (r < 0.12) continue;

          rs=(rs*1664525+1013904223)&0x7fffffff;
          const jx = cx + (rs/0x7fffffff-0.5)*cs*0.25;
          rs=(rs*1664525+1013904223)&0x7fffffff;
          const jy = py + (rs/0x7fffffff-0.5)*cs*0.25;

          ctx.moveTo(jx+r, jy); ctx.arc(jx, jy, r, 0, TAU);
        }
      }
    }
    ctx.fill();
    if (!chart._phx || (phx && phx > chart._phx)) chart._phx = phx;
  }

  // ═══════════════════════════════════════════════════════════════════
  //  2d. DOUGHNUT HALFTONE — fills each arc sector
  // ═══════════════════════════════════════════════════════════════════
  function renderDoughnutHalftone(ctx, chart, opts, dsIdx, seed, phx) {
    const meta = chart.getDatasetMeta(dsIdx || 0);
    if (!meta?.data) return;
    const cs = opts.cellSize, maxD = opts.dotSizeRange[1];
    const dP = opts.densityPower||1.3, dF = opts.densityFloor!==undefined?opts.densityFloor:0.08;
    const tt = toneTable(dP, dF);
    let rs = seed || 54321;
    const defaultColors = ['#6b93d6', '#e8a040', '#d45d5d', '#5daa68', '#9b6bbf', '#d4883d'];
    const colors = opts.sectorColors || defaultColors;
    // Animation: clockwise sweep from top, 20% overshoot so emergence finishes before progress=1
    const maxSweep = _a.progress >= 1 ? 100 : _a.progress * TAU * 1.2;
    const emRad = 0.35; // emergence fade width in radians
    const invEm = 1 / emRad;

    for (let ai = 0; ai < meta.data.length; ai++) {
      const arc = meta.data[ai];
      if (!arc) continue;
      const acx = arc.x, acy = arc.y;
      const ir = arc.innerRadius, or = arc.outerRadius;
      const sa = arc.startAngle, ea = arc.endAngle;

      ctx.fillStyle = colors[ai % colors.length];
      ctx.beginPath();

      for (let py = acy - or - cs; py <= acy + or + cs; py += cs) {
        for (let px = acx - or - cs; px <= acx + or + cs; px += cs) {
          const dx = px - acx, dy = py - acy;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < ir - cs || dist > or + cs) continue;

          let angle = Math.atan2(dy, dx);
          const rawAngle = angle;
          // Normalize for sector check
          let nsa = sa, nea = ea;
          while (angle < nsa) angle += TAU;
          if (angle > nea) continue;

          // Animation: sweep from top (-PI/2) clockwise
          let sweepA = rawAngle + Math.PI * 0.5;
          if (sweepA < 0) sweepA += TAU;
          if (sweepA > maxSweep) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }
          // Emergence near sweep edge
          let em = 1;
          if (maxSweep < 100) {
            em = (maxSweep - sweepA) * invEm;
            if (em > 1) em = 1;
            if (em <= 0) { rs=(rs*1664525+1013904223)&0x7fffffff; rs=(rs*1664525+1013904223)&0x7fffffff; continue; }
          }

          const t = (dist - ir) / (or - ir);
          const tc = t < 0 ? 0 : t > 1 ? 1 : t;
          let tone = tt[((1-Math.abs(tc-0.5)*2)*TT_SIZE)|0] * em;
          const r = maxD * tone * 0.8;
          if (r < 0.12) continue;

          rs=(rs*1664525+1013904223)&0x7fffffff;
          const jx = px + (rs/0x7fffffff-0.5)*cs*0.3;
          rs=(rs*1664525+1013904223)&0x7fffffff;
          const jy = py + (rs/0x7fffffff-0.5)*cs*0.3;

          ctx.moveTo(jx+r, jy); ctx.arc(jx, jy, r, 0, TAU);
        }
      }
      ctx.fill();
    }
    if (!chart._phx || (phx && phx > chart._phx)) chart._phx = phx;
  }

  // ── Pick the right halftone renderer for chart type ─────────────────
  function getRenderer(chart) {
    const type = chart.config.type;
    if (type === 'bar') return renderBarHalftone;
    if (type === 'scatter') return renderScatterHalftone;
    if (type === 'doughnut' || type === 'pie') return renderDoughnutHalftone;
    return renderHalftone; // line, area
  }

  // ── Single-layer draw ──────────────────────────────────────────────
  function drawDirect(chart, opts, paperOpts) {
    const ctx = chart.ctx;
    const { left, right, top, bottom } = chart.chartArea;
    const phx = getPrintHeadX(chart);
    const renderer = getRenderer(chart);
    const ctype = chart.config.type;

    ctx.save();
    // Clip to chart area for line/bar/scatter (prevents baseline bleed)
    // Skip clip for doughnut/pie — they're radial, confined by arc geometry
    if (ctype !== 'doughnut' && ctype !== 'pie') {
      ctx.beginPath(); ctx.rect(left, top-20, right-left, bottom-top+21); ctx.clip();
    }

    // Paper texture under fill (line charts only — bars/scatter render on paper bg)
    if (ctype === 'line') {
      const pt = generatePaper(chart.width, chart.height, paperOpts);
      const cl = curveLookup(chart.data.datasets[0].data, chart.scales.x, chart.scales.y, left, right);
      ctx.save();
      ctx.beginPath(); ctx.moveTo(left, bottom);
      for (let px = left; px <= right; px += 4) ctx.lineTo(px, cl[px-left]-4);
      ctx.lineTo(right, bottom); ctx.closePath(); ctx.clip();
      ctx.drawImage(pt, 0, 0);
      ctx.restore();
    }

    // Halftone with optional diffuse
    const htc = getCanvas(chart.width, chart.height);
    const hx = htc.getContext('2d');
    hx.clearRect(0, 0, chart.width, chart.height);
    renderer(hx, chart, opts, 0, 12345, phx);

    if (_a.progress < 0.98 && _a.progress > 0.02) {
      ctx.save(); ctx.filter = 'blur(1px)'; ctx.globalAlpha = 0.06;
      ctx.drawImage(htc, 0, 0); ctx.restore();
    }
    ctx.drawImage(htc, 0, 0);
    putCanvas(htc);
    ctx.restore();
  }

  // ── Multi-layer multiply ───────────────────────────────────────────
  function drawMultiply(chart, layers, paperOpts) {
    const ctx = chart.ctx;
    const { width: W, height: H } = chart;
    const { left, right, top, bottom } = chart.chartArea;
    const phx = getPrintHeadX(chart);

    ctx.save();
    ctx.beginPath(); ctx.rect(left, top-20, right-left, bottom-top+21); ctx.clip();

    for (let li = 0; li < layers.length; li++) {
      const layer = layers[li];
      const di = layer.datasetIndex !== undefined ? layer.datasetIndex : li;
      const oc = getCanvas(W, H), ox = oc.getContext('2d');
      ox.fillStyle = '#fff'; ox.fillRect(0, 0, W, H);
      _ck = ''; // reset curve cache for each layer
      getRenderer(chart)(ox, chart, layer, di, 12345 + li*54321, phx);

      // Diffuse during animation
      if (_a.progress < 0.98 && _a.progress > 0.02) {
        ox.save(); ox.filter = 'blur(1px)'; ox.globalAlpha = 0.05;
        ox.drawImage(oc, 0, 0); ox.restore();
      }

      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(oc, 0, 0);
      putCanvas(oc);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  }

  // ── Multi-series: each dataset as separate halftone layer ─────────
  const SERIES_COLORS = ['#6b93d6', '#e8a040', '#d45d5d', '#5daa68', '#9b6bbf', '#d4883d'];

  function drawMultiSeries(chart, opts, phx) {
    const ctx = chart.ctx;
    const { width: W, height: H } = chart;
    const { left, right, top, bottom } = chart.chartArea;
    const renderer = getRenderer(chart);
    const selected = chart._risoSelected !== undefined ? chart._risoSelected : -1;

    ctx.save();
    ctx.beginPath(); ctx.rect(left, top-20, right-left, bottom-top+21); ctx.clip();

    for (let i = 0; i < chart.data.datasets.length; i++) {
      if (chart.data.datasets[i].hidden) continue;
      const isSelected = selected === -1 || selected === i;
      const color = chart.data.datasets[i]._risoColor || SERIES_COLORS[i % SERIES_COLORS.length];
      const dsOpts = {
        ...opts.halftone,
        color: color,
        dotSizeRange: isSelected
          ? opts.halftone.dotSizeRange
          : [opts.halftone.dotSizeRange[0], opts.halftone.dotSizeRange[1] * 0.55],
        densityFloor: isSelected
          ? (opts.halftone.densityFloor || 0.08)
          : Math.min((opts.halftone.densityFloor || 0.08) + 0.2, 0.5),
      };

      const oc = getCanvas(W, H), ox = oc.getContext('2d');
      ox.fillStyle = '#fff'; ox.fillRect(0, 0, W, H);
      _ck = ''; // reset curve cache per dataset
      renderer(ox, chart, dsOpts, i, 12345 + i * 54321, phx);

      if (_a.progress < 0.98 && _a.progress > 0.02) {
        ox.save(); ox.filter = 'blur(1px)'; ox.globalAlpha = 0.05;
        ox.drawImage(oc, 0, 0); ox.restore();
      }

      ctx.globalCompositeOperation = 'multiply';
      ctx.drawImage(oc, 0, 0);
      putCanvas(oc);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════════════
  //  3. RISO LINE (stippled, Perlin pressure + waviness)
  // ═══════════════════════════════════════════════════════════════════
  function drawRisoLine(ctx, chart, dsIdx, color, bw, phx) {
    const meta = chart.getDatasetMeta(dsIdx);
    if (!meta?.data || meta.data.length < 2) return;
    const pts = meta.data;
    let rs = 99999 + dsIdx*77777, totalD = 0;

    ctx.save(); ctx.fillStyle = color; ctx.beginPath();
    const spacing = 0.9;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i], p1 = pts[i+1];
      const dx = p1.x-p0.x, dy = p1.y-p0.y;
      const segL = Math.sqrt(dx*dx+dy*dy);
      if (segL < 0.5) continue;
      const steps = Math.ceil(segL/spacing);
      const nx = -dy/segL, ny = dx/segL, inv = 1/steps;

      for (let s = 0; s <= steps; s++) {
        const t = s * inv;
        const x = p0.x+dx*t, y = p0.y+dy*t;
        const d = totalD + segL*t;

        if (phx !== undefined && x > phx) continue;

        // Perlin ink pressure — slow undulation
        const pressure = 0.65 + noise2d(d*0.008, dsIdx*10) * 0.55;

        // Ink gap in low-pressure zones
        rs = (rs*1664525+1013904223)&0x7fffffff;
        if ((rs/0x7fffffff) > 0.97 && pressure < 0.75) continue;

        // Perpendicular waviness (Perlin) + grain (PRNG)
        const wave = noise2d(d*0.02, dsIdx*5+3.7) * bw * 0.7;
        rs = (rs*1664525+1013904223)&0x7fffffff;
        const grain = (rs/0x7fffffff - 0.5) * bw * 0.35;

        // Variable dot size
        rs = (rs*1664525+1013904223)&0x7fffffff;
        const sn = (rs/0x7fffffff)*0.4 + 0.6;
        const r = bw * 0.42 * pressure * sn;
        if (r < 0.15) continue;

        const jx = x + nx*(wave+grain), jy = y + ny*(wave+grain);
        ctx.moveTo(jx+r, jy); ctx.arc(jx, jy, r, 0, TAU);
      }
      totalD += segL;
    }
    ctx.fill(); ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════════════
  //  4. RISO GRID + BORDER (stippled micro-dots)
  // ═══════════════════════════════════════════════════════════════════
  function drawRisoGrid(ctx, chart, phx) {
    const { left, right, top, bottom } = chart.chartArea;
    let rs = 44444;
    ctx.save(); ctx.fillStyle = 'rgba(150,145,135,0.28)'; ctx.beginPath();
    const sp = 1.4;

    // Horizontal grid (Y ticks)
    const ys = chart.scales.y;
    const yt = ys?.ticks || [];
    for (let i = 0; i < yt.length; i++) {
      const v = yt[i].value !== undefined ? yt[i].value : yt[i];
      const y = ys.getPixelForValue(v);
      if (y < top || y > bottom) continue;
      for (let x = left; x <= right; x += sp) {
        if (phx !== undefined && x > phx) continue;
        rs=(rs*1664525+1013904223)&0x7fffffff;
        const jy = y + (rs/0x7fffffff-0.5)*0.6;
        rs=(rs*1664525+1013904223)&0x7fffffff;
        const r = 0.28 + (rs/0x7fffffff)*0.22;
        rs=(rs*1664525+1013904223)&0x7fffffff;
        if ((rs/0x7fffffff) > 0.95) continue;
        ctx.moveTo(x+r, jy); ctx.arc(x, jy, r, 0, TAU);
      }
    }

    // Vertical grid (X ticks)
    const xsc = chart.scales.x;
    const xt = xsc?.ticks || [];
    for (let i = 0; i < xt.length; i++) {
      const v = xt[i].value !== undefined ? xt[i].value : xt[i];
      const x = xsc.getPixelForValue(v);
      if (x < left || x > right) continue;
      if (phx !== undefined && x > phx) continue;
      for (let y = top; y <= bottom; y += sp) {
        rs=(rs*1664525+1013904223)&0x7fffffff;
        const jx = x + (rs/0x7fffffff-0.5)*0.6;
        rs=(rs*1664525+1013904223)&0x7fffffff;
        const r = 0.28 + (rs/0x7fffffff)*0.22;
        rs=(rs*1664525+1013904223)&0x7fffffff;
        if ((rs/0x7fffffff) > 0.95) continue;
        ctx.moveTo(jx+r, y); ctx.arc(jx, y, r, 0, TAU);
      }
    }
    ctx.fill(); ctx.restore();
  }

  function drawRisoBorder(ctx, chart, phx) {
    const { left, right, top, bottom } = chart.chartArea;
    let rs = 33333;
    ctx.save(); ctx.fillStyle = 'rgba(150,145,135,0.32)'; ctx.beginPath();
    // Top + bottom
    for (let x = left; x <= right; x += 1.2) {
      if (phx !== undefined && x > phx) continue;
      rs=(rs*1664525+1013904223)&0x7fffffff;
      const r = 0.3+(rs/0x7fffffff)*0.2;
      ctx.moveTo(x+r,top); ctx.arc(x,top,r,0,TAU);
      ctx.moveTo(x+r,bottom); ctx.arc(x,bottom,r,0,TAU);
    }
    // Left + right
    for (let y = top; y <= bottom; y += 1.2) {
      rs=(rs*1664525+1013904223)&0x7fffffff;
      const r = 0.3+(rs/0x7fffffff)*0.2;
      ctx.moveTo(left+r,y); ctx.arc(left,y,r,0,TAU);
      if (phx === undefined || right <= phx) {
        ctx.moveTo(right+r,y); ctx.arc(right,y,r,0,TAU);
      }
    }
    ctx.fill(); ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════════════
  //  5. RISO TEXT (ink trapping + per-character jitter)
  // ═══════════════════════════════════════════════════════════════════
  function drawRisoText(ctx, text, x, y, font, color, spacing, phx) {
    ctx.font = font;
    const chars = text.split('');
    let tw = -spacing;
    for (let i = 0; i < chars.length; i++) tw += ctx.measureText(chars[i]).width + spacing;
    let cx = x - tw * 0.5;

    // Ink trapping layer (shadow, slightly larger)
    ctx.save(); ctx.fillStyle = color; ctx.globalAlpha = 0.12;
    const trapFont = font.replace(/(\d+(?:\.\d+)?)px/, (_,s) => (parseFloat(s)+0.4)+'px');
    ctx.font = trapFont;
    let tcx = cx;
    for (let i = 0; i < chars.length; i++) {
      if (phx !== undefined && tcx > phx + 15) { tcx += ctx.measureText(chars[i]).width + spacing; continue; }
      ctx.fillText(chars[i], tcx + 0.2, y + 0.2);
      tcx += ctx.measureText(chars[i]).width + spacing;
    }
    ctx.restore();

    // Main text with per-character variation
    ctx.save(); ctx.fillStyle = color; ctx.font = font;
    let rs = 55555 + ((y*100)|0);
    for (let i = 0; i < chars.length; i++) {
      if (phx !== undefined && cx > phx + 15) { cx += ctx.measureText(chars[i]).width + spacing; continue; }
      rs=(rs*1664525+1013904223)&0x7fffffff;
      const jx = cx + (rs/0x7fffffff-0.5)*0.4;
      rs=(rs*1664525+1013904223)&0x7fffffff;
      const jy = y + (rs/0x7fffffff-0.5)*0.3;
      rs=(rs*1664525+1013904223)&0x7fffffff;
      ctx.globalAlpha = 0.88 + (rs/0x7fffffff)*0.12;
      ctx.fillText(chars[i], jx, jy);
      cx += ctx.measureText(chars[i]).width + spacing;
    }
    ctx.restore();
  }

  // ═══════════════════════════════════════════════════════════════════
  //  CHART.JS PLUGIN
  // ═══════════════════════════════════════════════════════════════════
  const RisographPlugin = {
    id: 'risograph',

    // ── Reset animation on new chart ─────────────────────────────────
    afterInit(chart) {
      _a.progress = 1; _a.active = false; _a.chart = chart;
    },

    // ── Background: paper texture ────────────────────────────────────
    beforeDraw(chart) {
      const opts = merge(DEFAULTS, chart.options.plugins?.risograph);
      chart._risoOpts = opts;
      _ck = ''; // reset curve cache
      chart._phx = undefined;
      if (opts.paper.enabled) {
        chart.ctx.drawImage(generatePaper(chart.width, chart.height, opts.paper), 0, 0);
      }
    },

    // ── Halftone fill + hide native lines ────────────────────────────
    beforeDatasetsDraw(chart) {
      const opts = chart._risoOpts;
      if (!opts.halftone.enabled) return;
      const riso = chart.options.plugins?.risograph || {};
      const phx = getPrintHeadX(chart);

      if (riso.layers?.length > 0) {
        drawMultiply(chart, riso.layers, opts.paper);
      } else if (chart.data.datasets.length > 1) {
        drawMultiSeries(chart, opts, phx);
      } else {
        drawDirect(chart, opts.halftone, opts.paper);
      }

      // Hide native dataset visuals — our riso renderers replace them
      for (let i = 0; i < chart.data.datasets.length; i++) {
        const ds = chart.data.datasets[i];
        if (!ds._risoHidden) {
          ds._origBg = ds.backgroundColor;
          ds._origBc = ds.borderColor;
          ds._origBw = ds.borderWidth;
          ds.backgroundColor = 'rgba(0,0,0,0)';
          ds.borderColor = 'rgba(0,0,0,0)';
          ds.borderWidth = 0;
          ds._risoHidden = true;
        }
      }
    },

    // ── Riso line (after Chart.js draws invisible native lines) ──────
    afterDatasetsDraw(chart) {
      const riso = chart.options.plugins?.risograph || {};
      const phx = chart._phx;
      const opts = chart._risoOpts;
      const ctype = chart.config.type;

      // Riso line only for line charts (scatter/bar/doughnut get no connecting line)
      if (ctype === 'line') {
        const bw = riso._lineWidth || 2.5;
        for (let i = 0; i < chart.data.datasets.length; i++) {
          if (chart.data.datasets[i].hidden) continue;
          let lc;
          if (chart.data.datasets.length === 1 && riso.layers?.length > 1) {
            lc = mixColors(riso.layers[0].color, riso.layers[1].color);
          } else {
            const base = chart.data.datasets[i]._risoColor || SERIES_COLORS[i % SERIES_COLORS.length];
            const rgb = hexToRgb(base);
            lc = `rgb(${rgb[0]*0.7|0},${rgb[1]*0.7|0},${rgb[2]*0.7|0})`;
          }
          drawRisoLine(chart.ctx, chart, i, lc, bw, phx);
        }
      }
    },

    // ── Grid, border, text (all riso-treated, all animated) ──────────
    afterDraw(chart) {
      const opts = chart._risoOpts;
      const ctx = chart.ctx;
      const { left, right, top, bottom } = chart.chartArea;
      const riso = chart.options.plugins?.risograph || {};
      const phx = chart._phx;

      // Stippled grid + border (skip for doughnut/pie — no axes)
      const ctype = chart.config.type;
      if (ctype !== 'doughnut' && ctype !== 'pie') {
        drawRisoGrid(ctx, chart, phx);
        drawRisoBorder(ctx, chart, phx);
      }

      // Riso text
      if (opts.typography.enabled) {
        const { fontFamily: ff, color: tc, letterSpacing: ls } = opts.typography;
        ctx.textBaseline = 'middle';

        // Y-axis tick labels (always visible — outside sweep) — skip for doughnut
        const ys = (ctype !== 'doughnut' && ctype !== 'pie') ? chart.scales.y : null;
        if (ys && ys.ticks) {
          for (let i = 0; i < ys.ticks.length; i++) {
            const tk = ys.ticks[i];
            const v = tk.value !== undefined ? tk.value : tk;
            const label = tk.label !== undefined ? tk.label : String(v);
            drawRisoText(ctx, String(label), left - 10, ys.getPixelForValue(v), `400 14px ${ff}`, tc, 0.5, undefined);
          }
        }

        // X-axis tick labels (animated) — skip for doughnut
        const xs = (ctype !== 'doughnut' && ctype !== 'pie') ? chart.scales.x : null;
        if (xs && xs.ticks) {
          for (let i = 0; i < xs.ticks.length; i++) {
            const tk = xs.ticks[i];
            const v = tk.value !== undefined ? tk.value : tk;
            const label = tk.label !== undefined ? tk.label : String(v);
            drawRisoText(ctx, String(label), xs.getPixelForValue(v), bottom + 20, `400 14px ${ff}`, tc, 0.5, phx);
          }
        }

        // Titles
        if (riso.title) drawRisoText(ctx, riso.title.toUpperCase(), (left+right)/2, top-35, `400 18px ${ff}`, tc, ls, phx);
        if (riso.yAxisTitle) {
          ctx.save(); ctx.translate(left-55, (top+bottom)/2); ctx.rotate(-Math.PI/2);
          drawRisoText(ctx, riso.yAxisTitle.toUpperCase(), 0, 0, `400 14px ${ff}`, tc, ls, undefined);
          ctx.restore();
        }
        if (riso.xAxisTitle) drawRisoText(ctx, riso.xAxisTitle.toUpperCase(), (left+right)/2, bottom+50, `400 14px ${ff}`, tc, ls, phx);
      }

      // Clear print head for next frame
      chart._phx = undefined;
    },

    // ── Hover detection for multi-series opacity selection ──────────
    afterEvent(chart, args) {
      if (chart.data.datasets.length < 2) return;
      const { event } = args;
      if (event.type !== 'mousemove' && event.type !== 'click') return;
      const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: false }, false);
      const newSel = elements.length > 0 ? elements[0].datasetIndex : -1;
      if (chart._risoSelected !== newSel) {
        chart._risoSelected = newSel;
        if (!_a.active) chart.update('none');
      }
    },
  };

  // ═══════════════════════════════════════════════════════════════════
  //  EXPORTS
  // ═══════════════════════════════════════════════════════════════════
  global.RisographPlugin = RisographPlugin;
  global.RisographAnim = {
    play(chart, dur) { startAnim(chart, dur); },
    reset(chart) { _a.progress = 0; _a.active = false; _ms = ''; chart.update('none'); },
    scrub(chart, progress) {
      _a.progress = Math.max(0, Math.min(1, progress));
      _a.active = false;
      _a.chart = chart;
      _ms = '';
      chart.update('none');
    },
    get progress() { return _a.progress; },
  };
})(window);
