import { Map as MLMap, setWorkerUrl, type Map, type MapOptions } from "maplibre-gl";
// MapLibre 6 carga su worker aparte: Vite lo empaqueta y le pasamos la URL final (dev y producción).
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
setWorkerUrl(workerUrl);
import { useEffect, useRef, useState, type RefObject } from "react";

/* Mapa base oscuro de CARTO (datos © OpenStreetMap). Sin API key. */
export const BASE_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export const C = {
  mint: "#3cf2b5",
  coral: "#ff7a59",
  amber: "#ffc24b",
  sky: "#5ab4ff",
  violet: "#a98bff",
  snow: "#eaf0fb",
  night: "#060a12",
};

/** true cuando el elemento está cerca del viewport (y queda en true). */
export function useNear(ref: RefObject<Element | null>, margin = "60%") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setNear(true), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}

/** Crea un mapa MapLibre dentro de `ref` cuando la sección se acerca. */
export function useMapLibre(
  ref: RefObject<HTMLDivElement | null>,
  options: Omit<MapOptions, "container" | "style"> & { style?: MapOptions["style"] },
  onLoad?: (map: Map) => void | (() => void),
) {
  const near = useNear(ref);
  const mapRef = useRef<Map | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!near || !ref.current) return;
    const map = new MLMap({
      container: ref.current,
      style: BASE_STYLE,
      attributionControl: { compact: true },
      scrollZoom: false,
      keyboard: false,
      dragRotate: false,
      pitchWithRotate: false,
      fadeDuration: 0,
      ...options,
    });
    mapRef.current = map;
    let cleanup: void | (() => void);
    map.on("load", () => {
      cleanup = onLoad?.(map);
      setReady(true);
    });
    return () => {
      cleanup?.();
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near]);
  return { map: mapRef, ready };
}

export async function loadJSON<T>(url: string): Promise<T> {
  const r = await fetch(url);
  return r.json() as Promise<T>;
}

/** Recorta una polilínea a la fracción t (0..1) de su largo. */
export function sliceLine(coords: number[][], t: number) {
  if (t >= 1) return coords;
  const seg: number[] = [];
  let total = 0;
  for (let i = 1; i < coords.length; i++) {
    const d = Math.hypot(coords[i][0] - coords[i - 1][0], coords[i][1] - coords[i - 1][1]);
    seg.push(d);
    total += d;
  }
  let target = total * Math.max(0, t);
  const out = [coords[0]];
  for (let i = 1; i < coords.length; i++) {
    if (target <= seg[i - 1]) {
      const f = seg[i - 1] ? target / seg[i - 1] : 0;
      out.push([coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * f, coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * f]);
      return out;
    }
    target -= seg[i - 1];
    out.push(coords[i]);
  }
  return out;
}

export function pointAt(coords: number[][], t: number) {
  const s = sliceLine(coords, t);
  return s[s.length - 1];
}

export const line = (coordinates: number[][]) => ({
  type: "Feature" as const,
  properties: {},
  geometry: { type: "LineString" as const, coordinates },
});

export const points = (pts: { lng: number; lat: number; [k: string]: unknown }[]) => ({
  type: "FeatureCollection" as const,
  features: pts.map(({ lng, lat, ...p }) => ({ type: "Feature" as const, properties: p, geometry: { type: "Point" as const, coordinates: [lng, lat] } })),
});
