import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import clsx from "clsx";

const ease = [0.16, 1, 0.3, 1] as const;

/** Los puntos se despliegan para elegir un subpaso y dejar la diapositiva en modo manual. */
export function StepPicker({ id, steps, step, onSelect }: { id: string; steps: number; step: number; onSelect: (step: number) => void }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const panelId = `subdiapositivas-${id}`;

  const close = () => {
    trigger.current?.focus();
    setOpen(false);
  };

  const onPanelKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      close();
      return;
    }
    // Dentro del selector, las teclas recorren las opciones y no la presentación.
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      const current = options.current.indexOf(document.activeElement as HTMLButtonElement);
      const target = e.key === "Home" ? 0 : e.key === "End" ? steps :
        Math.max(0, Math.min(steps, current + (["ArrowLeft", "ArrowUp"].includes(e.key) ? -1 : 1)));
      options.current[target]?.focus();
    } else if ([" ", "Enter", "PageUp", "PageDown"].includes(e.key)) {
      e.stopPropagation();
      if (e.key === "PageUp" || e.key === "PageDown") e.preventDefault();
    }
  };

  return (
    <div
      className="pointer-events-auto relative shrink-0"
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}
    >
      <button
        ref={trigger}
        type="button"
        aria-label="Elegir subdiapositiva"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") e.stopPropagation();
          if (e.key === "Escape" && open) { e.preventDefault(); e.stopPropagation(); close(); }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
            requestAnimationFrame(() => options.current[step]?.focus());
          }
        }}
        className={clsx("flex h-6 items-center rounded-full border px-2.5 transition-colors duration-300", open ? "border-[#f5b31b]/60 text-[#f5b31b]" : "border-transparent hover:border-current/20")}
      >
        <span className="flex gap-1.5" aria-label={`paso ${step} de ${steps}`}>
          {Array.from({ length: steps }, (_, k) => (
            <i key={k} aria-hidden="true" className={clsx("block size-1.5 rounded-full bg-current transition-opacity duration-300", k < step ? "opacity-100" : "opacity-30")} />
          ))}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="group"
            aria-label="Subdiapositivas"
            onKeyDown={onPanelKey}
            className="absolute left-0 top-full z-10 origin-top-right pt-2 text-white sm:left-auto sm:right-0"
            initial={{ opacity: 0, y: reducedMotion ? 0 : -8, scale: reducedMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -4, scale: reducedMotion ? 1 : 0.98, pointerEvents: "none" }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease }}
          >
            <div className="w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/15 bg-[#121824]/95 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between gap-4 text-[0.65rem] font-bold uppercase tracking-[0.12em]">
                <span className="text-[#f5b31b]">Subdiapositivas</span>
                <span className="text-white/45">{step} / {steps}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: steps + 1 }, (_, value) => (
                  <motion.button
                    key={value}
                    ref={(node) => { options.current[value] = node; }}
                    type="button"
                    aria-label={value === 0 ? "Ir al inicio de la diapositiva" : `Ir a la subdiapositiva ${value}`}
                    aria-pressed={value === step}
                    onClick={() => { onSelect(value); close(); }}
                    className={clsx("grid h-9 min-w-9 place-items-center rounded-xl border px-2.5 text-[0.8rem] font-bold transition-colors duration-200", value === step ? "border-[#f5b31b] bg-[#f5b31b] text-[#0e131c]" : "border-white/15 bg-white/[0.04] text-white/75 hover:border-[#f5b31b]/60 hover:text-white")}
                    initial={{ opacity: 0, y: reducedMotion ? 0 : 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : value * 0.035, ease }}
                  >
                    {value === 0 ? "Inicio" : value}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
