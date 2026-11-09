import { C, clamp, dot, ease, hex, label, lerp, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* "¿Para qué usa el GIS?": las capas que cruza cada empresa, apiladas como en el video de la diapositiva 2.
   Pasos (solos, en bucle): 1..n aparece cada capa · n+1 las capas se juntan y aparece la decisión. */

export type LayerKind = "calles" | "puntos" | "rutas" | "hex" | "zonas" | "riesgo" | "camiones" | "tiempo" | "depositos" | "barcos";
export type Layer = { name: string; kind: LayerKind; color: string };
export type Decision = { text: string; at: Pt; color?: string };

const rnd = (i: number) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

function iso(f: Frame, z: number) {
  const A = Math.min(f.W * 0.23, f.H * 0.44), B = A * 0.42, cx = f.W * 0.47, cy = f.H * 0.57;
  return ([u, v]: Pt): Pt => [cx + (u - v) * A, cy + (u + v) * B - z];
}

function plane(f: Frame, P: (p: Pt) => Pt, col: string, alpha: number) {
  const { g, k } = f;
  g.save(); g.globalAlpha = alpha;
  g.beginPath(); [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach((p, i) => (i ? g.lineTo(...P(p as Pt)) : g.moveTo(...P(p as Pt)))); g.closePath();
  g.fillStyle = "rgba(14,19,28,0.82)"; g.fill();
  g.shadowColor = col; g.shadowBlur = 14 * k; g.strokeStyle = col; g.lineWidth = 2.2 * k; g.stroke();
  g.restore();
}

function content(f: Frame, P: (p: Pt) => Pt, L: Layer, li: number, alpha: number) {
  const { g, k, t } = f;
  g.save(); g.globalAlpha = alpha;
  const c = L.color;
  if (L.kind === "calles") {
    g.strokeStyle = "rgba(203,213,225,0.55)"; g.lineWidth = 2.4 * k;
    for (let i = -0.75; i <= 0.76; i += 0.25) { g.beginPath(); g.moveTo(...P([i, -0.92])); g.lineTo(...P([i, 0.92])); g.stroke(); g.beginPath(); g.moveTo(...P([-0.92, i])); g.lineTo(...P([0.92, i])); g.stroke(); }
  } else if (L.kind === "puntos" || L.kind === "depositos") {
    const n = L.kind === "puntos" ? 26 : 5;
    for (let i = 0; i < n; i++) { const [x, y] = P([rnd(i + li * 50) * 1.7 - 0.85, rnd(i + 7 + li * 50) * 1.7 - 0.85]); dot(g, x, y, (L.kind === "puntos" ? 4.5 : 9) * k, c, 8 * k); }
  } else if (L.kind === "rutas") {
    g.strokeStyle = c; g.lineWidth = 3.5 * k; g.shadowColor = c; g.shadowBlur = 8 * k; g.lineJoin = "round";
    for (let r = 0; r < 4; r++) { g.beginPath(); let u = -0.9, v = rnd(r + li) * 1.6 - 0.8; g.moveTo(...P([u, v])); for (let s = 0; s < 6; s++) { u += 0.3; v = clamp(v + (rnd(r * 9 + s) - 0.5) * 0.5, -0.9, 0.9); g.lineTo(...P([u, v])); } g.stroke(); }
  } else if (L.kind === "hex") {
    const r = 0.13;
    for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) {
      const u = i * r * 1.75 + (j % 2 ? r * 0.87 : 0), v = j * r * 1.5; if (Math.abs(u) > 0.88 || Math.abs(v) > 0.88) continue;
      const h = rnd(i * 13 + j * 7 + li), [x, y] = P([u, v]);
      g.fillStyle = h > 0.75 ? "rgba(239,68,68,0.55)" : h > 0.45 ? "rgba(245,179,27,0.45)" : "rgba(34,197,94,0.3)";
      hex(g, x, y, r * 0.52 * Math.min(f.W * 0.23, f.H * 0.44) * 0.95); g.fill();
    }
  } else if (L.kind === "zonas") {
    const zs: Pt[][] = [[[-0.9, -0.9], [0.1, -0.9], [-0.1, 0.1], [-0.9, 0]], [[0.1, -0.9], [0.9, -0.9], [0.9, 0.2], [-0.1, 0.1]], [[-0.9, 0], [-0.1, 0.1], [0.9, 0.2], [0.9, 0.9], [-0.9, 0.9]]];
    const cols = ["rgba(59,130,246,0.32)", "rgba(34,197,94,0.32)", "rgba(245,179,27,0.32)"];
    zs.forEach((z, i) => { g.beginPath(); z.forEach((p, q) => (q ? g.lineTo(...P(p)) : g.moveTo(...P(p)))); g.closePath(); g.fillStyle = cols[i]; g.fill(); g.strokeStyle = c; g.lineWidth = 1.5 * k; g.stroke(); });
  } else if (L.kind === "riesgo") {
    [[-0.5, -0.4], [0.45, 0.1], [-0.1, 0.6]].forEach(([u, v], i) => { const [x, y] = P([u, v]), ph = (t * 0.6 + i * 0.3) % 1; g.strokeStyle = c; g.lineWidth = 2.5 * k; g.beginPath(); g.ellipse(x, y, (18 + 28 * ph) * k, (8 + 12 * ph) * k, 0, 0, Math.PI * 2); g.stroke(); dot(g, x, y, 6 * k, c, 10 * k); });
  } else if (L.kind === "camiones" || L.kind === "barcos") {
    for (let i = 0; i < 6; i++) { const u = ((t * 0.08 + rnd(i + 3)) % 1) * 1.8 - 0.9, v = rnd(i + 20) * 1.6 - 0.8, [x, y] = P([u, v]); g.fillStyle = c; g.shadowColor = c; g.shadowBlur = 10 * k; g.beginPath(); g.roundRect(x - 8 * k, y - 5 * k, 16 * k, 10 * k, 3 * k); g.fill(); }
  } else if (L.kind === "tiempo") {
    g.beginPath();
    for (let i = 0; i <= 40; i++) { const a = (i / 40) * Math.PI * 2, rr = 0.42 + 0.3 * Math.pow(Math.abs(Math.cos(a * 2)), 3); i ? g.lineTo(...P([Math.cos(a) * rr, Math.sin(a) * rr])) : g.moveTo(...P([Math.cos(a) * rr, Math.sin(a) * rr])); }
    g.closePath(); g.fillStyle = "rgba(34,197,94,0.22)"; g.fill(); g.strokeStyle = c; g.lineWidth = 3 * k; g.stroke();
  }
  g.restore();
}

export function LayerStack({ layers, decision, step = 0 }: { layers: Layer[]; decision: Decision; step?: number }) {
  const ref = useNeonCanvas(step, (f) => {
    const { g, k, s, since, sans, W } = f;
    const n = layers.length, merge = since(n + 1, 1.4);
    const gap = Math.min(f.H * 0.17, 120 * k);
    // de abajo hacia arriba: la primera capa queda abajo
    layers.forEach((L, i) => {
      const shown = since(i + 1, 0.9);
      const zStack = (i - (n - 1) / 2) * gap, z = lerp(zStack + (1 - shown) * 60 * k, 0, ease(merge));
      const P = iso(f, z);
      plane(f, P, L.color, merge > 0 ? (i === 0 ? 1 : 1 - merge) : Math.max(0.22, shown));
      content(f, P, L, i, Math.max(shown, merge > 0 ? 1 : 0));
      if (merge < 0.5) {
        const [lx, ly] = P([1, -1]);
        label(f.g, lx + 16 * k, ly, L.name.toUpperCase(), L.color, sans(13 * k + 4), k, { align: "left", alpha: Math.max(0.3, shown) * (1 - merge * 2), W });
      }
    });
    if (merge > 0) {
      const P = iso(f, 0), [x, y] = P(decision.at), col = decision.color ?? C.mint;
      const pulse = 1 + 0.12 * Math.sin(f.t * 5);
      g.save(); g.globalAlpha = merge; dot(g, x, y, 22 * k * pulse, col, 30 * k); g.restore();
      g.fillStyle = C.ink; g.font = sans(18 * k + 4); g.textAlign = "center"; g.fillText("★", x, y + 1);
      label(g, x, y - 52 * k, decision.text.toUpperCase(), col, sans(15 * k + 4), k, { alpha: merge, W });
    }
    if (s === 0) label(g, W / 2, f.H * 0.08, "LAS CAPAS QUE CRUZA", C.white, sans(15 * k + 4), k, { outline: true, W });
  });
  return <canvas ref={ref} className="block size-full" />;
}
