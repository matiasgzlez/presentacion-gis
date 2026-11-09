import { Smartphone, UserCheck, Navigation, MapPin } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, NEON } from "@/components/neon";
import { ExplainSlide } from "@/components/explain";
import { GisSlide, type Station } from "@/components/journey";
import { H3Scene } from "@/scenes/h3";
import { UberMatch } from "@/scenes/uber-match";
import { H3Explain } from "@/scenes/h3-explain";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 02 · Uber · cómo funciona por dentro y dónde usa el GIS.
   Sin fotos ni "quién es" (todos la conocen): portada → dónde entra el GIS en un pedido → decisión 1 (hexágonos H3)
   → decisión 2 (quién lleva el pedido). Las animaciones corren solas en bucle. Lo que se dice está en exposicion.md. */

const LOGO = "/logos/uber.png";
export const UBER_VIDEO: CaseVideo = { title: "H3: Tiling the Earth with Hexagons (Uber Engineering)", youtube: "ay2uwtRO3QE" };
const L = { logo: LOGO };
const WHITE = "#e5e7eb";

const Intro = () => <CaseIntro id="uber" {...L} n="02" company="Uber" title="Hexágonos" pill="¿Qué pasa por dentro cuando pedís un Uber?" bg={<H3Scene priceLabel={false} />} />;

/** El recorrido de un pedido (viaje o comida), solo con íconos. */
const PEDIDO: Station[] = [
  { icon: Smartphone, b: "Pedís" },
  { icon: UserCheck, b: "Elige quién va" },
  { icon: Navigation, b: "Va en camino" },
  { icon: MapPin, b: "Llega" },
];

const DondeGis = () => (
  <GisSlide
    id="uber-donde-gis"
    {...L}
    name="Uber"
    color={WHITE}
    title="El GIS detrás de cada viaje"
    stations={PEDIDO}
    questions={[
      { at: [1], fn: "Análisis por hexágonos", q: "¿Dónde faltan autos?", c: NEON.amber },
      { at: [2, 3], fn: "Ruteo y tiempo de llegada", q: "¿Qué auto lleva el pedido?", c: NEON.green },
    ]}
  />
);

const QueEsH3 = () => (
  <ExplainSlide
    id="uber-que-es-h3"
    {...L}
    pill="La base de todo"
    title="¿Qué es H3?"
    question={<>El sistema de Uber para <b>partir el planeta en hexágonos</b>. Lo liberó gratis en 2018.</>}
    color={NEON.blue}
    points={[
      { b: "Hexágonos", t: <>el mapa, en celdas iguales.</> },
      { b: "Un código", t: <>cada hexágono tiene su número.</> },
      { b: "Vecinos iguales", t: <>los 6 vecinos, a la misma distancia.</> },
      { b: "16 tamaños", t: <>cada uno tiene <b>7 más chicos</b> adentro.</> },
    ]}
    techs={[
      { name: "H3", gis: true },
      { name: "Índice espacial", gis: true },
    ]}
    scene={(s) => <H3Explain step={s} />}
  />
);

const Hexagonos = () => (
  <ExplainSlide
    id="uber-h3"
    {...L}
    pill="Función GIS 1"
    title="Análisis por hexágonos"
    question={<><b>¿Dónde faltan autos?</b> Compara pedidos y autos libres en cada hexágono.</>}
    color={NEON.amber}
    points={[
      { b: "Hexágonos", t: <>la ciudad se parte en <b>hexágonos iguales</b>.</> },
      { b: "Pedidos", t: <>la <b>altura</b> es cuántos pedidos hay.</> },
      { b: "Color", t: <><b>verde</b> alcanza; <b>naranja o rojo</b>, faltan autos y sube el precio.</> },
    ]}
    techs={[
      { name: "H3", gis: true },
      { name: "GPS", gis: true },
      { name: "Precio dinámico" },
    ]}
    scene={(s) => <H3Scene step={s} />}
  />
);

const Asignar = () => (
  <ExplainSlide
    id="uber-asignar"
    {...L}
    pill="Función GIS 2"
    title="Ruteo y tiempo de llegada"
    question={<><b>¿Qué auto lleva el pedido?</b> No el más cercano: el que llega antes.</>}
    color={NEON.green}
    points={[
      { b: "Llega un pedido", t: <>con su ubicación.</> },
      { b: "Busca cerca", t: <>autos libres en los <b>hexágonos de al lado</b>.</> },
      { b: "Mide por las calles", t: <>A está más cerca, pero hay <b>un río</b>.</> },
      { b: "Elige", t: <>va B y la app muestra <b>cuánto tarda</b>.</> },
    ]}
    techs={[
      { name: "H3", gis: true },
      { name: "Ruteo", gis: true },
      { name: "Asignación" },
    ]}
    scene={(s) => <UberMatch step={s} />}
  />
);

export const UBER_SLIDES: DeckSlide[] = [
  { id: "uber", label: "Uber · Hexágonos", C: Intro },
  { id: "uber-donde-gis", label: "Uber · El GIS detrás de cada viaje", steps: 2, phase: 4500, C: DondeGis },
  { id: "uber-que-es-h3", label: "Uber · ¿Qué es H3?", steps: 4, phase: 4500, C: QueEsH3 },
  { id: "uber-h3", label: "Uber · Análisis por hexágonos", steps: 3, phase: 4500, C: Hexagonos },
  { id: "uber-asignar", label: "Uber · Ruteo y tiempo de llegada", steps: 4, phase: 4500, C: Asignar },
];
