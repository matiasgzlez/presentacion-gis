import { Plane, Warehouse, Package, MapPin } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, NEON } from "@/components/neon";
import { BackgroundVideo } from "@/components/bg-video";
import { Photo, PhotoPage } from "@/components/photo-page";
import { ExplainSlide } from "@/components/explain";
import { GisSlide, type Station } from "@/components/journey";
import { RouteMap } from "@/scenes/route-neon";
import { OrionHow } from "@/scenes/orion-how";
import { LeftTurn } from "@/scenes/left-turn";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 03 · UPS · ORION. Lo distinto de este caso: EL ORDEN EXACTO de las paradas (optimización pura).
   Portada → ¿Quién es? (fotos: acá se conoce poco) → el GIS detrás de cada entrega → ¿cómo funciona ORION? → el resultado (nuestro video).
   Lo que se dice está en exposicion.md. Fotos: Wikimedia Commons (ver README). */

const LOGO = "/logos/ups.png";
export const UPS_VIDEO: CaseVideo = { title: "UPS ORION (On-Road Integrated Optimization and Navigation)", youtube: "0jLAdTC7_TY" };
const L = { logo: LOGO };
const AMBER = NEON.amber;

const Intro = () => <CaseIntro id="ups" {...L} n="03" company="UPS · ORION" title="Rutas" pill="El mejor orden de paradas para cada camión" bg={<RouteMap scene="intro" step={0} />} />;

const Quien = () => (
  <PhotoPage
    id="ups-quien"
    {...L}
    pill="¿Quién es?"
    name="UPS"
    color={AMBER}
    part="La de los camiones marrones"
    points={[
      { b: "Qué hace", t: <>lleva paquetes por todo el mundo.</> },
      { b: "Desde 1907", t: <>nació en Seattle, Estados Unidos.</> },
      { b: "20,8 millones", t: <>de paquetes por día.</> },
      { b: "Worldport", t: <>su centro clasifica <b>416.000 paquetes por hora</b>.</> },
    ]}
    right={
      <div className="grid size-full grid-cols-2 grid-rows-[1.25fr_1fr] gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/photos/ups/camion.jpg" className="col-span-2 min-h-0" caption="Un camión de reparto de UPS" />
        <Photo src="/photos/ups/worldport.jpg" className="min-h-0" caption="Worldport, Louisville (EE. UU.)" />
        <Photo src="/photos/ups/interior.jpg" className="min-h-0" caption="Los paquetes, en el orden de las paradas" />
      </div>
    }
  />
);

const ENTREGA: Station[] = [
  { icon: Plane, b: "Viaja" },
  { icon: Warehouse, b: "Se clasifica" },
  { icon: Package, b: "Se carga" },
  { icon: MapPin, b: "Se entrega" },
];

const DondeGis = () => (
  <GisSlide
    id="ups-donde-gis"
    {...L}
    name="UPS"
    color={AMBER}
    title="El GIS detrás de cada entrega"
    stations={ENTREGA}
    questions={[{ at: [3, 4], fn: "Optimización de rutas", q: "¿En qué orden visitar las 120 paradas del día?", c: NEON.blue }]}
  />
);

const Como = () => (
  <ExplainSlide
    id="ups-orion-como"
    {...L}
    pill="La función GIS clave"
    title="¿Cómo funciona ORION?"
    question={<>Elige <b>el orden de las paradas</b> de cada camión.</>}
    color={NEON.blue}
    points={[
      { b: "Los datos", t: <>paquetes, calles y horarios.</> },
      { b: "No prueba todos", t: <>son más que <b>átomos en el universo</b>.</> },
      { b: "Arma y mejora", t: <>una ruta, y la corrige de a pedazos.</> },
      { b: "Al chofer", t: <>la ruta, en su aparato.</> },
    ]}
    techs={[
      { name: "Mapa de calles", gis: true },
      { name: "Geocodificación", gis: true },
      { name: "Optimización de rutas", gis: true },
    ]}
    scene={(s) => <OrionHow step={s} />}
  />
);

const Izquierda = () => (
  <ExplainSlide
    id="ups-izquierda"
    {...L}
    pill="Lo más famoso de UPS"
    title="Doblar a la izquierda cuesta"
    question={<>ORION le pone una <b>penalidad de tiempo</b> a cada giro a la izquierda.</>}
    color={NEON.amber}
    points={[
      { b: "A la izquierda", t: <>hay que <b>esperar y cruzar</b> el tránsito.</> },
      { b: "Tres a la derecha", t: <>se rodea la manzana <b>sin frenar</b>.</> },
    ]}
    techs={[
      { name: "Mapa de calles", gis: true },
      { name: "Optimización de rutas", gis: true },
    ]}
    scene={(s) => <LeftTurn step={s} />}
  />
);

const Resultado = () => (
  <ExplainSlide
    id="ups-orion"
    {...L}
    pill="El resultado"
    title="A ojo vs. ORION"
    question={<>El mismo camión y las mismas paradas.</>}
    color={NEON.green}
    points={[
      { b: "1 milla menos", t: <>por chofer = <b>US$ 50 M</b> al año.</> },
      { b: "100 millones de millas", t: <>menos por año (unos 160 millones de km).</> },
      { b: "En total", t: <><b>US$ 300 a 400 M</b> por año.</> },
    ]}
    techs={[{ name: "ORION", gis: true }]}
    scene={() => <BackgroundVideo src="/videos/ups-orion.mp4" className="object-contain" />}
  />
);

export const UPS_SLIDES: DeckSlide[] = [
  { id: "ups", label: "UPS · Rutas", C: Intro },
  { id: "ups-quien", label: "UPS · ¿Quién es?", C: Quien },
  { id: "ups-donde-gis", label: "UPS · El GIS detrás de cada entrega", steps: 1, C: DondeGis },
  { id: "ups-orion-como", label: "UPS · ¿Cómo funciona ORION?", steps: 4, phase: 6000, C: Como },
  { id: "ups-izquierda", label: "UPS · Doblar a la izquierda cuesta", steps: 2, phase: 5500, C: Izquierda },
  { id: "ups-orion", label: "UPS · El resultado", steps: 3, phase: 3500, C: Resultado },
];
