'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, EffectPass, RenderPass, Effect } from 'postprocessing';

type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';

interface TouchPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  force: number;
  age: number;
}

interface TouchTexture {
  canvas: HTMLCanvasElement;
  texture: THREE.Texture;
  addTouch: (norm: { x: number; y: number }) => void;
  update: () => void;
  radiusScale: number;
  size: number;
}

type PixelBlastProps = {
  variant?: PixelBlastVariant;
  pixelSize?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  antialias?: boolean;
  patternScale?: number;
  patternDensity?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleIntensityScale?: number;
  rippleThickness?: number;
  rippleSpeed?: number;
  liquidWobbleSpeed?: number;
  speed?: number;
  transparent?: boolean;
  edgeFade?: number;
  noiseAmount?: number;
};

// ============================================================================
// HELPER FUNCTIONS (outside component for better performance)
// ============================================================================

const createTouchTexture = (): TouchTexture => {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.Texture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  const trail: TouchPoint[] = [];
  let last: { x: number; y: number } | null = null;
  const maxAge = 64;
  let radius = 0.1 * size;
  const speed = 1 / maxAge;

  return {
    canvas,
    texture,
    addTouch(norm) {
      let force = 0, vx = 0, vy = 0;
      if (last) {
        const dx = norm.x - last.x, dy = norm.y - last.y;
        if (dx === 0 && dy === 0) return;
        const d = Math.sqrt(dx * dx + dy * dy);
        vx = dx / (d || 1);
        vy = dy / (d || 1);
        force = Math.min((dx * dx + dy * dy) * 10000, 1);
      }
      last = { x: norm.x, y: norm.y };
      trail.push({ x: norm.x, y: norm.y, age: 0, force, vx, vy });
    },
    update() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, size, size);
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        const f = p.force * speed * (1 - p.age / maxAge);
        p.x += p.vx * f;
        p.y += p.vy * f;
        if (++p.age > maxAge) { trail.splice(i, 1); continue; }

        const pos = { x: p.x * size, y: (1 - p.y) * size };
        const easeOut = p.age < maxAge * 0.3
          ? Math.sin((p.age / (maxAge * 0.3)) * Math.PI / 2)
          : Math.max(0, -(p.age - maxAge * 0.3) / (maxAge * 0.7) * ((p.age - maxAge * 0.3) / (maxAge * 0.7) - 2));
        const intensity = easeOut * p.force;
        const offset = size * 5;
        ctx.shadowOffsetX = ctx.shadowOffsetY = offset;
        ctx.shadowBlur = radius;
        ctx.shadowColor = `rgba(${((p.vx + 1) / 2) * 255},${((p.vy + 1) / 2) * 255},${intensity * 255},${0.22 * intensity})`;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,0,0,1)';
        ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      texture.needsUpdate = true;
    },
    set radiusScale(v) { radius = 0.1 * size * v; },
    get radiusScale() { return radius / (0.1 * size); },
    size
  };
};

const createLiquidEffect = (texture: THREE.Texture, strength: number, freq: number) => {
  const uniforms = new Map<string, THREE.Uniform>();
  uniforms.set('uTexture', new THREE.Uniform(texture));
  uniforms.set('uStrength', new THREE.Uniform(strength));
  uniforms.set('uTime', new THREE.Uniform(0));
  uniforms.set('uFreq', new THREE.Uniform(freq));
  return new Effect('LiquidEffect', `
    uniform sampler2D uTexture;
    uniform float uStrength, uTime, uFreq;
    void mainUv(inout vec2 uv) {
      vec4 tex = texture2D(uTexture, uv);
      float intensity = tex.b;
      float wave = 0.5 + 0.5 * sin(uTime * uFreq + intensity * 6.2831853);
      uv += vec2(tex.r * 2.0 - 1.0, tex.g * 2.0 - 1.0) * uStrength * intensity * wave;
    }
  `, { uniforms });
};

const SHAPE_MAP: Record<PixelBlastVariant, number> = { square: 0, circle: 1, triangle: 2, diamond: 3 };
const MAX_CLICKS = 10;

const VERTEX_SRC = `void main() { gl_Position = vec4(position, 1.0); }`;

