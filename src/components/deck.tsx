import { createContext, useCallback, useContext, useEffect, useState, type JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Nav } from "@/components/nav";

/* Modo presentación: una diapositiva por pantalla, sin scroll.
   Los pasos avanzan solos (cada `phase` ms) hasta dejar visible la conclusión.
   →, espacio, PgDn: siguiente paso; desde el último, siguiente diapositiva.
   ←, PgUp: paso anterior; desde el primero, diapositiva anterior en su estado final.
   Recorrer subpasos pausa la secuencia actual; avanzar a otra diapositiva inicia su secuencia automática.
   Al volver hacia atrás se conserva el control manual para repasar.
   `manual: true` desactiva el avance automático. Home / End: primera / última diapositiva. */

export type DeckSlide = { id: string; label: string; steps?: number; manual?: boolean; phase?: number; C: () => JSX.Element };

const PHASE = 3800;
/** Para revisar: con ?paso=N en la dirección, la animación queda quieta en ese paso. */
const FIXED = (() => { const v = new URLSearchParams(location.search).get("paso"); return v === null ? null : Number(v); })();

const StepCtx = createContext(0);
/** El paso actual de la diapositiva visible (0 = recién llegamos). */
export const useStep = () => useContext(StepCtx);

const idFromHash = (slides: DeckSlide[]) => {
  const i = slides.findIndex((s) => s.id === decodeURIComponent(location.hash.slice(1)));
  return i < 0 ? 0 : i;
};

export function Deck({ slides }: { slides: DeckSlide[] }) {
  const [pos, setPos] = useState(() => ({ i: idFromHash(slides), step: FIXED ?? 0, autoplay: FIXED === null }));
  const last = slides.length - 1;

  const go = useCallback((i: number, step = 0, autoplay = true) => setPos({ i: Math.max(0, Math.min(last, i)), step, autoplay }), [last]);

  const selectStep = useCallback((step: number) => {
    setPos((p) => ({ ...p, step: Math.max(0, Math.min(slides[p.i].steps ?? 0, step)), autoplay: false }));
  }, [slides]);

  const next = useCallback(() => {
    setPos((p) => {
      const steps = slides[p.i].steps ?? 0;
      if (p.step < steps) return { i: p.i, step: p.step + 1, autoplay: false };
      return p.i < last ? { i: p.i + 1, step: 0, autoplay: true } : { ...p, autoplay: false };
    });
  }, [slides, last]);
  const prev = useCallback(() => {
    setPos((p) => {
      if (p.step > 0) return { i: p.i, step: p.step - 1, autoplay: false };
      return p.i > 0 ? { i: p.i - 1, step: slides[p.i - 1].steps ?? 0, autoplay: false } : { ...p, autoplay: false };
    });
  }, [slides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t?.closest?.("input, textarea, select, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(last, slides[last].steps ?? 0, false); }
    };
    const onHash = () => go(idFromHash(slides));
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("hashchange", onHash); };
  }, [next, prev, go, last, slides]);

  // La secuencia termina en su último paso. El control manual pausa solo la diapositiva actual.
  useEffect(() => {
    const S = slides[pos.i], n = S.steps ?? 0;
    if (!n || pos.step >= n || !pos.autoplay || S.manual || FIXED !== null) return;
    const ms = S.phase ?? PHASE;
    const wait = pos.step === 0 ? ms * 0.5 : ms;
    // Una tecla o un salto puede haber cambiado el estado antes de que llegue este callback.
    const id = setTimeout(() => setPos((p) => (p === pos ? { ...p, step: p.step + 1 } : p)), wait);
    return () => clearTimeout(id);
  }, [pos, slides]);

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
    </>
  );
}
