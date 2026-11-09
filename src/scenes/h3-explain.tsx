import { C, clamp, label, useNeonCanvas, type Frame } from "@/scenes/kit";

/* ¿Qué es H3? Todo pasa solo, en bucle.
   1 el mapa partido en hexágonos iguales
   2 cada hexágono tiene su código
   3 por qué hexágonos: cuadrados (8 vecinos, 2 distancias) vs. hexágonos (6 vecinos, 1 distancia)
   4 16 tamaños: cada hexágono tiene 7 más chicos adentro */

const CODE = "8928308280fffff";   // ejemplo de la documentación de H3 (resolución 9, San Francisco)

/** Hexágono con punta arriba, rotado `rot` radianes. */
function hexPath(g: CanvasRenderingContext2D, x: number, y: number, r: number, rot = 0) {
  g.beginPath();
  for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + rot + (i * Math.PI) / 3; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
  g.closePath();
}

export function H3Explain({ step = 0 }: { step?: number }) {
  const ref = useNeonCanvas(step, (f) => draw(f));
  return <canvas ref={ref} className="block size-full" />;
}

function draw(f: Frame) {
  const { g, W, H, k, t, s, since, sans, mono } = f;
  const cx = W / 2, cy = H * 0.55;
  const a1 = since(1, 1.6), a2 = since(2, 0.8), a3 = since(3, 1.0), a4 = since(4, 2.6);

  if (s <= 2) {
    // 1 · grilla de hexágonos que crece desde el centro
    const r = Math.min(W, H) * 0.07;
    const reach = (s >= 2 ? 1 : a1) * 10;
    for (let q = -9; q <= 9; q++) for (let rr = -6; rr <= 6; rr++) {
      const x = cx + r * Math.sqrt(3) * (q + rr / 2), y = cy + r * 1.5 * rr;
      if (x < -r || x > W + r || y < H * 0.14 || y > H + r) continue;
      const d = Math.max(Math.abs(q), Math.abs(rr), Math.abs(-q - rr));
      const a = clamp(reach - d);
      if (a <= 0) continue;
      const sel = s >= 2 && q === 1 && rr === -1;
      hexPath(g, x, y, r * 0.96);
      g.fillStyle = sel ? `rgba(245,179,27,${0.35 + 0.15 * Math.sin(t * 3)})` : `rgba(59,130,246,${0.1 * a})`; g.fill();
      g.strokeStyle = sel ? C.amber : `rgba(147,197,253,${0.5 * a})`; g.lineWidth = (sel ? 3 : 1.4) * k; g.stroke();
      if (s >= 2 && !sel && d <= 3) {
        g.globalAlpha = 0.35 * a2; g.fillStyle = "#cbd5e1"; g.font = mono(8 * k + 3); g.textAlign = "center"; g.textBaseline = "middle";
        g.fillText("89283…", x, y); g.globalAlpha = 1;
      }
    }
    if (s >= 2) {
      const x = cx + r * Math.sqrt(3) * 0.5, y = cy - r * 1.5;
      label(g, x, y - r * 1.6, CODE, C.amber, mono(15 * k + 4), k, { W, alpha: a2 });
    }
    label(g, W / 2, H * 0.08, s >= 2 ? "CADA HEXÁGONO TIENE SU CÓDIGO" : "EL MAPA, PARTIDO EN HEXÁGONOS IGUALES", s >= 2 ? C.amber : C.blue, sans(15 * k + 4), k, { W });
    return;
  }

  if (s === 3) {
    // 3 · cuadrados vs. hexágonos
    const r = Math.min(W, H) * 0.085, lx = W * 0.27, rx = W * 0.73, y = H * 0.52;
    // cuadrados
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
      const x = lx + i * r * 1.9, yy = y + j * r * 1.9;
      g.fillStyle = i === 0 && j === 0 ? "rgba(245,179,27,0.35)" : "rgba(148,163,184,0.1)"; g.strokeStyle = "rgba(203,213,225,0.5)"; g.lineWidth = 1.4 * k;
      g.beginPath(); g.rect(x - r * 0.93, yy - r * 0.93, r * 1.86, r * 1.86); g.fill(); g.stroke();
      if (i || j) {
        const diag = i !== 0 && j !== 0;
        g.save(); g.globalAlpha = a3; g.strokeStyle = diag ? C.red : C.green; g.lineWidth = 3 * k; g.setLineDash(diag ? [8 * k, 6 * k] : []);
        g.beginPath(); g.moveTo(lx, y); g.lineTo(x, yy); g.stroke(); g.restore();
      }
    }
    // hexágonos
    const hr = r * 1.05;
    for (let q = -1; q <= 1; q++) for (let rr = -1; rr <= 1; rr++) {
      if (Math.abs(-q - rr) > 1) continue;
      const x = rx + hr * Math.sqrt(3) * (q + rr / 2), yy = y + hr * 1.5 * rr;
      hexPath(g, x, yy, hr * 0.96);
      g.fillStyle = q === 0 && rr === 0 ? "rgba(245,179,27,0.35)" : "rgba(59,130,246,0.12)"; g.fill();
      g.strokeStyle = "rgba(147,197,253,0.6)"; g.lineWidth = 1.4 * k; g.stroke();
      if (q || rr) { g.save(); g.globalAlpha = a3; g.strokeStyle = C.green; g.lineWidth = 3 * k; g.beginPath(); g.moveTo(rx, y); g.lineTo(x, yy); g.stroke(); g.restore(); }
    }
    label(g, lx, y + r * 3.5, "CUADRADOS: 8 VECINOS, 2 DISTANCIAS", C.red, mono(12 * k + 3), k, { outline: true, alpha: a3, W });
    label(g, rx, y + r * 3.5, "HEXÁGONOS: 6 VECINOS, TODOS IGUAL", C.green, mono(12 * k + 3), k, { outline: true, alpha: a3, W });
    label(g, W / 2, H * 0.08, "¿POR QUÉ HEXÁGONOS Y NO CUADRADOS?", C.green, sans(15 * k + 4), k, { W });
    return;
  }

  // 4 · 16 tamaños: cada hexágono tiene 7 más chicos (se ven tres niveles)
  const R0 = Math.min(W, H) * 0.32, rot = Math.atan(Math.sqrt(3) / 5);
  const level = (x: number, y: number, R: number, depth: number, rotAcc: number, alpha: number) => {
    hexPath(g, x, y, R, rotAcc);
    g.strokeStyle = [C.blue, C.mint, C.amber][depth]; g.lineWidth = (3.2 - depth) * k; g.globalAlpha = alpha;
    g.fillStyle = ["rgba(59,130,246,0.08)", "rgba(60,242,181,0.08)", "rgba(245,179,27,0.12)"][depth]; g.fill(); g.stroke(); g.globalAlpha = 1;
  };
  const kids = (x: number, y: number, R: number, rotAcc: number) => {
    const r = R / Math.sqrt(7), out: [number, number][] = [[x, y]];
    for (let i = 0; i < 6; i++) { const a = rotAcc + rot + (i * Math.PI) / 3; out.push([x + Math.cos(a) * r * Math.sqrt(3), y + Math.sin(a) * r * Math.sqrt(3)]); }
    return { r, pts: out };
  };
  level(cx, cy, R0, 0, 0, 1);
  const k1 = kids(cx, cy, R0, 0), b1 = clamp(a4 * 2);
  k1.pts.forEach(([x, y]) => level(x, y, k1.r * 0.98, 1, rot, b1));
  const k2 = kids(cx, cy, k1.r, rot), b2 = clamp(a4 * 2 - 1);
  k2.pts.forEach(([x, y]) => level(x, y, k2.r * 0.97, 2, rot * 2, b2));
  label(g, cx + R0 * 0.95, cy - R0 * 0.95, "1 HEXÁGONO", C.blue, mono(12 * k + 3), k, { outline: true, W });
  label(g, cx + R0 * 1.05, cy + R0 * 0.55, "7 MÁS CHICOS", C.mint, mono(12 * k + 3), k, { outline: true, alpha: b1, W });
  label(g, cx - R0 * 1.05, cy + R0 * 0.85, "Y ASÍ, 16 TAMAÑOS", C.amber, mono(12 * k + 3), k, { outline: true, alpha: b2, W });
  label(g, W / 2, H * 0.08, "16 TAMAÑOS: DE UN PAÍS A MENOS DE 1 M²", C.mint, sans(15 * k + 4), k, { W });
}
