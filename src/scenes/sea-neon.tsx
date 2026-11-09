import { useEffect, useRef } from "react";
import { WORLD_LAND } from "@/scenes/world-data";
import { badge, tagPill } from "@/scenes/neon-map";

/* Caso Maersk: barcos y contenedores sobre el mapa del mundo, en neón.
   intro     · rutas y barcos navegando
   problema  · 1 un barco en el océano: "¿dónde está mi contenedor?" · 2 peligro en el Mar Rojo
   solucion  · 1 cada barco avisa su posición y deja su rastro · 2 el contenedor tiene GPS y termómetro · 3 en el mapa se ve cuándo llega
   desvio    · 1 la ruta corta, por Suez · 2 el Mar Rojo se cierra: el mapa calcula la vuelta por África
   logistica · 1 el puerto ve cuándo llega cada barco · 2 los camiones esperan listos */

export type SeaScene = "intro" | "problema" | "solucion" | "desvio" | "logistica";
type LL = [number, number];

const BLUE = "#3b82f6", BLUE_L = "#93c5fd", AMBER = "#f5b31b", GREEN = "#22c55e", RED = "#ef4444", MINT = "#3cf2b5";
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ease = (u: number) => 1 - Math.pow(1 - clamp(u), 3);

const SUEZ: LL[] = [[121.5, 31.2], [122, 25], [114, 12], [104, 1.3], [95, 6], [80, 5.5], [60, 13], [44, 12.6], [38.5, 20], [33.5, 27.5], [32.4, 31.3], [24, 34], [12, 37.2], [-5.6, 35.9], [-10, 40], [-9.5, 44], [-5, 48], [2, 51], [4.1, 52]];
const CAPE: LL[] = [[121.5, 31.2], [122, 25], [114, 12], [104, 1.3], [95, 6], [80, 5.5], [62, -8], [45, -26], [28, -36], [18.5, -35.5], [8, -22], [-6, -2], [-18, 14], [-16, 28], [-10, 40], [-9.5, 44], [-5, 48], [2, 51], [4.1, 52]];
const ROUTES: LL[][] = [
  SUEZ,
  [[4.1, 52], [-5, 48], [-12, 38], [-20, 15], [-30, -5], [-38, -18], [-46.3, -24], [-52, -30], [-58.2, -34.8]],
  [[4.1, 52], [-8, 50], [-30, 47], [-50, 42], [-74, 40.4]],
  [[104, 1.3], [110, 8], [114, 18], [121.5, 31.2], [129, 35]],
  [[-74, 40.4], [-76, 30], [-79.9, 9.4], [-82, 4], [-80, -10], [-77, -12]],
  [[55, 25], [60, 20], [72.8, 18.9], [80, 7]],
];
const ROTTERDAM: LL = [4.1, 52], RED_SEA: LL = [39, 18], SHIP_FOCUS = 0.3;

function polyLen(pts: LL[]) { const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); return L; }
function along(pts: LL[], f: number): [LL, number] {
  const L = polyLen(pts), d = clamp(f) * L[L.length - 1]; let i = 1; while (i < pts.length - 1 && L[i] < d) i++;
  const k = (d - L[i - 1]) / (L[i] - L[i - 1] || 1), a = pts[i - 1], b = pts[i];
  return [[lerp(a[0], b[0], k), lerp(a[1], b[1], k)], Math.atan2(-(b[1] - a[1]), b[0] - a[0])];
}

