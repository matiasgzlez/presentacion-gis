import { useEffect, useRef } from "react";
import { ARG_CITIES, ARG_RINGS } from "@/scenes/arg-data";
import { badge, tagPill } from "@/scenes/neon-map";

/* Caso Mercado Libre: el mapa real de Argentina en estilo neón. Las ciudades son los compradores (tamaño = población).
   intro     · el país con sus compradores
   problema  · 1 un solo depósito en Buenos Aires manda a todo el país · 2 a los de cerca llega rápido; a los lejanos, tarda días
   solucion  · 1 dónde están los compradores · 2 hasta dónde se llega en un día desde cada lugar posible · 3 se elige Córdoba
   tiempo    · 1 un círculo: misma distancia · 2 la forma real: mismo tiempo (se estira por las rutas)
   logistica · 1 el centro grande abastece a los regionales · 2 de cada regional salen los repartos */

export type ArgScene = "intro" | "problema" | "solucion" | "tiempo" | "logistica";

const BLUE = "#3b82f6", BLUE_L = "#93c5fd", AMBER = "#f5b31b", GREEN = "#22c55e", RED = "#ef4444", MINT = "#3cf2b5";
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ease = (u: number) => 1 - Math.pow(1 - clamp(u), 3);

const KX = Math.cos((38 * Math.PI) / 180);
const BA = { lon: -58.43, lat: -34.61 };
const CANDIDATES = [
  { n: "Córdoba", lon: -64.18, lat: -31.4, pick: true },
  { n: "Mendoza", lon: -68.82, lat: -32.88, pick: false },
  { n: "Tucumán", lon: -65.22, lat: -26.81, pick: false },
  { n: "Neuquén", lon: -68.06, lat: -38.95, pick: false },
];
const REACH = 5.2;                                                // "un día de camión" en grados (ilustrativo)
const HUBS = [{ lon: -64.18, lat: -31.4 }, { lon: -68.82, lat: -32.88 }, { lon: -65.22, lat: -26.81 }, { lon: -68.06, lat: -38.95 }, { lon: -58.99, lat: -27.46 }, { lon: -62.27, lat: -38.72 }];
const NAMED = new Set(["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Tucumán", "Salta", "Mar del Plata", "Neuquén", "Resistencia", "Posadas", "Bahía Blanca", "Comodoro Rivadavia"]);
const dist = (a: { lon: number; lat: number }, b: { lon: number; lat: number }) => Math.hypot((a.lon - b.lon) * KX, a.lat - b.lat);

