import { clamp, ease, lerp, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* Diapositiva 2 (fondo blanco): qué es un GIS en logística, en bucle.
   1 calles · 2 clientes · 3 tránsito · 4 camiones (cada capa flota en su plano, con su nombre)
   5 las capas se juntan en un solo mapa · 6 aparece la mejor ruta: pasa por todos los clientes, esquiva el tránsito, y el camión la recorre */

const G = [-0.75, -0.25, 0.25, 0.75];                       // calles (en u y en v)
const at = ([i, j]: Pt): Pt => [G[i], G[j]];
const CLIENTS: Pt[] = [[0, 1], [2, 0], [3, 2], [1, 3]];
const TRAFFIC: [Pt, Pt][] = [[[1, 1], [3, 1]], [[2, 2], [2, 3]], [[1, 0], [1, 1]]];
const ROUTE: Pt[] = [[0, 3], [0, 1], [0, 0], [2, 0], [3, 0], [3, 2], [3, 3], [0, 3]];
const LAYERS = [
  { name: "Calles", col: "#111111" },
  { name: "Clientes", col: "#2563eb" },
  { name: "Tránsito", col: "#ef4444" },
  { name: "Camiones", col: "#f59e0b" },
];

export function GisLayers({ step = 0 }: { step?: number }) {
  const ref = useNeonCanvas(step, (f) => draw(f));
  return <canvas ref={ref} className="block size-full" />;
}

function draw(f: Frame) {
  const { g, W, H, k, t, s, since, sans } = f;
  // tamaño para que entre todo: 4 planos apilados (alto = 2A + 3 separaciones) y los nombres a la derecha (~190 px)
  const GAP = H * 0.1, LABEL = 200 * k;
  const merge = since(5, 1.2), m = ease(merge), gap = GAP * (1 - m);
  // separadas: entran 4 planos + nombres · juntas: un solo mapa, más grande y centrado
  const A0 = Math.max(40, Math.min((W - LABEL - 40) / 4.1, (H * 0.8 - 3 * GAP) / 2.05));
  const A1 = Math.max(40, Math.min((W - 60) / 4.1, (H * 0.8) / 2.05));
  const A = lerp(A0, A1, m), B = A * 0.5;
  const cx = lerp(Math.min(W / 2, (W - LABEL) / 2 + 10), W / 2, m), cy = lerp(H * 0.955 - A0, H * 0.56, m);
  const P = ([u, v]: Pt, z: number): Pt => [cx + (u - v) * A, cy + (u + v) * B - z];
  const zOf = (li: number) => li * gap;

  const plane = (z: number, alpha: number) => {
    g.save(); g.globalAlpha = alpha;
    g.beginPath(); ([[-1, -1], [1, -1], [1, 1], [-1, 1]] as Pt[]).forEach((p, i) => (i ? g.lineTo(...P(p, z)) : g.moveTo(...P(p, z)))); g.closePath();
    g.fillStyle = "rgba(255,255,255,0.86)"; g.fill(); g.strokeStyle = "#111"; g.lineWidth = 1.6 * k; g.stroke();
    g.restore();
  };
  const seg = (a: Pt, b: Pt, z: number, col: string, w: number, alpha = 1) => {
    g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = w * k; g.lineCap = "round";
    g.beginPath(); g.moveTo(...P(at(a), z)); g.lineTo(...P(at(b), z)); g.stroke(); g.restore();
  };
  const pin = (x: number, y: number, col: string, alpha: number, done = false) => {
    g.save(); g.globalAlpha = alpha;
    g.fillStyle = "rgba(0,0,0,0.12)"; g.beginPath(); g.ellipse(x, y, 9 * k, 4 * k, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = done ? "#16a34a" : col; g.beginPath();
    g.moveTo(x, y); g.bezierCurveTo(x - 14 * k, y - 18 * k, x - 13 * k, y - 34 * k, x, y - 34 * k); g.bezierCurveTo(x + 13 * k, y - 34 * k, x + 14 * k, y - 18 * k, x, y); g.fill();
    g.fillStyle = "#fff"; g.beginPath(); g.arc(x, y - 23 * k, 5 * k, 0, Math.PI * 2); g.fill();
    if (done) { g.strokeStyle = "#16a34a"; g.lineWidth = 2.5 * k; g.beginPath(); g.moveTo(x - 4 * k, y - 23 * k); g.lineTo(x - 1 * k, y - 20 * k); g.lineTo(x + 4.5 * k, y - 26 * k); g.stroke(); }
    g.restore();
  };
  const truck = (x: number, y: number, alpha: number, size = 1) => {
    g.save(); g.globalAlpha = alpha; g.translate(x, y); g.scale(k * size, k * size);
    g.fillStyle = "rgba(0,0,0,0.15)"; g.beginPath(); g.ellipse(0, 4, 20, 6, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#f59e0b"; g.strokeStyle = "#111"; g.lineWidth = 2;
    g.beginPath(); g.roundRect(-18, -22, 24, 18, 3); g.fill(); g.stroke();
    g.fillStyle = "#fff"; g.beginPath(); g.roundRect(6, -16, 12, 12, 3); g.fill(); g.stroke();
    g.fillStyle = "#111"; [-10, 10].forEach((wx) => { g.beginPath(); g.arc(wx, -3, 4, 0, Math.PI * 2); g.fill(); });
    g.restore();
  };

  // capas visibles según el paso (al juntarse, todas en z = 0)
  const show = (li: number) => (s >= li + 1 ? Math.min(1, s > li + 1 ? 1 : since(li + 1, 0.8)) : 0);
  for (let li = 0; li < LAYERS.length; li++) {
    const a = show(li); if (a <= 0) continue;
    const z = zOf(li);
    if (li === 0 || merge < 1) plane(z, a * (li === 0 ? 1 : 1 - ease(merge)));
    if (li === 0) {
      for (let i = 0; i < 4; i++) { g.save(); g.globalAlpha = a; g.strokeStyle = "#111"; g.lineWidth = 3.2 * k; g.lineCap = "round"; g.beginPath(); g.moveTo(...P([G[i], -0.95], z)); g.lineTo(...P([G[i], 0.95], z)); g.stroke(); g.beginPath(); g.moveTo(...P([-0.95, G[i]], z)); g.lineTo(...P([0.95, G[i]], z)); g.stroke(); g.restore(); }
    }
    if (li === 2) TRAFFIC.forEach(([p, q]) => seg(p, q, z, "#ef4444", 7, a * 0.9));
    if (li === 3 && s < 6) {
      [[0.15, 0.75], [0.55, -0.25], [-0.75, 0.4]].forEach(([u0, v0], n) => {
        const u = n === 1 ? lerp(-0.8, 0.8, (t * 0.12) % 1) : u0, v = n === 1 ? v0 : n === 2 ? lerp(0.8, -0.8, (t * 0.1) % 1) : v0;
        const [x, y] = P([n === 2 ? G[0] : u, n === 2 ? v : v0], z); truck(x, y, a, 0.8);
      });
    }
  }
  // clientes arriba de todo (para que se vean sobre el tránsito)
  if (show(1) > 0 && s < 6) {
    CLIENTS.forEach((c) => { const [x, y] = P(at(c), zOf(1)); pin(x, y, "#2563eb", show(1)); });
  }

  // 6 · la mejor ruta y el camión
  if (s >= 6) {
    const u = since(6, 2.6), pts = ROUTE.map((p) => P(at(p), 0));
    const L = pts.slice(1).reduce((acc, p, i) => acc + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);
    let d = L * u; g.save(); g.strokeStyle = "#16a34a"; g.lineWidth = 8 * k; g.lineCap = "round"; g.lineJoin = "round"; g.globalAlpha = 0.9;
    g.beginPath(); g.moveTo(...pts[0]); let tx = pts[0][0], ty = pts[0][1];
    for (let i = 1; i < pts.length && d > 0; i++) {
      const sl = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]), fr = clamp(d / sl);
      tx = lerp(pts[i - 1][0], pts[i][0], fr); ty = lerp(pts[i - 1][1], pts[i][1], fr); g.lineTo(tx, ty); d -= sl;
    }
    g.stroke(); g.restore();
    CLIENTS.forEach((c, n) => { const [x, y] = P(at(c), 0); pin(x, y, "#2563eb", 1, routeProgress(u) > n); });
    truck(tx, ty, 1, 1.1);
  }

  // nombres de las capas a la derecha (mientras están separadas)
  LAYERS.forEach((L, li) => {
    const a = show(li) * (1 - ease(merge)); if (a <= 0) return;
    const [x, y] = P([1, -1], zOf(li));
    g.save(); g.globalAlpha = a; g.strokeStyle = "#111"; g.lineWidth = 1.5 * k; g.beginPath(); g.moveTo(x + 6 * k, y); g.lineTo(x + 26 * k, y); g.stroke();
    g.fillStyle = L.col; g.beginPath(); g.arc(x + 38 * k, y, 7 * k, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#111"; g.font = sans(22 * k + 6, 800); g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(L.name, x + 52 * k, y + 1);
    g.restore();
  });

  // título de lo que pasa
  const msg = s >= 6 ? "LA MEJOR RUTA: PASA POR TODOS Y ESQUIVA EL TRÁNSITO" : s === 5 ? "LAS CAPAS SE JUNTAN EN UN SOLO MAPA" : s >= 1 ? "CADA DATO ES UNA CAPA" : "";
  if (msg) {
    g.save(); g.font = sans(13 * k + 5, 800); const w = g.measureText(msg).width + 32 * k;
    const col = s >= 6 ? "#16a34a" : "#111";
    const my = Math.max(20 * k, H * 0.045);
    g.fillStyle = col; g.beginPath(); g.roundRect(cx - w / 2, my - 16 * k, w, 32 * k, 999); g.fill();
    g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(msg, cx, my + 1); g.restore();
  }
}

/** Cuántos clientes ya visitó el camión, según cuánto de la ruta recorrió (ruta de 12 cuadras: los clientes quedan en la 2, 5, 8 y 11). */
function routeProgress(u: number) {
  const stops = [2 / 12, 5 / 12, 8 / 12, 11 / 12];
  return stops.filter((x) => u >= x).length;
}
