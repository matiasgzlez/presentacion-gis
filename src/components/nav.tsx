import clsx from "clsx";
import { StepPicker } from "@/components/step-picker";

export type SlideMeta = { id: string; label: string; steps?: number };

/** Barra superior: una rayita por diapositiva (clic para saltar) + número y nombre de la actual. */
export function Nav({ slides, active, step, onGo, onStep }: { slides: SlideMeta[]; active: number; step: number; onGo: (i: number) => void; onStep: (step: number) => void }) {
  const steps = slides[active]?.steps ?? 0;
  const light = slides[active]?.id === "capas" || slides[active]?.id === "casos";
  return (
    <header className={clsx("pointer-events-none fixed inset-x-0 top-0 z-50", light ? "text-[#111]/70" : "text-white/70")}>
      <div className="flex gap-1 px-3 pt-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            title={s.label}
            aria-label={s.label}
            aria-current={i === active ? "step" : undefined}
            onClick={() => onGo(i)}
            className="pointer-events-auto group relative h-3 flex-1 py-1"
          >
            <span className={clsx("block h-[3px] rounded-full bg-current transition-opacity duration-500", i < active ? "opacity-60" : i === active ? "opacity-100" : "opacity-15 group-hover:opacity-35")} />
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 pt-2 font-mono text-[0.72rem] tracking-wider">
        <span className="hidden shrink-0 sm:inline">GIS EN LOGÍSTICA</span>
        <div className="num flex min-w-0 items-center gap-1.5 sm:gap-3">
          {steps > 0 && (
            <StepPicker key={slides[active].id} id={slides[active].id} steps={steps} step={step} onSelect={onStep} />
          )}
          <span className="truncate uppercase">
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · {slides[active]?.label}
          </span>
        </div>
      </div>
    </header>
  );
}
