import { useEffect, useRef } from "react";
import { ARG_CITIES, ARG_RINGS } from "@/scenes/arg-data";
import { badge, tagPill } from "@/scenes/neon-map";

/* Caso Starlink + Geotab: rastrear camiones donde no hay señal de celular.
   problema  · mapa del norte argentino con la señal de celular. 1 el camión se ve en el mapa · 2 entra al Impenetrable y desaparece
   solucion  · vista de costado. 1 el camión sin señal · 2 pasa un satélite y recibe la posición · 3 el satélite la baja a tierra: vuelve al mapa
   logistica · toda la flota. 1 sin satélite: varios camiones desaparecen · 2 con satélite: se ven todos */

export type SignalScene = "problema" | "solucion" | "logistica";

const BLUE = "#3b82f6", BLUE_L = "#93c5fd", AMBER = "#f5b31b", GREEN = "#22c55e", RED = "#ef4444", MINT = "#3cf2b5";
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ease = (u: number) => 1 - Math.pow(1 - clamp(u), 3);
const KX = Math.cos((27 * Math.PI) / 180);

type LL = [number, number];
// Resistencia → Castelli → El Impenetrable → J. V. González → Salta (aprox. rutas 16 y 81)
const ROUTE: LL[] = [[-58.99, -27.46], [-59.9, -26.9], [-60.62, -25.95], [-61.6, -25.2], [-62.7, -24.9], [-64.13, -25.12], [-65.41, -24.78]];
const coverR = (pop: number) => 0.55 + Math.log10(pop / 50000) * 0.75;      // radio de señal alrededor de cada ciudad (ilustrativo)
const covered = (lon: number, lat: number) => ARG_CITIES.some((c) => Math.hypot((c.lon - lon) * KX, c.lat - lat) < coverR(c.pop));
function along(pts: LL[], f: number): LL {
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot((pts[i][0] - pts[i - 1][0]) * KX, pts[i][1] - pts[i - 1][1]));
  const d = clamp(f) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const k = (d - L[i - 1]) / (L[i] - L[i - 1] || 1); return [lerp(pts[i - 1][0], pts[i][0], k), lerp(pts[i - 1][1], pts[i][1], k)];
}
// flota (logística): recorridos entre ciudades
const FLEET: LL[][] = [
  ROUTE, [[-58.43, -34.61], [-62.27, -38.72], [-65.0, -42.0], [-67.48, -45.86]], [[-64.18, -31.4], [-65.22, -26.81], [-65.41, -24.78]],
  [[-68.06, -38.95], [-69.5, -42.5], [-71.31, -41.13]], [[-60.67, -32.95], [-61.5, -29.5], [-58.99, -27.46]], [[-68.82, -32.88], [-67.5, -36.5], [-68.06, -38.95]],
  [[-58.43, -34.61], [-60.67, -32.95], [-64.18, -31.4]], [[-67.48, -45.86], [-68.5, -49.5], [-69.2, -51.6]],
];

