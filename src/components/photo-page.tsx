import { motion } from "motion/react";
import type { ReactNode } from "react";
import { NeonFrame, Pill } from "@/components/neon";

/* Diapositivas con fotos reales: texto a la izquierda ("**Título:** explicación") y fotos a la derecha.
   Las usan las herramientas y los casos cuando muestran cómo es por dentro. */

const ease = [0.16, 1, 0.3, 1] as const;

/** Una imagen grande con un zoom lento en bucle, para que la diapositiva no quede quieta. */
export function Photo({ src, caption, className, contain }: { src: string; caption?: ReactNode; className?: string; contain?: boolean }) {
  return (
    <figure className={`relative overflow-hidden rounded-3xl border-2 border-white/15 ${contain ? "bg-white" : "bg-black"} ${className ?? ""}`}>
      <motion.img
        src={src}
        alt=""
        className={`size-full ${contain ? "object-contain p-[6%] pb-[14%]" : "object-cover"}`}
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-[clamp(0.8rem,1.4vw,1.4rem)] pb-[clamp(0.6rem,1.2vh,1rem)] pt-10 text-[clamp(0.95rem,1.2vw,1.4rem)] font-semibold leading-snug text-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export type Point = { b: string; t: ReactNode };

/** Texto a la izquierda (etiqueta + título + puntos), imágenes a la derecha.
    Con `active` (1, 2, 3…) se resalta ese punto y los demás quedan más tenues. */
export function PhotoPage({ id, logo, logoClass, pill, name, color, part, lead, points, active, right }: { id: string; logo?: string; logoClass?: string; pill: string; name: string; color: string; part: string; lead?: ReactNode; points?: Point[]; active?: number; right: ReactNode }) {
  return (
    <NeonFrame id={id} logo={logo} logoClass={logoClass}>
      <div className="absolute inset-y-[clamp(3.5rem,8vh,5.5rem)] left-[clamp(1.5rem,3.5vw,4rem)] flex w-[36vw] flex-col justify-center">
        <div className="flex items-center gap-3">
          <Pill>{pill}</Pill>
          <span className="display text-[clamp(1.2rem,1.7vw,2rem)]" style={{ color }}>{name}</span>
        </div>
        <h2 className="display mt-[clamp(0.6rem,1.6vh,1.1rem)] text-[clamp(2.4rem,4vw,4.6rem)] uppercase leading-none">{part}</h2>
        {lead && <div className="mt-[clamp(0.9rem,2.4vh,1.6rem)] text-[clamp(1.15rem,1.6vw,1.9rem)] font-medium leading-snug text-white/90">{lead}</div>}
        {points && (
          <ul className="mt-[clamp(0.9rem,2.4vh,1.6rem)] flex flex-col gap-[clamp(0.6rem,1.6vh,1.1rem)]">
            {points.map((p, i) => {
              const dim = active !== undefined && active > 0 && active !== i + 1;
              return (
                <motion.li
                  key={p.b}
                  className="flex gap-3 text-[clamp(1.05rem,1.4vw,1.65rem)] leading-snug text-white/90"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: dim ? 0.38 : 1, x: 0 }}
                  transition={{ duration: 0.6, delay: active === undefined ? 0.2 + i * 0.12 : 0, ease }}
                >
                  <span className="mt-[0.45em] size-[0.55em] shrink-0 rounded-full" style={{ background: color }} />
                  <span>
                    <b className="text-white">{p.b}{/[?!]$/.test(p.b) ? "" : ":"}</b> {p.t}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="absolute inset-y-[clamp(3.5rem,8vh,5.5rem)] left-[40vw] right-[clamp(1.5rem,3vw,3.5rem)]">{right}</div>
    </NeonFrame>
  );
}
