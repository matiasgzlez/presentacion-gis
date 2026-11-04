import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";

export type CaseVideo = { title: string; file?: string; youtube?: string; poster?: string };

/** Cuadrito de video arriba a la derecha: al pasar el cursor se abre grande en el centro y se reproduce solo. */
export function VideoPeek({ v, color }: { v: CaseVideo; color: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const thumb = v.poster ?? (v.youtube ? `https://i.ytimg.com/vi/${v.youtube}/hqdefault.jpg` : undefined);
  return (
    <>
      <motion.button
        layoutId="video-peek"
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(true)}
        className="absolute right-[clamp(1.25rem,3vw,3.5rem)] top-[clamp(2.75rem,6vh,4.5rem)] z-20 aspect-video w-[clamp(11rem,15vw,17rem)] overflow-hidden rounded-2xl border-2 border-white/25 bg-[#111] shadow-[0_0_30px_rgba(59,130,246,0.25)]"
        style={{ visibility: open ? "hidden" : "visible" }}
        aria-label={`Ver video: ${v.title}`}
      >
        {thumb ? <img src={thumb} alt="" className="size-full object-cover opacity-80" /> : v.file && <video src={v.file} muted preload="metadata" className="size-full object-cover opacity-80" />}
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-12 place-items-center rounded-full text-white shadow-xl" style={{ background: color }}>
            <Play className="size-5 translate-x-0.5" fill="currentColor" />
          </span>
        </span>
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-1.5 pt-5 text-left font-mono text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white">Video</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-[4vw]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div layoutId="video-peek" className="relative aspect-video w-full max-w-[min(90vw,calc(86vh*16/9))] overflow-hidden rounded-3xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
              {v.file ? (
                <video src={v.file} autoPlay controls playsInline className="size-full object-contain" />
              ) : (
                <iframe
                  className="size-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&mute=1&rel=0&modestbranding=1`}
                  title={v.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              )}
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white text-[#111] shadow-lg transition hover:scale-110" aria-label="Cerrar video">
                <X className="size-6" strokeWidth={2.6} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