export function SignalMap({ scene, step }: { scene: SignalScene; step: number }) {
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
    const sans = (px: number, w = 700) => `${w} ${px}px Geist, ui-sans-serif, sans-serif`;

    const frame = (now: number) => {
      const t = (now - t0) / 1000, s = st.current.step, ts = (now - st.current.at) / 1000;
      const since = (n: number, dur: number) => (s > n ? 1 : s === n ? ease(ts / dur) : 0);
      g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, W, H);
      const k = Math.min(W, H) / 800;
      if (scene === "solucion") { side(g, W, H, k * 1.45, s, t, since, sans, mono); raf = requestAnimationFrame(frame); return; }

      // ── mapa: el norte (problema) o el país entero (logística)
      const north = scene === "problema";
      const c0: LL = north ? [-61.6, -26.2] : [-63.6, -38.4];
      const U = north ? Math.min(W / (13 * KX), H / 8.5) : Math.min(W / (21 * KX * 1.25), H / 33);
      const P = (lon: number, lat: number): [number, number] => [W / 2 + (lon - c0[0]) * KX * U, H / 2 - (lat - c0[1]) * U];

      g.save(); g.shadowColor = BLUE; g.shadowBlur = 22 * k;
      for (const r of ARG_RINGS) { g.beginPath(); r.forEach(([lo, la], i) => (i ? g.lineTo(...P(lo, la)) : g.moveTo(...P(lo, la)))); g.closePath(); g.fillStyle = "rgba(37,99,235,0.08)"; g.fill(); g.strokeStyle = BLUE; g.lineWidth = 2.6 * k; g.stroke(); }
      g.restore();
      // zonas con señal de celular
      g.save(); g.beginPath();
      for (const r of ARG_RINGS) { r.forEach(([lo, la], i) => (i ? g.lineTo(...P(lo, la)) : g.moveTo(...P(lo, la)))); g.closePath(); }
      g.clip();
      for (const c of ARG_CITIES) {
        const [x, y] = P(c.lon, c.lat), r = coverR(c.pop) * U;
        const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, "rgba(96,165,250,0.55)"); gr.addColorStop(0.7, "rgba(96,165,250,0.32)"); gr.addColorStop(1, "rgba(147,197,253,0)");
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
      }
      g.restore();
      for (const c of ARG_CITIES) {
        const [x, y] = P(c.lon, c.lat); g.fillStyle = "rgba(225,232,245,0.85)"; g.beginPath(); g.arc(x, y, 2.6 * k, 0, Math.PI * 2); g.fill();
        if (north && ["Resistencia", "Salta", "Tucumán", "Formosa", "Santiago del Estero", "Posadas"].includes(c.n)) {
          g.font = mono(10 * k + 3); g.fillStyle = "rgba(225,232,245,0.7)"; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(c.n.toUpperCase(), x + 7 * k, y);
        }
      }

      if (north) {
        // leyenda
        tagPill(g, 150 * k + 40, H - 50 * k, "ZONA CON SEÑAL DE CELULAR", mono(12 * k + 3), k, BLUE_L);
        const [ix, iy] = P(-61.9, -24.55); g.font = sans(13 * k + 5, 800); g.fillStyle = "rgba(225,232,245,0.35)"; g.textAlign = "center"; g.fillText("EL IMPENETRABLE · SIN SEÑAL", ix, iy);
        // ruta
        g.save(); g.setLineDash([7 * k, 6 * k]); g.strokeStyle = "rgba(245,179,27,0.6)"; g.lineWidth = 2.2 * k;
        g.beginPath(); ROUTE.forEach(([lo, la], i) => (i ? g.lineTo(...P(lo, la)) : g.moveTo(...P(lo, la)))); g.stroke(); g.restore();
        // el camión: en el paso 1 va por la parte con señal; en el paso 2 entra a la zona sin señal
        const f = s <= 1 ? 0.05 + 0.13 * ((t * 0.08) % 1) : clamp(0.18 + ts * 0.07, 0, 0.62);
        const [lo, la] = along(ROUTE, f), [x, y] = P(lo, la), ok = covered(lo, la);
        if (s >= 1) {
          if (ok) { truckDot(g, x, y, k * 1.5, GREEN); if (s === 1) badge(g, x, y, "CAMIÓN EN EL MAPA", GREEN, sans(13 * k + 5), k, W); }
          else {
            // la última posición conocida queda congelada y se apaga
            const lastF = (() => { let a = 0.05; for (let q = 0.05; q < f; q += 0.005) if (covered(...along(ROUTE, q))) a = q; return a; })();
            const [lx, ly] = P(...along(ROUTE, lastF));
            g.globalAlpha = 0.5 + 0.3 * Math.sin(t * 4); g.fillStyle = "#64748b"; g.beginPath(); g.arc(lx, ly, 9 * k, 0, Math.PI * 2); g.fill(); g.globalAlpha = 1;
            g.font = sans(14 * k + 4, 800); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("?", lx, ly + 1);
            badge(g, lx, ly, "SIN SEÑAL: DESAPARECIÓ DEL MAPA", RED, sans(13 * k + 5), k, W);
          }
        }
      } else {
        // flota entera
        const without = since(1, 0.6), withSat = since(2, 0.8);
        FLEET.forEach((r, i) => {
          g.save(); g.setLineDash([6 * k, 6 * k]); g.strokeStyle = "rgba(245,179,27,0.35)"; g.lineWidth = 1.6 * k;
          g.beginPath(); r.forEach(([lo, la], j) => (j ? g.lineTo(...P(lo, la)) : g.moveTo(...P(lo, la)))); g.stroke(); g.restore();
          const [lo, la] = along(r, (t * 0.04 + i * 0.137) % 1), [x, y] = P(lo, la), ok = covered(lo, la);
          if (without > 0 && withSat === 0 && !ok) {
            g.globalAlpha = without; g.fillStyle = "#64748b"; g.beginPath(); g.arc(x, y, 8 * k, 0, Math.PI * 2); g.fill();
            g.font = sans(12 * k + 4, 800); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("?", x, y + 1); g.globalAlpha = 1;
          } else truckDot(g, x, y, k, withSat > 0 && !ok ? MINT : GREEN);
        });
        if (without > 0 && withSat === 0) { g.globalAlpha = without; badge(g, W / 2, 150 * k, "SIN SATÉLITE: PUNTOS CIEGOS", RED, sans(14 * k + 5), k, W); g.globalAlpha = 1; }
        if (withSat > 0) { g.globalAlpha = withSat; badge(g, W / 2, 150 * k, "CON SATÉLITE: SE VEN TODOS", GREEN, sans(14 * k + 5), k, W); g.globalAlpha = 1; }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [scene]);

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}

