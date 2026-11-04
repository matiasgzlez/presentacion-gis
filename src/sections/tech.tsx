import { motion } from "motion/react";
import { Boxes, Truck, Bot, Sparkles, MessageSquareText, Globe2, type LucideIcon } from "lucide-react";
import { useStep } from "@/components/deck";
import { NEON, NeonFrame, Pill } from "@/components/neon";
import { SeaMap } from "@/scenes/sea-neon";

/* Lo que viene: SOLO tecnologías nuevas o que están saliendo, que no aparecieron en los casos.
   (GPS, geocercas, H3, satélites, drones, isócronas, ruteo, cámaras y telemática ya se contaron en cada caso.)
   Una tarjeta por paso. Fuentes en exposicion.md. */

type Item = { icon: LucideIcon; t: string; d: string; ex: string; c: string };
const ITEMS: Item[] = [
  { icon: Boxes, t: "Gemelos digitales", d: "Una copia del depósito o del puerto en la computadora, que se mueve en tiempo real.", ex: "DSV armó uno de su depósito en Singapur (2026).", c: NEON.blue },
  { icon: Truck, t: "Camiones sin chofer", d: "Camiones que manejan solos por rutas mapeadas al detalle.", ex: "Aurora ya los usa en Texas; apunta a más de 200 en 2026.", c: NEON.green },
  { icon: Bot, t: "Robots de vereda", d: "Robots que llevan el pedido las últimas cuadras, por la vereda.", ex: "Serve Robotics tiene más de 2.000, con Uber Eats.", c: NEON.amber },
  { icon: Sparkles, t: "IA agéntica", d: "Programas que ven un corte o un puerto cerrado y replanifican solos.", ex: "Gartner proyecta que el gasto se multiplique ×25 entre 2025 y 2030.", c: NEON.red },
  { icon: MessageSquareText, t: "Ruteo conversacional", d: "Se le pregunta al mapa en palabras: “¿por qué llegamos tarde al norte?”.", ex: "Aptean lo lanzó en octubre de 2026.", c: NEON.blue },
  { icon: Globe2, t: "Mapas abiertos", d: "Mapas gratis y de calidad, armados entre grandes empresas.", ex: "Overture Maps (Amazon, Meta, Microsoft, TomTom) ya suma 50 miembros.", c: NEON.green },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Tech() {
  const step = useStep();
  return (
    <NeonFrame id="tecnologias">
      <div className="absolute inset-0 opacity-20">
        <SeaMap scene="intro" step={0} />
      </div>
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] top-[clamp(3.5rem,8vh,5.5rem)]">
        <Pill>Lo que viene</Pill>
        <h2 className="display mt-3 text-[clamp(2.2rem,4vw,4.4rem)] uppercase leading-none">
          Tecnologías nuevas <span className="text-[#3cf2b5]">en GIS y logística</span>
        </h2>
        <div className="mt-[clamp(1.25rem,3.5vh,2.5rem)] grid grid-cols-3 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
          {ITEMS.map((it, i) => {
            const shown = step > i, current = step === i + 1, Icon = it.icon;
            return (
              <motion.div
                key={it.t}
                className="rounded-3xl border-[3px] bg-[#151b26]/92 p-[clamp(1rem,1.7vw,1.8rem)]"
                style={{ borderColor: it.c, boxShadow: current ? `0 0 50px ${it.c}44` : "none" }}
                initial={false}
                animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 26, scale: shown ? 1 : 0.96 }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-[clamp(2.6rem,3.4vw,3.8rem)] shrink-0 place-items-center rounded-2xl" style={{ background: `${it.c}22`, color: it.c }}>
                    <Icon className="size-[55%]" strokeWidth={2} />
                  </span>
                  <p className="display text-[clamp(1.35rem,1.9vw,2.2rem)] leading-tight" style={{ color: it.c }}>{it.t}</p>
                </div>
                <p className="mt-3 text-[clamp(1rem,1.25vw,1.45rem)] font-medium leading-snug text-white/90">{it.d}</p>
                <p className="mt-2 text-[clamp(0.85rem,1vw,1.15rem)] leading-snug text-white/55">{it.ex}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </NeonFrame>
  );
}
