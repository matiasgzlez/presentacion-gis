import { Layers3, Radar, CircleDot, Newspaper, CalendarDays, Globe2, Users, Euro } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, CaseSlide, CompanySlide, NEON, TechSlide } from "@/components/neon";
import { DhlMap } from "@/scenes/dhl-neon";
import { LayerStack } from "@/scenes/layers-neon";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 05 · DHL · Resilience360: el mapa de riesgos de la cadena de suministro (hoy se llama Everstream).
   El ejemplo de Taiwán → Alemania es ilustrativo. Las animaciones corren solas en bucle. Lo que se dice está en exposicion.md. */

const LOGO = "/logos/dhl.svg";
export const DHL_VIDEO: CaseVideo = { title: "DHL Resilience360 - THE Supply Chain Risk Management Solution (DHL)", youtube: "JiA4UhuMe5s" };
const L = { logo: LOGO, logoClass: "h-[clamp(2.4rem,6vh,4rem)] rounded-md" };
const YEL = "#ffcc00";

const Intro = () => <CaseIntro id="dhl" {...L} n="05" company="DHL" title="Riesgos" pill="Ver el problema antes de que llegue" bg={<DhlMap scene="intro" />} />;

const Quien = () => (
  <CompanySlide
    id="dhl-quien"
    {...L}
    name="DHL"
    color={YEL}
    items={[
      <>Una de las <b>empresas de logística más grandes</b> del mundo.</>,
      <>Lleva <b>paquetes, carga y depósitos</b> de otras empresas.</>,
      <>Es <b>alemana</b> (DHL Group), pero nació en San Francisco.</>,
    ]}
    facts={[
      { icon: CalendarDays, n: "1969", d: "nace en San Francisco" },
      { icon: Globe2, n: "+220", d: "países y territorios" },
      { icon: Users, n: "~584.000", d: "empleados" },
      { icon: Euro, n: "€ 82.900 M", d: "facturó en 2025" },
    ]}
  />
);

const ParaQue = () => (
  <CaseSlide
    id="dhl-gis"
    {...L}
    label="¿Para qué usa el GIS?"
    title="Ver los riesgos en el mapa"
    color={NEON.red}
    items={[<>Capa: <b>proveedores y fábricas</b></>, <>Capa: <b>rutas</b> de barcos y camiones</>, <>Capa: <b>riesgos en vivo</b></>, <>Decide: <b>avisar y cambiar el plan</b></>]}
    scene={(s) => (
      <LayerStack
        step={s}
        layers={[
          { name: "Proveedores", kind: "depositos", color: YEL },
          { name: "Rutas", kind: "rutas", color: NEON.blue },
          { name: "Riesgos en vivo", kind: "riesgo", color: NEON.red },
        ]}
        decision={{ text: "Alerta: riesgo cerca", at: [-0.5, -0.4], color: NEON.red }}
      />
    )}
  />
);

const Como1 = () => (
  <CaseSlide
    id="dhl-cadena"
    {...L}
    label="¿Cómo lo hace? · 1"
    title="Un problema lejos frena todo"
    color={NEON.amber}
    items={[<>Chips de <b>Taiwán</b> → barco → fábrica en <b>Alemania</b></>, <>Un <b>tifón</b> cierra el puerto</>, <>La fábrica se entera <b>tarde</b></>]}
    scene={(s) => <DhlMap scene="problema" step={s} />}
  />
);

const Como2 = () => (
  <CaseSlide
    id="dhl-capas"
    {...L}
    label="¿Cómo lo hace? · 2"
    title="Resilience360"
    color={NEON.red}
    items={[<>Capa 1: <b>tu cadena</b></>, <>Capa 2: <b>riesgos en vivo</b></>, <>Cruce: <b>alerta y plan B</b></>]}
    dato={{ n: "+30", d: "tipos de riesgo en el mapa: clima, huelgas, conflictos, accidentes…" }}
    scene={(s) => <DhlMap scene="solucion" step={s} />}
  />
);

const Logistica = () => (
  <CaseSlide
    id="dhl-logistica"
    {...L}
    label="En su logística"
    title="Avisar antes"
    color={NEON.green}
    items={[<>Sin mapa: te enterás <b>el día 10</b></>, <>Con mapa: aviso <b>el día 1</b> y plan B</>]}
    dato={{ n: "2014", d: "lo creó DHL. Hoy sigue como Everstream Analytics." }}
    scene={(s) => <DhlMap scene="logistica" step={s} />}
  />
);

const Tecnologias = () => (
  <TechSlide
    id="dhl-tecnologias"
    {...L}
    label="Tecnologías · DHL Resilience360"
    bg={<DhlMap scene="intro" />}
    techs={[
      { icon: Layers3, name: "Mapa de la cadena", d: "Proveedores, fábricas y rutas de la empresa, en un mapa.", gis: true, c: NEON.blue },
      { icon: Radar, name: "Riesgos en vivo", d: "Tormentas, huelgas y conflictos como capas sobre el mapa.", gis: true, c: NEON.red },
      { icon: CircleDot, name: "Radio de alcance", d: "Si un riesgo entra en el radio de un proveedor, avisa.", gis: true, c: NEON.amber },
      { icon: Newspaper, name: "Lectura de noticias y clima", d: "Programas que siguen lo que pasa en el mundo, todo el día.", c: NEON.green },
    ]}
  />
);

export const DHL_SLIDES: DeckSlide[] = [
  { id: "dhl", label: "DHL · Riesgos", C: Intro },
  { id: "dhl-quien", label: "DHL · ¿Quién es?", steps: 4, phase: 2600, C: Quien },
  { id: "dhl-gis", label: "DHL · ¿Para qué usa el GIS?", steps: 4, C: ParaQue },
  { id: "dhl-cadena", label: "DHL · Un problema lejos", steps: 3, phase: 4200, C: Como1 },
  { id: "dhl-capas", label: "DHL · Resilience360", steps: 3, phase: 4500, C: Como2 },
  { id: "dhl-logistica", label: "DHL · En su logística", steps: 2, phase: 4500, C: Logistica },
  { id: "dhl-tecnologias", label: "DHL · Tecnologías", C: Tecnologias },
];