function truckDot(g: CanvasRenderingContext2D, x: number, y: number, k: number, c: string) {
  const h = g.createRadialGradient(x, y, 0, x, y, 22 * k); h.addColorStop(0, c + "99"); h.addColorStop(1, c + "00");
  g.fillStyle = h; g.beginPath(); g.arc(x, y, 22 * k, 0, Math.PI * 2); g.fill();
  g.fillStyle = c; g.strokeStyle = "#0e131c"; g.lineWidth = 1.6;
  g.beginPath(); g.roundRect(x - 10 * k, y - 6 * k, 14 * k, 12 * k, 2 * k); g.fill(); g.stroke();
  g.beginPath(); g.roundRect(x + 4 * k, y - 5 * k, 7 * k, 10 * k, 2 * k); g.fill(); g.stroke();
}

// Vista de costado: antena con su alcance, camión en la zona sin señal, satélites pasando, estación en tierra y el mapa de la flota.
function side(g: CanvasRenderingContext2D, W: number, H: number, k: number, s: number, t: number, since: (n: number, d: number) => number, sans: (px: number, w?: number) => string, mono: (px: number) => string) {
  const gy = H * 0.74;
  // piso
  const grd = g.createLinearGradient(0, gy, 0, H); grd.addColorStop(0, "rgba(59,130,246,0.18)"); grd.addColorStop(1, "rgba(59,130,246,0)");
  g.fillStyle = grd; g.fillRect(0, gy, W, H - gy);
  g.strokeStyle = BLUE; g.lineWidth = 2.5 * k; g.beginPath(); g.moveTo(0, gy); g.lineTo(W, gy); g.stroke();
  // árboles (monte)
  for (let i = 0; i < 18; i++) { const x = W * (0.3 + i * 0.035) + Math.sin(i * 7) * 10 * k, h = (18 + (i % 4) * 7) * k; g.fillStyle = "rgba(34,197,94,0.22)"; g.beginPath(); g.moveTo(x - h * 0.4, gy); g.lineTo(x, gy - h); g.lineTo(x + h * 0.4, gy); g.closePath(); g.fill(); }
  // antena de celular y su alcance
  const ax = W * 0.1;
  g.strokeStyle = "#cbd5e1"; g.lineWidth = 3 * k; g.beginPath(); g.moveTo(ax - 14 * k, gy); g.lineTo(ax, gy - 90 * k); g.lineTo(ax + 14 * k, gy); g.moveTo(ax - 9 * k, gy - 30 * k); g.lineTo(ax + 9 * k, gy - 30 * k); g.stroke();
  for (let i = 0; i < 4; i++) { const r = ((t * 60 * k + i * 55 * k) % (W * 0.22)); g.strokeStyle = `rgba(147,197,253,${0.5 * (1 - r / (W * 0.22))})`; g.lineWidth = 2 * k; g.beginPath(); g.arc(ax, gy - 90 * k, r, Math.PI * 1.05, Math.PI * 1.95); g.stroke(); }
  g.fillStyle = "rgba(147,197,253,0.08)"; g.beginPath(); g.arc(ax, gy, W * 0.24, Math.PI, 0); g.fill();
  tagPill(g, ax + 10 * k, gy + 34 * k, "ANTENA DE CELULAR", mono(10 * k + 3), k, BLUE_L);
  const [dx] = [W * 0.34]; g.font = sans(13 * k + 4, 800); g.fillStyle = "rgba(225,232,245,0.4)"; g.textAlign = "center"; g.fillText("ACÁ TERMINA LA SEÑAL", dx, gy + 40 * k);
  // camión (de costado) con el equipo de Geotab
  const tx = W * 0.55, wob = Math.sin(t * 9) * 0.6 * k;
  truckSide(g, tx, gy + wob, k * 1.5);
  // estación en tierra y mapa de la flota
  const sx = W * 0.88;
  g.strokeStyle = "#cbd5e1"; g.lineWidth = 3 * k; g.beginPath(); g.moveTo(sx, gy); g.lineTo(sx, gy - 34 * k); g.stroke();
  g.beginPath(); g.ellipse(sx, gy - 44 * k, 22 * k, 12 * k, -0.6, 0, Math.PI * 2); g.stroke();
  tagPill(g, sx, gy + 34 * k, "ESTACIÓN EN TIERRA", mono(10 * k + 3), k, BLUE_L);
  // satélites: siempre hay uno pasando por arriba
  const sy = H * 0.14, sats = [0, 1, 2].map((i) => ((t * 0.05 + i / 3) % 1) * (W * 1.3) - W * 0.15);
  const near = sats.reduce((a, b) => (Math.abs(b - tx) < Math.abs(a - tx) ? b : a));
  g.strokeStyle = "rgba(225,232,245,0.18)"; g.setLineDash([4 * k, 8 * k]); g.lineWidth = 1.5 * k; g.beginPath(); g.moveTo(0, sy); g.lineTo(W, sy); g.stroke(); g.setLineDash([]);
  const satA = since(2, 0.7);
  for (const x of sats) satellite(g, x, sy, k, satA > 0 ? 1 : 0.55);
  if (satA > 0) { g.globalAlpha = satA; tagPill(g, near, sy - 34 * k, "STARLINK · ~550 KM DE ALTURA", mono(10 * k + 3), k, MINT); g.globalAlpha = 1; }

  // paso 1: el camión manda su posición y nadie la recibe
  if (s >= 1 && s < 2) {
    for (let i = 0; i < 3; i++) { const r = ((t * 70 * k + i * 40 * k) % (120 * k)); g.strokeStyle = `rgba(239,68,68,${0.7 * (1 - r / (120 * k))})`; g.lineWidth = 2.2 * k; g.beginPath(); g.arc(tx, gy - 60 * k, r, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
    badge(g, tx, gy - 70 * k, "SIN SEÑAL: NADIE RECIBE LA POSICIÓN", RED, sans(13 * k + 5), k, W);
  }
  // paso 2: camión → satélite
  if (satA > 0) {
    g.save(); g.globalAlpha = satA; g.shadowColor = MINT; g.shadowBlur = 14 * k; g.strokeStyle = MINT; g.lineWidth = 3 * k; g.setLineDash([10 * k, 8 * k]); g.lineDashOffset = -t * 40 * k;
    g.beginPath(); g.moveTo(tx, gy - 62 * k); g.lineTo(near, sy + 12 * k); g.stroke(); g.restore();
  }
  // paso 3: satélite → tierra → mapa
  const down = since(3, 0.8);
  if (down > 0) {
    g.save(); g.globalAlpha = down; g.shadowColor = MINT; g.shadowBlur = 14 * k; g.strokeStyle = MINT; g.lineWidth = 3 * k; g.setLineDash([10 * k, 8 * k]); g.lineDashOffset = -t * 40 * k;
    g.beginPath(); g.moveTo(near, sy + 12 * k); g.lineTo(sx, gy - 50 * k); g.stroke(); g.restore();
    // pantalla del mapa de la flota
    const mx = sx - 10 * k, my = H * 0.42, mw = 170 * k, mh = 105 * k;
    g.globalAlpha = down;
    g.fillStyle = "#0b1220"; g.strokeStyle = GREEN; g.lineWidth = 2.5 * k; g.beginPath(); g.roundRect(mx - mw / 2, my - mh / 2, mw, mh, 10 * k); g.fill(); g.stroke();
    g.strokeStyle = "rgba(147,197,253,0.25)"; g.lineWidth = 1; for (let i = 1; i < 4; i++) { g.beginPath(); g.moveTo(mx - mw / 2 + (i * mw) / 4, my - mh / 2); g.lineTo(mx - mw / 2 + (i * mw) / 4, my + mh / 2); g.stroke(); }
    truckDot(g, mx + Math.sin(t) * 20 * k, my, k, GREEN);
    g.font = mono(9 * k + 3); g.fillStyle = GREEN; g.textAlign = "center"; g.fillText("MAPA DE LA FLOTA ✓", mx, my + mh / 2 + 16 * k);
    g.globalAlpha = 1;
  }
}

function truckSide(g: CanvasRenderingContext2D, x: number, y: number, k: number) {
  g.save(); g.translate(x, y);
  g.fillStyle = "rgba(0,0,0,0.35)"; g.beginPath(); g.ellipse(0, 2 * k, 70 * k, 6 * k, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = "#e5e7eb"; g.beginPath(); g.roundRect(-70 * k, -44 * k, 92 * k, 36 * k, 4 * k); g.fill();                        // caja
  g.fillStyle = AMBER; g.fillRect(-70 * k, -20 * k, 92 * k, 6 * k);
  g.fillStyle = "#f8fafc"; g.beginPath(); g.moveTo(24 * k, -8 * k); g.lineTo(24 * k, -38 * k); g.lineTo(46 * k, -38 * k); g.lineTo(60 * k, -22 * k); g.lineTo(60 * k, -8 * k); g.closePath(); g.fill();
  g.fillStyle = "#1e293b"; g.beginPath(); g.moveTo(30 * k, -34 * k); g.lineTo(44 * k, -34 * k); g.lineTo(54 * k, -23 * k); g.lineTo(30 * k, -23 * k); g.closePath(); g.fill();
  g.fillStyle = "#111"; for (const wx of [-52, -32, 42]) { g.beginPath(); g.arc(wx * k, -6 * k, 9 * k, 0, Math.PI * 2); g.fill(); g.fillStyle = "#94a3b8"; g.beginPath(); g.arc(wx * k, -6 * k, 3.5 * k, 0, Math.PI * 2); g.fill(); g.fillStyle = "#111"; }
  // equipo de rastreo en el techo
  g.fillStyle = MINT; g.shadowColor = MINT; g.shadowBlur = 12 * k; g.beginPath(); g.roundRect(-14 * k, -52 * k, 24 * k, 8 * k, 3 * k); g.fill();
  g.restore();
}

function satellite(g: CanvasRenderingContext2D, x: number, y: number, k: number, a: number) {
  g.save(); g.globalAlpha = a; g.translate(x, y);
  g.fillStyle = "#e5e7eb"; g.fillRect(-7 * k, -6 * k, 14 * k, 12 * k);
  g.fillStyle = "#3b82f6"; g.strokeStyle = "#93c5fd"; g.lineWidth = 1;
  for (const sx of [-1, 1]) { g.beginPath(); g.rect(sx > 0 ? 9 * k : -37 * k, -5 * k, 28 * k, 10 * k); g.fill(); g.stroke(); }
  g.restore();
}
