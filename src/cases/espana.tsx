import { motion } from "motion/react";
import type { DeckSlide } from "@/components/deck";
import { useStep } from "@/components/deck";
import { FullScene, NEON, NeonFrame, Pill, StepCard } from "@/components/neon";
import { RoadScene } from "@/scenes/road3d";
import { TrainScene, type TrainMode } from "@/scenes/train";

/* Caso reciente · Trenes en España (28/10/2026). Caso de REFLEXIÓN: no es un éxito, es un contraejemplo.
   Contado hora por hora en 3D. Datos: Wikipedia ("2026 Toledo train collision"), elDiario.es y Europa Press (28/10/2026).
   Las causas siguen bajo investigación. Lo que se dice en voz alta está en exposicion.md. */

const ease = [0.16, 1, 0.3, 1] as const;

function Frame({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <NeonFrame id={id}>
      <div className="absolute left-[clamp(1.5rem,3vw,3.5rem)] top-[clamp(2.75rem,6vh,4.5rem)] z-10 flex items-center gap-4 rounded-xl bg-white px-4 py-2.5">
        <img src="/logos/renfe.svg" alt="Renfe" className="h-[clamp(1.6rem,4vh,2.6rem)] w-auto" />
        <img src="/logos/iryo.svg" alt="Iryo" className="h-[clamp(1.8rem,4.5vh,2.9rem)] w-auto" />
      </div>
      {children}
    </NeonFrame>
  );
}

function Intro() {
  return (
    <Frame id="espana">
      <div className="absolute inset-0 opacity-60">
        <TrainScene mode="intro" labels={false} />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso reciente · Trenes en España · 28 de octubre de 2026
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,10vw,11rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            Cuando falla
          </motion.h2>
          <motion.div className="mt-5 flex flex-wrap justify-center gap-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill color={NEON.red}>Caso de reflexión</Pill>
            <Pill outline color={NEON.amber}>Tener el dato no alcanza</Pill>
          </motion.div>
        </div>
      </div>
    </Frame>
  );
}

function Scene3D({ id, mode, label, title, color, items }: { id: string; mode: TrainMode; label: string; title: string; color: string; items: React.ReactNode[] }) {
  const step = useStep();
  return (
    <Frame id={id}>
      <FullScene map={<TrainScene mode={mode} step={step} />} card={<StepCard label={label} title={title} color={color} step={step} items={items} />} />
    </Frame>
  );
}

const Salida = () => (
  <Scene3D id="espana-salida" mode="salida" label="07:54 · 08:00" title="Salen de Atocha" color={NEON.blue}
    items={[
      <>A las 07:54 sale de Madrid el <b>Iryo 6076</b>, rumbo a Sevilla.</>,
      <>A las 08:00 sale el <b>AVE 2080</b> de Renfe, por la misma vía, seis minutos detrás.</>,
    ]} />
);
const Lzb = () => (
  <Scene3D id="espana-lzb" mode="lzb" label="08:30" title="Se cae el sistema automático" color={NEON.amber}
    items={[
      <>La <b>LZB</b> sabe dónde está cada tren y lo frena sola si hace falta. A las 08:30 <b>deja de funcionar</b> en 68 km de vía.</>,
      <>Hizo lo que debía: <b>los seis trenes del tramo frenaron solos</b>. El Iryo y el AVE quedaron a 25 km.</>,
    ]} />
);
const Orden = () => (
  <Scene3D id="espana-orden" mode="orden" label="08:36" title="La orden" color={NEON.red}
    items={[
      <>Desde Atocha autorizan al AVE a seguir con el <b>sistema de respaldo</b>, que depende de las personas.</>,
      <>La regla del respaldo: seguir <b>solo si el tramo de adelante está libre</b>, mirando la vía, a 40 km/h como máximo.</>,
      <>Nadie confirmó que el tramo estuviera libre: <b>el Iryo seguía ahí</b>.</>,
    ]} />
);
const Parado = () => (
  <Scene3D id="espana-parado" mode="parado" label="08:41 – 08:48" title="El Iryo no arranca" color={NEON.amber}
    items={[
      <>La conductora del Iryo avisa que <b>no puede reiniciar el sistema</b>: el tren sigue detenido.</>,
      <>En las pantallas de Atocha <b>se veía dónde estaba cada tren</b>. Eso es GIS. Pero nadie frenó al AVE.</>,
    ]} />
);
const Choque = () => (
  <Scene3D id="espana-choque" mode="choque" label="08:54" title="El choque" color={NEON.red}
    items={[
      <>El AVE avanza a <b>160–200 km/h</b>, muy por encima de lo que permitía la regla.</>,
      <>Alcanza al Iryo en el <b>km 118, cerca de Urda</b>. Murieron 69 personas y más de 200 resultaron heridas.</>,
    ]} />
);
const Leccion = () => (
  <Scene3D id="espana-leccion" mode="leccion" label="La lección" title="Dato + regla + sistema" color={NEON.green}
    items={[
      <>El <b>dato estaba</b> en las pantallas, y <b>la regla también</b>.</>,
      <>Cuando el automático se cayó, una orden humana pasó por alto la regla. El sistema tendría que <b>frenar una orden que el mapa muestra peligrosa</b>.</>,
    ]} />
);

function Logistica() {
  const step = useStep();
  return (
    <Frame id="espana-logistica">
      <FullScene
        map={<RoadScene step={step} />}
        card={
          <StepCard label="¿Y en logística?" title="Lo mismo con un camión" color={NEON.blue} step={step}
            items={[
              <>El mapa de la flota muestra una ruta cortada, pero <b>alguien autoriza al camión a seguir</b>.</>,
              <>El GIS sirve de verdad cuando <b>no deja pasar una orden peligrosa</b>: avisa y frena.</>,
            ]} />
        }
      />
    </Frame>
  );
}

export const ESPANA_SLIDES: DeckSlide[] = [
  { id: "espana", label: "Trenes en España · Cuando falla", C: Intro },
  { id: "espana-salida", label: "Trenes · 07:54 Salen de Atocha", steps: 2, C: Salida },
  { id: "espana-lzb", label: "Trenes · 08:30 Se cae la LZB", steps: 2, C: Lzb },
  { id: "espana-orden", label: "Trenes · 08:36 La orden", steps: 3, C: Orden },
  { id: "espana-parado", label: "Trenes · 08:41 El Iryo no arranca", steps: 2, C: Parado },
  { id: "espana-choque", label: "Trenes · 08:54 El choque", steps: 2, C: Choque },
  { id: "espana-leccion", label: "Trenes · La lección", steps: 2, C: Leccion },
  { id: "espana-logistica", label: "Trenes · ¿Y en logística?", steps: 2, C: Logistica },
];
