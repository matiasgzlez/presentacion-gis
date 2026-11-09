import { motion } from "motion/react";
import { Slide } from "@/components/ui";
import { useStep } from "@/components/deck";
import { GisLayers } from "@/scenes/gis-layers";

/* Diapositiva 2: qué es un GIS aplicado a la logística, como una suma que aparece de a una:
   Logística (mover y guardar productos y su información, ida y vuelta) + GIS (cada dato con su dónde)
   = GIS en logística: usar el dónde para decidir (dónde guardar · por dónde ir · dónde está cada cosa), que son los casos.
   A la derecha, la animación de las capas (src/scenes/gis-layers.tsx), en bucle. Lo que decimos está en exposicion.md. */

const ease = [0.16, 1, 0.3, 1] as const;
const DECIDE = [
  { t: "Dónde guardar", c: "Mercado Libre · Walmart", col: "#16a34a" },
  { t: "Por dónde ir", c: "Uber · UPS", col: "#2563eb" },
  { t: "Dónde está cada cosa", c: "Maersk", col: "#d97706" },
];

function Block({ delay, label, color, children }: { delay: number; label: string; color: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay, ease }}>
      <p className="font-mono text-[clamp(0.8rem,1vw,1.15rem)] font-bold uppercase tracking-[0.14em]" style={{ color }}>{label}</p>
      <div className="mt-1.5 text-[clamp(1.15rem,1.55vw,1.85rem)] font-medium leading-snug text-[#222]">{children}</div>
    </motion.div>
  );
}

export function Layers() {
  const step = useStep();
  return (
    <Slide id="capas" bleed className="overflow-hidden bg-white text-[#111]">
      <div className="flex h-dvh flex-col">
        <motion.h2
          className="display relative z-10 px-[clamp(1.5rem,4vw,5rem)] pt-[clamp(2.5rem,6vh,4.5rem)] text-[clamp(2rem,3.8vw,4.2rem)] leading-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          ¿Qué es un GIS aplicado a la logística?
        </motion.h2>
        <div className="relative flex min-h-0 flex-1">
          <div className="z-10 flex w-[40vw] shrink-0 flex-col justify-center gap-[clamp(1rem,2.6vh,2rem)] pl-[clamp(1.5rem,4vw,5rem)] pr-4">
            <Block delay={0.3} label="Logística" color="#555">
              Mover y guardar productos <b>y su información</b>, de ida y de vuelta.
            </Block>
            <Block delay={1.1} label="+ GIS" color="#2563eb">
              Cada dato tiene <b>su ubicación</b>: su dónde.
            </Block>
            <motion.div className="h-[3px] w-full rounded-full bg-[#111]" initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 1.9, ease }} />
            <Block delay={2.1} label="= GIS en logística" color="#16a34a">
              <span className="display block text-[clamp(1.8rem,2.8vw,3.3rem)] leading-tight text-[#111]">Usar el dónde para decidir.</span>
              <ul className="mt-[clamp(0.6rem,1.6vh,1.1rem)] flex flex-col gap-[clamp(0.35rem,0.9vh,0.6rem)]">
                {DECIDE.map((d, i) => (
                  <motion.li key={d.t} className="flex items-baseline gap-3" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 2.7 + i * 0.35, ease }}>
                    <span className="size-[0.6em] shrink-0 translate-y-[-0.05em] rounded-full" style={{ background: d.col }} />
                    <span className="font-semibold text-[#111]">{d.t}</span>
                    <span className="text-[0.8em] text-[#777]">{d.c}</span>
                  </motion.li>
                ))}
              </ul>
            </Block>
          </div>
          <div className="relative min-w-0 flex-1">
            <GisLayers step={step} />
          </div>
        </div>
      </div>
    </Slide>
  );
}
