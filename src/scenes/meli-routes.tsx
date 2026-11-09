import { C, along, clamp, dot, label, lerp, path, ring, streets, truck, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* Mercado Libre · las rutas del día en un centro de última milla. Todo pasa solo, en bucle.
   1 cada pedido del día aparece en el mapa
   2 se agrupan por zona (una zona = una camioneta)
   3 se ordenan las paradas: una ruta por camioneta
   4 una calle cortada: la ruta se recalcula */

const NX = 8, NY = 5;
const DEPOT: Pt = [4, 3];
const MELI = "#ffe600";
const ZONE = [C.blue, C.green, C.violet, "#fb923c"];

// Pedidos del día en las esquinas (fijos, para que la animación sea siempre igual).
const STOPS: Pt[] = (() => {
  const out: Pt[] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  while (out.length < 26) {
    const p: Pt = [Math.floor(rnd() * (NX + 1)), Math.floor(rnd() * (NY + 1))];
    if ((p[0] === DEPOT[0] && p[1] === DEPOT[1]) || out.some((q) => q[0] === p[0] && q[1] === p[1])) continue;
    out.push(p);
  }
  return out;
})();

const zoneOf = ([x, y]: Pt) => (x < DEPOT[0] ? 0 : 1) + (y < DEPOT[1] ? 0 : 2);
const man = (a: Pt, b: Pt) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

/** Orden de paradas de cada zona: siempre la más cercana primero, saliendo del centro. */
const ORDERS: Pt[][] = [0, 1, 2, 3].map((z) => {
  const left = STOPS.filter((p) => zoneOf(p) === z), seq: Pt[] = [];
  let cur = DEPOT;
  while (left.length) {
    left.sort((a, b) => man(cur, a) - man(cur, b));
    cur = left.shift()!; seq.push(cur);
  }
  return seq;
});

/** Recorrido por las calles: de una parada a la otra, primero en x y después en y (o al revés). */
function route(seq: Pt[], flip = -1): Pt[] {
  const out: Pt[] = [DEPOT];
  let a = DEPOT;
  seq.forEach((b, i) => {
    out.push(i === flip ? [a[0], b[1]] : [b[0], a[1]], b);
    a = b;
  });
  return out;
}

// La calle cortada: la mitad de una cuadra de la zona 0 por la que la ruta nueva (doblando al revés) ya no pasa.
const onSeg = (m: Pt, p: Pt, q: Pt) =>
  (p[0] === q[0] && m[0] === p[0] && m[1] >= Math.min(p[1], q[1]) && m[1] <= Math.max(p[1], q[1])) ||
  (p[1] === q[1] && m[1] === p[1] && m[0] >= Math.min(p[0], q[0]) && m[0] <= Math.max(p[0], q[0]));
const CUT = (() => {
  const seq = ORDERS[0];
  for (let i = 1; i < seq.length; i++) {
    const a = seq[i - 1], b = seq[i];
    if (a[0] === b[0] || a[1] === b[1]) continue;
    const m: Pt = [(a[0] + b[0]) / 2, a[1]];                 // en la primera calle del recorrido viejo
    const alt = route(seq, i);
    if (alt.some((p, j) => j > 0 && onSeg(m, alt[j - 1], p))) continue;
    return { i, at: m };
  }
  return { i: -1, at: DEPOT };
})();

export function MeliRoutes({ step = 0 }: { step?: number }) {
  const ref = useNeonCanvas(step, (f) => draw(f));
  return <canvas ref={ref} className="block size-full" />;
}

function draw(f: Frame) {
  const { g, W, H, k, t, s, since, sans, mono } = f;
  const x0 = W * 0.08, x1 = W * 0.92, y0 = H * 0.18, y1 = H * 0.9;
  const P = ([i, j]: Pt): Pt => [lerp(x0, x1, i / NX), lerp(y0, y1, j / NY)];
  const px = (r: Pt[]) => r.map(P);
  streets(g, x0, y0, x1, y1, NX, NY, k);

  const a1 = since(1, 2.4), a2 = since(2, 1.2), a3 = since(3, 3), a4 = since(4, 1);

  // 3 · una ruta por camioneta (en el paso 4, solo se mira la zona 0)
  if (s >= 3) {
    ORDERS.forEach((seq, z) => {
      const focus = s < 4 || z === 0;
      const r = px(s >= 4 && z === 0 ? route(seq, CUT.i) : route(seq));
      path(g, r, s === 3 ? a3 : 1, ZONE[z], 5 * k, { glow: 12 * k, alpha: focus ? 0.95 : 0.15 });
      if (s === 3 || (s >= 4 && z === 0)) {
        const u = s === 3 ? (a3 < 1 ? a3 : (t * 0.06 + z * 0.25) % 1) : (t * 0.07) % 1;
        const [[tx, ty], an] = along(r, u);
        truck(g, tx, ty, an, k, MELI, 1.05);
      }
    });
    if (s >= 4) {
      // la ruta vieja (cortada) en rojo, punteada
      const old = px(route(ORDERS[0])).slice(CUT.i * 2, CUT.i * 2 + 3);
      const neu = px(route(ORDERS[0], CUT.i)).slice(CUT.i * 2, CUT.i * 2 + 3);
      path(g, old, 1, C.red, 6 * k, { dash: [10 * k, 8 * k], alpha: 0.85 * a4 });
      path(g, neu, a4, C.mint, 8 * k, { glow: 20 * k });
      label(g, neu[1][0], neu[1][1] + (neu[1][1] < H * 0.3 ? 40 : -40) * k, "NUEVA RUTA", C.mint, mono(12 * k + 3), k, { alpha: a4, W });
      const [cx, cy] = P(CUT.at);
      g.save(); g.globalAlpha = a4;
      dot(g, cx, cy, 24 * k, "rgba(239,68,68,0.3)");
      g.strokeStyle = C.red; g.lineWidth = 5 * k; g.lineCap = "round";
      g.beginPath(); g.moveTo(cx - 11 * k, cy - 11 * k); g.lineTo(cx + 11 * k, cy + 11 * k); g.moveTo(cx + 11 * k, cy - 11 * k); g.lineTo(cx - 11 * k, cy + 11 * k); g.stroke();
      g.restore();
      label(g, cx, cy + (cy < H * 0.3 ? 42 : -42) * k, "CALLE CORTADA", C.red, mono(12 * k + 3), k, { outline: true, alpha: a4, W });
    }
  }

  // 1 y 2 · los pedidos: primero amarillos, después del color de su zona
  STOPS.forEach((p, i) => {
    const appear = s >= 2 ? 1 : clamp(a1 * STOPS.length - i);
    if (appear <= 0) return;
    const [x, y] = P(p), z = zoneOf(p);
    const col = s >= 2 ? ZONE[z] : MELI;
    const dim = s >= 4 && z !== 0 ? 0.25 : 1;
    g.save(); g.globalAlpha = appear * dim;
    if (s === 2) ring(g, x, y, (16 + 4 * Math.sin(t * 3 + i)) * k, col, 2 * k, 0.5 * a2);
    dot(g, x, y, 9 * k, col, 12 * k);
    g.restore();
  });

  // zonas (paso 2): un halo grande por zona
  if (s === 2) {
    [0, 1, 2, 3].forEach((z) => {
      const pts = STOPS.filter((p) => zoneOf(p) === z).map(P);
      const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length, cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
      g.save(); g.globalAlpha = 0.6 * a2;
      g.fillStyle = ZONE[z] + "1f"; g.beginPath(); g.ellipse(cx, cy, W * 0.2, H * 0.2, 0, 0, Math.PI * 2); g.fill();
      g.restore();
      label(g, cx, cy, `ZONA ${z + 1} · CAMIONETA ${z + 1}`, ZONE[z], mono(11 * k + 3), k, { outline: true, alpha: a2, W });
    });
  }

  // el centro de última milla
  const [dx, dy] = P(DEPOT);
  g.save(); g.shadowColor = MELI; g.shadowBlur = 22 * k; g.fillStyle = MELI;
  g.beginPath(); g.roundRect(dx - 22 * k, dy - 18 * k, 44 * k, 36 * k, 7 * k); g.fill(); g.restore();
  g.fillStyle = C.ink; g.font = mono(11 * k + 3); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("CENTRO", dx, dy + 1);

  const title = s <= 1 ? "LOS PEDIDOS DEL DÍA, CADA UNO EN EL MAPA" : s === 2 ? "SE AGRUPAN POR ZONA" : s === 3 ? "UNA RUTA POR CAMIONETA" : "CALLE CORTADA: LA RUTA SE RECALCULA";
  const col = s <= 1 ? MELI : s === 2 ? C.blue : s === 3 ? C.green : C.red;
  label(g, W / 2, H * 0.08, title, col, sans(15 * k + 4), k, { W });
}
