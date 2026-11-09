import { WORLD_LAND } from "@/scenes/world-data";
import { C, along, card, clamp, dot, label, lerp, path, ring, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* Caso DHL: el mapa de riesgos de una cadena de suministro (Europa–Asia). Todo pasa solo, en bucle.
   intro     · proveedores y rutas, con riesgos que aparecen en el mundo
   problema  · 1 la cadena: chips de Taiwán → barco → Rotterdam → fábrica · 2 un tifón en Taiwán · 3 la fábrica se entera tarde
   solucion  · 1 capa 1: tu cadena · 2 capa 2: riesgos en vivo · 3 el cruce: alerta y plan B
   logistica · 1 sin mapa de riesgos: te enterás el día 10 · 2 con el mapa: aviso el día 1 y plan B */

export type DhlScene = "intro" | "problema" | "solucion" | "logistica";
type LL = [number, number];

const YEL = "#ffcc00";
const TAIWAN: LL = [120.3, 22.6], PENANG: LL = [100.3, 5.4], ROTTERDAM: LL = [4.1, 52], FACTORY: LL = [10.8, 52.4];
const SEA: LL[] = [TAIWAN, [114, 12], [104, 1.3], [95, 6], [80, 5.5], [60, 13], [44, 12.6], [38.5, 20], [33.5, 27.5], [32.4, 31.3], [24, 34], [12, 37.2], [-5.6, 35.9], [-10, 40], [-9.5, 44], [-5, 48], [2, 51], ROTTERDAM, FACTORY];
const PLAN_B: LL[] = [PENANG, [97, 6], [95, 6], [80, 5.5], [60, 13], [44, 12.6], [38.5, 20], [33.5, 27.5], [32.4, 31.3], [24, 34], [12, 37.2], [-5.6, 35.9], [-10, 40], [-9.5, 44], [-5, 48], [2, 51], ROTTERDAM, FACTORY];
const SUPPLIERS: { p: LL; n: string }[] = [{ p: TAIWAN, n: "CHIPS · TAIWÁN" }, { p: PENANG, n: "MALASIA" }, { p: [77.6, 12.9], n: "INDIA" }, { p: [28.9, 41], n: "TURQUÍA" }];
const RISKS: { p: LL; n: string; c: string }[] = [
  { p: [129, 18], n: "TIFÓN", c: C.red },
  { p: [43, 13], n: "CONFLICTO", c: C.red },
  { p: [72, 22], n: "INUNDACIÓN", c: C.amber },
  { p: [2, 46], n: "HUELGA", c: C.amber },
];

function view(f: Frame) {
  const c0: LL = [66, 27], span = 146;
  const U = Math.min(f.W / span, f.H / (span * 0.56));
  const P = ([lo, la]: LL): Pt => [f.W / 2 + (lo - c0[0]) * U, f.H / 2 - (la - c0[1]) * U + f.H * 0.04];
  return { P, U };
}

function land(f: Frame, P: (p: LL) => Pt) {
  const { g, k } = f;
  g.save(); g.shadowColor = C.blue; g.shadowBlur = 14 * k; g.beginPath();
  for (const r of WORLD_LAND) { let pen = false, prev = 0; for (const [lo, la] of r) { const [x, y] = P([lo, la]); if (pen && Math.abs(lo - prev) < 90) g.lineTo(x, y); else g.moveTo(x, y); pen = true; prev = lo; } }
  g.fillStyle = "rgba(37,99,235,0.10)"; g.fill(); g.strokeStyle = "rgba(59,130,246,0.75)"; g.lineWidth = 1.5 * k; g.stroke(); g.restore();
}

function ship(f: Frame, x: number, y: number, ang: number, col: string, sz = 1.4) {
  const { g, k } = f;
  g.save(); g.translate(x, y); g.rotate(ang); g.scale(k * sz, k * sz); g.shadowColor = col; g.shadowBlur = 12;
  g.fillStyle = col; g.beginPath(); g.moveTo(14, 0); g.lineTo(5, -6); g.lineTo(-12, -6); g.lineTo(-12, 6); g.lineTo(5, 6); g.closePath(); g.fill();
  g.shadowBlur = 0; g.fillStyle = C.ink; for (let i = 0; i < 3; i++) g.fillRect(-9 + i * 5, -3.5, 3.8, 7);
  g.restore();
}

function storm(f: Frame, x: number, y: number, r: number, a: number) {
  const { g, k, t } = f;
  g.save(); g.globalAlpha = a; g.translate(x, y); g.rotate(-t * 2.4);
  dot(g, 0, 0, r * 1.25, "rgba(239,68,68,0.18)");
  g.strokeStyle = C.red; g.shadowColor = C.red; g.shadowBlur = 14 * k; g.lineCap = "round";
  for (let arm = 0; arm < 3; arm++) {
    g.lineWidth = 4 * k; g.beginPath();
    for (let i = 0; i <= 26; i++) { const u = i / 26, ang = arm * (Math.PI * 2 / 3) + u * 3.6, rr = r * u; g.lineTo(Math.cos(ang) * rr, Math.sin(ang) * rr); }
    g.stroke();
  }
  dot(g, 0, 0, 5 * k, "#fff"); g.restore();
}

function factory(f: Frame, x: number, y: number, col: string) {
  const { g, k } = f; const s = 1.5 * k;
  g.save(); g.fillStyle = col; g.shadowColor = col; g.shadowBlur = 14 * k;
  g.beginPath(); g.moveTo(x - 16 * s, y + 10 * s); g.lineTo(x - 16 * s, y - 4 * s); g.lineTo(x - 8 * s, y + 1 * s); g.lineTo(x - 8 * s, y - 4 * s); g.lineTo(x, y + 1 * s); g.lineTo(x, y - 12 * s); g.lineTo(x + 6 * s, y - 12 * s); g.lineTo(x + 6 * s, y + 1 * s); g.lineTo(x + 16 * s, y - 4 * s); g.lineTo(x + 16 * s, y + 10 * s); g.closePath(); g.fill(); g.restore();
}

export function DhlMap({ scene, step = 0 }: { scene: DhlScene; step?: number }) {
  const ref = useNeonCanvas(step, (f) => {
    const { g, k, t, s, since, sans, mono, W, H } = f;

    if (scene === "logistica") return timeline(f);

    const { P } = view(f);
    land(f, P);
    const sea = SEA.map(P), planB = PLAN_B.map(P);
    const [fx, fy] = P(FACTORY), [tx, ty] = P(TAIWAN);

    if (scene === "intro") {
      path(g, sea, 1, "rgba(147,197,253,0.35)", 2.5 * k, { dash: [8 * k, 7 * k] });
      SUPPLIERS.forEach((sp) => { const [x, y] = P(sp.p); dot(g, x, y, 8 * k, YEL, 12 * k); });
      RISKS.forEach((r, i) => { const [x, y] = P(r.p), ph = (t * 0.5 + i * 0.25) % 1; ring(g, x, y, 10 * k + ph * 40 * k, r.c, 3 * k, 1 - ph); dot(g, x, y, 6 * k, r.c); });
      const [[x, y], a] = along(sea, (t * 0.05) % 1); ship(f, x, y, a, "#fff");
      factory(f, fx, fy, YEL);
      return;
    }

    if (scene === "problema") {
      const a1 = since(1, 2.2), a2 = since(2, 0.8), a3 = since(3, 0.8);
      dot(g, tx, ty, 10 * k, YEL, 14 * k); label(g, tx, ty + 34 * k, "PROVEEDOR DE CHIPS · TAIWÁN", YEL, mono(12 * k + 3), k, { outline: true, W });
      factory(f, fx, fy, a3 > 0 ? C.red : YEL); label(g, fx, fy - 40 * k, "FÁBRICA DE AUTOS · ALEMANIA", a3 > 0 ? C.red : YEL, mono(12 * k + 3), k, { outline: true, W });
      path(g, sea, a1, a2 > 0 ? "rgba(239,68,68,0.7)" : C.blue, 4 * k, { dash: [10 * k, 8 * k], glow: 10 * k });
      if (a1 > 0 && a2 === 0) { const [[x, y], a] = along(sea, a1); ship(f, x, y, a, "#fff"); }
      if (a2 > 0) {
        storm(f, tx + 26 * k, ty - 10 * k, 46 * k, a2);
        ship(f, tx - 6 * k, ty + 8 * k, 0, "#cbd5e1");
        label(g, tx + 30 * k, ty - 76 * k, "TIFÓN: EL PUERTO CIERRA", C.red, sans(14 * k + 4), k, { alpha: a2, W });
      }
      if (a3 > 0) {
        const day = Math.min(10, 1 + Math.floor(f.ts * 3));
        card(g, fx + 40 * k, fy + 120 * k, [`DÍA ${day}`, day < 10 ? "La fábrica espera chips…" : "Se entera: ¡LÍNEA PARADA!"], day < 10 ? C.amber : C.red, f, a3, 330 * k);
      }
      return;
    }

    // solución: capas que se cruzan
    const a1 = since(1, 1.6), a2 = since(2, 1.2), a3 = since(3, 1.8);
    const layerTag = s === 1 ? "CAPA 1 · TU CADENA" : s === 2 ? "CAPA 2 · RIESGOS EN VIVO" : s === 3 ? "CRUCE DE CAPAS · ALERTA" : "";
    if (layerTag) label(g, W / 2, H * 0.07, layerTag, s === 1 ? C.blue : s === 2 ? C.red : C.amber, sans(16 * k + 4), k, { W });
    // capa 1
    path(g, sea, a1, s >= 3 ? "rgba(239,68,68,0.45)" : C.blue, 4 * k, { dash: [10 * k, 8 * k], glow: 8 * k, alpha: a1 > 0 ? 1 : 0.25 });
    SUPPLIERS.forEach((sp, i) => { const [x, y] = P(sp.p); dot(g, x, y, 9 * k, YEL, 14 * k); if (a1 > 0 && (s < 3 || i === 0)) label(g, x - (i === 0 ? 60 : 0) * k, y + 34 * k, sp.n, YEL, mono(11 * k + 3), k, { outline: true, alpha: a1, W }); });
    factory(f, fx, fy, YEL);
    // capa 2: riesgos con su radio de alcance; el tifón avanza hacia Taiwán
    if (a2 > 0) {
      RISKS.forEach((r, i) => {
        let [x, y] = P(r.p);
        if (i === 0) { const u = s >= 3 ? 1 : clamp(f.ts / 3.5); x = lerp(x, tx + 34 * k, u); y = lerp(y, ty - 8 * k, u); }
        const rad = (i === 0 ? 58 : 40) * k;
        dot(g, x, y, rad, i === 0 ? "rgba(239,68,68,0.16)" : r.c === C.red ? "rgba(239,68,68,0.12)" : "rgba(245,179,27,0.12)");
        ring(g, x, y, rad, r.c, 2.5 * k, a2);
        if (i === 0) storm(f, x, y, 26 * k, a2); else dot(g, x, y, 7 * k, r.c, 12 * k);
        label(g, x, y - rad - 16 * k, r.n, r.c, mono(11 * k + 3), k, { alpha: a2, W });
      });
    }
    // cruce: el radio del tifón toca al proveedor → alerta y plan B
    if (a3 > 0) {
      ring(g, tx, ty, 20 * k + 10 * k * Math.sin(t * 6), C.red, 4 * k, a3);
      path(g, planB, a3, C.green, 5 * k, { glow: 14 * k });
      const [px, py] = P(PENANG); label(g, px - 40 * k, py + 70 * k, "PLAN B: PROVEEDOR EN MALASIA", C.green, sans(13 * k + 4), k, { alpha: a3, W });
      card(g, W * 0.3, H * 0.86, ["ALERTA · DÍA 1", "Tifón a 80 km de tu proveedor"], C.red, f, a3);
    }
  });
  return <canvas ref={ref} className="block size-full" />;
}

/** Dos líneas de tiempo: sin mapa de riesgos (te enterás el día 10) y con mapa (aviso el día 1 y plan B). */
function timeline(f: Frame) {
  const { g, k, s, since, sans, mono, W, H } = f;
  const x0 = W * 0.12, x1 = W * 0.9, rows = [H * 0.38, H * 0.72];
  const X = (d: number) => lerp(x0, x1, (d - 1) / 9);
  const draw = (row: number, on: number, alertDay: number, col: string, title: string, end: string) => {
    const y = rows[row];
    g.globalAlpha = on > 0 ? 1 : 0.25;
    g.fillStyle = col; g.font = sans(20 * k + 6); g.textAlign = "left"; g.fillText(title, x0, y - 70 * k);
    g.strokeStyle = "rgba(255,255,255,0.25)"; g.lineWidth = 6 * k; g.lineCap = "round"; g.beginPath(); g.moveTo(x0, y); g.lineTo(x1, y); g.stroke();
    for (let d = 1; d <= 10; d++) { dot(g, X(d), y, 6 * k, "rgba(255,255,255,0.45)"); g.fillStyle = "rgba(255,255,255,0.6)"; g.font = mono(11 * k + 3); g.textAlign = "center"; g.fillText(`DÍA ${d}`, X(d), y + 30 * k); }
    if (on > 0) {
      const d = 1 + 9 * on;
      g.strokeStyle = col; g.shadowColor = col; g.shadowBlur = 12 * k; g.beginPath(); g.moveTo(x0, y); g.lineTo(X(Math.min(d, 10)), y); g.stroke(); g.shadowBlur = 0;
      if (d >= alertDay) {
        dot(g, X(alertDay), y, 16 * k, col, 20 * k); g.fillStyle = C.ink; g.font = sans(16 * k + 4); g.textAlign = "center"; g.fillText("!", X(alertDay), y + 1);
        label(g, X(alertDay), y - 32 * k, end, col, sans(13 * k + 4), k, { W });
      }
    }
    g.globalAlpha = 1;
  };
  draw(0, since(1, 3), 10, C.red, "SIN MAPA DE RIESGOS", "TE ENTERÁS: NO LLEGÓ");
  draw(1, since(2, 3), 1, C.green, "CON MAPA DE RIESGOS", "AVISO → PLAN B");
  void s;
}
