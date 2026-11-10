import { C, clamp, dot, ease, hex, label, lerp, useNeonCanvas, type Frame, type Pt } from "@/scenes/kit";

/* ¿Cómo funciona Kepler.gl? De la planilla al mapa. Todo pasa solo, en bucle.
   1 una planilla: cada fila es un envío con su latitud y longitud
   2 el archivo se arrastra al mapa (en el navegador, sin programar)
   3 cada fila se vuelve un punto en el mapa
   4 se cambia la capa a hexágonos: la altura es cuántos envíos hay en cada zona */

const MINT = "#3cf2b5";
const N = 260;

// envíos de ejemplo: tres zonas con muchos pedidos y el resto disperso (fijos, para que siempre se vea igual)
const PTS: Pt[] = (() => {
  let seed = 3;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5;
  const hot: [number, number, number][] = [[0.35, 0.4, 0.09], [0.68, 0.62, 0.07], [0.55, 0.28, 0.05]];
  const out: Pt[] = [];
  for (let i = 0; i < N; i++) {
    const h = hot[i % 4 === 3 ? -1 : i % 3];
    if (!h) { out.push([0.08 + rnd() * 0.84, 0.08 + rnd() * 0.84]); continue; }
    out.push([clamp(h[0] + gauss() * h[2] * 2.2, 0.05, 0.95), clamp(h[1] + gauss() * h[2] * 2.2, 0.05, 0.95)]);
  }
  return out;
})();
// las primeras filas de la planilla (coordenadas de Resistencia, de ejemplo)
const ROWS = PTS.slice(0, 6).map((p, i) => ({ id: `#${1024 + i * 7}`, lat: (-27.42 - p[1] * 0.07).toFixed(3).replace(".", ","), lon: (-59.02 + p[0] * 0.08).toFixed(3).replace(".", ","), h: `${String(8 + i).padStart(2, "0")}:${String((i * 13) % 60).padStart(2, "0")}` }));

export function KeplerHow({ step = 0 }: { step?: number }) {
  const ref = useNeonCanvas(step, (f) => draw(f));
  return <canvas ref={ref} className="block size-full" />;
}

