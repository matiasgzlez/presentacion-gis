import type { ReactNode } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { useStep } from "@/components/deck";

/* Estilo oscuro de los casos (inspirado en los explicativos de mapas): fondo azul noche con grilla,
   esquinas marcadas, pastillas amarillas, tarjetas con borde de color donde los puntos aparecen de a uno. */

export const NEON = { blue: "#3b82f6", green: "#22c55e", amber: "#f5b31b", red: "#ef4444" };
const ease = [0.16, 1, 0.3, 1] as const;

export function NeonFrame({ id, logo, logoClass, children }: { id: string; logo?: string; logoClass?: string; children: ReactNode }) {
  return (
    <section
      id={id}
      className="relative h-dvh overflow-hidden bg-[#0e131c] text-white"
      style={{ backgroundImage: "linear-gradient(rgba(96,130,190,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(96,130,190,0.07) 1px, transparent 1px)", backgroundSize: "44px 44px" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,8,14,0.7)_100%)]" />
      {/* esquinas */}
      {["left-4 top-9 border-l-2 border-t-2", "right-4 top-9 border-r-2 border-t-2", "left-4 bottom-4 border-l-2 border-b-2", "right-4 bottom-4 border-r-2 border-b-2"].map((c) => (
        <span key={c} className={clsx("pointer-events-none absolute size-5 border-white/35", c)} />
      ))}
      {logo && <img src={logo} alt="" className={clsx("absolute left-[clamp(1.5rem,3vw,3.5rem)] top-[clamp(2.75rem,6vh,4.5rem)] z-10 w-auto object-contain mix-blend-screen", logoClass ?? "h-[clamp(3.5rem,10vh,7rem)]")} />}
      {children}
    </section>
  );
}

export function Pill({ children, color = NEON.amber, outline }: { children: ReactNode; color?: string; outline?: boolean }) {
  return (
    <span
      className="inline-block rounded-full px-[0.9em] py-[0.3em] font-mono text-[clamp(0.75rem,0.95vw,1.1rem)] font-bold uppercase tracking-[0.08em]"
      style={outline ? { border: `2px solid ${color}`, color } : { background: color, color: "#0e131c" }}
    >
      {children}
    </span>
  );
}

export type Dato = { n: ReactNode; d: ReactNode };

/** Panel de la izquierda: el título y los puntos clave, todos a la vista (ayuda-memoria, no el guion entero).
    Mientras la animación corre en bucle, se resalta el punto que corresponde a lo que se ve. Abajo, opcional, el dato del caso. */
export function StepCard({ label, title, color, items, step, dato }: { label: string; title: string; color: string; items: ReactNode[]; step: number; dato?: Dato }) {
  const many = items.length > 4;
  return (
    <div className="flex h-full flex-col">
      <div>
        <Pill>{label}</Pill>
        <h3 className="display mt-[clamp(0.6rem,1.4vh,1rem)] text-[clamp(1.7rem,2.6vw,3rem)] uppercase leading-[1.02]" style={{ color }}>
          {title}
        </h3>
      </div>
      <ol className={clsx("mt-[clamp(1rem,2.6vh,2rem)] flex flex-col", many ? "gap-[clamp(0.45rem,1vh,0.8rem)]" : "gap-[clamp(0.6rem,1.6vh,1.1rem)]")}>
        {items.map((it, i) => {
          const cur = step === i + 1;
          return (
            <motion.li
              key={i}
              className="flex items-start gap-3 rounded-2xl border-2 px-[clamp(0.7rem,1vw,1.1rem)] py-[clamp(0.45rem,1vh,0.8rem)]"
              initial={false}
              animate={{ borderColor: cur ? color : "rgba(255,255,255,0.08)", backgroundColor: cur ? "rgba(18,24,36,0.95)" : "rgba(18,24,36,0.45)", boxShadow: cur ? `0 0 26px ${color}33` : "0 0 0 rgba(0,0,0,0)" }}
              transition={{ duration: 0.45, ease }}
            >
              <span className="num mt-[0.1em] grid size-[1.7em] shrink-0 place-items-center rounded-full font-mono text-[clamp(0.8rem,0.95vw,1.05rem)] font-bold" style={{ background: color, color: "#0e131c" }}>
                {i + 1}
              </span>
              <p className={clsx("font-semibold leading-snug text-white", many ? "text-[clamp(0.95rem,1.15vw,1.35rem)]" : "text-[clamp(1.05rem,1.4vw,1.65rem)]")}>{it}</p>
            </motion.li>
          );
        })}
      </ol>
      {dato && (
        <div className="mt-auto rounded-2xl border-2 bg-[#121824]/90 px-[clamp(0.9rem,1.2vw,1.3rem)] py-[clamp(0.6rem,1.4vh,1rem)]" style={{ borderColor: `${NEON.amber}aa` }}>
          <p className="font-mono text-[clamp(0.65rem,0.75vw,0.85rem)] font-bold uppercase tracking-[0.12em] text-[#f5b31b]">El dato</p>
          <p className="display num mt-1 text-[clamp(1.8rem,2.8vw,3.2rem)] leading-none text-white">{dato.n}</p>
          <p className="mt-1.5 text-[clamp(0.9rem,1.05vw,1.25rem)] leading-snug text-white/80">{dato.d}</p>
        </div>
      )}
    </div>
  );
}

