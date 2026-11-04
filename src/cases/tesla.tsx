import { motion } from "motion/react";
import { Fence, Locate, Camera, BrainCircuit } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { useStep } from "@/components/deck";
import { FullScene, NEON, StepCard, NeonFrame, Pill, ResultsSlide, TechSlide } from "@/components/neon";
import { NeonMap } from "@/scenes/neon-map";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 01 · Tesla · Robotaxis, en cinco diapositivas cortas (estilo oscuro, mapa ilustrativo de Austin).
   Lo que se dice en voz alta está en exposicion.md. */

const LOGO = "/logos/tesla.png";
const VIDEO: CaseVideo = { title: "Driverless Tesla Robotaxi Ride in Austin, Texas", youtube: "vic83wLY_Tw" };
const ease = [0.16, 1, 0.3, 1] as const;

function Intro() {
  return (
    <NeonFrame id="tesla" logo={LOGO} video={VIDEO}>
      <div className="absolute inset-x-0 bottom-[6vh] top-[12vh] opacity-60">
        <NeonMap scene="intro" step={0} />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso 01 · Tesla
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,11vw,12rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.85)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            Robotaxis
          </motion.h2>
          <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill color={NEON.red}>● Sin nadie al volante · Austin, Texas</Pill>
          </motion.div>
        </div>
      </div>
    </NeonFrame>
  );
}

function CarSide() {
  return (
    <svg viewBox="0 0 520 200" className="w-full max-w-[40rem]" aria-hidden>
      <ellipse cx="260" cy="182" rx="230" ry="10" fill="rgba(0,0,0,0.5)" />
      <path d="M40 150 C 40 118 62 104 104 98 L 168 92 C 196 62 236 46 290 46 C 344 46 382 62 412 92 L 452 100 C 478 106 488 124 486 150 Z" fill="#e31937" />
      <path d="M186 92 C 208 68 240 58 286 58 L 286 92 Z" fill="#1d2433" />
      <path d="M300 58 C 340 60 368 72 392 92 L 300 92 Z" fill="#1d2433" />
      <rect x="40" y="128" width="446" height="8" rx="4" fill="rgba(0,0,0,0.18)" />
      {[132, 392].map((x) => (
        <g key={x}>
          <circle cx={x} cy="150" r="36" fill="#0e131c" />
          <circle cx={x} cy="150" r="16" fill="#9aa3b2" />
        </g>
      ))}
    </svg>
  );
}

