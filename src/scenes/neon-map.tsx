import { useEffect, useRef } from "react";

/* Mapa "neón" para los casos en oscuro (estilo explicativo: fondo azul noche con grilla, geocerca azul que brilla,
   rutas con etiquetas en pastilla, pines). Mapa ilustrativo de Austin, dibujado a mano: no es la zona real de Tesla.
   Cada escena cambia con los pasos de la diapositiva. */

export type NeonScene = "intro" | "geocerca" | "borde" | "logistica";

export type Pt = [number, number];
const BLUE = "#3b82f6", BLUE_L = "#93c5fd", RED = "#ef4444", GREEN = "#22c55e", AMBER = "#f5b31b", TESLA = "#e31937";

export const ROADS: { name: string; pts: Pt[]; tag: Pt }[] = [
  { name: "I-35", pts: [[0.2, -0.7], [0.17, -0.25], [0.12, 0.05], [0.16, 0.38], [0.22, 0.7]], tag: [0.19, -0.5] },
  { name: "MOPAC", pts: [[-0.27, -0.7], [-0.23, -0.25], [-0.19, 0.08], [-0.26, 0.4], [-0.32, 0.7]], tag: [-0.25, -0.48] },
  { name: "US-183", pts: [[-1.05, -0.58], [-0.45, -0.4], [0.1, -0.31], [0.52, -0.14], [0.72, 0.2], [0.78, 0.7]], tag: [-0.7, -0.5] },
  { name: "SH-71", pts: [[-1.05, 0.46], [-0.35, 0.44], [0.3, 0.47], [1.05, 0.4]], tag: [0.62, 0.44] },
  { name: "LOOP 360", pts: [[-0.62, -0.7], [-0.6, -0.2], [-0.55, 0.2], [-0.45, 0.46]], tag: [-0.6, -0.08] },
];
export const RIVER: Pt[] = [[-1.05, -0.06], [-0.6, 0.0], [-0.3, 0.09], [0.0, 0.11], [0.35, 0.13], [0.7, 0.2], [1.05, 0.24]];
const HOODS: { t: string; p: Pt }[] = [
  { t: "HYDE PARK", p: [-0.05, -0.24] }, { t: "ZILKER", p: [-0.3, 0.2] }, { t: "EAST AUSTIN", p: [0.33, -0.02] },
  { t: "MUELLER", p: [0.36, -0.28] }, { t: "TRAVIS HEIGHTS", p: [0.05, 0.28] }, { t: "WESTLAKE", p: [-0.72, 0.12] },
  { t: "PFLUGERVILLE", p: [0.62, -0.58] }, { t: "SOUTH AUSTIN", p: [-0.1, 0.58] },
];
const ZONE: Pt[] = [[-0.36, -0.36], [-0.06, -0.41], [-0.04, -0.6], [0.07, -0.6], [0.09, -0.4], [0.36, -0.31], [0.44, -0.02], [0.32, 0.3], [0.02, 0.37], [-0.3, 0.3], [-0.44, 0.02]];
const ZONE_BIG: Pt[] = [[-0.5, -0.45], [-0.08, -0.52], [-0.05, -0.66], [0.09, -0.66], [0.12, -0.5], [0.5, -0.42], [0.62, -0.02], [0.48, 0.44], [0.02, 0.52], [-0.44, 0.44], [-0.62, 0.04]];
const INSIDE: { t: string; p: Pt }[] = [{ t: "UT AUSTIN", p: [-0.04, -0.15] }, { t: "CAPITOLIO", p: [0.08, -0.05] }, { t: "ZILKER PARK", p: [-0.2, 0.15] }];
const OUTSIDE: Pt[] = [[0.74, -0.42], [-0.78, 0.32], [0.62, 0.58], [-0.62, -0.55]];
const DOWNTOWN: Pt = [-0.02, 0.04];
// recorridos de los autos (adentro de la zona)
const LOOP_A: Pt[] = [[-0.2, -0.2], [0.15, -0.2], [0.2, 0.15], [-0.15, 0.2]];
const LOOP_B: Pt[] = [[-0.3, 0.0], [-0.05, -0.3], [0.25, -0.1], [0.05, 0.25]];
// zonas de reparto (paso logística): cortes verticales de la geocerca
const BANDS = [{ x0: -1, x1: -0.14, c: BLUE }, { x0: -0.14, x1: 0.16, c: GREEN }, { x0: 0.16, x1: 1, c: AMBER }];

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ease = (u: number) => 1 - Math.pow(1 - clamp(u), 3);
const sstep = (a: number, b: number, x: number) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };
function along(pts: Pt[], f: number, closed = true): Pt {
  const P = closed ? [...pts, pts[0]] : pts, L: number[] = [0];
  for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  let d = (((f % 1) + 1) % 1) * L[L.length - 1], i = 1;
  while (i < P.length - 1 && L[i] < d) i++;
  const k = (d - L[i - 1]) / (L[i] - L[i - 1] || 1);
  return [lerp(P[i - 1][0], P[i][0], k), lerp(P[i - 1][1], P[i][1], k)];
}

