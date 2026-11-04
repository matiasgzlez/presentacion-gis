import { useEffect, useRef } from "react";
import clsx from "clsx";

/** Video "incrustado" en la página: sin controles, mudo, en loop, arranca solo y se pausa fuera de pantalla. */
export function BackgroundVideo({ src, poster, className, onError }: { src: string; poster?: string; className?: string; onError?: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
      aria-hidden
      onError={onError}
      className={clsx("pointer-events-none absolute inset-0 size-full select-none", className)}
    />
  );
}