const FRAGMENT_SRC = `
precision highp float;
uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uTime, uPixelSize, uScale, uDensity, uPixelJitter, uRippleSpeed, uRippleThickness, uRippleIntensity, uEdgeFade;
uniform int uEnableRipples, uShapeType;
uniform vec2 uClickPos[10];
uniform float uClickTimes[10];
out vec4 fragColor;

float Bayer2(vec2 a) { a = floor(a); return fract(a.x / 2. + a.y * a.y * .75); }
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

float hash11(float n) { return fract(sin(n)*43758.5453); }

float vnoise(vec3 p) {
  vec3 ip = floor(p), fp = fract(p);
  float n000 = hash11(dot(ip, vec3(1,57,113)));
  float n100 = hash11(dot(ip + vec3(1,0,0), vec3(1,57,113)));
  float n010 = hash11(dot(ip + vec3(0,1,0), vec3(1,57,113)));
  float n110 = hash11(dot(ip + vec3(1,1,0), vec3(1,57,113)));
  float n001 = hash11(dot(ip + vec3(0,0,1), vec3(1,57,113)));
  float n101 = hash11(dot(ip + vec3(1,0,1), vec3(1,57,113)));
  float n011 = hash11(dot(ip + vec3(0,1,1), vec3(1,57,113)));
  float n111 = hash11(dot(ip + vec3(1,1,1), vec3(1,57,113)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  return mix(mix(mix(n000,n100,w.x), mix(n010,n110,w.x), w.y), mix(mix(n001,n101,w.x), mix(n011,n111,w.x), w.y), w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t) {
  vec3 p = vec3(uv * uScale, t);
  float sum = 1.0, amp = 1.0, freq = 1.0;
  for (int i = 0; i < 5; i++) { sum += amp * vnoise(p * freq); freq *= 1.25; }
  return sum * 0.5 + 0.5;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspect = uResolution.x / uResolution.y;
  vec2 pixelId = floor(fragCoord / uPixelSize);
  vec2 pixelUV = fract(fragCoord / uPixelSize);
  float cellSize = 8.0 * uPixelSize;
  vec2 uv = floor(fragCoord / cellSize) * cellSize / uResolution * vec2(aspect, 1.0);

  float feed = fbm2(uv, uTime * 0.05) * 0.5 - 0.65 + (uDensity - 0.5) * 0.3;

  if (uEnableRipples == 1) {
    for (int i = 0; i < 10; i++) {
      if (uClickPos[i].x < 0.0) continue;
      vec2 cuv = ((uClickPos[i] - uResolution * .5 - cellSize * .5) / uResolution) * vec2(aspect, 1.0);
      float t = max(uTime - uClickTimes[i], 0.0);
      float r = distance(uv, cuv);
      feed = max(feed, exp(-pow((r - uRippleSpeed * t) / uRippleThickness, 2.0)) * exp(-t) * exp(-10.0 * r) * uRippleIntensity);
    }
  }

  float bw = step(0.5, feed + Bayer8(fragCoord / uPixelSize) - 0.5);
  float coverage = bw * (1.0 + (fract(sin(dot(pixelId, vec2(127.1, 311.7))) * 43758.5453) - 0.5) * uPixelJitter);

  float M = uShapeType == 1 ? coverage * (1.0 - smoothstep(-0.25 * fwidth(length(pixelUV - 0.5)), 0.25 * fwidth(length(pixelUV - 0.5)), (length(pixelUV - 0.5) - sqrt(coverage) * .25) * 2.0))
          : uShapeType == 3 ? step(abs(pixelUV.x - 0.49) + abs(pixelUV.y - 0.49), sqrt(coverage) * 0.564)
          : coverage;

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    M *= smoothstep(0.0, uEdgeFade, min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y)));
  }

  vec3 c = uColor;
  fragColor = vec4(mix(c * 12.92, 1.055 * pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c)), M);
}`;

// ============================================================================
// COMPONENT
// ============================================================================

