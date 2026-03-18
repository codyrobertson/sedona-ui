/**
 * Classic 2D Perlin Noise
 * Lightweight implementation for procedural texture generation.
 */
(function (global) {
  const p = new Uint8Array(512);
  const perm = new Uint8Array(256);
  const grad2 = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [0, 1], [0, -1],
  ];

  function seed(s) {
    if (s === undefined) s = Math.random() * 65536;
    s = s | 0;
    const rng = () => {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 4294967296;
    };
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = (rng() * (i + 1)) | 0;
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    for (let i = 0; i < 512; i++) p[i] = perm[i & 255];
  }

  seed(42);

  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(a, b, t) {
    return a + t * (b - a);
  }

  function noise2d(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = fade(xf);
    const v = fade(yf);

    const g00 = grad2[p[p[X] + Y] & 7];
    const g10 = grad2[p[p[X + 1] + Y] & 7];
    const g01 = grad2[p[p[X] + Y + 1] & 7];
    const g11 = grad2[p[p[X + 1] + Y + 1] & 7];

    const d00 = g00[0] * xf + g00[1] * yf;
    const d10 = g10[0] * (xf - 1) + g10[1] * yf;
    const d01 = g01[0] * xf + g01[1] * (yf - 1);
    const d11 = g11[0] * (xf - 1) + g11[1] * (yf - 1);

    return lerp(lerp(d00, d10, u), lerp(d01, d11, u), v);
  }

  /** Fractal Brownian Motion — layered noise for richer textures */
  function fbm(x, y, octaves, lacunarity, gain) {
    octaves = octaves || 4;
    lacunarity = lacunarity || 2.0;
    gain = gain || 0.5;
    let sum = 0, amp = 1, freq = 1, max = 0;
    for (let i = 0; i < octaves; i++) {
      sum += noise2d(x * freq, y * freq) * amp;
      max += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return sum / max;
  }

  global.Perlin = { noise2d, fbm, seed, lerp };
})(window);
