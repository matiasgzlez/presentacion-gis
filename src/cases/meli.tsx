import { motion } from "motion/react";
import { Warehouse, Timer, Route, BrainCircuit } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { useStep } from "@/components/deck";
import { FullScene, NEON, NeonFrame, Pill, ResultsSlide, StepCard, TechSlide } from "@/components/neon";
import { ArgMap, type ArgScene } from "@/scenes/arg-neon";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 02 · Mercado Libre · dónde poner los depósitos. Mapa real de Argentina en neón.
   Lo que se dice en voz alta está en exposicion.md. */

const LOGO = "/logos/mercadolibre.png";
const VIDEO: CaseVideo = { title: "Así funciona el centro logístico de Mercado Libre en Cyber Monday (A24)", youtube: "kpDNNx3uju0" };
const ease = [0.16, 1, 0.3, 1] as const;

function Intro() {
  return (
    <NeonFrame id="mercadolibre" logo={LOGO} video={VIDEO}>
      <div className="absolute inset-0 opacity-60">
        <ArgMap scene="intro" step={0} />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso 02 · Mercado Libre
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,11vw,12rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            Depósitos
          </motion.h2>
          <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill color={NEON.amber}>¿Dónde conviene guardar los productos?</Pill>
          </motion.div>
        </div>
      </div>
    </NeonFrame>
  );
}

function Slide({ id, scene, label, title, color, items }: { id: string; scene: ArgScene; label: string; title: string; color: string; items: React.ReactNode[] }) {
  const step = useStep();
  return (
    <NeonFrame id={id} logo={LOGO} video={VIDEO}>
      <FullScene map={<ArgMap scene={scene} step={step} />} card={<StepCard label={label} title={title} color={color} step={step} items={items} />} />
    </NeonFrame>
  );
}

const Problema = () => (
  <Slide
    id="mercadolibre-problema"
    scene="problema"
    label="El problema"
    title="Un depósito lejos de todos"
    color={NEON.amber}
    items={[
      <>Casi todo lo que se vende sale por la <b>red propia</b> de Mercado Libre.</>,
      <>Si el producto está lejos de quien lo compra, <b>la entrega tarda días</b>.</>,
    ]}
  />
);
const Solucion = () => (
  <Slide
    id="mercadolibre-ubicacion"
    scene="solucion"
    label="La solución con GIS"
    title="Elegir el mejor lugar"
    color={NEON.blue}
    items={[
      <>Primero, el mapa de <b>dónde están los compradores</b>.</>,
      <>Después, <b>hasta dónde llega un camión en un día</b> desde cada lugar posible.</>,
      <>Se elige el lugar que deja <b>más compradores cerca</b>: Córdoba.</>,
    ]}
  />
);
const Tiempo = () => (
  <Slide
    id="mercadolibre-tiempo"
    scene="tiempo"
    label="La clave"
    title="Tiempo, no distancia"
    color={NEON.green}
    items={[
      <>Un círculo marca lo que está <b>a la misma distancia</b>.</>,
      <>Pero por la ruta el camión va más rápido: lo que llega en un día <b>se estira por las rutas</b>.</>,
    ]}
  />
);
const Logistica = () => (
  <Slide
    id="mercadolibre-logistica"
    scene="logistica"
    label="GIS en logística"
    title="Una red de depósitos"
    color={NEON.green}
    items={[
      <>Un <b>centro grande</b> abastece a los centros regionales.</>,
      <>Y de cada uno salen <b>los repartos del día</b>, armados sobre el mapa.</>,
    ]}
  />
);
const Tecnologias = () => (
  <TechSlide
    id="mercadolibre-tecnologias"
    logo={LOGO}
    video={VIDEO}
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

const Resultados = () => (
  <ResultsSlide
    id="mercadolibre-resultados"
    logo={LOGO}
    video={VIDEO}
    label="Resultados · Mercado Libre"
    bg={<ArgMap scene="intro" step={0} />}
    stats={[
      { pre: "US$ ", to: 3400, suf: " M", d: "invierte en Argentina en 2026, sobre todo en logística", c: NEON.amber },
      { pre: "+", to: 100000, suf: " m²", d: "tiene Escobar, su mayor centro del país (octubre de 2026)", c: NEON.blue },
      { to: 130000, d: "productos por día puede procesar Escobar", c: NEON.green },
    ]}
  />
);

export const MELI_SLIDES: DeckSlide[] = [
  { id: "mercadolibre", label: "Mercado Libre · Depósitos", C: Intro },
  { id: "mercadolibre-problema", label: "Mercado Libre · El problema", steps: 2, C: Problema },
  { id: "mercadolibre-ubicacion", label: "Mercado Libre · Dónde ubicar", steps: 3, C: Solucion },
  { id: "mercadolibre-tiempo", label: "Mercado Libre · Tiempo, no distancia", steps: 2, C: Tiempo },
  { id: "mercadolibre-logistica", label: "Mercado Libre · En logística", steps: 2, C: Logistica },
  { id: "mercadolibre-tecnologias", label: "Mercado Libre · Tecnologías", steps: 4, C: Tecnologias },
  { id: "mercadolibre-resultados", label: "Mercado Libre · Resultados", steps: 3, C: Resultados },
];