/** Diapositiva partida: a la izquierda (30 %) lo que decimos; a la derecha (70 %) la animación. */
export function FullScene({ map, card }: { map: ReactNode; card: ReactNode }) {
  return (
    <>
      <div className="absolute bottom-[clamp(1.25rem,3vh,2.25rem)] left-[clamp(1.5rem,3vw,3.5rem)] top-[clamp(9.5rem,21vh,13rem)] w-[calc(30vw-clamp(1.5rem,3vw,3.5rem))]">{card}</div>
      <div className="absolute bottom-[clamp(0.75rem,2vh,1.5rem)] left-[31vw] right-[clamp(0.75rem,1.5vw,1.5rem)] top-[clamp(2.5rem,6vh,4rem)] overflow-hidden rounded-3xl border border-white/10 bg-[#0b1018]/40">
        {map}
      </div>
    </>
  );
}

export type Tech = { icon: LucideIcon; name: string; d: ReactNode; gis?: boolean; c: string };

/** Diapositiva de tecnologías: la animación del caso de fondo y una tarjeta por tecnología, que aparecen de a una.
    Las que son propias del mundo GIS llevan la marca "GIS". */
export function TechSlide({ id, logo, logoClass, label, techs, bg }: { id: string; logo?: string; logoClass?: string; label: string; techs: Tech[]; bg: ReactNode }) {
  return (
    <NeonFrame id={id} logo={logo} logoClass={logoClass}>
      <div className="absolute inset-0 opacity-20">{bg}</div>
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] top-[clamp(8rem,21vh,12.5rem)]">
        <div className="flex flex-wrap items-center gap-3">
          <Pill>{label}</Pill>
          <span className="flex items-center gap-2 font-mono text-[clamp(0.75rem,0.9vw,1rem)] font-bold uppercase tracking-[0.08em] text-white/55">
            <span className="rounded-md bg-[#3b82f6] px-1.5 py-0.5 text-white">GIS</span> = tecnología del mundo de los mapas
          </span>
        </div>
        <div className="mt-[clamp(1.25rem,4vh,3rem)] grid gap-[clamp(0.9rem,1.6vw,1.6rem)]" style={{ gridTemplateColumns: `repeat(${techs.length}, minmax(0, 1fr))` }}>
          {techs.map((tc, i) => {
            const Icon = tc.icon;
            return (
              <motion.div
                key={tc.name}
                className="relative rounded-3xl border-[3px] bg-[#151b26]/92 p-[clamp(1.1rem,2vw,2.1rem)]"
                style={{ borderColor: tc.c, boxShadow: `0 0 44px ${tc.c}2e` }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease }}
              >
                {tc.gis && <span className="absolute right-4 top-4 rounded-md bg-[#3b82f6] px-2 py-0.5 font-mono text-[clamp(0.7rem,0.8vw,0.9rem)] font-bold text-white">GIS</span>}
                <span className="grid size-[clamp(3rem,4.2vw,4.6rem)] place-items-center rounded-2xl" style={{ background: `${tc.c}22`, color: tc.c }}>
                  <Icon className="size-[55%]" strokeWidth={2} />
                </span>
                <p className="display mt-4 text-[clamp(1.4rem,2.1vw,2.5rem)] leading-tight" style={{ color: tc.c }}>{tc.name}</p>
                <p className="mt-2 text-[clamp(1rem,1.3vw,1.5rem)] font-medium leading-snug text-white/85">{tc.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </NeonFrame>
  );
}

export type Who = { name: string; d: ReactNode };

/** En la portada de cada caso: quién es la empresa y a qué se dedica, en una o dos líneas. */
export function WhoIs({ who }: { who: Who[] }) {
  return (
    <motion.div
      className="mx-auto mt-[clamp(1.25rem,3.5vh,2.5rem)] w-[min(54rem,80vw)] rounded-2xl border-2 border-white/20 bg-[#121824]/88 px-[clamp(1rem,1.6vw,1.8rem)] py-[clamp(0.7rem,1.6vh,1.1rem)] text-left backdrop-blur-md"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7, ease }}
    >
      <p className="font-mono text-[clamp(0.7rem,0.8vw,0.9rem)] font-bold uppercase tracking-[0.14em] text-[#f5b31b]">{who.length > 1 ? "¿Quiénes son?" : "¿Quién es?"}</p>
      {who.map((w) => (
        <p key={w.name} className="mt-1.5 text-[clamp(1rem,1.3vw,1.5rem)] font-medium leading-snug text-white/90">
          <b className="text-white">{w.name}:</b> {w.d}
        </p>
      ))}
    </motion.div>
  );
}

/* ── Piezas de cada caso (misma estructura en los cinco) ── */

/** Portada del caso: número, título enorme y una pastilla, sobre la animación del caso. */
export function CaseIntro({ id, logo, n, company, title, pill, bg, logoClass }: { id: string; logo?: string; n: string; company: string; title: string; pill: string; bg: ReactNode; logoClass?: string }) {
  return (
    <NeonFrame id={id} logo={logo} logoClass={logoClass}>
      <div className="absolute inset-0 opacity-55">{bg}</div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/75" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso {n} · {company}
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,10.5vw,11.5rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            {title}
          </motion.h2>
          <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill>{pill}</Pill>
          </motion.div>
        </div>
      </div>
    </NeonFrame>
  );
}

export type Fact = { icon: LucideIcon; n: ReactNode; d: ReactNode };

/** ¿Quién es?: a la izquierda qué hace la empresa; a la derecha cuatro datos grandes que se van resaltando solos. */
export function CompanySlide({ id, logo, logoClass, name, color, items, facts }: { id: string; logo?: string; logoClass?: string; name: string; color: string; items: ReactNode[]; facts: Fact[] }) {
  const step = useStep();
  return (
    <NeonFrame id={id} logo={logo} logoClass={logoClass}>
      <FullScene
        card={<StepCard label="¿Quién es?" title={name} color={color} step={0} items={items} />}
        map={
          <div className="grid size-full grid-cols-2 grid-rows-2 gap-[clamp(0.8rem,1.4vw,1.4rem)] p-[clamp(1rem,2vw,2rem)]">
            {facts.map((fc, i) => {
              const on = step === i + 1, Icon = fc.icon;
              return (
                <motion.div
                  key={i}
                  className="flex flex-col justify-center rounded-3xl border-[3px] bg-[#151b26]/92 p-[clamp(1rem,2vw,2rem)]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, scale: on ? 1.03 : 1, borderColor: on ? color : "rgba(255,255,255,0.12)", boxShadow: on ? `0 0 50px ${color}44` : "0 0 0 rgba(0,0,0,0)" }}
                  transition={{ duration: 0.6, delay: on ? 0 : 0.1 + i * 0.08, ease }}
                >
                  <span className="grid size-[clamp(2.6rem,3.4vw,3.8rem)] place-items-center rounded-2xl" style={{ background: `${color}22`, color }}>
                    <Icon className="size-[55%]" strokeWidth={2} />
                  </span>
                  <p className="display mt-[clamp(0.6rem,1.6vh,1.1rem)] text-[clamp(1.8rem,3.1vw,3.6rem)] leading-none" style={{ color }}>{fc.n}</p>
                  <p className="mt-2 text-[clamp(1rem,1.35vw,1.6rem)] font-medium leading-snug text-white/85">{fc.d}</p>
                </motion.div>
              );
            })}
          </div>
        }
      />
    </NeonFrame>
  );
}

/** Diapositiva estándar de un caso: animación (que recibe el paso) a la derecha y la guía a la izquierda. */
export function CaseSlide({ id, logo, logoClass, label, title, color, items, dato, scene }: { id: string; logo?: string; logoClass?: string; label: string; title: string; color: string; items: ReactNode[]; dato?: Dato; scene: (step: number) => ReactNode }) {
  const step = useStep();
  return (
    <NeonFrame id={id} logo={logo} logoClass={logoClass}>
      <FullScene map={scene(step)} card={<StepCard label={label} title={title} color={color} step={step} items={items} dato={dato} />} />
    </NeonFrame>
  );
}
