import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

export type CaseVideo = { title: string; file?: string; youtube?: string; poster?: string };

export const videoThumb = (v: CaseVideo) => v.poster ?? (v.youtube ? `https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg` : undefined);

/** El video grande en el centro de la pantalla. Se cierra con la cruz, con Esc o tocando afuera. */
export function VideoModal({ v, onClose }: { v: CaseVideo | null; onClose: () => void }) {
  useEffect(() => {
    if (!v) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // mientras el video está abierto, las flechas no cambian de diapositiva
      if (["ArrowRight", "ArrowLeft", " ", "PageDown", "PageUp"].includes(e.key)) e.stopImmediatePropagation();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [v, onClose]);
  return (
    <AnimatePresence>
      {v && (
        <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/85 p-[4vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className="relative aspect-video w-full max-w-[min(90vw,calc(86vh*16/9))] overflow-hidden rounded-3xl bg-black shadow-2xl"
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.92 }}
            onClick={(e) => e.stopPropagation()}
          >
            {v.file ? (
              <video src={v.file} autoPlay controls playsInline className="size-full object-contain" />
            ) : (
              <iframe
                className="size-full"
                src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0&modestbranding=1`}
                title={v.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )}
            <button onClick={onClose} className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white text-[#111] shadow-lg transition hover:scale-110" aria-label="Cerrar video">
              <X className="size-6" strokeWidth={2.6} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
