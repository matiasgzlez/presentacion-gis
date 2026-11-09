import { Smartphone, Store, Drone, ArrowDownToLine } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, NEON } from "@/components/neon";
import { Photo, PhotoPage } from "@/components/photo-page";
import { ExplainSlide } from "@/components/explain";
import { GisSlide, type Station } from "@/components/journey";
import { DroneScene } from "@/scenes/drone";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 05 · Walmart + Wing · drones. Lo distinto de este caso: la logística POR EL AIRE (el aire no tiene calles).
   Portada → ¿Quiénes son? (fotos del sitio de Wing) → el GIS detrás de cada vuelo → área de cobertura → mapa del cielo.
   Animaciones 3D en bucle. Lo que se dice está en exposicion.md. Fotos: wing.com y Wikimedia Commons (ver README). */

const LOGO = "/logos/walmart.png";
export const WALMART_VIDEO: CaseVideo = { title: "Walmart + Wing: entregas con drones", youtube: "8B1NGqM1zYk" };
const L = { logo: LOGO };
const AZUL = "#0071dc";

const Intro = () => <CaseIntro id="walmart" {...L} n="05" company="Walmart + Wing" title="Drones" pill="¿Cómo se reparte por el aire?" bg={<DroneScene mode="intro" />} />;

const Quien = () => (
  <PhotoPage
    id="walmart-quien"
    {...L}
    pill="¿Quiénes son?"
    name="Walmart + Wing"
    color={AZUL}
    part="El súper que reparte con drones"
    points={[
      { b: "Walmart", t: <>el supermercado más grande del mundo.</> },
      { b: "Wing", t: <>los drones de <b>Alphabet</b>, la dueña de Google.</> },
      { b: "Sin aterrizar", t: <>baja el paquete <b>con una cuerda</b>.</> },
      { b: "+1 millón", t: <>de entregas a casas en 2026.</> },
    ]}
    right={
      <div className="grid size-full grid-cols-2 grid-rows-[1.3fr_1fr] gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/photos/walmart/dron.jpg" className="col-span-2 min-h-0" caption="Un dron de Wing con un pedido de Walmart" />
        <Photo src="/photos/walmart/tienda.jpg" className="min-h-0" caption="La tienda es el depósito" />
        <Photo src="/photos/walmart/retiro.jpg" className="min-h-0" caption="El pedido, en la puerta" />
      </div>
    }
  />
);

const VUELO: Station[] = [
  { icon: Smartphone, b: "Pedís" },
  { icon: Store, b: "Sale de la tienda" },
  { icon: Drone, b: "Vuela" },
  { icon: ArrowDownToLine, b: "Baja con cuerda" },
];

const DondeGis = () => (
  <GisSlide
    id="walmart-donde-gis"
    {...L}
    name="Walmart + Wing"
    color={AZUL}
    title="El GIS detrás de cada vuelo"
    stations={VUELO}
    questions={[
      { at: [2], fn: "Área de cobertura", q: "¿A qué casas llega cada tienda?", c: NEON.green },
      { at: [3, 4], fn: "Mapa del cielo", q: "¿Por dónde puede volar el dron?", c: NEON.blue },
    ]}
  />
);

const Cobertura = () => (
  <ExplainSlide
    id="walmart-logistica"
    {...L}
    pill="Función GIS 1"
    title="Área de cobertura"
    question={<><b>¿A qué casas llega cada tienda?</b> El dron va y vuelve: unos 19 km en total.</>}
    color={NEON.green}
    points={[
      { b: "Un círculo por tienda", t: <>hasta dónde llega el dron.</> },
      { b: "Casas cubiertas", t: <>en verde, las que reciben en minutos.</> },
    ]}
    techs={[
      { name: "Área de influencia", gis: true },
      { name: "Análisis de cobertura", gis: true },
    ]}
    scene={(s) => <DroneScene mode="logistica" step={s} />}
  />
);

const Cielo = () => (
  <ExplainSlide
    id="walmart-mapa"
    {...L}
    pill="Función GIS 2"
    title="Mapa del cielo"
    question={<><b>El aire no tiene calles.</b> ¿Por dónde puede volar?</>}
    color={NEON.blue}
    points={[
      { b: "Radio de vuelo", t: <>desde la tienda.</> },
      { b: "Zonas prohibidas", t: <>hospital, aeropuerto.</> },
      { b: "La ruta", t: <>la que las esquiva, hasta el patio.</> },
    ]}
    techs={[
      { name: "Capas del espacio aéreo", gis: true },
      { name: "Ruteo aéreo", gis: true },
      { name: "GPS de precisión", gis: true },
    ]}
    scene={(s) => <DroneScene mode="solucion" step={s} />}
  />
);

export const WALMART_SLIDES: DeckSlide[] = [
  { id: "walmart", label: "Walmart + Wing · Drones", C: Intro },
  { id: "walmart-quien", label: "Walmart + Wing · ¿Quiénes son?", C: Quien },
  { id: "walmart-donde-gis", label: "Walmart + Wing · El GIS detrás de cada vuelo", steps: 2, phase: 4500, C: DondeGis },
  { id: "walmart-logistica", label: "Walmart + Wing · Área de cobertura", steps: 2, phase: 5000, C: Cobertura },
  { id: "walmart-mapa", label: "Walmart + Wing · Mapa del cielo", steps: 3, phase: 5000, C: Cielo },
];
