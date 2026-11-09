import { C, along, card, dot, hex, label, lerp, path, ring, truck, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* Uber · quién lleva el pedido. Todo pasa solo, en bucle.
   1 llega un pedido
   2 busca autos libres en los hexágonos de alrededor
   3 compara por las calles: el más cercano en línea recta (A) tiene un río en el medio; B llega antes
   4 va B, con su tiempo estimado de llegada */

const NX = 8, NY = 5;
const PED: Pt = [6, 3];
const A: Pt = [4, 3], B: Pt = [7, 1];
const OTHERS: Pt[] = [[1, 1], [0, 4], [2, 0], [8, 5], [1, 3]];
const ROUTE_A: Pt[] = [A, [4, 0], [6, 0], PED];   // tiene que ir hasta el puente
const ROUTE_B: Pt[] = [B, [7, 3], PED];
const MIN_A = 8, MIN_B = 3;                        // una cuadra ≈ un minuto
const RIVER_X = 4.5;

export function UberMatch({ step = 0 }: { step?: number }) {
  const ref = useNeonCanvas(step, (f) => draw(f));
  return <canvas ref={ref} className="block size-full" />;
}

function draw(f: Frame) {
  const { g, W, H, k, t, s, since, sans, mono } = f;
  const x0 = W * 0.07, x1 = W * 0.93, y0 = H * 0.2, y1 = H * 0.9;
  const P = ([i, j]: Pt): Pt => [lerp(x0, x1, i / NX), lerp(y0, y1, j / NY)];
  const cell = (x1 - x0) / NX;
  const a2 = since(2, 1.4), a3 = since(3, 1.6), a4 = since(4, 2.4);

  // río y calles (las calles no cruzan el río, salvo el puente de arriba)
  const [rx] = P([RIVER_X, 0]);
  g.fillStyle = "rgba(56,189,248,0.16)"; g.fillRect(rx - cell * 0.32, y0 - 30 * k, cell * 0.64, y1 - y0 + 60 * k);
  label(g, rx, y1 + 22 * k, "RÍO", "#38bdf8", mono(11 * k + 3), k, { outline: true, W });
  g.save(); g.strokeStyle = "rgba(96,130,190,0.28)"; g.lineWidth = 7 * k; g.lineCap = "round";
  for (let i = 0; i <= NX; i++) { const [x] = P([i, 0]); g.beginPath(); g.moveTo(x, y0); g.lineTo(x, y1); g.stroke(); }
  for (let j = 0; j <= NY; j++) {
    const [, y] = P([0, j]);
    if (j === 0) { g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke(); continue; }
    g.beginPath(); g.moveTo(x0, y); g.lineTo(P([4, j])[0], y); g.moveTo(P([5, j])[0], y); g.lineTo(x1, y); g.stroke();
  }
  g.restore();
  const [bx, by] = P([RIVER_X, 0]);
  label(g, bx, by - 24 * k, "PUENTE", C.blueL, mono(10 * k + 3), k, { outline: true, W });

  // 2 · hexágonos alrededor del pedido (anillo 1 y anillo 2)
  const [px, py] = P(PED), hr = cell * 0.6;
  if (s >= 2) {
    for (let q = -2; q <= 2; q++) for (let r = Math.max(-2, -q - 2); r <= Math.min(2, -q + 2); r++) {
      const d = Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r));
      const a = s === 2 ? Math.max(0, Math.min(1, a2 * 2.2 - d * 0.6)) : 1;
      const hx = px + hr * Math.sqrt(3) * (q + r / 2), hy = py + hr * 1.5 * r;
      hex(g, hx, hy, hr * 0.97);
      g.fillStyle = `rgba(59,130,246,${(d === 0 ? 0.28 : d === 1 ? 0.16 : 0.08) * a})`; g.fill();
      g.strokeStyle = `rgba(147,197,253,${0.55 * a})`; g.lineWidth = 1.6 * k; g.stroke();
    }
  }
  const near = (p: Pt) => Math.hypot(p[0] - PED[0], p[1] - PED[1]) < 2.5;

  // 3 · las dos opciones, por las calles
  if (s >= 3) {
    const ra = ROUTE_A.map(P), rb = ROUTE_B.map(P);
    path(g, ra, s === 3 ? a3 : 1, C.red, 6 * k, { dash: [12 * k, 9 * k], alpha: s >= 4 ? 0.35 : 0.9 });
    path(g, rb, s === 3 ? a3 : 1, C.green, 7 * k, { glow: 16 * k });
    if (s === 3 && a3 >= 1) {
      const [ax, ay] = P([4, 1.5]); label(g, ax - 70 * k, ay, `A · ${MIN_A} MIN`, C.red, sans(14 * k + 4), k, { W });
      const [cx, cy] = P([7, 2]); label(g, cx + 50 * k, cy, `B · ${MIN_B} MIN`, C.green, sans(14 * k + 4), k, { W });
    }
  }

  // autos libres
  [A, B, ...OTHERS].forEach((p, i) => {
    const [x, y] = P(p), cand = i < 2 && s >= 2;
    const dim = s >= 2 && !near(p) ? 0.3 : s >= 4 && i === 0 ? 0.45 : 1;
    if (s >= 4 && i === 1) return;                       // B ya salió
    g.save(); g.globalAlpha = dim;
    truck(g, x, y, 0, k, "#e5e7eb", 0.9);
    g.restore();
    if (cand) label(g, x, y - 30 * k, i === 0 ? "A" : "B", i === 0 ? C.red : C.green, sans(13 * k + 4), k, { W, alpha: dim });
  });

  // 4 · va B
  if (s >= 4) {
    const rb = ROUTE_B.map(P), [[tx, ty], an] = along(rb, a4 < 1 ? a4 : 1);
    truck(g, tx, ty, an, k, "#ffffff", 1.1);
    card(g, px + 150 * k, py + 70 * k, ["LLEGA EN", `${MIN_B} MINUTOS`], C.green, f);
  }

  // el pedido
  const pulse = 1 + 0.15 * Math.sin(t * 4);
  ring(g, px, py, 22 * k * pulse, C.amber, 3 * k);
  dot(g, px, py, 11 * k, C.amber, 18 * k);

  const titles = ["LLEGA UN PEDIDO", "LLEGA UN PEDIDO", "BUSCA AUTOS LIBRES EN LOS HEXÁGONOS DE AL LADO", "EL MÁS CERCANO NO SIEMPRE LLEGA ANTES", `VA B: LLEGA EN ${MIN_B} MINUTOS`];
  const cols = [C.amber, C.amber, C.blue, C.red, C.green];
  label(g, W / 2, H * 0.08, titles[Math.min(s, 4)], cols[Math.min(s, 4)], sans(15 * k + 4), k, { W });
}
