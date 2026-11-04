import { motion } from "motion/react";
import { MapPinned, Satellite, Cpu, Locate } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { useStep } from "@/components/deck";
import { FullScene, NEON, NeonFrame, Pill, ResultsSlide, StepCard, TechSlide } from "@/components/neon";
import { SignalMap, type SignalScene } from "@/scenes/signal-neon";
import { StarlinkScene } from "@/scenes/starlink";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 03 · Starlink + Geotab · rastrear camiones donde no hay señal de celular.
   Lo que se dice en voz alta está en exposicion.md. */

const LOGO = "/logos/starlink-wordmark.svg";
const VIDEO: CaseVideo = { title: "How Starlink works, explained by an aerospace engineer", youtube: "zYgHbgGygJM" };
const ease = [0.16, 1, 0.3, 1] as const;

function Frame({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <NeonFrame id={id} video={VIDEO}>
      <div className="absolute left-[clamp(1.5rem,3vw,3.5rem)] top-[clamp(2.75rem,6vh,4.5rem)] z-10 flex items-center gap-4">
        <img src={LOGO} alt="Starlink" className="h-[clamp(2.4rem,6.5vh,4.5rem)] w-auto invert" />
        <span className="display text-[clamp(1.4rem,2.2vw,2.4rem)] text-white">+ Geotab</span>
      </div>
      {children}
    </NeonFrame>
  );
}

function Intro() {
  return (
    <Frame id="starlink">
      <div className="absolute inset-0 opacity-70">
        <StarlinkScene />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso 03 · Starlink + Geotab
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,11vw,12rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            Sin señal
          </motion.h2>
          <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill color={NEON.amber}>Rastrear camiones donde no hay celular</Pill>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

function Slide({ id, scene, label, title, color, items }: { id: string; scene: SignalScene; label: string; title: string; color: string; items: React.ReactNode[] }) {
  const step = useStep();
  return (
    <Frame id={id}>
      <FullScene map={<SignalMap scene={scene} step={step} />} card={<StepCard label={label} title={title} color={color} step={step} items={items} />} />
    </Frame>
  );
}

const Problema = () => (
  <Slide
    id="starlink-problema"
    scene="problema"
    label="El problema"
    title="El camión desaparece"
    color={NEON.amber}
    items={[
      <>El GPS sabe dónde está el camión, pero <b>para avisarlo necesita señal de celular</b>.</>,
      <>En el Impenetrable o en la Patagonia no hay señal: <b>el camión desaparece del mapa</b>.</>,
    ]}
  />
);
const Solucion = () => (
  <Slide
    id="starlink-satelite"
    scene="solucion"
    label="La solución con GIS"
    title="Avisar por satélite"
    color={NEON.blue}
    items={[
      <>Sin antena cerca, la posición del camión <b>no le llega a nadie</b>.</>,
      <>El equipo de Geotab en el camión <b>le manda la posición a un satélite</b> de Starlink. Siempre hay uno pasando por arriba.</>,
      <>El satélite la baja a tierra y <b>el camión vuelve a aparecer en el mapa</b>.</>,
    ]}
  />
);
const Logistica = () => (
  <Slide
    id="starlink-logistica"
    scene="logistica"
    label="GIS en logística"
    title="Toda la flota, siempre"
    color={NEON.green}
    items={[
      <>Sin satélite, los camiones que pasan por zonas sin señal <b>se pierden del mapa</b>.</>,
      <>Con satélite <b>se ven todos</b>: demoras, desvíos o robos, en cualquier ruta del país.</>,
    ]}
  />
);
const Tecnologias = () => (
  <TechSlide
    id="starlink-tecnologias"
    video={VIDEO}
    label="Tecnologías · Starlink + Geotab"
    bg={<StarlinkScene />}
    techs={[
      { icon: Locate, name: "GPS", d: "El camión sabe dónde está, en cualquier lugar del planeta.", gis: true, c: NEON.green },
      { icon: Cpu, name: "Telemática Geotab", d: "Un equipo en el camión que lee y manda sus datos solo.", c: NEON.amber },
      { icon: Satellite, name: "Satélites Starlink", d: "Miles de satélites bajos que reciben la señal sin antenas.", c: NEON.blue },
      { icon: MapPinned, name: "Mapa de la flota", d: "Todas las posiciones juntas sobre el mapa, en tiempo real.", gis: true, c: NEON.green },
    ]}
  />
);
const Resultados = () => (
  <ResultsSlide
    id="starlink-resultados"
    video={VIDEO}
    label="Resultados · Starlink + Geotab"
    bg={<StarlinkScene />}
    stats={[
      { pre: "~", to: 6, suf: " M", d: "de vehículos y equipos conectados a Geotab", c: NEON.amber },
      { pre: "+", to: 10000, d: "satélites Starlink funcionando (2026)", c: NEON.blue },
      { to: 18, suf: " %", d: "del territorio de Canadá tiene señal de celular: el resto necesita satélite", c: NEON.red },
    ]}
  />
);

export const STARLINK_SLIDES: DeckSlide[] = [
  { id: "starlink", label: "Starlink + Geotab · Sin señal", C: Intro },
  { id: "starlink-problema", label: "Starlink · El problema", steps: 2, C: Problema },
  { id: "starlink-satelite", label: "Starlink · Por satélite", steps: 3, C: Solucion },
  { id: "starlink-logistica", label: "Starlink · En logística", steps: 2, C: Logistica },
  { id: "starlink-tecnologias", label: "Starlink · Tecnologías", steps: 4, C: Tecnologias },
  { id: "starlink-resultados", label: "Starlink · Resultados", steps: 3, C: Resultados },
];
