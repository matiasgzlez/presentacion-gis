import { useEffect, useRef } from "react";

/* Base común de las animaciones neón nuevas (Amazon, DHL y herramientas).
   Cada escena dibuja en un canvas en cada cuadro; el paso (`step`) lo avanza la presentación sola, en bucle.
   `since(n, dur)` va de 0 a 1 cuando el paso llega a n (y queda en 1 en los pasos siguientes). */

export type Pt = [number, number];
export const C = { blue: "#3b82f6", blueL: "#93c5fd", green: "#22c55e", mint: "#3cf2b5", amber: "#f5b31b", red: "#ef4444", violet: "#a78bfa", white: "#f1f5f9", ink: "#0e131c", panel: "#151c2a" };

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const ease = (u: number) => 1 - Math.pow(1 - clamp(u), 3);

export type Frame = {
  g: CanvasRenderingContext2D;
  W: number; H: number; k: number;
  t: number; s: number; ts: number;
  since: (n: number, dur?: number) => number;
  mono: (px: number) => string;
  sans: (px: number, w?: number) => string;
};

export function useNeonCanvas(step: number, draw: (f: Frame) => void) {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef({ step, at: performance.now() });
  if (st.current.step !== step) st.current = { step, at: performance.now() };
  const drawRef = useRef(draw);
  drawRef.current = draw;
  useEffect(() => {
    const cv = ref.current!, g = cv.getContext("2d")!;
    let raf = 0, W = 0, H = 0, DPR = 1;
    const fit = () => { DPR = window.devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * DPR; cv.height = H * DPR; };
    const ro = new ResizeObserver(fit); ro.observe(cv); fit();
    const t0 = performance.now();
    const mono = (px: number) => `700 ${px}px "Geist Mono", ui-monospace, monospace`;
    const sans = (px: number, w = 700) => `${w} ${px}px Geist, ui-sans-serif, sans-serif`;
    const tick = (now: number) => {
      const t = (now - t0) / 1000, s = st.current.step, ts = (now - st.current.at) / 1000;
      const since = (n: number, dur = 0.8) => (s > n ? 1 : s === n ? ease(ts / dur) : 0);
      g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, W, H);
      g.textAlign = "center"; g.textBaseline = "middle"; g.globalAlpha = 1; g.setLineDash([]);
      if (W > 0 && H > 0) drawRef.current({ g, W, H, k: Math.min(W, H * 1.35) / 820, t, s, ts, since, mono, sans });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return ref;
}

/* ── caminos */
export function lens(pts: Pt[]) { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; }
/** Punto y ángulo a una fracción f (0–1) del recorrido. */
export function along(pts: Pt[], f: number): [Pt, number] {
  const L = lens(pts), d = clamp(f) * L[L.length - 1];
  let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const a = pts[i - 1], b = pts[i], u = (d - L[i - 1]) / (L[i] - L[i - 1] || 1);
  return [[lerp(a[0], b[0], u), lerp(a[1], b[1], u)], Math.atan2(b[1] - a[1], b[0] - a[0])];
}
/** Dibuja el recorrido hasta la fracción `upto`. */
export function path(g: CanvasRenderingContext2D, pts: Pt[], upto: number, col: string, w: number, opts: { dash?: number[]; glow?: number; alpha?: number } = {}) {
  if (upto <= 0 || pts.length < 2) return;
  const L = lens(pts), lim = L[L.length - 1] * clamp(upto);
  g.save(); g.globalAlpha = opts.alpha ?? 1; g.strokeStyle = col; g.lineWidth = w; g.lineCap = "round"; g.lineJoin = "round";
  if (opts.dash) g.setLineDash(opts.dash);
  if (opts.glow) { g.shadowColor = col; g.shadowBlur = opts.glow; }
  g.beginPath(); g.moveTo(...pts[0]);
  for (let i = 1; i < pts.length; i++) {
    if (L[i] <= lim) g.lineTo(...pts[i]);
    else { const u = (lim - L[i - 1]) / (L[i] - L[i - 1] || 1); g.lineTo(lerp(pts[i - 1][0], pts[i][0], u), lerp(pts[i - 1][1], pts[i][1], u)); break; }
  }
  g.stroke(); g.restore();
}

/* ── piezas */
export function dot(g: CanvasRenderingContext2D, x: number, y: number, r: number, col: string, glow = 0) {
  g.save(); if (glow) { g.shadowColor = col; g.shadowBlur = glow; } g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.restore();
}
export function ring(g: CanvasRenderingContext2D, x: number, y: number, r: number, col: string, w: number, alpha = 1) {
  g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.stroke(); g.restore();
}
/** Etiqueta en pastilla (texto blanco sobre color, o texto de color sobre panel oscuro con `outline`). */
export function label(g: CanvasRenderingContext2D, x: number, y: number, text: string, col: string, font: string, k: number, opts: { outline?: boolean; alpha?: number; W?: number; align?: "center" | "left" } = {}) {
  g.save(); g.globalAlpha = opts.alpha ?? 1; g.font = font;
  const w = g.measureText(text).width + 26 * k + 8, h = 26 * k + 10;
  let bx = opts.align === "left" ? x : x - w / 2;
  if (opts.W) bx = clamp(bx, 8, opts.W - w - 8);
  if (opts.outline) { g.fillStyle = C.panel; g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); g.roundRect(bx, y - h / 2, w, h, 999); g.fill(); g.stroke(); g.fillStyle = col; }
  else { g.shadowColor = col; g.shadowBlur = 16 * k; g.fillStyle = col; g.beginPath(); g.roundRect(bx, y - h / 2, w, h, 999); g.fill(); g.shadowBlur = 0; g.fillStyle = col === C.amber || col === C.mint ? C.ink : "#fff"; }
  g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, bx + w / 2, y + 1);
  g.restore();
  return w;
}
/** Camión visto desde arriba, grande, apuntando en `ang`. */
export function truck(g: CanvasRenderingContext2D, x: number, y: number, ang: number, k: number, col: string, size = 1) {
  g.save(); g.translate(x, y); g.rotate(ang); g.scale(k * size, k * size);
  g.shadowColor = col; g.shadowBlur = 16;
  g.fillStyle = col; g.strokeStyle = "#0b0f17"; g.lineWidth = 2;
  g.beginPath(); g.roundRect(-22, -11, 30, 22, 3); g.fill(); g.stroke();                // caja
  g.shadowBlur = 0; g.fillStyle = "#e2e8f0";
  g.beginPath(); g.roundRect(10, -10, 14, 20, 4); g.fill(); g.stroke();                 // cabina
  g.fillStyle = "#0b0f17"; g.fillRect(19, -7, 3, 14);                                   // parabrisas
  g.restore();
}
/** Casa / depósito con techo. */
export function house(g: CanvasRenderingContext2D, x: number, y: number, s: number, col: string) {
  g.save(); g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 14 * s;
  g.beginPath(); g.moveTo(x - 16 * s, y - 2 * s); g.lineTo(x, y - 16 * s); g.lineTo(x + 16 * s, y - 2 * s); g.lineTo(x + 12 * s, y - 2 * s); g.lineTo(x + 12 * s, y + 13 * s); g.lineTo(x - 12 * s, y + 13 * s); g.lineTo(x - 12 * s, y - 2 * s); g.closePath(); g.fill();
  g.shadowBlur = 0; g.fillStyle = C.ink; g.fillRect(x - 4 * s, y + 3 * s, 8 * s, 10 * s); g.restore();
}
/** Cartel de alerta con borde de color, texto en dos renglones. */
export function card(g: CanvasRenderingContext2D, x: number, y: number, lines: string[], col: string, f: Frame, alpha = 1, w0?: number) {
  const { g: _g, k, sans, W, H } = f; void _g;
  g.save(); g.globalAlpha = alpha;
  g.font = sans(17 * k + 5);
  const w = Math.max(w0 ?? 0, Math.max(...lines.map((l) => g.measureText(l).width)) + 40 * k), lh = 26 * k + 6, h = lines.length * lh + 22 * k;
  const bx = clamp(x - w / 2, 8, W - w - 8), by = clamp(y - h / 2, 8, H - h - 8);
  g.shadowColor = col; g.shadowBlur = 24 * k; g.fillStyle = "rgba(18,24,36,0.96)"; g.strokeStyle = col; g.lineWidth = 2.5;
  g.beginPath(); g.roundRect(bx, by, w, h, 14 * k); g.fill(); g.stroke(); g.shadowBlur = 0;
  lines.forEach((l, i) => { g.fillStyle = i === 0 ? col : "#fff"; g.font = i === 0 ? f.mono(13 * k + 4) : sans(17 * k + 5); g.textAlign = "center"; g.fillText(l, bx + w / 2, by + 11 * k + lh * (i + 0.5)); });
  g.restore();
}
/** Grilla suave de calles (barrio visto desde arriba). */
export function streets(g: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, n: number, m: number, k: number, alpha = 1) {
  g.save(); g.globalAlpha = alpha; g.strokeStyle = "rgba(96,130,190,0.28)"; g.lineWidth = 7 * k; g.lineCap = "round";
  for (let i = 0; i <= n; i++) { const x = lerp(x0, x1, i / n); g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke(); }
  for (let j = 0; j <= m; j++) { const y = lerp(y0, y1, j / m); g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); }
  g.restore();
}
/** Hexágono plano (punta arriba). */
export function hex(g: CanvasRenderingContext2D, x: number, y: number, r: number) {
  g.beginPath(); for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + (i * Math.PI) / 3; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath();
}
