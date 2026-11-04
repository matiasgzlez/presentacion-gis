import clsx from "clsx";

export type SlideMeta = { id: string; label: string; steps?: number };

/** Barra superior: una rayita por diapositiva (clic para saltar) + número y nombre de la actual. */
export function Nav({ slides, active, step, onGo }: { slides: SlideMeta[]; active: number; step: number; onGo: (i: number) => void }) {
  const steps = slides[active]?.steps ?? 0;
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 mix-blend-difference">
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
            <span className={clsx("block h-[3px] rounded-full transition-colors duration-500", i < active ? "bg-white/60" : i === active ? "bg-white" : "bg-white/15 group-hover:bg-white/35")} />
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between px-5 pt-2 font-mono text-[0.72rem] tracking-wider text-white/70">
        <span>GIS EN LOGÍSTICA</span>
        <span className="num flex items-center gap-3 uppercase">
          {steps > 0 && (
            <span className="flex gap-1" aria-label={`paso ${step} de ${steps}`}>
              {Array.from({ length: steps }, (_, k) => (
                <i key={k} className={clsx("block size-1.5 rounded-full", k < step ? "bg-white" : "bg-white/25")} />
              ))}
            </span>
          )}
          {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} · {slides[active]?.label}
        </span>
      </div>
    </header>
  );
}
