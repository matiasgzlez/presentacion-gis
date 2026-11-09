import { Warehouse, Timer, Route, BrainCircuit, CalendarDays, Globe2, Truck } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, CaseSlide, CompanySlide, NEON, TechSlide } from "@/components/neon";
import { ArgMap } from "@/scenes/arg-neon";
import { LayerStack } from "@/scenes/layers-neon";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 01 · Mercado Libre · cómo usa el GIS para decidir dónde poner sus depósitos.
   Las animaciones corren solas en bucle; a la izquierda, solo la guía. Lo que se dice está en exposicion.md. */

const LOGO = "/logos/mercadolibre.png";
export const MELI_VIDEO: CaseVideo = { title: "Así funciona el centro logístico de Mercado Libre en Cyber Monday (A24)", youtube: "kpDNNx3uju0" };
const L = { logo: LOGO };

const Intro = () => <CaseIntro id="mercadolibre" {...L} n="01" company="Mercado Libre" title="Depósitos" pill="¿Dónde conviene guardar los productos?" bg={<ArgMap scene="intro" step={0} />} />;

const Quien = () => (
  <CompanySlide
    id="mercadolibre-quien"
    {...L}
    name="Mercado Libre"
    color={NEON.amber}
    items={[
      <>La <b>tienda online</b> más grande de Latinoamérica.</>,
      <>También <b>Mercado Pago</b> (pagos) y <b>Mercado Envíos</b>.</>,
      <>Casi todo lo que vende viaja por <b>su propia red</b> de envíos.</>,
    ]}
    facts={[
      { icon: CalendarDays, n: "1999", d: "nace en Buenos Aires" },
      { icon: Globe2, n: "18 países", d: "de Latinoamérica" },
      { icon: Warehouse, n: "+100.000 m²", d: "su centro de Escobar, el más grande del país" },
      { icon: Truck, n: "Red propia", d: "depósitos, camiones, aviones y repartidores" },
    ]}
  />
);

const ParaQue = () => (
  <CaseSlide
    id="mercadolibre-gis"
    {...L}
    label="¿Para qué usa el GIS?"
    title="Elegir dónde guardar"
    color={NEON.blue}
    items={[<>Capa: <b>compradores</b></>, <>Capa: <b>rutas</b></>, <>Capa: <b>tiempo de viaje</b></>, <>Decide: <b>dónde va el depósito</b></>]}
    scene={(s) => (
      <LayerStack
        step={s}
        layers={[
          { name: "Compradores", kind: "puntos", color: NEON.blue },
          { name: "Rutas", kind: "rutas", color: NEON.amber },
          { name: "Tiempo de viaje", kind: "tiempo", color: NEON.green },
        ]}
        decision={{ text: "Acá va el depósito", at: [0.05, -0.1] }}
      />
    )}
  />
);

const Como1 = () => (
  <CaseSlide
    id="mercadolibre-ubicacion"
    {...L}
    label="¿Cómo lo hace?"
    title="El mejor lugar"
    color={NEON.blue}
    items={[<>Dónde están los <b>compradores</b></>, <>Hasta dónde llega un camión <b>en un día</b></>, <>Gana el lugar con <b>más compradores cerca</b>: Córdoba</>]}
    scene={(s) => <ArgMap scene="solucion" step={s} />}
  />
);

const Como2 = () => (
  <CaseSlide
    id="mercadolibre-tiempo"
    {...L}
    label="¿Cómo lo hace?"
    title="Tiempo, no distancia"
    color={NEON.green}
    items={[<>Círculo = <b>misma distancia</b></>, <>Por ruta se llega más lejos: <b>isócrona</b></>]}
    scene={(s) => <ArgMap scene="tiempo" step={s} />}
  />
);

const Logistica = () => (
  <CaseSlide
    id="mercadolibre-logistica"
    {...L}
    label="En su logística"
    title="Una red de depósitos"
    color={NEON.green}
    items={[<>Centro grande → <b>centros regionales</b></>, <>De cada uno, <b>los repartos del día</b></>]}
    dato={{ n: "US$ 3.400 M", d: "invierte Mercado Libre en Argentina en 2026, sobre todo en logística." }}
    scene={(s) => <ArgMap scene="logistica" step={s} />}
  />
);

const Tecnologias = () => (
  <TechSlide
    id="mercadolibre-tecnologias"
    logo={LOGO}
    label="Tecnologías · Mercado Libre"
    bg={<ArgMap scene="intro" step={0} />}
    techs={[
      { icon: Warehouse, name: "Análisis de ubicación", d: "Compara lugares posibles para poner un centro nuevo.", gis: true, c: NEON.blue },
      { icon: Timer, name: "Isócronas", d: "Hasta dónde se llega en un tiempo dado, siguiendo las rutas.", gis: true, c: NEON.green },
      { icon: Route, name: "Ruteo dinámico", d: "Arma todos los días los recorridos de los repartidores.", gis: true, c: NEON.amber },
      { icon: BrainCircuit, name: "Predicción con IA", d: "Pone el stock cerca de quien lo va a comprar, antes de que compre.", c: NEON.red },
    ]}
  />
);

export const MELI_SLIDES: DeckSlide[] = [
  { id: "mercadolibre", label: "Mercado Libre · Depósitos", C: Intro },
  { id: "mercadolibre-quien", label: "Mercado Libre · ¿Quién es?", steps: 4, phase: 2600, C: Quien },
  { id: "mercadolibre-gis", label: "Mercado Libre · ¿Para qué usa el GIS?", steps: 4, C: ParaQue },
  { id: "mercadolibre-ubicacion", label: "Mercado Libre · El mejor lugar", steps: 3, C: Como1 },
  { id: "mercadolibre-tiempo", label: "Mercado Libre · Tiempo, no distancia", steps: 2, C: Como2 },
  { id: "mercadolibre-logistica", label: "Mercado Libre · En su logística", steps: 2, C: Logistica },
  { id: "mercadolibre-tecnologias", label: "Mercado Libre · Tecnologías", C: Tecnologias },
];
