import { motion } from "motion/react";
import { MapPinned, Route, Locate, Drone } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { useStep } from "@/components/deck";
import { FullScene, NEON, StepCard, NeonFrame, Pill, TechSlide, type Dato, WhoIs } from "@/components/neon";
import { DroneScene } from "@/scenes/drone";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 03 · Walmart + Wing · entregas con drones. Cinco diapositivas cortas, en 3D.
   Lo que se dice en voz alta está en exposicion.md. */

const LOGO = "/logos/walmart.png";
export const WALMART_VIDEO: CaseVideo = { title: "Walmart + Wing: entregas con drones", youtube: "8B1NGqM1zYk" };
const ease = [0.16, 1, 0.3, 1] as const;

function Intro() {
  return (
    <NeonFrame id="walmart" logo={LOGO}>
      <div className="absolute inset-0 opacity-70">
        <DroneScene mode="intro" />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso 03 · Walmart + Wing
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,11vw,12rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            Drones
          </motion.h2>
          <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill color={NEON.amber}>Entregas por el aire</Pill>
          </motion.div>
          <WhoIs who={[{ name: "Walmart", d: "la cadena de supermercados más grande del mundo, de Estados Unidos." }, { name: "Wing", d: "la empresa de drones de reparto de Alphabet, la dueña de Google." }]} />
        </div>
      </div>
    </NeonFrame>
  );
}

function Slide({ id, mode, label, title, color, items, dato }: { id: string; mode: "problema" | "solucion" | "entrega" | "logistica"; label: string; title: string; color: string; items: React.ReactNode[]; dato?: Dato }) {
  const step = useStep();
  return (
    <NeonFrame id={id} logo={LOGO}>
      <FullScene map={<DroneScene mode={mode} step={step} />} card={<StepCard label={label} title={title} color={color} step={step} items={items} dato={dato} />} />
    </NeonFrame>
  );
}

const Problema = () => (
  <Slide
    id="walmart-problema"
    mode="problema"
    label="El problema"
    title="Un camión para una caja chica"
    color={NEON.amber}
    items={[
      <>Mandar un camión por un paquete chico es <b>caro y lento</b>: queda atrapado en el tránsito.</>,
      <>Un dron va por el aire… pero <b>el aire no tiene calles</b>: hay lugares donde no se puede volar.</>,
    ]}
  />
);
const Solucion = () => (
  <Slide
    id="walmart-mapa"
    mode="solucion"
    label="La solución con GIS"
    title="Un mapa del cielo"
    color={NEON.blue}
    items={[
      <>Cada tienda tiene su <b>radio de entrega</b> dibujado en el mapa.</>,
      <>Encima van las <b>zonas prohibidas</b>: aeropuertos, hospitales.</>,
      <>El sistema traza la <b>ruta que las esquiva</b> hasta la casa.</>,
    ]}
  />
);
const Entrega = () => (
  <Slide
    id="walmart-entrega"
    mode="entrega"
    label="La entrega"
    title="Justo en el patio"
    dato={{ n: "23 min", d: "en promedio, desde el pedido hasta la puerta." }}
    color={NEON.green}
    items={[
      <>El dron llega volando a la <b>casa del cliente</b>.</>,
      <>Baja el paquete <b>con una cuerda</b> en un punto libre del patio, marcado en el mapa.</>,
    ]}
  />
);
const Logistica = () => (
  <Slide
    id="walmart-logistica"
    mode="logistica"
    label="GIS en logística"
    title="La tienda es el depósito"
    color={NEON.green}
    items={[
      <>Cada tienda <b>cubre un círculo de casas</b> a pocos minutos.</>,
      <>Con el mapa se ve <b>qué casas quedan cubiertas</b> y dónde conviene sumar tiendas.</>,
    ]}
  />
);

const Tecnologias = () => (
  <TechSlide
    id="walmart-tecnologias"
    logo={LOGO}
   
    label="Tecnologías · Walmart + Wing"
    bg={<DroneScene mode="intro" />}
    techs={[
      { icon: MapPinned, name: "Mapa del cielo", d: "Zonas donde se puede y no se puede volar, cargadas en el mapa.", gis: true, c: NEON.blue },
      { icon: Route, name: "Ruteo aéreo", d: "Calcula el camino del dron que esquiva las zonas prohibidas.", gis: true, c: NEON.green },
      { icon: Locate, name: "GPS de precisión", d: "Ubica el punto exacto del patio donde baja el paquete.", gis: true, c: NEON.amber },
      { icon: Drone, name: "Drones de Wing", d: "Vuelan solos y bajan el paquete con una cuerda.", c: NEON.red },
    ]}
  />
);


export const WALMART_SLIDES: DeckSlide[] = [
  { id: "walmart", label: "Walmart · Drones", C: Intro },
  { id: "walmart-problema", label: "Walmart · El problema", steps: 2, C: Problema },
  { id: "walmart-mapa", label: "Walmart · Mapa del cielo", steps: 3, C: Solucion },
  { id: "walmart-entrega", label: "Walmart · La entrega", steps: 2, C: Entrega },
  { id: "walmart-logistica", label: "Walmart · En logística", steps: 2, C: Logistica },
  { id: "walmart-tecnologias", label: "Walmart + Wing · Tecnologías", steps: 4, C: Tecnologias },
];
