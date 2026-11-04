import { useRef, useState } from "react";
import { motion } from "motion/react";
import type { GeoJSONSource } from "maplibre-gl";
import { C, line, loadJSON, pointAt, useMapLibre } from "@/lib/map";
import type { H3Data, Routing } from "@/lib/types";
import { Slide } from "@/components/ui";
import { BackgroundVideo } from "@/components/bg-video";

export const TEAM = {
  materia: "Sistemas de Información Geográfica",
  integrantes: "Gonzalez Matias · Lima Matias · Gaston Lovera",
  fecha: "Noviembre 2026",
};

/** Video de fondo de la portada. Si el archivo no existe, se muestra el mapa animado. */
const HERO_VIDEO = "/videos/hero.mp4";
const HERO_POSTER = "/videos/hero-poster.jpg";

export function Hero() {
  const [videoOk, setVideoOk] = useState(true);
  return (
    <Slide id="inicio" bleed className="overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        {videoOk ? <BackgroundVideo src={HERO_VIDEO} poster={HERO_POSTER} className="object-cover object-[72%_50%]" onError={() => setVideoOk(false)} /> : <HeroMap />}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_55%,rgb(6_10_18/0.92)_0%,rgb(6_10_18/0.7)_40%,rgb(6_10_18/0.15)_75%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" />
      <div className="relative z-10 px-[clamp(1rem,5vw,6rem)] pt-24">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {TEAM.materia} · {TEAM.fecha}
        </motion.p>
        <motion.h1
          className="display mt-6 text-[clamp(3.6rem,10vw,11rem)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          GIS en
          <br />
          <span className="text-gradient">Logística</span>
        </motion.h1>
        <motion.p
          className="mt-8 text-[clamp(1.1rem,1.6vw,1.5rem)] text-fog"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {TEAM.integrantes}
        </motion.p>
      </div>
    </Slide>
  );
}

/** Fondo alternativo: mapa de Resistencia con rutas y demanda H3. */
function HeroMap() {
  const ref = useRef<HTMLDivElement>(null);
  useMapLibre(
    ref,
    { center: [-59.04, -27.468], zoom: 12.4, pitch: 58, bearing: -20, interactive: false },
    (map) => {
      let raf = 0;
      let alive = true;
      Promise.all([loadJSON<Routing>("/data/routing.json"), loadJSON<H3Data>("/data/h3.json")]).then(([r, h]) => {
        if (!alive) return;
        map.addSource("hex", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: h.hexes.map((x) => ({ type: "Feature", properties: { d: x.demand }, geometry: { type: "Polygon", coordinates: [x.boundary] } })),
          },
        });
        map.addLayer({
          id: "hex",
          type: "fill-extrusion",
          source: "hex",
          paint: {
            "fill-extrusion-color": ["interpolate", ["linear"], ["get", "d"], 0, "#10233a", 60, "#13a77a", 120, C.mint],
            "fill-extrusion-height": ["*", ["get", "d"], 9],
            "fill-extrusion-opacity": 0.5,
          },
        });
        map.addSource("r1", { type: "geojson", data: line(r.optimized.geometry) });
        map.addSource("r2", { type: "geojson", data: line(r.naive.geometry) });
        map.addLayer({ id: "r2", type: "line", source: "r2", paint: { "line-color": C.coral, "line-width": 2, "line-opacity": 0.45 } });
        map.addLayer({ id: "r1-glow", type: "line", source: "r1", paint: { "line-color": C.mint, "line-width": 9, "line-blur": 6, "line-opacity": 0.35 } });
        map.addLayer({ id: "r1", type: "line", source: "r1", paint: { "line-color": C.mint, "line-width": 2.5 } });
        map.addSource("trucks", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        map.addLayer({ id: "trucks-halo", type: "circle", source: "trucks", paint: { "circle-radius": 14, "circle-color": ["get", "c"], "circle-opacity": 0.2, "circle-blur": 0.6 } });
        map.addLayer({ id: "trucks", type: "circle", source: "trucks", paint: { "circle-radius": 5, "circle-color": ["get", "c"], "circle-stroke-color": "#fff", "circle-stroke-width": 1.5 } });
        const t0 = performance.now();
        const tick = (now: number) => {
          const s = (now - t0) / 1000;
          const fs = [
            { g: r.optimized.geometry, c: C.mint, p: (s / 40) % 1 },
            { g: r.optimized.geometry, c: C.mint, p: (s / 40 + 0.5) % 1 },
            { g: r.naive.geometry, c: C.coral, p: (s / 52 + 0.25) % 1 },
          ].map((x) => ({ type: "Feature" as const, properties: { c: x.c }, geometry: { type: "Point" as const, coordinates: pointAt(x.g, x.p) } }));
          (map.getSource("trucks") as GeoJSONSource | undefined)?.setData({ type: "FeatureCollection", features: fs });
          map.setBearing(-20 + s * 1.2);
          raf = requestAnimationFrame(tick);
        };
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) raf = requestAnimationFrame(tick);
      });
      return () => {
        alive = false;
        cancelAnimationFrame(raf);
      };
    },
  );

  return <div ref={ref} className="h-full w-full" />;
}
