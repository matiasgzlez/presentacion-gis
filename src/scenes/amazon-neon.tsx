import { C, along, card, clamp, dot, house, label, lerp, path, ring, streets, truck, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* Caso Amazon: un barrio con paradas de reparto. Todo pasa solo, en bucle.
   intro     · camionetas repartiendo
   problema  · 1 la ruta de la computadora · 2 una obra y una calle sin lugar en el camino · 3 la ruta del chofer las esquiva
   solucion  · 1 miles de rutas reales de choferes · 2 la IA aprende qué calles eligen · 3 la ruta nueva = mapa + experiencia
   logistica · 1 chofer nuevo con la ruta común: se demora · 2 chofer nuevo con la ruta aprendida: llega a horario */

export type AmazonScene = "intro" | "problema" | "solucion" | "logistica";

const NX = 6, NY = 4;
const DEPOT: Pt = [0, 4];
const STOPS: Pt[] = [[1, 3], [3, 3], [3, 1], [5, 1], [6, 3]];
const PC: Pt[] = [[0, 4], [0, 3], [1, 3], [3, 3], [3, 1], [5, 1], [6, 1], [6, 3]];                     // la computadora: la más corta
const DRIVER: Pt[] = [[0, 4], [0, 3], [1, 3], [3, 3], [4, 3], [4, 1], [3, 1], [5, 1], [5, 2], [6, 2], [6, 3]]; // el chofer: esquiva
const OBRA: Pt = [3, 2], SIN_LUGAR: Pt = [6, 1.5];
const ALT: Pt[][] = [
  DRIVER,
  [[0, 4], [1, 4], [1, 3], [2, 3], [3, 3], [4, 3], [4, 2], [4, 1], [3, 1], [4, 1], [5, 1], [5, 2], [6, 2], [6, 3]],
  [[0, 4], [0, 3], [1, 3], [3, 3], [4, 3], [4, 1], [3, 1], [3, 0], [5, 0], [5, 1], [5, 2], [6, 2], [6, 3]],
  [[0, 4], [0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [4, 1], [3, 1], [5, 1], [5, 3], [6, 3]],
];
const AMZ = "#ff9900";

function grid(f: Frame) {
  const x0 = f.W * 0.1, x1 = f.W * 0.9, y0 = f.H * 0.2, y1 = f.H * 0.88;
  const P = ([i, j]: Pt): Pt => [lerp(x0, x1, i / NX), lerp(y0, y1, j / NY)];
  return { P, x0, x1, y0, y1 };
}

function base(f: Frame, P: (p: Pt) => Pt, b: ReturnType<typeof grid>) {
  const { g, k, mono } = f;
  streets(g, b.x0, b.y0, b.x1, b.y1, NX, NY, k);
  const [dx, dy] = P(DEPOT); house(g, dx, dy, 1.6 * k, AMZ);
  label(g, dx + 6 * k, dy + 40 * k, "DEPÓSITO", AMZ, mono(12 * k + 3), k, { outline: true, W: f.W });
}

/** Las paradas van arriba de todo, para que las rutas no tapen los números. */
function stops(f: Frame, P: (p: Pt) => Pt) {
  const { g, k, mono } = f;
  STOPS.forEach((s, i) => {
    const [x, y] = P(s);
    dot(g, x, y, 16 * k, C.blue, 16 * k);
    g.fillStyle = "#fff"; g.font = mono(15 * k + 3); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(String(i + 1), x, y + 1);
  });
}

function cone(f: Frame, x: number, y: number, a: number, text: string, dx = -100, dy = 0) {
  const { g, k, mono } = f;
  g.save(); g.globalAlpha = a;
  dot(g, x, y, 26 * k, "rgba(239,68,68,0.25)");
  g.fillStyle = "#fb923c"; g.beginPath(); g.moveTo(x, y - 20 * k); g.lineTo(x + 13 * k, y + 14 * k); g.lineTo(x - 13 * k, y + 14 * k); g.closePath(); g.fill();
  g.fillStyle = "#fff"; g.fillRect(x - 8 * k, y - 2 * k, 16 * k, 4 * k);
  g.restore();
  label(g, x + dx * k, y + dy * k, text, C.red, mono(12 * k + 3), k, { alpha: a, W: f.W });
}

export function AmazonMap({ scene, step = 0 }: { scene: AmazonScene; step?: number }) {
  const ref = useNeonCanvas(step, (f) => {
    const b = grid(f), P = b.P, toPx = (r: Pt[]) => r.map(P);
    base(f, P, b);
    draw(f, P, toPx);
    stops(f, P);
  });
  return <canvas ref={ref} className="block size-full" />;

  function draw(f: Frame, P: (p: Pt) => Pt, toPx: (r: Pt[]) => Pt[]) {
    const { g, k, t, s, since, sans, mono } = f;

    if (scene === "intro") {
      ALT.slice(0, 3).forEach((r, i) => {
        const px = toPx(r); path(g, px, 1, "rgba(147,197,253,0.18)", 3 * k);
        const [[x, y], a] = along(px, ((t * 0.07 + i / 3) % 1)); truck(g, x, y, a, k, AMZ, 1.2);
      });
      return;
    }

    if (scene === "problema") {
      const pc = toPx(PC), dr = toPx(DRIVER);
      const a1 = since(1, 2.2), a2 = since(2, 0.6), a3 = since(3, 2.4);
      path(g, pc, a1, a2 > 0 ? "rgba(147,197,253,0.55)" : C.blue, 7 * k, { dash: [14 * k, 10 * k], glow: 14 * k });
      if (a1 > 0 && s === 1) label(g, f.W / 2, f.H * 0.09, "RUTA DE LA COMPUTADORA: LA MÁS CORTA", C.blue, sans(15 * k + 4), k, { W: f.W });
      if (a2 > 0) {
        const [ox, oy] = P(OBRA), [sx, sy] = P(SIN_LUGAR);
        cone(f, ox, oy, a2, "CALLE EN OBRA"); cone(f, sx, sy, a2, "SIN LUGAR PARA FRENAR", -150, 40);
        if (s === 2) {
          const [[x, y], an] = along(pc, 0.42); truck(g, x, y, an, k, AMZ, 1.3);
          label(g, x - 70 * k, y + 50 * k, "+25 MIN", C.red, sans(16 * k + 4), k, { W: f.W });
        }
      }
      if (a3 > 0) {
        path(g, dr, a3, C.green, 8 * k, { glow: 18 * k });
        const [[x, y], an] = along(dr, a3 < 1 ? a3 : (t * 0.09) % 1); truck(g, x, y, an, k, AMZ, 1.3);
        label(g, f.W / 2, f.H * 0.09, "RUTA DEL CHOFER CON EXPERIENCIA", C.green, sans(15 * k + 4), k, { W: f.W });
      }
      return;
    }

    if (scene === "solucion") {
      const a1 = since(1, 2.6), a2 = since(2, 1), a3 = since(3, 2.2);
      // 1 · rutas reales de muchos choferes (se van sumando)
      const nTr = Math.floor(a1 * 36);
      for (let i = 0; i < nTr; i++) {
        const r = ALT[i % ALT.length], off = ((i * 37) % 11 - 5) * 1.3 * k, off2 = ((i * 53) % 9 - 4) * 1.3 * k;
        path(g, toPx(r).map(([x, y]) => [x + off, y + off2] as Pt), 1, a2 > 0 ? "rgba(60,242,181,0.12)" : "rgba(147,197,253,0.16)", 2.4 * k);
      }
      if (a1 > 0) {
        const n = Math.round(a1 * 4000).toLocaleString("es-AR");
        label(g, f.W / 2, f.H * 0.09, `${n} RUTAS REALES DE CHOFERES`, C.blue, sans(16 * k + 4), k, { W: f.W, alpha: a3 > 0 ? 0 : 1 });
      }
      // 2 · lo que se repite se ilumina: lo aprendido
      if (a2 > 0 && a3 === 0) {
        path(g, toPx(DRIVER), 1, C.mint, 6 * k, { glow: 22 * k, alpha: 0.35 + 0.25 * Math.sin(t * 4) });
        const [x, y] = P([4, 2]); dot(g, x, y, 40 * k, "rgba(167,139,250,0.25)"); ring(g, x, y, 40 * k + 6 * k * Math.sin(t * 3), C.violet, 3 * k);
        g.fillStyle = "#fff"; g.font = sans(20 * k + 4); g.fillText("IA", x, y + 1);
        label(g, f.W / 2, f.H * 0.09, "LA IA APRENDE QUÉ CALLES ELIGEN", C.violet, sans(16 * k + 4), k, { W: f.W });
      }
      // 3 · la ruta nueva
      if (a3 > 0) {
        const px = toPx(DRIVER);
        path(g, px, a3, C.mint, 9 * k, { glow: 22 * k });
        const [[x, y], an] = along(px, a3 < 1 ? a3 : (t * 0.09) % 1); truck(g, x, y, an, k, AMZ, 1.3);
        label(g, f.W / 2, f.H * 0.09, "RUTA NUEVA = MAPA + EXPERIENCIA", C.mint, sans(16 * k + 4), k, { W: f.W });
      }
      return;
    }

    // logística: el mismo chofer nuevo, con y sin lo aprendido
    const a1 = since(1, 3.2), a2 = since(2, 3.2);
    const [ox, oy] = P(OBRA), [sx, sy] = P(SIN_LUGAR);
    cone(f, ox, oy, 1, "OBRA"); cone(f, sx, sy, 1, "SIN LUGAR", -110, 40);
    if (s === 1) {
      const px = toPx(PC), u = Math.min(a1, 0.42) / 0.42;
      path(g, px, 1, "rgba(147,197,253,0.4)", 6 * k, { dash: [12 * k, 10 * k] });
      const [[x, y], an] = along(px, 0.42 * clamp(u)); truck(g, x, y, an, k, AMZ, 1.3);
      label(g, f.W / 2, f.H * 0.09, "CHOFER NUEVO · RUTA COMÚN", C.blue, sans(15 * k + 4), k, { W: f.W });
      if (u >= 1) card(g, x + 160 * k, y - 40 * k, ["SE DEMORA", "+25 minutos"], C.red, f);
    }
    if (s === 2) {
      const px = toPx(DRIVER);
      path(g, px, a2, C.mint, 8 * k, { glow: 18 * k });
      const [[x, y], an] = along(px, a2); truck(g, x, y, an, k, AMZ, 1.3);
      label(g, f.W / 2, f.H * 0.09, "CHOFER NUEVO · RUTA APRENDIDA", C.mint, sans(15 * k + 4), k, { W: f.W });
      if (a2 >= 1) card(g, x - 120 * k, y - 70 * k, ["LLEGA A HORARIO", "maneja como un experto"], C.green, f);
    }
    void mono;
  }
}