export function SeaMap({ scene, step }: { scene: SeaScene; step: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef({ step, at: performance.now() });
  if (st.current.step !== step) st.current = { step, at: performance.now() };

  useEffect(() => {
    const cv = ref.current!, g = cv.getContext("2d")!;
    let raf = 0, W = 0, H = 0, DPR = 1;
    const fit = () => { DPR = window.devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * DPR; cv.height = H * DPR; };
    const ro = new ResizeObserver(fit); ro.observe(cv); fit();
    const t0 = performance.now();
    const mono = (px: number) => `600 ${px}px "Geist Mono", ui-monospace, monospace`;
    const sans = (px: number, w = 700) => `${w} ${px}px Geist, ui-sans-serif, sans-serif`;

    const frame = (now: number) => {
      const t = (now - t0) / 1000, s = st.current.step, ts = (now - st.current.at) / 1000;
      const since = (n: number, dur: number) => (s > n ? 1 : s === n ? ease(ts / dur) : 0);
      g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, W, H);
      const k = Math.min(W, H) / 800;
      // vista: el mundo (Atlántico + Índico) o, para el desvío, Europa–África–Asia
      const zoomDesvio = scene === "desvio" || scene === "problema";
      const [c0, span] = zoomDesvio ? [[52, 10] as LL, 150] : scene === "logistica" ? [[-12, 42] as LL, 95] : [[32, 12] as LL, 255];
      const U = Math.min(W / span, H / (span * 0.52)), P = (lon: number, lat: number): [number, number] => [W / 2 + (lon - c0[0]) * U, H / 2 - (lat - c0[1]) * U];

      // ── tierra
      g.save(); g.shadowColor = BLUE; g.shadowBlur = 16 * k; g.beginPath();
      for (const r of WORLD_LAND) { let pen = false, prev = 0; for (const [lo, la] of r) { const [x, y] = P(lo, la); if (pen && Math.abs(lo - prev) < 90) g.lineTo(x, y); else g.moveTo(x, y); pen = true; prev = lo; } }
      g.fillStyle = "rgba(37,99,235,0.10)"; g.fill(); g.strokeStyle = BLUE; g.lineWidth = 1.8 * k; g.stroke(); g.restore();

      // ── rutas
      const drawRoute = (r: LL[], col: string, w: number, dash = true, upto = 1) => {
        const L = polyLen(r), lim = L[L.length - 1] * upto;
        g.save(); if (dash) g.setLineDash([6 * k, 6 * k]); g.strokeStyle = col; g.lineWidth = w * k; g.beginPath();
        r.forEach((p, i) => { if (L[i] > lim) { if (i) { const [q] = along(r, upto); g.lineTo(...P(...q)); } return; } i ? g.lineTo(...P(...p)) : g.moveTo(...P(...p)); });
        g.stroke(); g.restore();
      };
      const routesA = scene === "desvio" ? 0 : 1;
      if (routesA) ROUTES.forEach((r) => drawRoute(r, "rgba(147,197,253,0.28)", 1.6));

      // ── barcos
      const ship = (p: LL, ang: number, col: string, sz = 1, glow = 0.35) => {
        const [x, y] = P(...p);
        const h = g.createRadialGradient(x, y, 0, x, y, 18 * k * sz); h.addColorStop(0, `rgba(60,242,181,${glow})`); h.addColorStop(1, "rgba(60,242,181,0)");
        g.fillStyle = h; g.beginPath(); g.arc(x, y, 18 * k * sz, 0, Math.PI * 2); g.fill();
        g.save(); g.translate(x, y); g.rotate(ang); g.scale(k * sz, k * sz);
        g.fillStyle = col; g.beginPath(); g.moveTo(13, 0); g.lineTo(5, -5); g.lineTo(-11, -5); g.lineTo(-11, 5); g.lineTo(5, 5); g.closePath(); g.fill();
        g.fillStyle = "#0e131c"; for (let i = 0; i < 3; i++) g.fillRect(-8 + i * 4.5, -3, 3.4, 6);           // contenedores
        g.restore();
      };
      const trails = scene === "solucion" ? since(1, 0.8) : 0;
      if (scene === "intro" || scene === "solucion" || scene === "logistica") {
        ROUTES.forEach((r, ri) => {
          for (let j = 0; j < 3; j++) {
            const f = (t * 0.012 + j / 3 + ri * 0.11) % 1, [p, a] = along(r, f);
            if (trails > 0) {                                                   // rastro: posiciones anteriores
              for (let q = 1; q <= 6; q++) { const [pp] = along(r, Math.max(0, f - q * 0.012)); const [x, y] = P(...pp); g.fillStyle = `rgba(60,242,181,${0.5 * trails * (1 - q / 7)})`; g.beginPath(); g.arc(x, y, 2.2 * k, 0, Math.PI * 2); g.fill(); }
              const ping = ((t * 0.8 + j * 0.3 + ri * 0.17) % 1), [x, y] = P(...p);
              g.strokeStyle = `rgba(60,242,181,${0.6 * trails * (1 - ping)})`; g.lineWidth = 1.5 * k; g.beginPath(); g.arc(x, y, 6 * k + ping * 22 * k, 0, Math.PI * 2); g.stroke();
            }
            ship(p, a, "#e5e7eb", 1.1);
          }
        });
      }

      // ── problema: un barco en el océano y la pregunta
      if (scene === "problema") {
        drawRoute(SUEZ, "rgba(147,197,253,0.3)", 1.8);
        const [p, a] = along(SUEZ, SHIP_FOCUS + 0.02 * Math.sin(t * 0.3));
        ship(p, a, "#e5e7eb", 2.2, 0.5);
        const [x, y] = P(...p);
        if (s >= 1) { g.globalAlpha = since(1, 0.6); badge(g, x, y - 16 * k, "¿DÓNDE ESTÁ MI CONTENEDOR?", AMBER, sans(15 * k + 5), k, W); g.globalAlpha = 1; }
        if (s >= 2) danger(g, P, k, t, since(2, 0.8), sans, W);
      }

      // ── solución: contenedor con GPS y termómetro; llegada
      if (scene === "solucion") {
        const [p, a] = along(SUEZ, (t * 0.012 + 0.0) % 1), [x, y] = P(...p);
        const box = since(2, 0.7), eta = since(3, 0.7);
        ship(p, a, "#ffffff", 1.8, 0.6);
        if (box > 0) {
          const bx = clamp(x + 60 * k, 10, W - 260 * k), by = clamp(y - 150 * k, 10, H - 150 * k);
          g.globalAlpha = box;
          g.strokeStyle = MINT; g.lineWidth = 1.5 * k; g.beginPath(); g.moveTo(x, y); g.lineTo(bx, by + 50 * k); g.stroke();
          g.fillStyle = "rgba(14,19,28,0.92)"; g.strokeStyle = MINT; g.lineWidth = 2 * k; g.beginPath(); g.roundRect(bx, by, 240 * k, 112 * k, 12 * k); g.fill(); g.stroke();
          g.fillStyle = "#38bdf8"; g.beginPath(); g.roundRect(bx + 16 * k, by + 20 * k, 70 * k, 44 * k, 4 * k); g.fill();
          g.strokeStyle = "rgba(14,19,28,0.5)"; g.lineWidth = 2 * k; for (let i = 1; i < 6; i++) { g.beginPath(); g.moveTo(bx + 16 * k + i * 11.6 * k, by + 22 * k); g.lineTo(bx + 16 * k + i * 11.6 * k, by + 62 * k); g.stroke(); }
          g.font = sans(14 * k + 5, 800); g.fillStyle = "#fff"; g.textAlign = "left"; g.textBaseline = "middle";
          g.fillText("📍 GPS", bx + 100 * k, by + 32 * k); g.fillText("🌡 4 °C", bx + 100 * k, by + 58 * k);
          g.font = mono(9 * k + 3); g.fillStyle = MINT; g.fillText("CONTENEDOR REFRIGERADO", bx + 16 * k, by + 90 * k);
          g.globalAlpha = 1;
        }
        if (eta > 0) {
          drawRoute(SUEZ.slice(), "rgba(34,197,94,0.75)", 2.4, false);
          const [rx, ry] = P(...ROTTERDAM); g.globalAlpha = eta; badge(g, rx, ry, "LLEGA A ROTTERDAM EN 12 DÍAS", GREEN, sans(14 * k + 5), k, W); g.globalAlpha = 1;
        }
      }

      // ── desvío: Suez cerrado → vuelta por África
      if (scene === "desvio") {
        const closed = since(2, 0.6), alt = since(2, 2.4);
        drawRoute(SUEZ, closed > 0 ? `rgba(239,68,68,${0.35 + 0.4 * (1 - closed)})` : "rgba(34,197,94,0.9)", 2.6, closed > 0);
        if (closed > 0) { danger(g, P, k, t, closed, sans, W); drawRoute(CAPE, "rgba(34,197,94,0.95)", 3, false, alt); }
        const route = closed > 0 ? CAPE : SUEZ, f = (t * (closed > 0 ? 0.035 : 0.05)) % 1, [p, a] = along(route, f);
        if (s >= 1) ship(p, a, "#ffffff", 1.9, 0.6);
        const [px, py] = P(32.4, 31.3); if (s >= 1 && closed === 0) tagPill(g, px - 40 * k, py - 26 * k, "CANAL DE SUEZ", mono(10 * k + 3), k, GREEN);
        if (alt >= 0.95) { const [cx, cy] = P(-12, -12); badge(g, cx, cy, "VUELTA POR ÁFRICA · 10 A 14 DÍAS MÁS", AMBER, sans(15 * k + 5), k, W); }
      }

      // ── logística: el puerto sabe cuándo llega cada barco; camiones listos
      if (scene === "logistica") {
        const [rx, ry] = P(...ROTTERDAM), b1 = since(1, 0.7), b2 = since(2, 0.7);
        g.save(); g.shadowColor = AMBER; g.shadowBlur = 16 * k; g.fillStyle = AMBER; g.beginPath(); g.arc(rx, ry, 8 * k, 0, Math.PI * 2); g.fill(); g.restore();
        tagPill(g, rx - 110 * k, ry - 4 * k, "PUERTO DE ROTTERDAM", mono(11 * k + 3), k, AMBER);
        if (b1 > 0) {
          const bx = rx + 70 * k, by = ry - 190 * k; g.globalAlpha = b1;
          g.fillStyle = "rgba(14,19,28,0.92)"; g.strokeStyle = GREEN; g.lineWidth = 2 * k; g.beginPath(); g.roundRect(bx, by, 340 * k, 150 * k, 12 * k); g.fill(); g.stroke();
          g.font = mono(10 * k + 3); g.fillStyle = GREEN; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText("LLEGADAS", bx + 16 * k, by + 22 * k);
          [["Barco desde Shanghái", "mañana 06:00"], ["Barco desde Santos", "jueves 14:00"], ["Barco desde Nueva York", "viernes 09:00"]].forEach(([a, b], i) => {
            g.font = sans(12 * k + 4, 600); g.fillStyle = "#fff"; g.fillText(a, bx + 16 * k, by + (52 + i * 32) * k);
            g.textAlign = "right"; g.fillStyle = BLUE_L; g.fillText(b, bx + 324 * k, by + (52 + i * 32) * k); g.textAlign = "left";
          });
          g.globalAlpha = 1;
        }
        if (b2 > 0) {
          for (let i = 0; i < 5; i++) { const tx = rx + 14 * k + i * 30 * k, ty = ry + 22 * k; g.globalAlpha = clamp(b2 * 2 - i * 0.2); g.fillStyle = AMBER; g.beginPath(); g.roundRect(tx, ty, 18 * k, 10 * k, 2 * k); g.fill(); g.fillStyle = "#e5e7eb"; g.fillRect(tx + 18 * k, ty + 1 * k, 6 * k, 8 * k); }
          g.globalAlpha = b2; badge(g, rx + 80 * k, ry + 150 * k, "CAMIONES LISTOS CUANDO LLEGA EL BARCO", GREEN, sans(13 * k + 5), k, W); g.globalAlpha = 1;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [scene]);

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}

// zona de peligro en el Mar Rojo
function danger(g: CanvasRenderingContext2D, P: (lo: number, la: number) => [number, number], k: number, t: number, a: number, sans: (px: number, w?: number) => string, W: number) {
  const [x, y] = P(...RED_SEA), r = 46 * k * (1 + 0.06 * Math.sin(t * 4));
  g.save(); g.globalAlpha = a;
  g.fillStyle = "rgba(239,68,68,0.22)"; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
  g.shadowColor = RED; g.shadowBlur = 18 * k; g.strokeStyle = RED; g.lineWidth = 3 * k; g.stroke();
  g.lineWidth = 5 * k; g.beginPath(); g.moveTo(x - 14 * k, y - 14 * k); g.lineTo(x + 14 * k, y + 14 * k); g.moveTo(x + 14 * k, y - 14 * k); g.lineTo(x - 14 * k, y + 14 * k); g.stroke();
  g.restore();
  g.globalAlpha = a; badge(g, x, y - r + 10 * k, "PELIGRO: MAR ROJO", RED, sans(14 * k + 5), k, W); g.globalAlpha = 1;
}
