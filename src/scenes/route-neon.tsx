import { useEffect, useRef } from "react";
import { loadJSON } from "@/lib/map";
import type { Routing } from "@/lib/types";
import { badge, tagPill } from "@/scenes/neon-map";

/* Caso UPS · ORION, sobre calles reales de Resistencia (OpenStreetMap) y las rutas calculadas con OSRM.
   intro      · la ruta optimizada con un camión
   problema   · 1 aparecen las paradas · 2 todos los órdenes posibles: ¿cuál es el mejor?
   resistencia· 1 la ruta "a ojo" (55,6 km) · 2 la optimizada (41,1 km)
   logistica  · 1 entra un pedido nuevo · 2 la ruta se recalcula
   aplicar    · cómo lo aplicaríamos, por capas: 1 clientes · 2 zonas por camión · 3 mejor ruta · 4 flota en vivo · 5 reglas · 6 dónde crecer */

export type RouteScene = "intro" | "problema" | "resistencia" | "logistica" | "aplicar";
type Streets = { bbox: [number, number, number, number]; streets: number[][][] };

const CORAL = "#ff7a59", MINT = "#3cf2b5", AMBER = "#f5b31b", GREEN = "#22c55e";
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const ease = (u: number) => 1 - Math.pow(1 - clamp(u), 3);
const KX = Math.cos((27.46 * Math.PI) / 180);
const NEW_ORDER: [number, number] = [-58.972, -27.472];

let cache: Promise<[Routing, Streets]> | null = null;
const load = () => (cache ??= Promise.all([loadJSON<Routing>("/data/routing.json"), loadJSON<Streets>("/data/resistencia-streets.json")]));