function Problema() {
  const step = useStep();
  return (
    <NeonFrame id="tesla-problema" logo={LOGO} video={VIDEO}>
      <FullScene
        map={
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative flex w-[min(52vw,46rem)] flex-col items-center gap-6">
              <Pill>Model Y · Robotaxi</Pill>
              <motion.div className="relative w-full" initial={{ x: -120, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.1, ease }}>
                <CarSide />
                <motion.span
                  className="display absolute left-[60%] top-[-10%] grid size-[clamp(4.5rem,8vw,8rem)] place-items-center rounded-full bg-white text-[clamp(3rem,5.2vw,5.2rem)] text-[#0e131c] shadow-[0_0_40px_rgba(255,255,255,0.35)]"
                  initial={false}
                  animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.4, y: step >= 2 ? 0 : 20 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16 }}
                >
                  ?
                </motion.span>
              </motion.div>
              <Pill outline>Asiento del conductor: vacío</Pill>
            </div>
          </div>
        }
        card={
          <StepCard
            label="El problema"
            title="Ver no alcanza"
            color={NEON.amber}
            step={step}
            items={[
              <>Las <b>cámaras</b> ven la calle: peatones, semáforos, otros autos.</>,
              <>Pero el auto también tiene que saber <b>por dónde tiene permitido andar</b>.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

function Geocerca() {
  const step = useStep();
  return (
    <NeonFrame id="tesla-geocerca" logo={LOGO} video={VIDEO}>
      <FullScene
        map={<NeonMap scene="geocerca" step={step} />}
        card={
          <StepCard
            label="La solución con GIS"
            title="Una geocerca"
            color={NEON.blue}
            step={step}
            items={[
              <>Un <b>polígono</b> dibujado en el mapa: la zona habilitada.</>,
              <><span className="text-[#22c55e]">Adentro:</span> el auto acepta viajes.</>,
              <><span className="text-[#ef4444]">Afuera:</span> no lleva pasajeros.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

function Borde() {
  const step = useStep();
  return (
    <NeonFrame id="tesla-borde" logo={LOGO} video={VIDEO}>
      <FullScene
        map={<NeonMap scene="borde" step={step} />}
        card={
          <StepCard
            label="En la calle"
            title="El borde manda"
            color={NEON.red}
            step={step}
            items={[
              <>Si el viaje sale de la zona, el auto <b>no sigue</b>.</>,
              <>Para sumar barrios, Tesla <b>agranda el polígono</b> en el mapa.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

function Logistica() {
  const step = useStep();
  return (
    <NeonFrame id="tesla-logistica" logo={LOGO} video={VIDEO}>
      <FullScene
        map={<NeonMap scene="logistica" step={step} />}
        card={
          <StepCard
            label="GIS en logística"
            title="La misma herramienta"
            color={NEON.green}
            step={step}
            items={[
              <>Cada camión tiene <b>su zona de reparto</b> dibujada en el mapa.</>,
              <>Si un camión <b>sale de su zona</b>, salta una alerta.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

const Tecnologias = () => (
  <TechSlide
    id="tesla-tecnologias"
    logo={LOGO}
    video={VIDEO}
    label="Tecnologías · Tesla Robotaxi"
    bg={<NeonMap scene="intro" step={0} />}
    techs={[
      { icon: Fence, name: "Geocerca", d: "Un polígono en el mapa que marca dónde puede andar el auto.", gis: true, c: NEON.blue },
      { icon: Locate, name: "GPS + mapa", d: "El auto sabe en qué punto del mapa está, todo el tiempo.", gis: true, c: NEON.green },
      { icon: Camera, name: "Cámaras", d: "Ocho cámaras alrededor del auto ven la calle.", c: NEON.amber },
      { icon: BrainCircuit, name: "Inteligencia artificial", d: "Aprende a manejar de los videos de millones de autos Tesla.", c: NEON.red },
    ]}
  />
);

const Resultados = () => (
  <ResultsSlide
    id="tesla-resultados"
    logo={LOGO}
    video={VIDEO}
    label="Resultados · Tesla Robotaxi"
    bg={<NeonMap scene="intro" step={0} />}
    stats={[
      { pre: "+", to: 3, suf: " M", d: "de millas recorridas sin nadie al volante (octubre de 2026)", c: NEON.blue },
      { pre: "~", to: 290, suf: " mi²", d: "mide la zona de Austin: un año antes eran ~170", c: NEON.green },
      { to: 4, suf: " ciudades", d: "sin chofer en 2026: Austin, Dallas, Houston y Miami", c: NEON.amber },
    ]}
  />
);

export const TESLA_SLIDES: DeckSlide[] = [
  { id: "tesla", label: "Tesla · Robotaxis", C: Intro },
  { id: "tesla-problema", label: "Tesla · El problema", steps: 2, C: Problema },
  { id: "tesla-geocerca", label: "Tesla · La geocerca", steps: 3, C: Geocerca },
  { id: "tesla-borde", label: "Tesla · En la calle", steps: 2, C: Borde },
  { id: "tesla-logistica", label: "Tesla · En logística", steps: 2, C: Logistica },
  { id: "tesla-tecnologias", label: "Tesla Robotaxi · Tecnologías", steps: 4, C: Tecnologias },
  { id: "tesla-resultados", label: "Tesla · Resultados", steps: 3, C: Resultados },
];
