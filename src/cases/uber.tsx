import { Hexagon, Locate, TrendingUp, CalendarDays, Globe2, Car, Gift } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, CaseSlide, CompanySlide, NEON, TechSlide } from "@/components/neon";
import { H3Scene } from "@/scenes/h3";
import { H3Map } from "@/scenes/h3-neon";
import { LayerStack } from "@/scenes/layers-neon";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 02 · Uber · cómo usa el GIS para medir la ciudad en hexágonos (H3) y repartir.
   Las animaciones corren solas en bucle; a la izquierda, solo la guía. Lo que se dice está en exposicion.md. */

const LOGO = "/logos/uber.png";
export const UBER_VIDEO: CaseVideo = { title: "H3: Tiling the Earth with Hexagons (Uber Engineering)", youtube: "ay2uwtRO3QE" };
const L = { logo: LOGO };

const Intro = () => <CaseIntro id="uber" {...L} n="02" company="Uber" title="Hexágonos" pill="La ciudad partida en hexágonos iguales" bg={<H3Scene priceLabel={false} />} />;

const Quien = () => (
  <CompanySlide
    id="uber-quien"
    {...L}
    name="Uber"
    color={NEON.blue}
    items={[
      <>App para pedir <b>viajes con chofer</b>.</>,
      <><b>Uber Eats</b>: comida y compras a domicilio.</>,
      <><b>Uber Freight</b>: une camiones con cargas.</>,
    ]}
    facts={[
      { icon: CalendarDays, n: "2009", d: "nace en San Francisco" },
      { icon: Globe2, n: "+70 países", d: "con viajes o reparto" },
      { icon: Car, n: "+40 M", d: "de viajes y pedidos por día (fines de 2025)" },
      { icon: Gift, n: "H3 gratis", d: "sus hexágonos los usa cualquiera desde 2018" },
    ]}
  />
);

const ParaQue = () => (
  <CaseSlide
    id="uber-gis"
    {...L}
    label="¿Para qué usa el GIS?"
    title="Saber dónde falta gente"
    color={NEON.blue}
    items={[<>Capa: <b>pedidos</b></>, <>Capa: <b>repartidores y autos libres</b></>, <>Capa: <b>hexágonos H3</b></>, <>Decide: <b>a dónde mandar repartidores</b></>]}
    scene={(s) => (
      <LayerStack
        step={s}
        layers={[
          { name: "Pedidos", kind: "puntos", color: NEON.amber },
          { name: "Repartidores", kind: "camiones", color: NEON.green },
          { name: "Hexágonos H3", kind: "hex", color: NEON.blue },
        ]}
        decision={{ text: "Faltan repartidores acá", at: [0.3, 0.15], color: NEON.red }}
      />
    )}
  />
);

const Como = () => (
  <CaseSlide
    id="uber-h3"
    {...L}
    label="¿Cómo lo hace?"
    title="Todo en hexágonos"
    color={NEON.blue}
    items={[<>Ciudad en <b>hexágonos iguales</b>, cada uno con su código</>, <>Cada hexágono <b>cuenta sus pedidos</b> (altura)</>, <>Faltan autos (rojo) → <b>sube el precio</b></>]}
    dato={{ n: "16 tamaños", d: "de hexágono, desde un continente hasta una cuadra." }}
    scene={(s) => <H3Scene step={s} />}
  />
);

const Logistica = () => (
  <CaseSlide
    id="uber-logistica"
    {...L}
    label="En su logística"
    title="Reparto por hexágono"
    color={NEON.green}
    items={[<>Cada hexágono: <b>tiempo de entrega</b> desde el local</>, <>Define <b>hasta dónde reparte</b> cada local</>]}
    scene={(s) => <H3Map scene="logistica" step={s} />}
  />
);

const Tecnologias = () => (
  <TechSlide
    id="uber-tecnologias"
    logo={LOGO}
    label="Tecnologías · Uber H3"
    bg={<H3Scene priceLabel={false} />}
    techs={[
      { icon: Hexagon, name: "H3", d: "Divide el planeta en hexágonos iguales, cada uno con su código.", gis: true, c: NEON.blue },
      { icon: Locate, name: "Ubicación en vivo", d: "Dónde está cada pedido y cada auto libre, al segundo.", gis: true, c: NEON.green },
      { icon: TrendingUp, name: "Precio dinámico", d: "Sube la tarifa en los hexágonos donde faltan autos.", c: NEON.amber },
    ]}
  />
);

export const UBER_SLIDES: DeckSlide[] = [
  { id: "uber", label: "Uber · Hexágonos", C: Intro },
  { id: "uber-quien", label: "Uber · ¿Quién es?", steps: 4, phase: 2600, C: Quien },
  { id: "uber-gis", label: "Uber · ¿Para qué usa el GIS?", steps: 4, C: ParaQue },
  { id: "uber-h3", label: "Uber · Todo en hexágonos", steps: 3, phase: 4500, C: Como },
  { id: "uber-logistica", label: "Uber · En su logística", steps: 2, C: Logistica },
  { id: "uber-tecnologias", label: "Uber · Tecnologías", C: Tecnologias },
];