export function ArgMap({ scene, step }: { scene: ArgScene; step: number }) {
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

      if (scene === "tiempo") { tiempo(g, W, H, k, s, ts, t, since, sans, mono); raf = requestAnimationFrame(frame); return; }

      // proyección: el país entra entero en el alto disponible
      const U = Math.min(W / (21 * KX * 1.25), H / 33), CX = W / 2, CY = H / 2;
      const P = (lon: number, lat: number): [number, number] => [CX + (lon + 63.6) * KX * U, CY - (lat + 38.4) * U];

      // ── el país
      g.save(); g.shadowColor = BLUE; g.shadowBlur = 24 * k;
      for (const r of ARG_RINGS) { g.beginPath(); r.forEach(([lo, la], i) => (i ? g.lineTo(...P(lo, la)) : g.moveTo(...P(lo, la)))); g.closePath(); g.fillStyle = "rgba(37,99,235,0.12)"; g.fill(); g.strokeStyle = BLUE; g.lineWidth = 3.2 * k; g.stroke(); }
      g.restore();
      for (const r of ARG_RINGS) { g.beginPath(); r.forEach(([lo, la], i) => (i ? g.lineTo(...P(lo, la)) : g.moveTo(...P(lo, la)))); g.closePath(); g.strokeStyle = BLUE_L; g.lineWidth = 1 * k; g.stroke(); }

      // ── qué mostrar
      const heat = scene === "solucion" ? since(1, 1.2) : 0;
      const reach = scene === "solucion" ? since(2, 1.2) : 0, pick = scene === "solucion" ? since(3, 1.0) : 0;
      const routes = scene === "problema" ? since(1, 1.2) : 0, days = scene === "problema" ? since(2, 0.8) : 0;
      const trunk = scene === "logistica" ? since(1, 1.4) : 0, last = scene === "logistica" ? since(2, 1.2) : 0;

      // radios de "un día de camión"
      if (reach > 0) {
        const all = [{ n: "Buenos Aires", lon: BA.lon, lat: BA.lat, pick: false, base: true }, ...CANDIDATES.map((c) => ({ ...c, base: false }))];
        for (const c of all) {
          const [x, y] = P(c.lon, c.lat), r = REACH * U * reach;
          const isPick = c.pick && pick > 0, fade = c.base ? 1 : c.pick ? 1 : 1 - 0.75 * pick;
          const col = c.base ? AMBER : isPick ? GREEN : "#94a3b8";
          g.globalAlpha = fade;
          g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = c.base ? "rgba(245,179,27,0.08)" : isPick ? `rgba(34,197,94,${0.1 + 0.12 * pick})` : "rgba(148,163,184,0.07)"; g.fill();
          g.save(); g.setLineDash(c.base || isPick ? [] : [8 * k, 6 * k]); g.shadowColor = col; g.shadowBlur = isPick ? 18 * k : 0; g.strokeStyle = col; g.lineWidth = (isPick ? 3.2 : 2) * k; g.stroke(); g.restore();
          g.globalAlpha = 1;
        }
      }

      // ── compradores (ciudades)
      for (const c of ARG_CITIES) {
        const [x, y] = P(c.lon, c.lat);
        const base = Math.sqrt(c.pop) / 160 * k + 2.2 * k;
        let r = base, col = "rgba(245,179,27,0.9)";
        if (scene === "solucion") r = base * (0.6 + 0.7 * heat);
        if (scene === "intro") r = base * (1 + 0.12 * Math.sin(t * 2 + c.lon));
        const covered = pick > 0 && (dist(c, CANDIDATES[0]) < REACH || dist(c, BA) < REACH);
        if (covered) col = `rgba(34,197,94,${0.9})`;
        if (scene === "problema" && days > 0) col = dist(c, BA) < REACH ? "rgba(34,197,94,0.95)" : "rgba(239,68,68,0.95)";
        const hal = g.createRadialGradient(x, y, 0, x, y, r * 2.6); hal.addColorStop(0, col.replace(/[\d.]+\)$/, "0.35)")); hal.addColorStop(1, col.replace(/[\d.]+\)$/, "0)"));
        g.fillStyle = hal; g.beginPath(); g.arc(x, y, r * 2.6, 0, Math.PI * 2); g.fill();
        g.fillStyle = col; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
        if (NAMED.has(c.n) && scene !== "intro") {
          g.font = mono(10 * k + 3); g.fillStyle = "rgba(225,232,245,0.75)"; g.textAlign = "left"; g.textBaseline = "middle";
          g.fillText(c.n.toUpperCase(), x + r + 6 * k, y);
        }
      }

      // ── problema: todo sale de un solo depósito
      if (scene === "problema" || scene === "intro" || scene === "logistica") {
        const [bx, by] = P(BA.lon, BA.lat);
        depot(g, bx, by, 13 * k, AMBER);
        if (scene !== "intro") tagPill(g, bx + 70 * k, by + 26 * k, scene === "logistica" ? "CENTRO GRANDE · ESCOBAR" : "ÚNICO DEPÓSITO", mono(10 * k + 3), k, AMBER);
      }
      if (routes > 0) {
        const far = ARG_CITIES.filter((c) => c.pop > 250000 && c.n !== "Buenos Aires" && c.n !== "La Plata");
        far.forEach((c, i) => {
          const [ax, ay] = P(BA.lon, BA.lat), [cx, cy] = P(c.lon, c.lat);
          const mx = (ax + cx) / 2 - (cy - ay) * 0.12, my = (ay + cy) / 2 + (cx - ax) * 0.12;
          g.save(); g.globalAlpha = routes; g.setLineDash([6 * k, 6 * k]); g.strokeStyle = "rgba(245,179,27,0.55)"; g.lineWidth = 1.6 * k;
          g.beginPath(); g.moveTo(ax, ay); g.quadraticCurveTo(mx, my, cx, cy); g.stroke(); g.restore();
          const near = dist(c, BA) < REACH, sp = near ? 0.32 : 0.12, u = ((t * sp + i * 0.17) % 1);
          const qx = (1 - u) * (1 - u) * ax + 2 * (1 - u) * u * mx + u * u * cx, qy = (1 - u) * (1 - u) * ay + 2 * (1 - u) * u * my + u * u * cy;
          g.globalAlpha = routes; g.fillStyle = "#fff"; g.beginPath(); g.arc(qx, qy, 3.4 * k, 0, Math.PI * 2); g.fill(); g.globalAlpha = 1;
        });
        if (days > 0) {
          g.globalAlpha = days;
          const [sx, sy] = P(-65.42, -24.78); badge(g, sx + 150 * k, sy + 70 * k, "SALTA · TARDA DÍAS", RED, sans(13 * k + 5), k, W);
          const [nx, ny] = P(-68.06, -38.95); badge(g, nx - 40 * k, ny + 70 * k, "NEUQUÉN · TARDA DÍAS", RED, sans(13 * k + 5), k, W);
          const [rx, ry] = P(-60.67, -32.95); badge(g, rx + 30 * k, ry, "ROSARIO · LLEGA RÁPIDO", GREEN, sans(13 * k + 5), k, W);
          g.globalAlpha = 1;
        }
      }

      // ── solución: el elegido
      if (pick > 0) {
        const [x, y] = P(CANDIDATES[0].lon, CANDIDATES[0].lat);
        depot(g, x, y, 13 * k * (0.6 + 0.4 * pick), GREEN);
        g.globalAlpha = pick; badge(g, x, y - 10 * k, "ELEGIDO: CÓRDOBA", GREEN, sans(14 * k + 5), k, W); g.globalAlpha = 1;
      } else if (reach > 0) {
        CANDIDATES.forEach((c) => { const [x, y] = P(c.lon, c.lat); g.globalAlpha = reach; depot(g, x, y, 9 * k, "#94a3b8"); g.globalAlpha = 1; });
      }

      // ── logística: centro grande → regionales → repartos
      if (trunk > 0) {
        const [ax, ay] = P(BA.lon, BA.lat);
        HUBS.forEach((h, i) => {
          const [hx, hy] = P(h.lon, h.lat), a = clamp(trunk * 1.6 - i * 0.12);
          g.save(); g.globalAlpha = a; g.shadowColor = AMBER; g.shadowBlur = 12 * k; g.strokeStyle = AMBER; g.lineWidth = 3.4 * k;
          g.beginPath(); g.moveTo(ax, ay); g.lineTo(lerp(ax, hx, a), lerp(ay, hy, a)); g.stroke(); g.restore();
          if (a >= 1) {
            const u = (t * 0.25 + i * 0.2) % 1; g.fillStyle = "#fff"; g.beginPath(); g.arc(lerp(ax, hx, u), lerp(ay, hy, u), 4 * k, 0, Math.PI * 2); g.fill();
            depot(g, hx, hy, 9 * k, AMBER);
          }
          if (last > 0) {
            const near = ARG_CITIES.filter((c) => dist(c, h) < 3.2 && dist(c, h) > 0.05);
            near.forEach((c, j) => {
              const [cx, cy] = P(c.lon, c.lat), b = clamp(last * 1.6 - j * 0.1);
              g.globalAlpha = b; g.strokeStyle = MINT; g.lineWidth = 1.8 * k; g.beginPath(); g.moveTo(hx, hy); g.lineTo(lerp(hx, cx, b), lerp(hy, cy, b)); g.stroke(); g.globalAlpha = 1;
            });
          }
        });
        if (last > 0) { g.globalAlpha = last; const [x, y] = P(-58.99, -27.46); tagPill(g, x + 70 * k, y - 18 * k, "REPARTO DEL DÍA", mono(10 * k + 3), k, MINT); g.globalAlpha = 1; }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [scene]);

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}

