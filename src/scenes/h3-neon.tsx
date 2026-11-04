import { useEffect, useRef } from "react";
import { RIVER, ROADS, badge, pin, tagPill, type Pt } from "@/scenes/neon-map";

/* Caso Uber · H3, en el estilo oscuro de neón. Ciudad ilustrativa (la misma base que el caso Tesla).
   (La grilla de hexágonos con pedidos, autos y precio dinámico es la animación 3D de scenes/h3.tsx.)
   problema  · 1 barrios de formas y tamaños distintos con sus pedidos · 2 "¿dónde hay más demanda por cuadra?"
   hexagonos · 1 hexágono: 6 vecinos a la misma distancia · 2 cuadrado: 8 vecinos a dos distancias
   logistica · 1 tiempo de entrega por hexágono · 2 la zona de entrega de un local */

export type H3Scene = "problema" | "hexagonos" | "logistica";

const BLUE = "#3b82f6", RED = "#ef4444", GREEN = "#22c55e", AMBER = "#f5b31b", MINT = "#3cf2b5";
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ease = (u: number) => 1 - Math.pow(1 - clamp(u), 3);

// grilla de hexágonos (punta arriba)
const HR = 0.072, SQ3 = Math.sqrt(3);
type Hex = { c: Pt; q: number; r: number; d: number; s: number; ring: number };
const demand = (x: number, y: number) => 100 * Math.exp(-((x + 0.02) ** 2 + (y - 0.04) ** 2) / 0.05) + 70 * Math.exp(-((x - 0.42) ** 2 + (y + 0.24) ** 2) / 0.025) + 8;
const supply = (x: number, y: number) => 85 * Math.exp(-((x + 0.3) ** 2 + (y - 0.12) ** 2) / 0.07) + 30 * Math.exp(-((x + 0.02) ** 2 + (y - 0.04) ** 2) / 0.05) + 10;
const HEXES: Hex[] = (() => {
  const out: Hex[] = [];
  for (let r = -6; r <= 6; r++) for (let q = -10; q <= 10; q++) {
    const x = HR * SQ3 * (q + r / 2), y = HR * 1.5 * r;
    if (Math.abs(x) > 0.82 || Math.abs(y) > 0.52) continue;
    // distancia en anillos al hexágono del local (q = 0, r = 0)
    const ring = (Math.abs(q) + Math.abs(r) + Math.abs(-q - r)) / 2;
    out.push({ c: [x, y], q, r, d: demand(x, y), s: supply(x, y), ring });
  }
  return out;
})();
// barrios del paso "problema": formas y tamaños distintos
const BARRIOS: { pts: Pt[]; n: number; label: Pt }[] = [
  { pts: [[-0.7, -0.45], [-0.15, -0.5], [-0.1, -0.05], [-0.45, 0.05], [-0.72, -0.1]], n: 120, label: [-0.42, -0.24] },
  { pts: [[-0.1, -0.05], [0.08, -0.08], [0.1, 0.12], [-0.08, 0.14]], n: 95, label: [0.0, 0.03] },
  { pts: [[0.12, -0.45], [0.6, -0.42], [0.66, 0.0], [0.14, -0.1]], n: 60, label: [0.4, -0.25] },
  { pts: [[-0.6, 0.1], [-0.12, 0.18], [-0.1, 0.48], [-0.65, 0.45]], n: 40, label: [-0.38, 0.32] },
  { pts: [[0.12, 0.12], [0.7, 0.05], [0.72, 0.46], [0.1, 0.48]], n: 75, label: [0.42, 0.3] },
];

