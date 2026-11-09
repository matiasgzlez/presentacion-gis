import { Warehouse, Package, ScanLine, Truck } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, NEON } from "@/components/neon";
import { GisSlide, JourneySlide, type Station } from "@/components/journey";
import { ExplainSlide } from "@/components/explain";
import { ArgMap } from "@/scenes/arg-neon";
import { MeliRoutes } from "@/scenes/meli-routes";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 01 · Mercado Libre · cómo usa el GIS en su logística.
   El hilo: 1 el viaje de un paquete (fotos reales) → 2 en qué partes del viaje entra el GIS → 3 decisión 1: dónde poner un centro
   → 4 decisión 2: las rutas del día. Cada decisión muestra las tecnologías que usa ahí mismo.
   No se explica quién es (todos la conocen). Las animaciones corren solas en bucle. Lo que se dice está en exposicion.md.
   Fotos: prensa de Mercado Libre (vía The Logistics World, 2023) y Gobierno de São Paulo (Wikimedia Commons, CC BY 2.0). */

const LOGO = "/logos/mercadolibre.png";
export const MELI_VIDEO: CaseVideo = { title: "Así funciona el centro logístico de Mercado Libre en Cyber Monday (A24)", youtube: "kpDNNx3uju0" };
const L = { logo: LOGO };
const AMBER = NEON.amber, GREEN = NEON.green;

const Intro = () => <CaseIntro id="mercadolibre" {...L} n="01" company="Mercado Libre" title="Depósitos y rutas" pill="¿Cómo llega rápido tu compra?" bg={<ArgMap scene="intro" step={0} />} />;

/* ── 1 · El viaje de un paquete ── */
const VIAJE: Station[] = [
  { icon: Warehouse, b: "Se guarda", t: <>en un <b>centro de distribución</b>, antes de venderse.</>, img: "/photos/meli/centro-cajamar.jpg", cap: "Centro de distribución de Cajamar, São Paulo" },
  { icon: Package, b: "Se prepara", t: <>alguien compra: se <b>embala y se etiqueta</b>.</>, img: "/photos/meli/preparar.jpg", cap: "Preparando pedidos" },
  { icon: ScanLine, b: "Se clasifica", t: <>de noche, en el <b>centro de última milla</b>, por zona.</>, img: "/photos/meli/clasificar.jpg", cap: "Centro de última milla: cada estante es una ruta" },
  { icon: Truck, b: "Se reparte", t: <>cada camioneta, <b>+100 paquetes</b> por día.</>, img: "/photos/meli/reparto-calle.jpg", cap: "Una camioneta de Mercado Libre repartiendo" },
];

const Viaje = () => <JourneySlide id="mercadolibre-viaje" {...L} name="Mercado Libre" color={AMBER} part="El viaje de un paquete" stations={VIAJE} />;

/* ── 2 · El hilo: en qué partes del viaje entra el GIS ── */
const DondeGis = () => (
  <GisSlide
    id="mercadolibre-donde-gis"
    {...L}
    name="Mercado Libre"
    color={AMBER}
    title="El GIS detrás de cada envío"
    stations={VIAJE}
    questions={[
      { at: [1], fn: "Análisis de ubicación", q: "¿Dónde va el próximo centro?", c: GREEN },
      { at: [3, 4], fn: "Ruteo dinámico", q: "¿Cómo se arman las rutas del día?", c: AMBER },
    ]}
  />
);

/* ── 3 · Decisión 1: dónde poner un centro ── */
const Ubicacion = () => (
  <ExplainSlide
    id="mercadolibre-ubicacion"
    {...L}
    pill="Función GIS 1"
    title="Análisis de ubicación"
    question={<>Ya tiene un centro en Buenos Aires. <b>¿Dónde va el próximo?</b></>}
    color={GREEN}
    points={[
      { b: "Compradores", t: <>dónde vive la gente.</> },
      { b: "Rutas", t: <>por dónde van los camiones.</> },
      { b: "Un día de camión", t: <>hasta dónde llega desde cada ciudad.</> },
      { b: "Se elige", t: <>gana <b>Córdoba</b>: suma más gente nueva.</> },
    ]}
    techs={[
      { name: "Capas", gis: true },
      { name: "Isócronas", gis: true },
      { name: "Análisis de ubicación", gis: true },
    ]}
    scene={(s) => <ArgMap scene="ubicacion" step={s} />}
  />
);

/* ── 4 · Decisión 2: las rutas del día ── */
const Rutas = () => (
  <ExplainSlide
    id="mercadolibre-rutas"
    {...L}
    pill="Función GIS 2"
    title="Ruteo dinámico"
    question={<>De madrugada: <b>¿cómo se reparten los paquetes del día?</b></>}
    color={AMBER}
    points={[
      { b: "Cada compra, un punto", t: <>la dirección, en el mapa.</> },
      { b: "Zonas", t: <>una zona por camioneta.</> },
      { b: "Orden", t: <>el mejor recorrido, con el tránsito.</> },
      { b: "Recalcula", t: <>si se corta una calle.</> },
    ]}
    techs={[
      { name: "Geocodificación", gis: true },
      { name: "Ruteo dinámico", gis: true },
      { name: "Aprendizaje automático" },
    ]}
    scene={(s) => <MeliRoutes step={s} />}
  />
);

export const MELI_SLIDES: DeckSlide[] = [
  { id: "mercadolibre", label: "Mercado Libre · Depósitos y rutas", C: Intro },
  { id: "mercadolibre-viaje", label: "Mercado Libre · El viaje de un paquete", steps: 4, phase: 4200, C: Viaje },
  { id: "mercadolibre-donde-gis", label: "Mercado Libre · El GIS detrás de cada envío", steps: 2, phase: 5000, C: DondeGis },
  { id: "mercadolibre-ubicacion", label: "Mercado Libre · Análisis de ubicación", steps: 4, phase: 4500, C: Ubicacion },
  { id: "mercadolibre-rutas", label: "Mercado Libre · Ruteo dinámico", steps: 4, phase: 4500, C: Rutas },
];
