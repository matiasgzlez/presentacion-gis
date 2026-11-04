import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

export function Slide({ id, children, className, bleed }: { id: string; children: ReactNode; className?: string; bleed?: boolean }) {
  return (
    <section id={id} data-slide className={clsx("slide", bleed && "!p-0", className)}>
      {children}
    </section>
  );
}

export function Reveal({ children, delay = 0, className, y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ n, children }: { n?: string; children: ReactNode }) {
  return (
    <div className="eyebrow mb-5 flex items-center gap-3">
      {n && <span className="rounded-md border border-mint/40 px-1.5 py-0.5 text-[0.7rem] text-mint">{n}</span>}
      <span>{children}</span>
    </div>
  );
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={clsx("display text-[clamp(2.4rem,5.2vw,5.4rem)]", className)}>{children}</h2>;
}

/** Número que cuenta hasta `to` cuando entra en pantalla. */
export function Counter({ to, decimals = 0, prefix = "", suffix = "", duration = 1.8, className }: { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const [txt, setTxt] = useState(format(0, decimals));
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setTxt(format(v, decimals)) });
    return () => c.stop();
  }, [inView, to, decimals, duration, mv]);
  return (
    <span ref={ref} className={clsx("num", className)}>
      {prefix}
      {txt}
      {suffix}
    </span>
  );
}

function format(v: number, d: number) {
  return v.toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
}

export function Source({ children, href }: { children: ReactNode; href?: string }) {
  return (
    <p className="mt-3 font-mono text-[0.68rem] leading-snug text-fog-2">
      Fuente:{" "}
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="underline decoration-fog-2/40 underline-offset-2 hover:text-fog">
          {children}
        </a>
      ) : (
        children
      )}
    </p>
  );
}
