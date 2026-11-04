import { motion } from "motion/react";
import { Radar, Container, Satellite, Route } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { useStep } from "@/components/deck";
import { FullScene, NEON, NeonFrame, Pill, ResultsSlide, StepCard, TechSlide } from "@/components/neon";
import { SeaMap, type SeaScene } from "@/scenes/sea-neon";

/* Caso 06 · Maersk · seguir barcos y contenedores en todo el mundo. Mapa del mundo en neón.
   Lo que se dice en voz alta está en exposicion.md. */

const ease = [0.16, 1, 0.3, 1] as const;

function Frame({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <NeonFrame id={id}>
      <div className="absolute left-[clamp(1.5rem,3vw,3.5rem)] top-[clamp(2.75rem,6vh,4.5rem)] z-10 rounded-xl bg-white px-4 py-2.5">
        <img src="/logos/maersk.svg" alt="Maersk" className="h-[clamp(1.8rem,4.5vh,3rem)] w-auto" />
      </div>
      {children}
    </NeonFrame>
  );
}

function Intro() {
  return (
    <Frame id="maersk">
      <div className="absolute inset-0 opacity-70">
        <SeaMap scene="intro" step={0} />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso 06 · Maersk
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,11vw,12rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            Barcos
          </motion.h2>
          <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill color={NEON.amber}>Seguir cada contenedor por el mundo</Pill>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

function Slide({ id, scene, label, title, color, items }: { id: string; scene: SeaScene; label: string; title: string; color: string; items: React.ReactNode[] }) {
  const step = useStep();
  return (
    <Frame id={id}>
      <FullScene map={<SeaMap scene={scene} step={step} />} card={<StepCard label={label} title={title} color={color} step={step} items={items} />} />
    </Frame>
  );
}

const Problema = () => (
  <Slide
    id="maersk-problema"
    scene="problema"
    label="El problema"
    title="Semanas en el mar"
    color={NEON.amber}
    items={[
      <>Un contenedor viaja <b>semanas en el medio del océano</b>. El cliente pregunta: ¿dónde está mi carga?</>,
      <>Y en el camino puede aparecer <b>un peligro</b>: en 2026, el Mar Rojo no era seguro.</>,
    ]}
  />
);
const Solucion = () => (
  <Slide
    id="maersk-seguimiento"
    scene="solucion"
    label="La solución con GIS"
    title="Todo sobre el mapa"
    color={NEON.blue}
    items={[
      <>Cada barco <b>avisa su posición</b> todo el tiempo y deja su rastro en el mapa.</>,
      <>Los contenedores refrigerados llevan <b>GPS y termómetro</b>: se sabe dónde están y si la carga sigue fría.</>,
      <>Con la posición y la ruta, el mapa calcula <b>cuándo llega</b>.</>,
    ]}
  />
);
const Desvio = () => (
  <Slide
    id="maersk-desvio"
    scene="desvio"
    label="La clave"
    title="Cambiar de ruta"
    color={NEON.green}
    items={[
      <>El camino corto entre Asia y Europa pasa por el <b>Canal de Suez</b>.</>,
      <>Si el Mar Rojo no es seguro, el mapa calcula <b>la vuelta por África</b> y avisa cuánto más tarda.</>,
    ]}
  />
);
const Logistica = () => (
  <Slide
    id="maersk-logistica"
    scene="logistica"
    label="GIS en logística"
    title="El puerto se prepara"
    color={NEON.green}
    items={[
      <>El puerto ve <b>cuándo llega cada barco</b>, días antes.</>,
      <>Así <b>los camiones esperan listos</b> para llevarse los contenedores, sin perder tiempo.</>,
    ]}
  />
);
const Tecnologias = () => (
  <TechSlide
    id="maersk-tecnologias"
    label="Tecnologías · Maersk"
    bg={<SeaMap scene="intro" step={0} />}
    techs={[
      { icon: Radar, name: "AIS", d: "Cada barco transmite su posición, rumbo y velocidad.", gis: true, c: NEON.blue },
      { icon: Container, name: "GPS en contenedores", d: "Ubicación y temperatura de cada contenedor refrigerado.", gis: true, c: NEON.green },
      { icon: Satellite, name: "Satélites", d: "Llevan los datos desde el medio del océano.", c: NEON.amber },
      { icon: Route, name: "Ruteo marítimo", d: "Calcula el mejor camino y lo cambia si hay peligro.", gis: true, c: NEON.red },
    ]}
  />
);
const Resultados = () => (
  <ResultsSlide
    id="maersk-resultados"
    label="Resultados · Maersk"
    bg={<SeaMap scene="intro" step={0} />}
    stats={[
      { pre: "~", to: 4.3, dec: 1, suf: " M", d: "de contenedores (TEU) de capacidad en su flota (2026)", c: NEON.blue },
      { to: 270000, d: "contenedores refrigerados con GPS y termómetro", c: NEON.green },
      { pre: "+", to: 14, suf: " días", d: "de viaje al dar la vuelta por África: el mapa lo calcula y avisa", c: NEON.amber },
    ]}
  />
);

export const MAERSK_SLIDES: DeckSlide[] = [
  { id: "maersk", label: "Maersk · Barcos", C: Intro },
  { id: "maersk-problema", label: "Maersk · El problema", steps: 2, C: Problema },
  { id: "maersk-seguimiento", label: "Maersk · Seguimiento", steps: 3, C: Solucion },
  { id: "maersk-desvio", label: "Maersk · Cambiar de ruta", steps: 2, C: Desvio },
  { id: "maersk-logistica", label: "Maersk · En logística", steps: 2, C: Logistica },
  { id: "maersk-tecnologias", label: "Maersk · Tecnologías", steps: 4, C: Tecnologias },
  { id: "maersk-resultados", label: "Maersk · Resultados", steps: 3, C: Resultados },
];
