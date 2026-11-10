import { createContext, useCallback, useContext, useEffect, useState, type JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Nav } from "@/components/nav";

/* Modo presentación: una diapositiva por pantalla, sin scroll. Todo se avanza a mano (nada pasa solo).
   →, espacio, PgDn: siguiente paso; desde el último, siguiente diapositiva.
   ←, PgUp: paso anterior; desde el primero, diapositiva anterior en su último paso.
   Al entrar a una diapositiva con pasos se arranca en el paso 1 (así nunca se ve vacía).
   Abajo a la derecha hay dos botones (‹ ›) que hacen lo mismo con el mouse.
   Home / End: primera / última diapositiva. `phase` y `manual` quedan por compatibilidad y no se usan. */

export type DeckSlide = { id: string; label: string; steps?: number; manual?: boolean; phase?: number; C: () => JSX.Element };

/** Para revisar: con ?paso=N en la dirección, la animación queda quieta en ese paso. */
const FIXED = (() => { const v = new URLSearchParams(location.search).get("paso"); return v === null ? null : Number(v); })();

const StepCtx = createContext(0);
/** El paso actual de la diapositiva visible (0 = recién llegamos). */
export const useStep = () => useContext(StepCtx);

const idFromHash = (slides: DeckSlide[]) => {
  const i = slides.findIndex((s) => s.id === decodeURIComponent(location.hash.slice(1)));
  return i < 0 ? 0 : i;
};

/** Primer paso al entrar a una diapositiva: 1 si tiene pasos, 0 si no. */
const first = (S: DeckSlide) => ((S.steps ?? 0) > 0 ? 1 : 0);

export function Deck({ slides }: { slides: DeckSlide[] }) {
  const [pos, setPos] = useState(() => { const i = idFromHash(slides); return { i, step: FIXED ?? first(slides[i]) }; });
  const last = slides.length - 1;

  const go = useCallback((i: number, step?: number) => {
    const j = Math.max(0, Math.min(last, i));
    setPos({ i: j, step: step ?? first(slides[j]) });
  }, [last, slides]);

  const selectStep = useCallback((step: number) => {
    setPos((p) => ({ ...p, step: Math.max(0, Math.min(slides[p.i].steps ?? 0, step)) }));
  }, [slides]);

  const next = useCallback(() => {
    setPos((p) => {
      const steps = slides[p.i].steps ?? 0;
      if (p.step < steps) return { i: p.i, step: p.step + 1 };
      return p.i < last ? { i: p.i + 1, step: first(slides[p.i + 1]) } : p;
    });
  }, [slides, last]);
  const prev = useCallback(() => {
    setPos((p) => {
      if (p.step > first(slides[p.i])) return { i: p.i, step: p.step - 1 };
      return p.i > 0 ? { i: p.i - 1, step: slides[p.i - 1].steps ?? 0 } : p;
    });
  }, [slides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t?.closest?.("input, textarea, select, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(last, slides[last].steps ?? 0); }
    };
    const onHash = () => go(idFromHash(slides));
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("hashchange", onHash); };
  }, [next, prev, go, last, slides]);

  // la URL muestra en qué diapositiva estamos (sin disparar hashchange)
  useEffect(() => { history.replaceState(null, "", `#${slides[pos.i].id}`); }, [pos.i, slides]);

  const S = slides[pos.i];
  return (
    <>
      {S.id !== "gracias" && <Nav slides={slides} active={pos.i} step={pos.step} onGo={(i) => go(i)} onStep={selectStep} />}
      <main className="fixed inset-0 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div key={S.id} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <StepCtx.Provider value={pos.step}>
              <S.C />
            </StepCtx.Provider>
          </motion.div>
        </AnimatePresence>
      </main>
      {/* botones para avanzar con el mouse: hacen lo mismo que ← y → */}
      <div className="fixed bottom-[clamp(0.75rem,2vh,1.5rem)] right-[clamp(0.75rem,1.5vw,1.5rem)] z-50 flex gap-2">
        {[
          { label: "Anterior", Icon: ChevronLeft, on: prev, off: pos.i === 0 && pos.step <= first(S) },
          { label: "Siguiente", Icon: ChevronRight, on: next, off: pos.i === last && pos.step >= (S.steps ?? 0) },
        ].map(({ label, Icon, on, off }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            disabled={off}
            onClick={(e) => { e.currentTarget.blur(); on(); }}
            className="grid size-[clamp(2.6rem,3.4vw,3.4rem)] place-items-center rounded-full border border-white/25 bg-black/55 text-white shadow-lg backdrop-blur transition hover:bg-black/75 active:scale-95 disabled:opacity-25"
          >
            <Icon className="size-[55%]" strokeWidth={2.5} />
          </button>
        ))}
      </div>
    </>
  );
}