export function NeonMap({ scene, step }: { scene: NeonScene; step: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef({ step, at: performance.now() });
  if (st.current.step !== step) st.current = { step, at: performance.now() };

  useEffect(() => {
    const cv = ref.current!, g = cv.getContext("2d")!;
    let raf = 0, W = 0, H = 0, DPR = 1;
    const fit = () => { DPR = window.devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * DPR; cv.height = H * DPR; };
    const ro = new ResizeObserver(fit); ro.observe(cv); fit();
    const t0 = performance.now();
    const mono = (px: number) => `600 ${px}px "Geist Mono", ui-monospace, monospace`;
    const sans = (px: number) => `700 ${px}px Geist, ui-sans-serif, sans-serif`;

    const frame = (now: number) => {
      const t = (now - t0) / 1000, s = st.current.step, ts = (now - st.current.at) / 1000;
      const U = Math.min(W / 2.15, H / 1.45), CX = W / 2, CY = H / 2;
      const P = ([x, y]: Pt): Pt => [CX + x * U, CY + y * U];
      const k = U / 420;
      g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, W, H);

      // ── qué se ve en cada escena / paso
      const zoneOn = scene === "intro" || scene === "borde" || scene === "logistica" || (scene === "geocerca" && s >= 1);
      const zoneDraw = scene === "geocerca" && s === 1 ? ease(ts / 1.4) : 1;
      const grow = scene === "borde" && s >= 2 ? ease((s === 2 ? ts : 9) / 1.6) : 0;
      const zone = ZONE.map((p, i) => [lerp(p[0], ZONE_BIG[i][0], grow), lerp(p[1], ZONE_BIG[i][1], grow)] as Pt);
      const cyc = 5.4, ct = t % cyc;
      const alertCar = scene === "borde" && s === 1 && ct > 2.0 && ct < 3.7;
      const alertTruck = scene === "logistica" && s >= 2 && ct > 2.0 && ct < 3.7;
      const bands = scene === "logistica" && s >= 1 ? ease((s === 1 ? ts : 9) / 1.0) : 0;

      // ── río y rutas
      g.lineCap = "round"; g.lineJoin = "round";
      g.strokeStyle = "rgba(70,120,190,0.28)"; g.lineWidth = 9 * k; g.beginPath(); RIVER.forEach((p, i) => (i ? g.lineTo(...P(p)) : g.moveTo(...P(p)))); g.stroke();
      g.strokeStyle = "rgba(175,190,215,0.32)"; g.lineWidth = 2 * k;
      for (const r of ROADS) { g.beginPath(); r.pts.forEach((p, i) => (i ? g.lineTo(...P(p)) : g.moveTo(...P(p)))); g.stroke(); }

      // ── geocerca
      const path = (pts: Pt[], upto = 1) => {
        const per = pts.map((p, i) => Math.hypot(pts[(i + 1) % pts.length][0] - p[0], pts[(i + 1) % pts.length][1] - p[1]));
        let left = per.reduce((a, b) => a + b, 0) * upto;
        g.beginPath(); g.moveTo(...P(pts[0]));
        for (let i = 0; i < pts.length && left > 0; i++) {
          const a = pts[i], b = pts[(i + 1) % pts.length], u = Math.min(1, left / per[i]);
          g.lineTo(...P([lerp(a[0], b[0], u), lerp(a[1], b[1], u)])); left -= per[i];
        }
      };
      if (zoneOn) {
        const col = alertCar ? RED : BLUE, colL = alertCar ? "#fca5a5" : BLUE_L;
        const fillA = zoneDraw * (1 - 0.6 * bands);
        // volumen: sombra desplazada (sensación de placa levantada)
        g.save(); g.translate(0, 10 * k); path(zone); g.closePath(); g.fillStyle = `rgba(0,0,0,${0.45 * zoneDraw})`; g.fill(); g.restore();
        path(zone); g.closePath();
        const grd = g.createLinearGradient(0, CY - 0.6 * U, 0, CY + 0.4 * U);
        grd.addColorStop(0, `rgba(59,130,246,${0.32 * fillA})`); grd.addColorStop(1, `rgba(37,99,235,${0.14 * fillA})`);
        g.fillStyle = grd; g.fill();
        // zonas de reparto
        if (bands > 0) {
          g.save(); path(zone); g.closePath(); g.clip();
          for (const b of BANDS) {
            const [x0] = P([b.x0, 0]), [x1] = P([b.x1, 0]);
            g.globalAlpha = 0.28 * bands; g.fillStyle = b.c; g.fillRect(x0, 0, x1 - x0, H); g.globalAlpha = 1;
          }
          g.setLineDash([10 * k, 8 * k]); g.strokeStyle = `rgba(255,255,255,${0.7 * bands})`; g.lineWidth = 2.5 * k;
          for (const x of [BANDS[0].x1, BANDS[1].x1]) { g.beginPath(); g.moveTo(...P([x, -1])); g.lineTo(...P([x, 1])); g.stroke(); }
          g.setLineDash([]); g.restore();
        }
        // borde de neón
        g.save(); g.shadowColor = col; g.shadowBlur = 28 * k;
        path(zone, zoneDraw); if (zoneDraw >= 1) g.closePath();
        g.strokeStyle = col; g.lineWidth = 6 * k; g.stroke(); g.restore();
        path(zone, zoneDraw); if (zoneDraw >= 1) g.closePath(); g.strokeStyle = colL; g.lineWidth = 1.6 * k; g.stroke();
      }

      // ── etiquetas de barrios, centro y rutas
      g.textAlign = "center"; g.textBaseline = "middle";
      g.font = mono(11 * k + 2); g.fillStyle = "rgba(170,182,205,0.6)";
      if (scene !== "intro") {                                    // en la portada el título manda: sin etiquetas
        for (const h of HOODS) g.fillText(h.t, ...P(h.p));
        const [dx, dy] = P(DOWNTOWN);
        star(g, dx, dy, 7 * k + 2, AMBER); g.font = mono(12 * k + 2); g.fillStyle = AMBER; g.textAlign = "left"; g.fillText("DOWNTOWN", dx + 12 * k + 4, dy + 1);
        g.textAlign = "center";
        for (const r of ROADS) tagPill(g, ...P(r.tag), r.name, mono(10 * k + 2), k);
      }

      // ── pines (escena geocerca)
      if (scene === "geocerca") {
        const inA = s >= 2 ? ease((s === 2 ? ts : 9) / 0.8) : 0, outA = s >= 3 ? ease((s === 3 ? ts : 9) / 0.8) : 0;
        INSIDE.forEach((q, i) => { const a = clamp(inA * 1.6 - i * 0.25); if (a > 0) { const [x, y] = P(q.p); pin(g, x, y, k * (0.6 + 0.4 * a), GREEN, a); g.globalAlpha = a; tagPill(g, x, y + 22 * k, q.t, mono(10 * k + 2), k, GREEN); g.globalAlpha = 1; } });
        OUTSIDE.forEach((p, i) => { const a = clamp(outA * 1.6 - i * 0.2); if (a > 0) { const [x, y] = P(p); pin(g, x, y, k * (0.6 + 0.4 * a), "#6b7280", a); g.globalAlpha = a; cross(g, x, y - 24 * k, 9 * k); g.globalAlpha = 1; } });
      }

      // ── vehículos
      const glowDot = (x: number, y: number, c: string, r: number) => {
        const h = g.createRadialGradient(x, y, 0, x, y, r * 3.2); h.addColorStop(0, c + "aa"); h.addColorStop(1, c + "00");
        g.fillStyle = h; g.beginPath(); g.arc(x, y, r * 3.2, 0, 7); g.fill();
      };
      if (scene === "intro" || scene === "borde") {
        const cars: Pt[] = [along(LOOP_A, t * 0.06), along(LOOP_A, t * 0.06 + 0.5), along(LOOP_B, t * 0.08 + 0.2)];
        if (scene === "borde" && s === 1) {
          const go = ease(ct / 2.0), back = sstep(3.7, 5.4, ct);
          cars.push(ct < 3.7 ? [lerp(0.0, 0.4, go), -0.02] : [lerp(0.4, 0.0, back), -0.02]);
        }
        cars.forEach((c) => { const [x, y] = P(c); glowDot(x, y, TESLA, 8 * k); carTop(g, x, y, 1.6 * k); });
        if (alertCar) badge(g, ...P([0.44, -0.02]), "FUERA DE ZONA · NO SIGUE", RED, sans(15 * k + 4), k, W);
        if (scene === "borde" && s >= 2) { const a = ease((s === 2 ? ts : 9) / 1.2); g.globalAlpha = a; badge(g, ...P([0.0, 0.6]), "LA ZONA CRECE", BLUE, sans(15 * k + 4), k, W); g.globalAlpha = 1; }
      }
      if (scene === "logistica") {
        const loops: Pt[][] = [[[-0.36, -0.2], [-0.2, -0.3], [-0.18, 0.2], [-0.34, 0.12]], [[-0.08, -0.35], [0.1, -0.3], [0.1, 0.25], [-0.08, 0.28]], [[0.22, -0.25], [0.38, -0.1], [0.3, 0.2], [0.2, 0.1]]];
        loops.forEach((l, i) => {
          let c = along(l, t * 0.07 + i * 0.3);
          if (i === 2 && s >= 2) { const go = ease(ct / 2.0), back = sstep(3.7, 5.4, ct); c = ct < 3.7 ? [lerp(0.28, 0.6, go), 0.05] : [lerp(0.6, 0.28, back), 0.05]; }
          const [x, y] = P(c); glowDot(x, y, AMBER, 8 * k); truckTop(g, x, y, 1.6 * k);
        });
        if (alertTruck) badge(g, ...P([0.52, -0.2]), "¡ALERTA! CAMIÓN FUERA DE SU ZONA", RED, sans(15 * k + 4), k, W);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [scene]);

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}

// ───────── piezas ─────────
export function tagPill(g: CanvasRenderingContext2D, x: number, y: number, text: string, font: string, k: number, color?: string) {
  g.font = font; const w = g.measureText(text).width + 14 * k + 6, h = 18 * k + 6;
  g.fillStyle = "#151c2a"; g.strokeStyle = color ?? "rgba(205,215,235,0.45)"; g.lineWidth = 1.2;
  g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 5); g.fill(); g.stroke();
  g.fillStyle = color ?? "rgba(225,232,245,0.85)"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, x, y + 1);
}
export function badge(g: CanvasRenderingContext2D, x: number, y: number, text: string, color: string, font: string, k: number, W: number) {
  g.font = font; const w = g.measureText(text).width + 34 * k + 10, h = 30 * k + 12;
  const bx = clamp(x - w / 2, 8, W - w - 8), by = y - 58 * k - h;
  g.save(); g.shadowColor = color; g.shadowBlur = 18 * k; g.fillStyle = color; g.beginPath(); g.roundRect(bx, by, w, h, 999); g.fill(); g.restore();
  g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, bx + w / 2, by + h / 2 + 1);
  g.strokeStyle = color; g.lineWidth = 2; g.beginPath(); g.moveTo(clamp(x, bx + 20, bx + w - 20), by + h); g.lineTo(x, y - 8 * k); g.stroke();
}
export function star(g: CanvasRenderingContext2D, x: number, y: number, r: number, c: string) {
  g.fillStyle = c; g.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  g.closePath(); g.fill();
}
export function pin(g: CanvasRenderingContext2D, x: number, y: number, s: number, c: string, a: number) {
  g.globalAlpha = a; const h = 34 * s, r = 11 * s;
  g.fillStyle = c; g.beginPath(); g.moveTo(x, y);
  g.bezierCurveTo(x - r * 0.6, y - h * 0.45, x - r, y - h + r * 0.9, x - r, y - h + r * 0.2);
  g.arc(x, y - h + r * 0.2, r, Math.PI, 0); g.bezierCurveTo(x + r, y - h + r * 0.9, x + r * 0.6, y - h * 0.45, x, y); g.fill();
  g.fillStyle = "#0e131c"; g.beginPath(); g.arc(x, y - h + r * 0.2, r * 0.4, 0, 7); g.fill(); g.globalAlpha = 1;
}
export function cross(g: CanvasRenderingContext2D, x: number, y: number, r: number) {
  g.strokeStyle = RED; g.lineWidth = 3; g.lineCap = "round";
  g.beginPath(); g.moveTo(x - r, y - r); g.lineTo(x + r, y + r); g.moveTo(x + r, y - r); g.lineTo(x - r, y + r); g.stroke();
}
function carTop(g: CanvasRenderingContext2D, x: number, y: number, k: number) {
  g.fillStyle = TESLA; g.strokeStyle = "#fff"; g.lineWidth = 1.6;
  g.beginPath(); g.roundRect(x - 9 * k, y - 5 * k, 18 * k, 10 * k, 4 * k); g.fill(); g.stroke();
  g.fillStyle = "rgba(255,255,255,0.85)"; g.fillRect(x - 2 * k, y - 3.5 * k, 5 * k, 7 * k);
}
function truckTop(g: CanvasRenderingContext2D, x: number, y: number, k: number) {
  g.fillStyle = AMBER; g.strokeStyle = "#111"; g.lineWidth = 1.6;
  g.beginPath(); g.roundRect(x - 11 * k, y - 6 * k, 15 * k, 12 * k, 2 * k); g.fill(); g.stroke();
  g.beginPath(); g.roundRect(x + 5 * k, y - 5 * k, 7 * k, 10 * k, 2 * k); g.fill(); g.stroke();
}