export function RouteMap({ scene, step }: { scene: RouteScene; step: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const st = useRef({ step, at: performance.now() });
  if (st.current.step !== step) st.current = { step, at: performance.now() };

  useEffect(() => {
    const cv = ref.current!, g = cv.getContext("2d")!;
    let raf = 0, W = 0, H = 0, DPR = 1, data: [Routing, Streets] | null = null, alive = true;
    const fit = () => { DPR = window.devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W * DPR; cv.height = H * DPR; };
    const ro = new ResizeObserver(fit); ro.observe(cv); fit();
    load().then((d) => { if (alive) data = d; });
    const t0 = performance.now();
    const mono = (px: number) => `600 ${px}px "Geist Mono", ui-monospace, monospace`;
    const sans = (px: number, w = 700) => `${w} ${px}px Geist, ui-sans-serif, sans-serif`;
    // ordenes al azar (fijos) para la "maraña" del problema
    const rnd = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
    const SHUFFLES = Array.from({ length: 26 }, () => { const o = Array.from({ length: 14 }, (_, i) => i); for (let i = o.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [o[i], o[j]] = [o[j], o[i]]; } return o; });

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!data) return;
      const [R, S] = data;
      const t = (now - t0) / 1000, s = st.current.step, ts = (now - st.current.at) / 1000;
      const since = (n: number, dur: number) => (s > n ? 1 : s === n ? ease(ts / dur) : 0);
      g.setTransform(DPR, 0, 0, DPR, 0, 0); g.clearRect(0, 0, W, H);
      const k = Math.min(W, H) / 800;
      const [x0, y0, x1, y1] = S.bbox, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const U = Math.min(W / ((x1 - x0) * KX * 1.02), H / ((y1 - y0) * 1.02));
      const P = (lon: number, lat: number): [number, number] => [W / 2 + (lon - cx) * KX * U, H / 2 - (lat - cy) * U];

      // ── calles
      const SW = [[2.4, 0.5], [1.6, 0.36], [1.2, 0.26], [0.7, 0.16]];
      S.streets.forEach((cls, r) => {
        g.beginPath();
        for (const f of cls) for (let i = 0; i < f.length; i += 2) { const [x, y] = P(f[i], f[i + 1]); i ? g.lineTo(x, y) : g.moveTo(x, y); }
        g.strokeStyle = `rgba(147,197,253,${SW[r][1]})`; g.lineWidth = SW[r][0] * k; g.stroke();
      });

      const stops = R.stops.map((p) => P(p.lng, p.lat)), dep = P(R.depot[0], R.depot[1]);
      const route = (geom: number[][], col: string, w: number, upto = 1) => {
        const n = Math.max(2, Math.floor(geom.length * upto));
        g.save(); g.shadowColor = col; g.shadowBlur = 16 * k; g.strokeStyle = col; g.lineWidth = w * k; g.lineJoin = "round"; g.lineCap = "round";
        g.beginPath(); for (let i = 0; i < n; i++) { const [x, y] = P(geom[i][0], geom[i][1]); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
        return geom[n - 1];
      };
      const truck = (lon: number, lat: number, col: string) => {
        const [x, y] = P(lon, lat), h = g.createRadialGradient(x, y, 0, x, y, 24 * k); h.addColorStop(0, col + "aa"); h.addColorStop(1, col + "00");
        g.fillStyle = h; g.beginPath(); g.arc(x, y, 24 * k, 0, Math.PI * 2); g.fill();
        g.fillStyle = "#fff"; g.beginPath(); g.arc(x, y, 6 * k, 0, Math.PI * 2); g.fill();
      };
      const drawStops = (a = 1, done?: (i: number) => boolean) => {
        g.globalAlpha = a;
        stops.forEach(([x, y], i) => { g.fillStyle = done?.(i) ? MINT : "#e2e8f0"; g.beginPath(); g.arc(x, y, 6.5 * k, 0, Math.PI * 2); g.fill(); g.strokeStyle = "#0e131c"; g.lineWidth = 2; g.stroke(); });
        const [dx, dy] = dep; g.fillStyle = AMBER; g.beginPath(); g.moveTo(dx - 11 * k, dy + 8 * k); g.lineTo(dx - 11 * k, dy - 3 * k); g.lineTo(dx, dy - 12 * k); g.lineTo(dx + 11 * k, dy - 3 * k); g.lineTo(dx + 11 * k, dy + 8 * k); g.closePath(); g.fill();
        g.globalAlpha = 1;
      };

      if (scene === "intro") {
        route(R.optimized.geometry, MINT, 3.4);
        const [lon, lat] = R.optimized.geometry[Math.floor(((t * 0.05) % 1) * (R.optimized.geometry.length - 1))];
        drawStops(0.9); truck(lon, lat, MINT);
      }
      if (scene === "problema") {
        const a1 = since(1, 0.8), a2 = since(2, 0.8);
        if (a2 > 0) {
          const pts = [dep, ...stops];
          SHUFFLES.forEach((o, j) => {
            const phase = (t * 0.6 + j * 0.37) % 1;
            g.strokeStyle = `rgba(255,122,89,${0.18 * a2 * (0.4 + 0.6 * Math.sin(phase * Math.PI))})`; g.lineWidth = 1.4 * k;
            g.beginPath(); g.moveTo(...pts[0]); for (const i of o) g.lineTo(...pts[i + 1]); g.lineTo(...pts[0]); g.stroke();
          });
          g.globalAlpha = a2; badge(g, W / 2, H * 0.16, "¿CUÁL ES EL MEJOR ORDEN?", CORAL, sans(16 * k + 5), k, W); g.globalAlpha = 1;
        }
        if (a1 > 0) { drawStops(a1); g.globalAlpha = a1; tagPill(g, dep[0], dep[1] + 26 * k, "DEPÓSITO", mono(10 * k + 3), k, AMBER); g.globalAlpha = 1; }
      }
      if (scene === "resistencia") {
        const a1 = since(1, 2.2), a2 = since(2, 2.2);
        if (a1 > 0) route(R.naive.geometry, a2 > 0 ? "rgba(255,122,89,0.45)" : CORAL, a2 > 0 ? 2.4 : 3.2, a1);
        if (a2 > 0) route(R.optimized.geometry, MINT, 3.6, a2);
        drawStops(1);
        if (a1 > 0) { g.globalAlpha = a1; kmBox(g, W * 0.12, H * 0.2, "A OJO", (R.naive.km * a1).toFixed(1).replace(".", ","), CORAL, k, sans, mono); g.globalAlpha = 1; }
        if (a2 > 0) { g.globalAlpha = a2; kmBox(g, W * 0.12, H * 0.2 + 130 * k, "OPTIMIZADA", (R.optimized.km * a2).toFixed(1).replace(".", ","), MINT, k, sans, mono); badge(g, W * 0.12 + 115 * k, H * 0.2 + 380 * k, `−${Math.round((1 - R.optimized.km / R.naive.km) * 100)} % DE KILÓMETROS`, GREEN, sans(14 * k + 5), k, W); g.globalAlpha = 1; }
      }
      if (scene === "aplicar") {
        const geom = R.optimized.geometry;
        // 2 · zonas por camión: los comercios repartidos en 3 sectores alrededor del depósito
        const zoneA = since(2, 0.9);
        // los comercios ordenados por ángulo alrededor del depósito y repartidos en 3 grupos iguales
        const order = stops.map((p, i) => ({ i, a: Math.atan2(p[1] - dep[1], p[0] - dep[0]) })).sort((x, y) => x.a - y.a).map((o) => o.i);
        const sectorOf: number[] = []; order.forEach((idx, j) => (sectorOf[idx] = Math.min(2, Math.floor((j * 3) / order.length))));
        const sector = (i: number) => sectorOf[i];
        const ZC = ["59,130,246", "34,197,94", "245,179,27"];
        const hull = (pts: [number, number][]) => {
          const P2 = [...pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
          const cr = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
          const lo: [number, number][] = [], up: [number, number][] = [];
          for (const p of P2) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
          for (const p of [...P2].reverse()) { while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
          return lo.slice(0, -1).concat(up.slice(0, -1));
        };
        if (zoneA > 0) {
          for (let z = 0; z < 3; z++) {
            const pts = stops.filter((_, i) => sector(i) === z).concat([dep]) as [number, number][];
            const h = hull(pts), cx = h.reduce((a, p) => a + p[0], 0) / h.length, cy = h.reduce((a, p) => a + p[1], 0) / h.length;
            g.beginPath(); h.forEach(([x, y], i) => { const d = Math.hypot(x - cx, y - cy) || 1, ex = x + ((x - cx) / d) * 22 * k, ey = y + ((y - cy) / d) * 22 * k; i ? g.lineTo(ex, ey) : g.moveTo(ex, ey); }); g.closePath();
            g.fillStyle = `rgba(${ZC[z]},${0.13 * zoneA})`; g.fill();
            g.save(); g.lineJoin = "round"; g.shadowColor = `rgb(${ZC[z]})`; g.shadowBlur = 12 * k; g.strokeStyle = `rgba(${ZC[z]},${0.9 * zoneA})`; g.lineWidth = 2.4 * k; g.stroke(); g.restore();
          }
        }
        // 3 · la mejor ruta
        const routeA = since(3, 2.0);
        if (routeA > 0) route(geom, MINT, 3.2, routeA);
        // 1 · clientes en el mapa
        const cl = since(1, 0.9);
        if (cl > 0) {
          stops.forEach(([x, y], i) => { const a = clamp(cl * 2 - i * 0.07); g.globalAlpha = a; g.fillStyle = zoneA > 0 ? `rgb(${ZC[sector(i)]})` : "#e2e8f0"; g.beginPath(); g.arc(x, y, 7 * k, 0, Math.PI * 2); g.fill(); g.strokeStyle = "#0e131c"; g.lineWidth = 2; g.stroke(); });
          g.globalAlpha = 1;
        }
        const [dx, dy] = dep; g.fillStyle = AMBER; g.beginPath(); g.moveTo(dx - 12 * k, dy + 9 * k); g.lineTo(dx - 12 * k, dy - 3 * k); g.lineTo(dx, dy - 13 * k); g.lineTo(dx + 12 * k, dy - 3 * k); g.lineTo(dx + 12 * k, dy + 9 * k); g.closePath(); g.fill();
        tagPill(g, dx, dy + 28 * k, "DEPÓSITO", mono(10 * k + 3), k, AMBER);
        // 4 · la flota en vivo (y 5 · la regla: calle cortada)
        const live = s >= 4, rule = s >= 5;
        const CUT = 0.55, cutIdx = Math.floor(CUT * (geom.length - 1)), [kx, ky] = P(geom[cutIdx][0], geom[cutIdx][1]);
        if (rule) {
          const a = since(5, 0.6);
          g.globalAlpha = a; g.fillStyle = "rgba(239,68,68,0.25)"; g.beginPath(); g.arc(kx, ky, 22 * k, 0, Math.PI * 2); g.fill();
          g.strokeStyle = "#ef4444"; g.lineWidth = 4 * k; g.beginPath(); g.moveTo(kx - 10 * k, ky - 10 * k); g.lineTo(kx + 10 * k, ky + 10 * k); g.moveTo(kx + 10 * k, ky - 10 * k); g.lineTo(kx - 10 * k, ky + 10 * k); g.stroke(); g.globalAlpha = 1;
        }
        if (live) {
          let f = ((t * 0.045) % 1);
          if (rule && f > CUT - 0.04 && f < CUT + 0.12) f = CUT - 0.04;           // la regla lo frena antes de la calle cortada
          const idx = Math.floor(f * (geom.length - 1)), [lon, lat] = geom[idx], [tx, ty] = P(lon, lat);
          const ping = (t * 1.2) % 1; g.strokeStyle = `rgba(60,242,181,${0.7 * (1 - ping)})`; g.lineWidth = 2 * k; g.beginPath(); g.arc(tx, ty, 8 * k + ping * 26 * k, 0, Math.PI * 2); g.stroke();
          truck(lon, lat, MINT);
          if (rule && f === CUT - 0.04) badge(g, tx, ty, "CALLE CORTADA: ALERTA Y DESVÍO", GREEN, sans(13 * k + 5), k, W);
          else if (s === 4) badge(g, tx, ty, "EN VIVO", MINT, sans(12 * k + 5), k, W);
        }
        // 6 · dónde crecer: un segundo depósito y lo que alcanza en 15 minutos
        const grow = since(6, 1.2);
        if (grow > 0) {
          const [gx, gy] = P(-59.026, -27.437);
          g.fillStyle = `rgba(169,139,255,${0.12 * grow})`; g.beginPath(); g.arc(gx, gy, 150 * k * grow, 0, Math.PI * 2); g.fill();
          g.save(); g.setLineDash([8 * k, 6 * k]); g.strokeStyle = `rgba(169,139,255,${0.9 * grow})`; g.lineWidth = 2.4 * k; g.stroke(); g.restore();
          g.fillStyle = "#a98bff"; g.beginPath(); g.moveTo(gx - 12 * k, gy + 9 * k); g.lineTo(gx - 12 * k, gy - 3 * k); g.lineTo(gx, gy - 13 * k); g.lineTo(gx + 12 * k, gy - 3 * k); g.lineTo(gx + 12 * k, gy + 9 * k); g.closePath(); g.fill();
          g.globalAlpha = grow; badge(g, gx, gy - 6 * k, "¿UN SEGUNDO DEPÓSITO ACÁ?", "#7c3aed", sans(13 * k + 5), k, W); g.globalAlpha = 1;
        }
      }
      if (scene === "logistica") {
        const a1 = since(1, 0.6), a2 = since(2, 1.4);
        route(R.optimized.geometry, a2 > 0 ? "rgba(60,242,181,0.35)" : MINT, 3);
        const geom = R.optimized.geometry, f = 0.42, idx = Math.floor(f * (geom.length - 1));
        drawStops(1, (i) => i < 6);
        const [tx, ty] = P(geom[idx][0], geom[idx][1]), [nx, ny] = P(...NEW_ORDER);
        if (a1 > 0) {
          const pulse = 1 + 0.25 * Math.sin(t * 5);
          g.globalAlpha = a1; g.fillStyle = AMBER; g.beginPath(); g.arc(nx, ny, 8 * k * pulse, 0, Math.PI * 2); g.fill();
          g.strokeStyle = `rgba(245,179,27,${0.6 * a1})`; g.lineWidth = 2 * k; g.beginPath(); g.arc(nx, ny, 18 * k * pulse, 0, Math.PI * 2); g.stroke();
          if (a2 === 0) badge(g, nx, ny, "NUEVO PEDIDO", AMBER, sans(14 * k + 5), k, W);
          g.globalAlpha = 1;
        }
        if (a2 > 0) {
          g.save(); g.shadowColor = MINT; g.shadowBlur = 16 * k; g.strokeStyle = MINT; g.lineWidth = 3.6 * k; g.lineCap = "round";
          const mx = (tx + nx) / 2, my = Math.min(ty, ny) - 20 * k;
          g.beginPath(); g.moveTo(tx, ty); g.quadraticCurveTo(mx, my, lerp(tx, nx, a2), lerp(ty, ny, a2)); g.stroke(); g.restore();
          badge(g, nx, ny, "RUTA RECALCULADA EN SEGUNDOS", GREEN, sans(14 * k + 5), k, W);
        }
        truck(geom[idx][0], geom[idx][1], MINT);
      }
    };
    raf = requestAnimationFrame(frame);
    return () => { alive = false; cancelAnimationFrame(raf); ro.disconnect(); };
  }, [scene]);

  return <canvas ref={ref} className="absolute inset-0 size-full" aria-hidden />;
}

function kmBox(g: CanvasRenderingContext2D, x: number, y: number, label: string, km: string, col: string, k: number, sans: (px: number, w?: number) => string, mono: (px: number) => string) {
  g.fillStyle = "rgba(14,19,28,0.9)"; g.strokeStyle = col; g.lineWidth = 2.5 * k; g.beginPath(); g.roundRect(x, y, 230 * k, 110 * k, 14 * k); g.fill(); g.stroke();
  g.font = mono(11 * k + 3); g.fillStyle = col; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(label, x + 18 * k, y + 24 * k);
  g.font = sans(40 * k + 6, 800); g.fillStyle = "#fff"; g.fillText(`${km} km`, x + 18 * k, y + 70 * k);
}
