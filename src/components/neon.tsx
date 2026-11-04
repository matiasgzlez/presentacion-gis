import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, animate, motion } from "motion/react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { VideoPeek, type CaseVideo } from "@/components/video-peek";
import { useStep } from "@/components/deck";

/* Estilo oscuro de los casos (inspirado en los explicativos de mapas): fondo azul noche con grilla,
   esquinas marcadas, pastillas amarillas, tarjetas con borde de color donde los puntos aparecen de a uno. */

export const NEON = { blue: "#3b82f6", green: "#22c55e", amber: "#f5b31b", red: "#ef4444" };
const ease = [0.16, 1, 0.3, 1] as const;

export function NeonFrame({ id, logo, video, children }: { id: string; logo?: string; video?: CaseVideo; children: ReactNode }) {
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
      {logo && <img src={logo} alt="" className="absolute left-[clamp(1.5rem,3vw,3.5rem)] top-[clamp(2.75rem,6vh,4.5rem)] z-10 h-[clamp(3.5rem,10vh,7rem)] w-auto object-contain mix-blend-screen" />}
      {video && <VideoPeek v={video} color={NEON.blue} />}
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

/** Cartel tipo subtítulo: al llegar muestra el título; con cada → se va y entra el punto siguiente, grande y centrado. */
export function StepCard({ label, title, color, items, step }: { label: string; title: string; color: string; items: ReactNode[]; step: number }) {
  const cur = Math.min(step, items.length);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cur}
        className="rounded-2xl border-2 bg-[#121824]/85 px-[clamp(0.9rem,1.6vw,1.75rem)] py-[clamp(0.55rem,1.2vh,0.9rem)] text-center backdrop-blur-md"
        style={{ borderColor: color, boxShadow: `0 0 30px ${color}2e, 0 16px 40px rgba(0,0,0,0.4)` }}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 [&>span:first-child]:text-[clamp(0.6rem,0.7vw,0.8rem)]">
          <Pill>{label}</Pill>
          {cur > 0 && (
            <span className="display text-[clamp(0.8rem,0.95vw,1.1rem)] uppercase tracking-[0.02em]" style={{ color }}>
              {title}
            </span>
          )}
          {cur > 0 && <span className="font-mono text-[clamp(0.65rem,0.75vw,0.85rem)] font-bold text-white/45">{cur} / {items.length}</span>}
        </div>
        {cur === 0 ? (
          <h3 className="display mt-1 text-[clamp(1.3rem,2vw,2.2rem)] uppercase leading-[1.05]" style={{ color }}>
            {title}
          </h3>
        ) : (
          <p className="mt-1 text-[clamp(0.95rem,1.2vw,1.4rem)] font-medium leading-snug text-white/90">{items[cur - 1]}</p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/** La animación, centrada, ocupa toda la pantalla salvo una franja abajo; el cartel va abajo al centro, como un subtítulo. */
export function FullScene({ map, card }: { map: ReactNode; card: ReactNode }) {
  return (
    <>
      <div className="absolute inset-x-0 bottom-[clamp(4.5rem,12vh,7.5rem)] top-[clamp(3rem,7vh,4.5rem)]">{map}</div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[20vh] bg-gradient-to-t from-[#0e131c]/85 to-transparent" />
      <div className="absolute bottom-[clamp(1.25rem,3vh,2.25rem)] left-1/2 w-[min(44rem,50vw)] -translate-x-1/2">{card}</div>
    </>
  );
}

/** Número que cuenta desde 0 cuando aparece. `raw` lo muestra sin separador de miles (para años). */
function CountUp({ to, run, raw, dec = 0 }: { to: number; run: boolean; raw?: boolean; dec?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) { setV(0); return; }
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [run, to]);
  const n = dec ? Number(v.toFixed(dec)) : Math.round(v);
  return <>{raw ? String(n) : n.toLocaleString("es-AR", { minimumFractionDigits: dec, maximumFractionDigits: dec })}</>;
}

export type Stat = { pre?: string; to: number; suf?: string; raw?: boolean; dec?: number; d: ReactNode; c: string };

/** Diapositiva de resultados: la animación del caso de fondo y tres números grandes que aparecen de a uno. */
export function ResultsSlide({ id, logo, video, label, stats, bg }: { id: string; logo?: string; video?: CaseVideo; label: string; stats: Stat[]; bg: ReactNode }) {
  const step = useStep();
  return (
    <NeonFrame id={id} logo={logo} video={video}>
      <div className="absolute inset-0 opacity-25">{bg}</div>
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] top-[clamp(8rem,22vh,13rem)]">
        <Pill>{label}</Pill>
        <div className="mt-[clamp(1.5rem,5vh,3.5rem)] grid gap-[clamp(1rem,2vw,2rem)] md:grid-cols-3">
          {stats.map((st, i) => {
            const shown = step > i;
            return (
              <motion.div
                key={i}
                className="rounded-3xl border-[3px] bg-[#151b26]/90 p-[clamp(1.25rem,2.4vw,2.5rem)]"
                style={{ borderColor: st.c, boxShadow: `0 0 50px ${st.c}33` }}
                initial={false}
                animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 30, scale: shown ? 1 : 0.96 }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="display num text-[clamp(2.2rem,4vw,4.8rem)] leading-none [white-space:nowrap]" style={{ color: st.c }}>
                  {st.pre}
                  <CountUp to={st.to} run={shown} raw={st.raw} dec={st.dec} />
                  {st.suf}
                </p>
                <p className="mt-4 text-[clamp(1.1rem,1.5vw,1.8rem)] font-medium leading-snug text-white/90">{st.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </NeonFrame>
  );
}

export type Tech = { icon: LucideIcon; name: string; d: ReactNode; gis?: boolean; c: string };

/** Diapositiva de tecnologías: la animación del caso de fondo y una tarjeta por tecnología, que aparecen de a una.
    Las que son propias del mundo GIS llevan la marca "GIS". */
export function TechSlide({ id, logo, video, label, techs, bg }: { id: string; logo?: string; video?: CaseVideo; label: string; techs: Tech[]; bg: ReactNode }) {
  const step = useStep();
  return (
    <NeonFrame id={id} logo={logo} video={video}>
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
            const shown = step > i, Icon = tc.icon;
            return (
              <motion.div
                key={tc.name}
                className="relative rounded-3xl border-[3px] bg-[#151b26]/92 p-[clamp(1.1rem,2vw,2.1rem)]"
                style={{ borderColor: tc.c, boxShadow: `0 0 44px ${tc.c}2e` }}
                initial={false}
                animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 30, scale: shown ? 1 : 0.96 }}
                transition={{ duration: 0.65, ease }}
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
