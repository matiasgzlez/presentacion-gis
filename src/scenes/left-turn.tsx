import { C, along, label, lerp, path, truck, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* UPS · "doblar a la izquierda cuesta". Una esquina vista desde arriba. Todo pasa solo, en bucle.
   1 el camión quiere doblar a la izquierda: vienen autos de frente y espera (el reloj corre)
   2 la otra opción: tres veces a la derecha, alrededor de la manzana, sin esperar */

const UPS = "#ffb500";

export function LeftTurn({ step = 0 }: { step?: number }) {
  const ref = useNeonCanvas(step, (f) => draw(f));
  return <canvas ref={ref} className="block size-full" />;
}

function draw(f: Frame) {
  const { g, W, H, k, t, s, ts, sans, mono } = f;
  // calles: dos verticales (cx, x3) y dos horizontales (cy, y2); la manzana queda adelante y a la derecha
  const road = Math.min(W, H) * 0.11, blk = Math.min(W, H) * 0.3;
  const cx = Math.min(W * 0.45, W - blk - road * 2.2), cy = H * 0.64;
  const x3 = cx + blk + road, y2 = cy - blk - road;
  g.save(); g.fillStyle = "rgba(96,130,190,0.16)";
  g.fillRect(cx - road / 2, 0, road, H); g.fillRect(x3 - road / 2, 0, road, H);
  g.fillRect(0, cy - road / 2, W, road); g.fillRect(0, y2 - road / 2, W, road);
  g.setLineDash([14 * k, 12 * k]); g.strokeStyle = "rgba(226,232,240,0.35)"; g.lineWidth = 2 * k;
  [[cx, 0, cx, H], [x3, 0, x3, H], [0, cy, W, cy], [0, y2, W, y2]].forEach(([a, b, c, d]) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c, d); g.stroke(); });
  g.restore();
  g.fillStyle = "rgba(21,27,38,0.95)";
  g.fillRect(cx + road / 2 + 4, y2 + road / 2 + 4, blk - 8, blk - 8);
  label(g, cx + road / 2 + blk / 2, y2 + road / 2 + blk / 2, "MANZANA", "#94a3b8", mono(11 * k + 3), k, { outline: true, W });

  // se maneja por la derecha: el camión sube por la vertical (carril derecho) y quiere ir hacia la izquierda
  const lane = road * 0.25;
  const start: Pt = [cx + lane, H * 0.98], stop: Pt = [cx + lane, cy + road / 2 + 14 * k];
  const goal: Pt = [W * 0.04, cy - lane];

  if (s <= 1) {
    // autos que vienen de frente (bajan por el otro carril) y no dejan doblar
    for (let i = 0; i < 4; i++) {
      const y = ((t * 0.32 + i / 4) % 1) * (H + 200 * k) - 100 * k;
      g.save(); g.translate(cx - lane, y); g.fillStyle = "#cbd5e1"; g.beginPath(); g.roundRect(-11 * k, -20 * k, 22 * k, 40 * k, 5 * k); g.fill();
      g.fillStyle = "#facc15"; g.fillRect(-9 * k, 15 * k, 6 * k, 3 * k); g.fillRect(3 * k, 15 * k, 6 * k, 3 * k); g.restore();
    }
    const want: Pt[] = [stop, [cx + lane, cy - lane], goal];
    path(g, want, 1, C.red, 4 * k, { dash: [10 * k, 8 * k], alpha: 0.8 });
    const arrive = Math.min(1, ts / 1.2), [tx, ty] = [lerp(start[0], stop[0], arrive), lerp(start[1], stop[1], arrive)];
    truck(g, tx, ty, -Math.PI / 2, k, UPS, 1.3);
    const wait = Math.max(0, ts - 1.2);
    if (s === 1 && arrive >= 1) {
      const rx = cx + road * 1.3, ry = cy + road * 1.3, r = 28 * k;
      g.strokeStyle = C.red; g.lineWidth = 4 * k; g.beginPath(); g.arc(rx, ry, r, 0, Math.PI * 2); g.stroke();
      const a = -Math.PI / 2 + wait * 2.2; g.beginPath(); g.moveTo(rx, ry); g.lineTo(rx + Math.cos(a) * r * 0.8, ry + Math.sin(a) * r * 0.8); g.stroke();
      g.fillStyle = C.red; g.font = sans(18 * k + 5); g.textAlign = "left"; g.textBaseline = "middle";
      g.fillText(`esperando… ${Math.min(30, Math.floor(wait * 7))} s`, rx + r + 14 * k, ry);
    }
  }

  if (s >= 2) {
    // tres a la derecha alrededor de la manzana, y cruza derecho: llega al mismo lugar sin esperar
    const route: Pt[] = [start, [cx + lane, y2 + lane], [x3 - lane, y2 + lane], [x3 - lane, cy - lane], goal];
    const u = Math.min(1, ts / 3.2);
    path(g, route, 1, C.green, 6 * k, { glow: 14 * k, alpha: 0.9 });
    ([[cx + lane, y2 + lane, -60, 0], [x3 - lane, y2 + lane, 0, -40], [x3 - lane, cy - lane, 70, 0]] as number[][]).forEach(([x, y, dx, dy], i) => {
      label(g, x + dx * k, y + dy * k, `DERECHA ${i + 1}`, C.green, mono(11 * k + 3), k, { outline: true, W });
    });
    const [[tx, ty], an] = along(route, u);
    truck(g, tx, ty, an, k, UPS, 1.3);
    if (u >= 1) label(g, goal[0] + 90 * k, goal[1] - 44 * k, "LLEGÓ SIN FRENAR", C.green, sans(15 * k + 4), k, { W, align: "left" });
  }

  const title = s <= 1 ? "DOBLAR A LA IZQUIERDA: ESPERAR Y CRUZAR EL TRÁNSITO" : "TRES A LA DERECHA: DAR LA VUELTA SIN ESPERAR";
  label(g, W / 2, H * 0.07, title, s <= 1 ? C.red : C.green, sans(15 * k + 4), k, { W });
}
