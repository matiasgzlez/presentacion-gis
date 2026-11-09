import { createContext, useCallback, useContext, useEffect, useState, type JSX } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Nav } from "@/components/nav";

/* Modo presentación: una diapositiva por pantalla, sin scroll.
   Las diapositivas con pasos son animaciones en bucle: los pasos avanzan solos (cada `phase` ms) y vuelven a empezar.
   →, espacio, PgDn: siguiente diapositiva. ←, PgUp: la anterior.
   Si una diapositiva tiene `manual: true`, los pasos se avanzan con → como antes.
   Home / End: primera / última. Los links #id (las tarjetas de casos, la barra de arriba) saltan a esa diapositiva. */

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
  const [pos, setPos] = useState(() => ({ i: idFromHash(slides), step: FIXED ?? 0 }));
  const last = slides.length - 1;

  const go = useCallback((i: number, step = 0) => setPos({ i: Math.max(0, Math.min(last, i)), step }), [last]);

  const next = useCallback(() => {
    setPos((p) => {
      const steps = slides[p.i].manual ? slides[p.i].steps ?? 0 : 0;
      if (p.step < steps) return { i: p.i, step: p.step + 1 };
      return p.i < last ? { i: p.i + 1, step: 0 } : p;
    });
  }, [slides, last]);
  const prev = useCallback(() => {
    setPos((p) => {
      if (slides[p.i].manual && p.step > 0) return { i: p.i, step: p.step - 1 };
      return p.i > 0 ? { i: p.i - 1, step: slides[p.i - 1].manual ? slides[p.i - 1].steps ?? 0 : 0 } : p;
    });
  }, [slides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t?.closest?.("input, textarea, select, [contenteditable]") || e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === "Home") { e.preventDefault(); go(0); }
      else if (e.key === "End") { e.preventDefault(); go(last); }
    };
    const onHash = () => go(idFromHash(slides));
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("hashchange", onHash); };
  }, [next, prev, go, last, slides]);

  // animaciones en bucle: el paso avanza solo y, después del último, vuelve a 0
  useEffect(() => {
    const S = slides[pos.i], n = S.steps ?? 0;
    if (!n || S.manual || FIXED !== null) return;
    const ms = S.phase ?? PHASE;
    const wait = pos.step === n ? ms * 1.6 : pos.step === 0 ? ms * 0.5 : ms;
    const id = setTimeout(() => setPos((p) => (p.i === pos.i ? { i: p.i, step: p.step >= n ? 0 : p.step + 1 } : p)), wait);
    return () => clearTimeout(id);
  }, [pos, slides]);

  // la URL muestra en qué diapositiva estamos (sin disparar hashchange)
  useEffect(() => { history.replaceState(null, "", `#${slides[pos.i].id}`); }, [pos.i, slides]);

  const S = slides[pos.i];
  return (
    <>
      {S.id !== "gracias" && <Nav slides={slides} active={pos.i} step={pos.step} onGo={(i) => go(i)} />}
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