function draw(f: Frame) {
  const { g, W, H, k, t, s, since, sans, mono } = f;
  const a1 = since(1, 1.2), a2 = since(2, 1.6), a3 = since(3, 1.8), a4 = since(4, 1.6);

  // zonas: planilla (izquierda) y mapa (derecha)
  const tx = W * 0.02, ty = H * 0.16, tw = W * 0.39, th = H * 0.72;
  const mx = W * 0.43, my = H * 0.16, mw = W * 0.54, mh = H * 0.78;
  const MP = ([u, v]: Pt): Pt => [mx + u * mw, my + v * mh];

  // ── mapa base: calles tenues
  g.save(); g.fillStyle = "rgba(14,19,28,0.9)"; g.strokeStyle = "rgba(60,242,181,0.35)"; g.lineWidth = 2 * k;
  g.beginPath(); g.roundRect(mx, my, mw, mh, 14 * k); g.fill(); g.stroke(); g.clip();
  g.strokeStyle = "rgba(96,130,190,0.18)"; g.lineWidth = 2 * k;
  for (let i = 1; i < 10; i++) { const x = mx + (mw * i) / 10; g.beginPath(); g.moveTo(x, my); g.lineTo(x + mw * 0.05, my + mh); g.stroke(); }
  for (let j = 1; j < 8; j++) { const y = my + (mh * j) / 8; g.beginPath(); g.moveTo(mx, y); g.lineTo(mx + mw, y - mh * 0.03); g.stroke(); }
  g.restore();
  g.fillStyle = "rgba(226,232,240,0.55)"; g.font = mono(10 * k + 3); g.textAlign = "right"; g.textBaseline = "alphabetic"; g.fillText("RESISTENCIA", mx + mw - 12 * k, my + mh - 12 * k);

  // ── 1 · la planilla
  const tableAlpha = s >= 3 ? 1 - 0.55 * a3 : 1;
  if (s >= 1) {
    g.save(); g.globalAlpha = Math.min(1, a1 * 1.5) * tableAlpha;
    g.fillStyle = "rgba(21,27,38,0.96)"; g.strokeStyle = "rgba(255,255,255,0.25)"; g.lineWidth = 1.5 * k;
    g.beginPath(); g.roundRect(tx, ty, tw, th, 12 * k); g.fill(); g.stroke();
    g.fillStyle = "#e2e8f0"; g.font = mono(11 * k + 3); g.textAlign = "left"; g.textBaseline = "middle";
    g.fillText("envios.csv", tx + 16 * k, ty + 22 * k);
    const cols = ["envío", "latitud", "longitud", "hora"], cx = [0.05, 0.27, 0.53, 0.8].map((c) => tx + c * tw);
    const rh = (th - 70 * k) / 7, y0 = ty + 52 * k;
    g.fillStyle = MINT; g.font = mono(11 * k + 4); cols.forEach((c, i) => g.fillText(c.toUpperCase(), cx[i], y0));
    ROWS.forEach((r, i) => {
      const ra = clamp(a1 * 7 - i);
      if (ra <= 0) return;
      const y = y0 + rh * (i + 1);
      const hl = s === 3 && clamp(a3 * 6 - i) > 0 && clamp(a3 * 6 - i) < 1;
      if (hl) { g.fillStyle = "rgba(60,242,181,0.15)"; g.fillRect(tx + 6 * k, y - rh / 2, tw - 12 * k, rh); }
      g.globalAlpha = Math.min(1, a1 * 1.5) * tableAlpha * ra;
      g.fillStyle = "#e2e8f0"; g.font = mono(13 * k + 4);
      [r.id, r.lat, r.lon, r.h].forEach((v, c) => g.fillText(v, cx[c], y));
    });
    g.globalAlpha = Math.min(1, a1 * 1.5) * tableAlpha; g.fillStyle = "rgba(226,232,240,0.5)";
    g.fillText("… y 100.000 filas más", cx[0], y0 + rh * 7);
    g.restore();
  }

  // ── 2 · el archivo se arrastra al mapa
  if (s === 2) {
    const u = ease(clamp((a2 - 0.1) / 0.8));
    const fx = lerp(tx + tw * 0.5, mx + mw * 0.5, u), fy = lerp(ty + th * 0.5, my + mh * 0.5, u) - Math.sin(u * Math.PI) * 60 * k;
    g.save(); g.setLineDash([10 * k, 8 * k]); g.strokeStyle = `rgba(60,242,181,${0.4 + 0.4 * Math.sin(t * 5)})`; g.lineWidth = 3 * k;
    g.beginPath(); g.roundRect(mx + mw * 0.18, my + mh * 0.25, mw * 0.64, mh * 0.5, 16 * k); g.stroke(); g.restore();
    if (u < 1) {
      g.fillStyle = "rgba(226,232,240,0.6)"; g.font = sans(14 * k + 4); g.textAlign = "center"; g.fillText("Soltá el archivo acá", mx + mw / 2, my + mh * 0.68);
    }
    g.save(); g.globalAlpha = u >= 1 ? Math.max(0, 1 - (a2 - 0.9) * 8) : 1;
    g.fillStyle = "#151b26"; g.strokeStyle = MINT; g.lineWidth = 2.5 * k;
    g.beginPath(); g.roundRect(fx - 46 * k, fy - 56 * k, 92 * k, 112 * k, 10 * k); g.fill(); g.stroke();
    g.fillStyle = MINT; g.font = mono(13 * k + 3); g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("CSV", fx, fy - 8 * k);
    g.fillStyle = "#e2e8f0"; g.font = mono(9 * k + 3); g.fillText("envios.csv", fx, fy + 22 * k);
    g.restore();
  }

  // ── 3 · cada fila, un punto (las primeras vuelan desde la planilla)
  if (s === 3) {
    const n = Math.floor(a3 * N);
    for (let i = 0; i < n; i++) { const [x, y] = MP(PTS[i]); dot(g, x, y, 3.2 * k, "rgba(60,242,181,0.85)", 6 * k); }
    ROWS.forEach((_, i) => {
      const u = clamp(a3 * 6 - i); if (u <= 0 || u >= 1) return;
      const rh = (th - 70 * k) / 7, sx = tx + tw * 0.9, sy = ty + 52 * k + rh * (i + 1), [ex, ey] = MP(PTS[i]);
      const e = ease(u); dot(g, lerp(sx, ex, e), lerp(sy, ey, e) - Math.sin(e * Math.PI) * 40 * k, 6 * k, MINT, 14 * k);
    });
  }

  // ── 4 · hexágonos con altura (cuántos envíos caen en cada uno)
  if (s >= 4) {
    const R = Math.min(mw, mh) * 0.065;
    const bins = new Map<string, { x: number; y: number; n: number }>();
    for (const p of PTS) {
      const [x, y] = MP(p), lx = x - mx, ly = y - my;
      const q = ((Math.sqrt(3) / 3) * lx - ly / 3) / R, r = ((2 / 3) * ly) / R;
      let rx = Math.round(q), rz = Math.round(r); const ry = Math.round(-q - r);
      const dx = Math.abs(rx - q), dz = Math.abs(rz - r), dy = Math.abs(ry - (-q - r));
      if (dx > dy && dx > dz) rx = -ry - rz; else if (dz > dy) rz = -rx - ry;
      const key = `${rx},${rz}`, cx = mx + R * Math.sqrt(3) * (rx + rz / 2), cy = my + R * 1.5 * rz;
      const b = bins.get(key) ?? { x: cx, y: cy, n: 0 }; b.n++; bins.set(key, b);
    }
    const max = Math.max(...[...bins.values()].map((b) => b.n));
    [...bins.values()].sort((a, b) => a.y - b.y).forEach((b) => {
      const v = b.n / max, h = v * mh * 0.22 * a4;
      const col = v > 0.66 ? [245, 179, 27] : v > 0.33 ? [60, 242, 181] : [59, 130, 246];
      // costado (columna) y tapa
      g.fillStyle = `rgba(${col[0] * 0.45},${col[1] * 0.45},${col[2] * 0.45},0.95)`;
      g.fillRect(b.x - R * 0.82, b.y - h, R * 1.64, h);
      hex(g, b.x, b.y - h, R * 0.95); g.fillStyle = `rgba(${col.join(",")},${0.35 + 0.6 * v})`; g.fill();
      g.strokeStyle = "rgba(14,19,28,0.8)"; g.lineWidth = 1.2 * k; g.stroke();
    });
    // leyenda
    const lx = mx + 16 * k, ly = my + 18 * k;
    [["MÁS ENVÍOS", C.amber], ["ALGUNOS", MINT], ["POCOS", C.blue]].forEach(([tx2, c], i) => {
      dot(g, lx + 6 * k, ly + i * 22 * k, 6 * k, c as string);
      g.fillStyle = "#e2e8f0"; g.font = mono(10 * k + 3); g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(tx2 as string, lx + 18 * k, ly + i * 22 * k);
    });
  }

  const titles = ["UNA PLANILLA DE ENVÍOS", "UNA PLANILLA: CADA FILA ES UN ENVÍO CON SU UBICACIÓN", "SE ARRASTRA AL MAPA, SIN PROGRAMAR", "CADA FILA SE VUELVE UN PUNTO", "HEXÁGONOS: LA ALTURA ES CUÁNTOS ENVÍOS HAY"];
  const cols = [C.blue, C.blue, MINT, MINT, C.amber];
  label(g, W / 2, H * 0.07, titles[Math.min(s, 4)], cols[Math.min(s, 4)], sans(14 * k + 4), k, { W });
}
