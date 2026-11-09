import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useStep } from "@/components/deck";
import { NEON } from "@/components/neon";
import { Photo, PhotoPage } from "@/components/photo-page";

/* El hilo de cada caso:
   1 · JourneySlide: cómo funciona su logística, en 4 estaciones con fotos reales (avanza sola).
   2 · GisSlide: el mismo recorrido, con las estaciones donde entra el GIS en azul y la pregunta que se responde con un mapa. */

const ease = [0.16, 1, 0.3, 1] as const;
const BLUE = NEON.blue;

export type Station = { icon: LucideIcon; b: string; t?: ReactNode; img?: string; cap?: string };
export type GisQuestion = { at: number[]; fn: string; q: string; c: string };

/** El recorrido: estaciones en fila. `cur` = hasta dónde llegó; `gis` = estaciones marcadas en azul. */
export function Journey({ stations, cur, gis, color }: { stations: Station[]; cur: number; gis?: number[]; color: string }) {
  const n = stations.length;
  return (
    <div className="relative flex items-center justify-between rounded-3xl border-2 border-white/15 bg-white/[0.04] px-[clamp(1.2rem,3vw,3.5rem)] py-[clamp(0.8rem,1.8vh,1.4rem)]">
      <div className="absolute inset-x-[clamp(2.5rem,5vw,6rem)] top-[calc(clamp(0.8rem,1.8vh,1.4rem)+clamp(1.3rem,2vw,2.2rem))] h-1 rounded-full bg-white/10" />
      <motion.div
        className="absolute left-[clamp(2.5rem,5vw,6rem)] top-[calc(clamp(0.8rem,1.8vh,1.4rem)+clamp(1.3rem,2vw,2.2rem))] h-1 rounded-full"
        style={{ background: color }}
        animate={{ width: `calc((100% - 2 * clamp(2.5rem,5vw,6rem)) * ${Math.max(0, cur - 1) / (n - 1)})` }}
        transition={{ duration: 0.8, ease }}
      />
      {stations.map((x, i) => {
        const on = i + 1 <= cur, now = i + 1 === cur, isGis = gis?.includes(i + 1);
        const c = isGis ? BLUE : color;
        return (
          <div key={x.b} className="relative z-10 flex flex-col items-center gap-1.5">
            <motion.div
              className="grid size-[clamp(2.6rem,4vw,4.4rem)] place-items-center rounded-full border-2"
              animate={{ backgroundColor: on || isGis ? c : "#121824", borderColor: on || isGis ? c : "rgba(255,255,255,0.2)", scale: now || isGis ? 1.15 : 1, boxShadow: isGis ? `0 0 28px ${BLUE}` : "0 0 0 rgba(0,0,0,0)" }}
              transition={{ duration: 0.5 }}
            >
              <x.icon className="size-[48%]" color={on || isGis ? (isGis ? "#fff" : "#0e131c") : "rgba(255,255,255,0.5)"} />
            </motion.div>
            <span className={`text-[clamp(0.85rem,1.1vw,1.3rem)] font-semibold ${now || isGis ? "text-white" : "text-white/50"}`}>{x.b}</span>
          </div>
        );
      })}
    </div>
  );
}

/** "¿Cómo funciona su logística?": el recorrido arriba y la foto real del paso actual abajo. */
export function JourneySlide({ id, logo, logoClass, name, color, part, stations }: { id: string; logo?: string; logoClass?: string; name: string; color: string; part: string; stations: Station[] }) {
  const step = useStep();
  const cur = Math.max(1, step), v = stations[cur - 1];
  return (
    <PhotoPage
      id={id}
      logo={logo}
      logoClass={logoClass}
      pill="¿Cómo funciona?"
      name={name}
      color={color}
      part={part}
      points={stations.map((x) => ({ b: x.b, t: x.t }))}
      active={step}
      right={
        <div className="flex size-full flex-col gap-[clamp(0.8rem,1.4vw,1.4rem)]">
          <Journey stations={stations} cur={cur} color={color} />
          <div className="relative min-h-0 flex-1">
            <AnimatePresence mode="popLayout">
              <motion.div key={v.img} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
                {v.img && <Photo src={v.img} className="size-full" caption={v.cap} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      }
    />
  );
}

/** Las funciones GIS que usa la empresa: el mismo recorrido; se ilumina dónde entra cada función y qué pregunta responde. */
export function GisSlide({ id, logo, logoClass, name, color, title, stations, questions }: { id: string; logo?: string; logoClass?: string; name: string; color: string; title: string; stations: Station[]; questions: GisQuestion[] }) {
  const step = useStep();
  const show = Math.max(1, step);
  return (
    <PhotoPage
      id={id}
      logo={logo}
      logoClass={logoClass}
      pill="Funciones GIS que usa"
      name={name}
      color={BLUE}
      part={title}
      right={
        <div className="flex size-full flex-col gap-[clamp(0.8rem,1.4vw,1.4rem)]">
          <Journey stations={stations} cur={0} gis={questions[show - 1].at} color={color} />
          <div className="grid min-h-0 flex-1 gap-[clamp(0.8rem,1.4vw,1.4rem)]" style={{ gridTemplateRows: `repeat(${questions.length}, 1fr)` }}>
            {questions.map((p, i) => {
              const on = i + 1 === show;
              return (
                <motion.div
                  key={p.q}
                  className="flex flex-col justify-center rounded-3xl border-2 px-[clamp(1.2rem,2.4vw,2.6rem)]"
                  initial={false}
                  animate={{ borderColor: on ? p.c : "rgba(255,255,255,0.1)", backgroundColor: on ? "rgba(18,24,36,0.95)" : "rgba(18,24,36,0.4)", opacity: on ? 1 : 0.45 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <p className="font-mono text-[clamp(0.75rem,0.95vw,1.1rem)] font-bold uppercase tracking-[0.12em]" style={{ color: p.c }}>{questions.length > 1 ? `Función GIS ${i + 1}` : "La función GIS clave"}</p>
                  <p className="display mt-1 text-[clamp(2rem,3.2vw,3.8rem)] leading-tight" style={{ color: on ? p.c : "#fff" }}>{p.fn}</p>
                  <p className="mt-1 text-[clamp(1.1rem,1.5vw,1.8rem)] text-white/80">{p.q}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      }
    />
  );
}