function depot(g: CanvasRenderingContext2D, x: number, y: number, r: number, c: string) {
  g.save(); g.shadowColor = c; g.shadowBlur = r * 1.4;
  g.fillStyle = c; g.beginPath(); g.moveTo(x - r, y + r * 0.7); g.lineTo(x - r, y - r * 0.2); g.lineTo(x, y - r); g.lineTo(x + r, y - r * 0.2); g.lineTo(x + r, y + r * 0.7); g.closePath(); g.fill();
  g.restore(); g.fillStyle = "#0e131c"; g.fillRect(x - r * 0.35, y, r * 0.7, r * 0.7);
}

// "Tiempo, no distancia": un depósito con rutas rápidas y caminos lentos. El círculo vs. la forma real de "hasta dónde llego en un día".
function tiempo(g: CanvasRenderingContext2D, W: number, H: number, k: number, s: number, _ts: number, t: number, since: (n: number, d: number) => number, sans: (px: number, w?: number) => string, mono: (px: number) => string) {
  const cx = W / 2, cy = H / 2 + 10 * k, R = Math.min(W, H) * 0.3;
  const ROADS = [0.35, 2.0, 3.5, 5.0];                              // rutas (ángulos)
  // caminos lentos (fondo)
  g.strokeStyle = "rgba(175,190,215,0.18)"; g.lineWidth = 1.5 * k;
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) { g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * R * 2.2, cy + Math.sin(a) * R * 2.2); g.stroke(); }
  // rutas rápidas
  g.save(); g.shadowColor = AMBER; g.shadowBlur = 10 * k; g.strokeStyle = AMBER; g.lineWidth = 4 * k;
  for (const a of ROADS) { g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * R * 2.2, cy + Math.sin(a) * R * 2.2); g.stroke(); }
  g.restore();
  for (const a of ROADS) tagPill(g, cx + Math.cos(a) * R * 1.95, cy + Math.sin(a) * R * 1.95, "RUTA", mono(10 * k + 3), k, AMBER);

  const c1 = since(1, 1.0), c2 = since(2, 1.4);
  const reachAt = (a: number) => { let m = 0; for (const r of ROADS) { const d = Math.atan2(Math.sin(a - r), Math.cos(a - r)); m = Math.max(m, Math.pow(Math.max(0, Math.cos(d)), 14)); } return R * (0.78 + 0.85 * m); };
  if (c1 > 0) {
    g.save(); g.globalAlpha = c1 * (1 - 0.6 * c2); g.setLineDash([10 * k, 8 * k]); g.strokeStyle = "#e2e8f0"; g.lineWidth = 2.4 * k;
    g.beginPath(); g.arc(cx, cy, R * c1, 0, Math.PI * 2); g.stroke(); g.restore();
    g.globalAlpha = c1 * (1 - c2); g.font = sans(16 * k + 6, 800); g.fillStyle = "#e2e8f0"; g.textAlign = "center"; g.fillText("MISMA DISTANCIA", cx, cy - R - 22 * k); g.globalAlpha = 1;
  }
  if (c2 > 0) {
    g.beginPath();
    for (let i = 0; i <= 240; i++) { const a = (i / 240) * Math.PI * 2, r = lerp(R, reachAt(a), c2); const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; i ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.closePath(); g.fillStyle = `rgba(34,197,94,${0.14 * c2})`; g.fill();
    g.save(); g.shadowColor = GREEN; g.shadowBlur = 20 * k; g.strokeStyle = GREEN; g.lineWidth = 3.4 * k; g.stroke(); g.restore();
    g.globalAlpha = c2; badge(g, cx, cy - reachAt(-Math.PI / 2) - 4 * k, "MISMO TIEMPO: 1 DÍA DE CAMIÓN", GREEN, sans(14 * k + 5), k, W); g.globalAlpha = 1;
  }
  // camiones: por la ruta llegan más lejos que por el camino
  if (s >= 1) {
    const u = ((t % 4) / 3.2);
    const k2 = clamp(u);
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
      const r = (s >= 2 ? reachAt(a) : R) * k2, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      g.fillStyle = "#fff"; g.beginPath(); g.arc(x, y, 3.5 * k, 0, Math.PI * 2); g.fill();
    }
    for (const a of ROADS) { const r = (s >= 2 ? reachAt(a) : R) * k2; g.fillStyle = AMBER; g.beginPath(); g.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 5.5 * k, 0, Math.PI * 2); g.fill(); }
  }
  depot(g, cx, cy, 16 * k, AMBER);
}