export function H3Map({ scene, step }: { scene: H3Scene; step: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef({ step, at: performance.now() });
  if (st.current.step !== step) st.current = { step, at: performance.now() };

  useEffect(() => {
    const cv = ref.current!, g = cv.getContext("2d")!;
    let raf = 0, W = 0, H = 0, DPR = 1;
    const fit = () => { DPR = window.devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * DPR; cv.height = H * DPR; };
    const ro = new ResizeObserver(fit); ro.observe(cv); fit();
    const mono = (px: number) => `600 ${px}px "Geist Mono", ui-monospace, monospace`;
    const sans = (px: number, w = 700) => `${w} ${px}px Geist, ui-sans-serif, sans-serif`;

    const frame = (now: number) => {
      const s = st.current.step, ts = (now - st.current.at) / 1000;
      const U = Math.min(W / 1.9, H / 1.25), CX = W / 2, CY = H / 2;
      const P = ([x, y]: Pt): Pt => [CX + x * U, CY + y * U];
      const k = U / 420;
      const since = (n: number, dur: number) => (s > n ? 1 : s === n ? ease(ts / dur) : 0);   // progreso del paso n
      g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, W, H);

      // ── base: río y rutas
      g.lineCap = "round"; g.lineJoin = "round";
      g.strokeStyle = "rgba(70,120,190,0.25)"; g.lineWidth = 9 * k; g.beginPath(); RIVER.forEach((p, i) => (i ? g.lineTo(...P(p)) : g.moveTo(...P(p)))); g.stroke();
      g.strokeStyle = "rgba(175,190,215,0.28)"; g.lineWidth = 2 * k;
      for (const r of ROADS) { g.beginPath(); r.pts.forEach((p, i) => (i ? g.lineTo(...P(p)) : g.moveTo(...P(p)))); g.stroke(); }

      // ── problema: barrios irregulares
      if (scene === "problema") {
        const a = since(1, 1.0), q = since(2, 0.8);
        BARRIOS.forEach((b, i) => {
          const ai = clamp(a * 1.8 - i * 0.18); if (ai <= 0) return;
          const hl = q > 0 && (b.n === 120 || b.n === 40);
          g.beginPath(); b.pts.forEach((p, j) => (j ? g.lineTo(...P(p)) : g.moveTo(...P(p)))); g.closePath();
          g.fillStyle = `rgba(59,130,246,${(hl ? 0.28 : 0.14) * ai})`; g.fill();
          g.save(); g.shadowColor = hl ? AMBER : BLUE; g.shadowBlur = 20 * k; g.strokeStyle = hl ? AMBER : BLUE; g.globalAlpha = ai * (q > 0 && !hl ? 0.45 : 1); g.lineWidth = 4 * k; g.stroke(); g.restore();
          const [x, y] = P(b.label); g.globalAlpha = ai;
          g.font = sans(30 * k + 6, 800); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(String(b.n), x, y - 8 * k);
          g.font = mono(11 * k + 3); g.fillStyle = "rgba(220,228,240,0.75)"; g.fillText("PEDIDOS", x, y + 18 * k);
          g.globalAlpha = 1;
        });
        if (q > 0) { g.globalAlpha = q; badge(g, ...P([0.0, 0.66]), "¿DÓNDE HAY MÁS DEMANDA POR CUADRA?", AMBER, sans(16 * k + 5), k, W); g.globalAlpha = 1; }
      }

      // ── hexágonos
      const hexPath = (c: Pt, scale = 1) => {
        g.beginPath();
        for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + (i * Math.PI) / 3; const p = P([c[0] + HR * scale * Math.cos(a), c[1] + HR * scale * Math.sin(a)]); i ? g.lineTo(...p) : g.moveTo(...p); }
        g.closePath();
      };
      const showGrid = scene === "logistica" ? 1 : 0;
      if (showGrid > 0) {
        const heat = 0;
        const cmp = 0;
        const eta = scene === "logistica" ? since(1, 1.0) : 0, zone = scene === "logistica" ? since(2, 1.0) : 0;
        const dmax = Math.max(...HEXES.map((h) => h.ring));
        for (const h of HEXES) {
          const dist = Math.hypot(h.c[0], h.c[1]);
          const a = clamp(showGrid * 2.2 - dist * 1.6); if (a <= 0) continue;
          const pulse = 1;
          hexPath(h.c, 0.96);
          // relleno
          let fill = `rgba(59,130,246,${0.06 * a})`;
          if (heat > 0) { const v = clamp(h.d / 105); fill = `rgba(245,179,27,${(0.05 + 0.55 * v * pulse) * heat * a})`; }
          if (cmp > 0) {
            const gap = h.d - h.s;
            if (gap > 22) fill = `rgba(239,68,68,${(0.25 + 0.4 * clamp(gap / 70)) * a})`;
            else if (gap < -18) fill = `rgba(59,130,246,${(0.2 + 0.3 * clamp(-gap / 60)) * a})`;
            else fill = `rgba(120,130,150,${0.12 * a})`;
          }
          if (eta > 0) { const v = h.ring / dmax; fill = `rgba(${Math.round(lerp(60, 239, v))},${Math.round(lerp(242, 68, v))},${Math.round(lerp(181, 68, v))},${(0.12 + 0.3 * (1 - v)) * eta * a})`; }
          g.fillStyle = fill; g.fill();
          g.strokeStyle = `rgba(147,197,253,${0.35 * a})`; g.lineWidth = 1.2 * k; g.stroke();
          // minutos por hexágono (logística)
          if (eta > 0 && h.r % 2 === 0 && h.q % 2 === 0 && h.ring <= 8) {
            const [x, y] = P(h.c); g.globalAlpha = eta * a; g.font = mono(10 * k + 3); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle";
            g.fillText(`${8 + h.ring * 4}'`, x, y + 1); g.globalAlpha = 1;
          }
          // zona de entrega: hasta 4 anillos (≈ 25 min)
          if (zone > 0 && h.ring <= 4) { hexPath(h.c, 0.96); g.save(); g.shadowColor = MINT; g.shadowBlur = 14 * k; g.strokeStyle = `rgba(60,242,181,${0.9 * zone})`; g.lineWidth = 2.2 * k; g.stroke(); g.restore(); }
        }
        if (scene === "logistica") {
          const [x, y] = P([0, 0]); pin(g, x, y + 6 * k, 1.35 * k, AMBER, 1);
          g.font = mono(11 * k + 3); tagPill(g, x, y - 52 * k, "LOCAL", mono(11 * k + 3), k, AMBER);
          if (zone > 0) { g.globalAlpha = zone; badge(g, ...P([0.0, -0.33]), "ZONA DE ENTREGA · HASTA 25 MIN", GREEN, sans(15 * k + 5), k, W); g.globalAlpha = 1; }
        }
      }
      if (scene === "hexagonos") {
        // carrera: un camión sale del centro hacia cada casilla de al lado. ¿A cuáles llega al mismo tiempo?
        g.clearRect(0, 0, W, H);
        const r = Math.min(W / 16, H / 8.4), tt = (now - st.current.at) / 1000;
        const a1 = since(1, 0.6), a2 = since(2, 0.6);
        if (a1 > 0) { g.globalAlpha = a1; race(g, W * 0.3, H * 0.52, r, "square", tt, sans); }
        if (a2 > 0) { g.globalAlpha = a2; race(g, W * 0.7, H * 0.52, r, "hex", tt, sans); }
        g.globalAlpha = 1;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [scene]);

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}

// Carrera desde el centro: con cuadrados el camión llega a 4 vecinos y tarde a las 4 esquinas; con hexágonos llega a los 6 a la vez.
function race(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, kind: "hex" | "square", tt: number, sans: (px: number, w?: number) => string) {
  const cells: { x: number; y: number; far: boolean }[] = [];
  const step = kind === "hex" ? r * SQ3 : r * 1.75;
  if (kind === "hex") for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3; cells.push({ x: Math.cos(a) * step, y: Math.sin(a) * step, far: false }); }
  else for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) if (i || j) cells.push({ x: i * step, y: j * step, far: i !== 0 && j !== 0 });
  const shape = (x: number, y: number) => {
    g.beginPath();
    if (kind === "hex") for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + (i * Math.PI) / 3; const px = x + r * Math.cos(a), py = y + r * Math.sin(a); i ? g.lineTo(px, py) : g.moveTo(px, py); }
    else g.rect(x - step / 2, y - step / 2, step, step);
    g.closePath();
  };
  const CYC = 3.8, u = tt % CYC, T1 = 1.1;                         // T1: lo que tarda en llegar a un vecino "de al lado"
  const reset = 1 - clamp((u - 3.4) / 0.4);
  // casilla del centro
  shape(cx, cy); g.fillStyle = "rgba(245,179,27,0.35)"; g.fill(); g.strokeStyle = "rgba(147,197,253,0.8)"; g.lineWidth = 2; g.stroke();
  for (const c of cells) {
    const dist = Math.hypot(c.x, c.y), arrive = (T1 * dist) / step, got = u >= arrive;
    shape(cx + c.x, cy + c.y);
    g.fillStyle = got ? (c.far ? `rgba(239,68,68,${0.55 * reset})` : `rgba(34,197,94,${0.55 * reset})`) : "rgba(59,130,246,0.12)";
    g.fill(); g.strokeStyle = "rgba(147,197,253,0.8)"; g.lineWidth = 2; g.stroke();
    // camioncito que viaja
    const k = clamp(u / arrive), px = cx + c.x * k, py = cy + c.y * k;
    if (!got && reset > 0.5 && u > 0.05) van(g, px, py, Math.atan2(c.y, c.x), r * 0.62);
    if (got && reset > 0.5) {
      g.fillStyle = "#fff"; g.font = sans(r * 0.42 + 4, 800); g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText(c.far ? "tarde" : "✓", cx + c.x, cy + c.y + 1);
    }
  }
  // el depósito en el centro: de acá salen las camionetas
  g.fillStyle = "#f5b31b"; g.beginPath(); g.arc(cx, cy, r * 0.22, 0, 7); g.fill();
  g.strokeStyle = "rgba(245,179,27,0.45)"; g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, r * 0.36 + (u % 1) * r * 0.2, 0, 7); g.stroke();
  g.textAlign = "center"; g.textBaseline = "middle";
  g.font = sans(r * 0.52 + 10, 800); g.fillStyle = "#fff"; g.fillText(kind === "hex" ? "Hexágonos" : "Cuadrados", cx, cy - step * 1.75 - r * 0.2);
  g.font = sans(r * 0.3 + 8, 700); g.fillStyle = kind === "hex" ? GREEN : RED;
  g.fillText(kind === "hex" ? "Llega a todos al mismo tiempo" : "A las esquinas llega tarde", cx, cy + step * 1.75 + r * 0.35);
}

