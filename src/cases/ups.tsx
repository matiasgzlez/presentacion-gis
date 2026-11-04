import { motion } from "motion/react";
import { Map, Route, Locate, MapPinned } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { useStep } from "@/components/deck";
import { FullScene, NEON, NeonFrame, Pill, ResultsSlide, StepCard, TechSlide } from "@/components/neon";
import { BackgroundVideo } from "@/components/bg-video";
import { RouteMap, type RouteScene } from "@/scenes/route-neon";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 04 · UPS · ORION: elegir el mejor orden de paradas. Usa nuestro video de ORION y la prueba sobre calles reales de Resistencia.
   Lo que se dice en voz alta está en exposicion.md. */

const LOGO = "/logos/ups.png";
const VIDEO: CaseVideo = { title: "UPS ORION (YouTube)", youtube: "0jLAdTC7_TY" };
const ease = [0.16, 1, 0.3, 1] as const;

function Intro() {
  return (
    <NeonFrame id="ups" logo={LOGO} video={VIDEO}>
      <div className="absolute inset-0 opacity-60">
        <RouteMap scene="intro" step={0} />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso 04 · UPS · ORION
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,11vw,12rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            Rutas
          </motion.h2>
          <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill color={NEON.amber}>Elegir el mejor camino de cada camión</Pill>
          </motion.div>
        </div>
      </div>
    </NeonFrame>
  );
}

function Slide({ id, scene, label, title, color, items }: { id: string; scene: RouteScene; label: string; title: string; color: string; items: React.ReactNode[] }) {
  const step = useStep();
  return (
    <NeonFrame id={id} logo={LOGO} video={VIDEO}>
      <FullScene map={<RouteMap scene={scene} step={step} />} card={<StepCard label={label} title={title} color={color} step={step} items={items} />} />
    </NeonFrame>
  );
}

const Problema = () => (
  <Slide
    id="ups-problema"
    scene="problema"
    label="El problema"
    title="Demasiados caminos"
    color={NEON.amber}
    items={[
      <>Cada chofer de UPS hace <b>unas 120 paradas por día</b>.</>,
      <>Con 120 paradas hay <b>más órdenes posibles que átomos en el universo</b>: nadie puede elegir el mejor a ojo.</>,
    ]}
  />
);

/** La solución: nuestro video de ORION a pantalla completa, narrado con los subtítulos de cada paso. */
function Solucion() {
  const step = useStep();
  return (
    <NeonFrame id="ups-orion" logo={LOGO} video={VIDEO}>
      <FullScene
        map={<BackgroundVideo src="/videos/ups-orion.mp4" className="object-contain" />}
        card={
          <StepCard
            label="La solución con GIS"
            title="ORION"
            color={NEON.blue}
            step={step}
            items={[
              <><span className="text-[#ff7a59]">A ojo:</span> el chofer va siempre a la parada más cercana.</>,
              <><span className="text-[#3cf2b5]">ORION:</span> el mismo camión y las mismas paradas, <b>en otro orden</b>.</>,
              <>Un programa prueba millones de órdenes sobre el mapa de calles y <b>se queda con el más corto</b>.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

const Resistencia = () => (
  <Slide
    id="ups-resistencia"
    scene="resistencia"
    label="Lo probamos"
    title="En Resistencia"
    color={NEON.green}
    items={[
      <>Con 14 paradas en calles reales de Resistencia, el orden "a ojo" suma <b>55,6 km</b>.</>,
      <>Optimizado, el mismo reparto suma <b>41,1 km</b>: un 26 % menos.</>,
    ]}
  />
);
const Logistica = () => (
  <Slide
    id="ups-logistica"
    scene="logistica"
    label="GIS en logística"
    title="La ruta cambia en vivo"
    color={NEON.green}
    items={[
      <>A media mañana entra <b>un pedido nuevo</b>.</>,
      <>ORION <b>recalcula la ruta en segundos</b> y el chofer sigue sin perder tiempo.</>,
    ]}
  />
);
const Tecnologias = () => (
  <TechSlide
    id="ups-tecnologias"
    logo={LOGO}
    video={VIDEO}
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
const Resultados = () => (
  <ResultsSlide
    id="ups-resultados"
    logo={LOGO}
    video={VIDEO}
    label="Resultados · UPS ORION"
    bg={<RouteMap scene="intro" step={0} />}
    stats={[
      { pre: "US$ ", to: 50, suf: " M", d: "por año ahorra UPS con solo 1 milla menos por chofer por día", c: NEON.green },
      { to: 100, suf: " M", d: "de millas menos recorridas por año", c: NEON.blue },
      { to: 100000, suf: " t", d: "de CO₂ que dejan de emitirse por año", c: NEON.amber },
    ]}
  />
);

export const UPS_SLIDES: DeckSlide[] = [
  { id: "ups", label: "UPS · Rutas", C: Intro },
  { id: "ups-problema", label: "UPS · El problema", steps: 2, C: Problema },
  { id: "ups-orion", label: "UPS · ORION", steps: 3, C: Solucion },
  { id: "ups-resistencia", label: "UPS · Lo probamos en Resistencia", steps: 2, C: Resistencia },
  { id: "ups-logistica", label: "UPS · En logística", steps: 2, C: Logistica },
  { id: "ups-tecnologias", label: "UPS · Tecnologías", steps: 4, C: Tecnologias },
  { id: "ups-resultados", label: "UPS · Resultados", steps: 3, C: Resultados },
];
