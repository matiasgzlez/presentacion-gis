import { C, card, dot, label, lerp, ring, streets, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* ¿Cómo funciona ORION? Todo pasa solo, en bucle.
   1 los datos del día: paradas sobre el mapa de calles, algunas con horario ("antes de las 10:30")
   2 no puede probar todos los órdenes: titilan órdenes al azar
   3 arma una ruta cualquiera y la mejora de a pedazos (deshace los cruces); bajan los kilómetros
   4 respeta los horarios y la ruta final va al aparato del chofer */

const NX = 10, NY = 6;
const DEPOT: Pt = [0.5, 5.5];
const KM = 0.55;                                   // 1 unidad del dibujo ≈ 0,55 km (ilustrativo)

const STOPS: Pt[] = (() => {
  const out: Pt[] = [];
  let seed = 11;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  while (out.length < 16) {
    const p: Pt = [0.6 + rnd() * (NX - 1.2), 0.5 + rnd() * (NY - 1)];
    if (out.some((q) => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1.15) || Math.hypot(p[0] - DEPOT[0], p[1] - DEPOT[1]) < 1.2) continue;
    out.push(p);
  }
  return out;
})();
// paradas con horario ("antes de las 10:30"): las 3 más cercanas al depósito, así ir primero tiene sentido
const TW = new Set(STOPS.map((p, i) => [Math.hypot(p[0] - DEPOT[0], p[1] - DEPOT[1]), i]).sort((a, b) => a[0] - b[0]).slice(0, 3).map(([, i]) => i));

const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const length = (ord: number[]) => { let d = 0, p = DEPOT; for (const i of ord) { d += dist(p, STOPS[i]); p = STOPS[i]; } return d + dist(p, DEPOT); };

/** Ruta inicial "cualquiera": las de horario primero, el resto en el orden en que llegaron. Después, mejoras de a pedazos (2-opt). */
const SNAPS: number[][] = (() => {
  const tw = [...TW], rest = STOPS.map((_, i) => i).filter((i) => !TW.has(i));
  let ord = [...tw, ...rest];
  const snaps = [ord.slice()];
  const fixed = tw.length;
  for (let pass = 0; pass < 40 && snaps.length < 14; pass++) {
    let best = { gain: 0, i: -1, j: -1 };
    for (let i = 0; i < ord.length - 1; i++) for (let j = i + 1; j < ord.length; j++) {
      if (i < fixed && j >= fixed) continue;            // las de horario siguen siendo las primeras
      const cand = [...ord.slice(0, i), ...ord.slice(i, j + 1).reverse(), ...ord.slice(j + 1)];
      const gain = length(ord) - length(cand);
      if (gain > best.gain + 1e-9) best = { gain, i, j };
    }
    if (best.i < 0) break;
    ord = [...ord.slice(0, best.i), ...ord.slice(best.i, best.j + 1).reverse(), ...ord.slice(best.j + 1)];
    snaps.push(ord.slice());
  }
  return snaps;
})();
const FINAL = SNAPS[SNAPS.length - 1];
const km = (ord: number[]) => (length(ord) * KM).toLocaleString("es-AR", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

export function OrionHow({ step = 0 }: { step?: number }) {
  const ref = useNeonCanvas(step, (f) => draw(f));
  return <canvas ref={ref} className="block size-full" />;
}

function draw(f: Frame) {
  const { g, W, H, k, t, s, ts, since, sans, mono } = f;
  const x0 = W * 0.06, x1 = W * 0.94, y0 = H * 0.18, y1 = H * 0.92;
  const P = ([i, j]: Pt): Pt => [lerp(x0, x1, i / NX), lerp(y0, y1, j / NY)];
  streets(g, x0, y0, x1, y1, NX, NY, k, 0.7);

  const drawRoute = (ord: number[], col: string, w: number, alpha = 1) => {
    g.save(); g.globalAlpha = alpha; g.strokeStyle = col; g.lineWidth = w * k; g.lineJoin = "round"; g.shadowColor = col; g.shadowBlur = alpha > 0.6 ? 12 * k : 0;
    g.beginPath(); g.moveTo(...P(DEPOT)); ord.forEach((i) => g.lineTo(...P(STOPS[i]))); g.lineTo(...P(DEPOT)); g.stroke(); g.restore();
  };

  // 2 · órdenes al azar que titilan
  if (s === 2) {
    const n = Math.floor(t * 7);
    for (let r = 0; r < 3; r++) {
      let seed = n * 13 + r * 101;
      const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
      const ord = STOPS.map((_, i) => i).sort(() => rnd() - 0.5);
      drawRoute(ord, "rgba(239,68,68,0.9)", 1.6, 0.35);
    }
    label(g, W / 2, H * 0.55, "120 PARADAS = MÁS ÓRDENES QUE ÁTOMOS EN EL UNIVERSO", C.red, mono(13 * k + 4), k, { outline: true, W, alpha: since(2, 0.6) });
  }

  // 3 · ruta cualquiera → mejoras de a pedazos
  let shown: number[] | null = null;
  if (s === 3) {
    const per = 0.32, idx = Math.min(SNAPS.length - 1, Math.max(0, Math.floor((ts - 0.6) / per)));
    shown = SNAPS[idx];
    if (idx > 0) drawRoute(SNAPS[idx - 1], "rgba(239,68,68,0.8)", 2, 0.35);
    drawRoute(shown, C.amber, 4);
    card(g, W * 0.82, H * 0.25, ["KILÓMETROS", `${km(shown)} km`], idx === SNAPS.length - 1 ? C.green : C.amber, f);
  }
  if (s >= 4) {
    shown = FINAL;
    drawRoute(FINAL, C.green, 5);
  }

  // paradas (las de horario, con reloj)
  STOPS.forEach((p, i) => {
    const a = s >= 1 ? Math.max(0, Math.min(1, since(1, 1.6) * STOPS.length - i)) : 0;
    if (a <= 0) return;
    const [x, y] = P(p), tw = TW.has(i);
    g.save(); g.globalAlpha = a;
    dot(g, x, y, 10 * k, tw ? C.red : "#e2e8f0", 10 * k);
    if (tw) ring(g, x, y, 17 * k, C.red, 2.5 * k);
    if (shown && s >= 4) {
      const n = FINAL.indexOf(i) + 1;
      g.fillStyle = C.ink; g.font = mono(10 * k + 3); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(String(n), x, y + 1);
    }
    g.restore();
    if (tw && s === 1) label(g, x, y - 32 * k, "ANTES 10:30", C.red, mono(10 * k + 3), k, { outline: true, W, alpha: a });
  });

  // depósito
  const [dx, dy] = P(DEPOT);
  g.save(); g.shadowColor = C.amber; g.shadowBlur = 18 * k; g.fillStyle = "#8a5a00"; g.beginPath(); g.roundRect(dx - 20 * k, dy - 16 * k, 40 * k, 32 * k, 6 * k); g.fill(); g.restore();
  g.fillStyle = "#ffb500"; g.font = mono(10 * k + 3); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("UPS", dx, dy + 1);

  if (s >= 4) card(g, W * 0.8, H * 0.27, ["EN EL APARATO DEL CHOFER", `${STOPS.length} paradas · ${km(FINAL)} km`, "con horarios: primero"], C.green, f);

  const titles = ["LOS DATOS DEL DÍA", "LOS DATOS DEL DÍA: PARADAS, CALLES Y HORARIOS", "NO PUEDE PROBAR TODOS LOS ÓRDENES", "ARMA UNA RUTA Y LA MEJORA DE A PEDAZOS", "LA RUTA FINAL VA AL CHOFER"];
  const cols = [C.blue, C.blue, C.red, C.amber, C.green];
  label(g, W / 2, H * 0.07, titles[Math.min(s, 4)], cols[Math.min(s, 4)], sans(15 * k + 4), k, { W });
}