// camioneta de reparto vista desde arriba (mira hacia `ang`)
function van(g: CanvasRenderingContext2D, x: number, y: number, ang: number, L: number) {
  const W = L * 0.5;
  g.save(); g.translate(x, y); g.rotate(ang);
  g.fillStyle = "rgba(0,0,0,0.45)"; g.beginPath(); g.roundRect(-L / 2 + 2, -W / 2 + 3, L, W, W * 0.28); g.fill();          // sombra
  g.fillStyle = "#111"; for (const [wx, wy] of [[L * 0.28, -W / 2], [L * 0.28, W / 2], [-L * 0.3, -W / 2], [-L * 0.3, W / 2]]) { g.beginPath(); g.roundRect(wx - L * 0.09, wy - W * 0.1, L * 0.18, W * 0.2, 2); g.fill(); }
  g.fillStyle = "#f2f4f7"; g.beginPath(); g.roundRect(-L / 2, -W / 2, L, W, W * 0.28); g.fill();                         // carrocería
  g.fillStyle = "#f5b31b"; g.fillRect(-L / 2 + L * 0.06, -W * 0.08, L * 0.55, W * 0.16);                                // franja
  g.fillStyle = "#1e293b"; g.beginPath(); g.roundRect(L * 0.16, -W * 0.38, L * 0.16, W * 0.76, 3); g.fill();          // parabrisas
  g.fillStyle = "#fff8d6"; for (const fy of [-W * 0.32, W * 0.32]) { g.beginPath(); g.arc(L / 2 - 1, fy, W * 0.09, 0, 7); g.fill(); }
  const beam = g.createRadialGradient(L / 2, 0, 0, L / 2, 0, L * 0.7);                                                   // un poco de luz adelante
  beam.addColorStop(0, "rgba(255,248,214,0.35)"); beam.addColorStop(1, "rgba(255,248,214,0)");
  g.fillStyle = beam; g.beginPath(); g.moveTo(L / 2, 0); g.arc(L / 2, 0, L * 0.7, -0.45, 0.45); g.closePath(); g.fill();
  g.restore();
}
