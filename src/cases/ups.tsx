import { Map, Route, Locate, MapPinned, CalendarDays, Globe2, Package, Users } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, CaseSlide, CompanySlide, NEON, TechSlide } from "@/components/neon";
import { BackgroundVideo } from "@/components/bg-video";
import { RouteMap } from "@/scenes/route-neon";
import { LayerStack } from "@/scenes/layers-neon";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 03 · UPS · ORION: cómo usa el GIS para elegir el orden de las paradas. Usa nuestro video de ORION
   y la prueba con calles reales de Resistencia. Lo que se dice está en exposicion.md. */

const LOGO = "/logos/ups.png";
export const UPS_VIDEO: CaseVideo = { title: "UPS ORION (On-Road Integrated Optimization and Navigation)", youtube: "0jLAdTC7_TY" };
const L = { logo: LOGO };

const Intro = () => <CaseIntro id="ups" {...L} n="03" company="UPS · ORION" title="Rutas" pill="El mejor orden de paradas para cada camión" bg={<RouteMap scene="intro" step={0} />} />;

const Quien = () => (
  <CompanySlide
    id="ups-quien"
    {...L}
    name="UPS"
    color={NEON.amber}
    items={[
      <>Lleva <b>paquetes</b> de empresas y personas.</>,
      <>Es de <b>Estados Unidos</b>; sus camiones son marrones.</>,
      <>Una de las <b>paqueterías más grandes</b> del mundo.</>,
    ]}
    facts={[
      { icon: CalendarDays, n: "1907", d: "nace en Seattle" },
      { icon: Package, n: "20,8 M", d: "de paquetes por día (2025)" },
      { icon: Globe2, n: "+200", d: "países y territorios" },
      { icon: Users, n: "~460.000", d: "empleados" },
    ]}
  />
);

const ParaQue = () => (
  <CaseSlide
    id="ups-gis"
    {...L}
    label="¿Para qué usa el GIS?"
    title="El orden de las paradas"
    color={NEON.blue}
    items={[<>Capa: <b>calles</b> (con sentidos)</>, <>Capa: <b>paradas del día</b></>, <>Capa: <b>camiones con GPS</b></>, <>Decide: <b>en qué orden ir</b></>]}
    scene={(s) => (
      <LayerStack
        step={s}
        layers={[
          { name: "Calles", kind: "calles", color: NEON.blue },
          { name: "Paradas del día", kind: "puntos", color: NEON.amber },
          { name: "Camiones con GPS", kind: "camiones", color: NEON.green },
        ]}
        decision={{ text: "El mejor orden", at: [-0.2, 0.3] }}
      />
    )}
  />
);

const Como = () => (
  <CaseSlide
    id="ups-orion"
    {...L}
    label="¿Cómo lo hace?"
    title="ORION"
    color={NEON.blue}
    items={[<>~<b>120 paradas</b> por chofer por día</>, <>Más órdenes posibles que <b>átomos del universo</b></>, <>ORION prueba millones y <b>elige el más corto</b></>]}
    dato={{ n: "US$ 50 M", d: "por año ahorra UPS con solo 1 milla menos por chofer por día." }}
    scene={() => <BackgroundVideo src="/videos/ups-orion.mp4" className="object-contain" />}
  />
);

const Resistencia = () => (
  <CaseSlide
    id="ups-resistencia"
    {...L}
    label="Lo probamos"
    title="En Resistencia"
    color={NEON.green}
    items={[<>"A ojo": <b>55,6 km</b></>, <>Optimizado: <b>41,1 km (−26 %)</b></>]}
    scene={(s) => <RouteMap scene="resistencia" step={s} />}
  />
);

const Logistica = () => (
  <CaseSlide
    id="ups-logistica"
    {...L}
    label="En su logística"
    title="La ruta cambia en vivo"
    color={NEON.green}
    items={[<>Entra un <b>pedido nuevo</b></>, <>Recalcula la ruta <b>en segundos</b></>]}
    scene={(s) => <RouteMap scene="logistica" step={s} />}
  />
);

const Tecnologias = () => (
  <TechSlide
    id="ups-tecnologias"
    logo={LOGO}
    label="Tecnologías · UPS ORION"
    bg={<RouteMap scene="intro" step={0} />}
    techs={[
      { icon: Map, name: "Mapa de calles", d: "Todas las calles, con sus sentidos y distancias.", gis: true, c: NEON.blue },
      { icon: MapPinned, name: "Direcciones en el mapa", d: "Cada paquete convertido en un punto exacto.", gis: true, c: NEON.green },
      { icon: Route, name: "Optimización de rutas", d: "Prueba millones de órdenes y elige el más corto.", gis: true, c: NEON.amber },
      { icon: Locate, name: "GPS de los camiones", d: "Dónde está cada camión, para recalcular en vivo.", gis: true, c: NEON.red },
    ]}
  />
);

export const UPS_SLIDES: DeckSlide[] = [
  { id: "ups", label: "UPS · Rutas", C: Intro },
  { id: "ups-quien", label: "UPS · ¿Quién es?", steps: 4, phase: 2600, C: Quien },
  { id: "ups-gis", label: "UPS · ¿Para qué usa el GIS?", steps: 4, C: ParaQue },
  { id: "ups-orion", label: "UPS · ORION", C: Como },
  { id: "ups-resistencia", label: "UPS · Lo probamos en Resistencia", steps: 2, phase: 5000, C: Resistencia },
  { id: "ups-logistica", label: "UPS · En su logística", steps: 2, phase: 4500, C: Logistica },
  { id: "ups-tecnologias", label: "UPS · Tecnologías", C: Tecnologias },
];