const PixelBlast: React.FC<PixelBlastProps> = ({
  variant = 'square',
  pixelSize = 3,
  color = '#B19EEF',
  className,
  style,
  antialias = true,
  patternScale = 2,
  patternDensity = 1,
  liquid = false,
  liquidStrength = 0.1,
  liquidRadius = 1,
  pixelSizeJitter = 0,
  enableRipples = true,
  rippleIntensityScale = 1,
  rippleThickness = 0.1,
  rippleSpeed = 0.3,
  liquidWobbleSpeed = 4.5,
  speed = 0.5,
  transparent = true,
  edgeFade = 0.5,
  noiseAmount = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.OrthographicCamera;
    material?: THREE.ShaderMaterial;
    uniforms?: Record<string, { value: unknown }>;
    clock?: THREE.Clock;
    composer?: EffectComposer;
    touch?: TouchTexture;
    liquidEffect?: Effect;
    raf?: number;
    clickIx: number;
    timeOffset: number;
  }>({ clickIx: 0, timeOffset: Math.random() * 1000 });

  // Store dynamic values in refs to avoid effect reruns
  const propsRef = useRef({ speed, liquidStrength, liquidRadius, liquidWobbleSpeed });
  propsRef.current = { speed, liquidStrength, liquidRadius, liquidWobbleSpeed };

  // Initialize WebGL - only runs on mount or when core config changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const state = stateRef.current;

    // Cleanup previous
    if (state.renderer) {
      cancelAnimationFrame(state.raf!);
      state.material?.dispose();
      state.composer?.dispose();
      state.renderer.dispose();
      state.renderer.domElement.remove();
    }

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.domElement.style.cssText = 'width:100%;height:100%';
    if (transparent) renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);

    // Create uniforms
    const uniforms = {
      uResolution: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uClickPos: { value: Array.from({ length: MAX_CLICKS }, () => new THREE.Vector2(-1, -1)) },
      uClickTimes: { value: new Float32Array(MAX_CLICKS) },
      uShapeType: { value: SHAPE_MAP[variant] },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uPixelJitter: { value: pixelSizeJitter },
      uEnableRipples: { value: enableRipples ? 1 : 0 },
      uRippleSpeed: { value: rippleSpeed },
      uRippleThickness: { value: rippleThickness },
      uRippleIntensity: { value: rippleIntensityScale },
      uEdgeFade: { value: edgeFade }
    };

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SRC,
      fragmentShader: FRAGMENT_SRC,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      glslVersion: THREE.GLSL3
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    // Setup composer for effects
    let composer: EffectComposer | undefined;
    let touch: TouchTexture | undefined;
    let liquidEffect: Effect | undefined;

    if (liquid) {
      touch = createTouchTexture();
      touch.radiusScale = propsRef.current.liquidRadius;
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      liquidEffect = createLiquidEffect(touch.texture, propsRef.current.liquidStrength, propsRef.current.liquidWobbleSpeed);
      const effectPass = new EffectPass(camera, liquidEffect);
      effectPass.renderToScreen = true;
      composer.addPass(effectPass);
    }

    if (noiseAmount > 0) {
      if (!composer) {
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
      }
      const noiseUniforms = new Map<string, THREE.Uniform>();
      noiseUniforms.set('uTime', new THREE.Uniform(0));
      noiseUniforms.set('uAmount', new THREE.Uniform(noiseAmount));
      const noisePass = new EffectPass(camera, new Effect('Noise',
        `uniform float uTime,uAmount;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}void mainUv(inout vec2 uv){}void mainImage(const in vec4 i,const in vec2 uv,out vec4 o){o=i+vec4(vec3((h(floor(uv*1920.0)+floor(uTime*60.0))-0.5)*uAmount),0.0);}`,
        { uniforms: noiseUniforms }
      ));
      noisePass.renderToScreen = true;
      composer.passes.forEach(p => { (p as { renderToScreen?: boolean }).renderToScreen = false; });
      composer.addPass(noisePass);
    }

    // Resize handler
    const resize = () => {
      const w = container.clientWidth || 1, h = container.clientHeight || 1;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height);
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
      composer?.setSize(renderer.domElement.width, renderer.domElement.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Event handlers
    const mapToPixels = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * renderer.domElement.width / rect.width,
        y: (rect.height - (e.clientY - rect.top)) * renderer.domElement.height / rect.height
      };
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = mapToPixels(e);
      const ix = state.clickIx;
      (uniforms.uClickPos.value as THREE.Vector2[])[ix].set(x, y);
      (uniforms.uClickTimes.value as Float32Array)[ix] = uniforms.uTime.value as number;
      state.clickIx = (ix + 1) % MAX_CLICKS;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!touch) return;
      const { x, y } = mapToPixels(e);
      touch.addTouch({ x: x / renderer.domElement.width, y: y / renderer.domElement.height });
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown, { passive: true });
    renderer.domElement.addEventListener('pointermove', onPointerMove, { passive: true });

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      uniforms.uTime.value = state.timeOffset + clock.getElapsedTime() * propsRef.current.speed;

      if (liquidEffect) {
        const liq = liquidEffect as Effect & { uniforms: Map<string, THREE.Uniform> };
        liq.uniforms.get('uTime')!.value = uniforms.uTime.value;
        liq.uniforms.get('uStrength')!.value = propsRef.current.liquidStrength;
        liq.uniforms.get('uFreq')!.value = propsRef.current.liquidWobbleSpeed;
      }
      if (touch) {
        touch.radiusScale = propsRef.current.liquidRadius;
        touch.update();
      }

      composer ? composer.render() : renderer.render(scene, camera);
      state.raf = requestAnimationFrame(animate);
    };
    state.raf = requestAnimationFrame(animate);

    // Store refs
    Object.assign(state, { renderer, scene, camera, material, uniforms, clock, composer, touch, liquidEffect });

    return () => {
      ro.disconnect();
      cancelAnimationFrame(state.raf!);
      material.dispose();
      composer?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [antialias, liquid, noiseAmount, transparent]); // Only reinit on these changes

  // Update uniforms without reinit
  useEffect(() => {
    const u = stateRef.current.uniforms;
    if (!u) return;
    u.uShapeType.value = SHAPE_MAP[variant];
    u.uColor.value = new THREE.Color(color);
    u.uScale.value = patternScale;
    u.uDensity.value = patternDensity;
    u.uPixelJitter.value = pixelSizeJitter;
    u.uEnableRipples.value = enableRipples ? 1 : 0;
    u.uRippleSpeed.value = rippleSpeed;
    u.uRippleThickness.value = rippleThickness;
    u.uRippleIntensity.value = rippleIntensityScale;
    u.uEdgeFade.value = edgeFade;

    const r = stateRef.current.renderer;
    if (r) u.uPixelSize.value = pixelSize * r.getPixelRatio();
  }, [variant, color, patternScale, patternDensity, pixelSizeJitter, enableRipples, rippleSpeed, rippleThickness, rippleIntensityScale, edgeFade, pixelSize]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${className ?? ''}`}
      style={style}
      aria-label="PixelBlast background"
    />
  );
};

export { PixelBlast };
export default PixelBlast;
