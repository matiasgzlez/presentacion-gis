import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useStep } from "@/components/deck";
import { NeonFrame, Pill } from "@/components/neon";

/* Diapositiva para explicar un uso del GIS con frases completas.
   Izquierda: la pregunta que se responde, los pasos (se resalta el que muestra la animación) y las tecnologías que usa.
   Derecha: la animación, que avanza sola en bucle. */

const ease = [0.16, 1, 0.3, 1] as const;

export type ExplainPoint = { b: string; t: ReactNode };
export type ExplainTech = { name: string; d?: string; gis?: boolean };

export function ExplainSlide({ id, logo, logoClass, pill, title, subtitle, question, color, points, techs, scene }: { id: string; logo?: string; logoClass?: string; pill: string; title: string; subtitle?: ReactNode; question: ReactNode; color: string; points: ExplainPoint[]; techs: ExplainTech[]; scene: (step: number) => ReactNode }) {
  const step = useStep();
  return (
    <NeonFrame id={id} logo={logo} logoClass={logoClass}>
      <div className="absolute bottom-[clamp(1rem,2.6vh,2rem)] left-[clamp(1.5rem,3vw,3.5rem)] top-[clamp(8rem,17.5vh,11.5rem)] flex w-[35vw] flex-col">
        <div className="flex items-center gap-3">
          <Pill>{pill}</Pill>
        </div>
        <h2 className="display mt-[clamp(0.5rem,1.2vh,0.9rem)] text-[clamp(1.7rem,2.6vw,3.1rem)] uppercase leading-[1.02]" style={{ color }}>{title}</h2>
        {subtitle && <p className="mt-[clamp(0.3rem,0.8vh,0.6rem)] text-[clamp(0.95rem,1.2vw,1.45rem)] leading-snug text-white/80">{subtitle}</p>}
        <p className="mt-[clamp(0.4rem,1vh,0.7rem)] text-[clamp(1.1rem,1.4vw,1.7rem)] font-medium leading-snug text-white/90">{question}</p>
        <ol className="mt-[clamp(0.8rem,2vh,1.4rem)] flex flex-col gap-[clamp(0.45rem,1.1vh,0.8rem)]">
          {points.map((p, i) => {
            const cur = step === i + 1;
            return (
              <motion.li
                key={p.b}
                className="flex items-start gap-3 rounded-2xl border-2 px-[clamp(0.6rem,0.9vw,1rem)] py-[clamp(0.5rem,1.1vh,0.8rem)]"
                initial={false}
                animate={{ borderColor: cur ? color : "rgba(255,255,255,0.06)", backgroundColor: cur ? "rgba(18,24,36,0.95)" : "rgba(18,24,36,0.35)", opacity: step === 0 || cur ? 1 : 0.55 }}
                transition={{ duration: 0.45, ease }}
              >
                <span className="mt-[0.15em] grid size-[1.6em] shrink-0 place-items-center rounded-full font-mono text-[clamp(0.75rem,0.9vw,1rem)] font-bold" style={{ background: color, color: "#0e131c" }}>{i + 1}</span>
                <p className="text-[clamp(1.05rem,1.35vw,1.6rem)] leading-snug text-white/90">
                  <b className="text-white">{p.b}:</b> {p.t}
                </p>
              </motion.li>
            );
          })}
        </ol>
        <div className="mt-auto pt-[clamp(0.5rem,1.2vh,0.9rem)]">
          <p className="font-mono text-[clamp(0.65rem,0.75vw,0.85rem)] font-bold uppercase tracking-[0.12em] text-white/60">Tecnologías que usa acá</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {techs.map((x) => (
              <span key={x.name} className="flex items-center gap-2 rounded-xl border-2 bg-[#121824]/90 px-3 py-1.5 text-[clamp(0.9rem,1.1vw,1.3rem)] leading-tight" style={{ borderColor: x.gis ? "#3b82f6" : "rgba(255,255,255,0.18)" }}>
                {x.gis && <span className="rounded-md bg-[#3b82f6] px-1.5 py-0.5 font-mono text-[0.75em] font-bold text-white">GIS</span>}
                <span><b className="text-white">{x.name}</b>{x.d && <span className="text-white/65"> · {x.d}</span>}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-[clamp(0.75rem,2vh,1.5rem)] left-[38.5vw] right-[clamp(0.75rem,1.5vw,1.5rem)] top-[clamp(2.5rem,6vh,4rem)] overflow-hidden rounded-3xl border border-white/10 bg-[#0b1018]/40">
        {scene(step)}
      </div>
    </NeonFrame>
  );
}
