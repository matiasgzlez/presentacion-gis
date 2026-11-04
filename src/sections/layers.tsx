import { motion } from "motion/react";
import { Slide } from "@/components/ui";
import { BackgroundVideo } from "@/components/bg-video";

/* Diapositiva 2: qué es un GIS. Todo lo explica el video (capas → se apilan → la mejor ruta);
   lo que decimos en voz alta está en exposicion.md. */
export function Layers() {
  return (
    <Slide id="capas" bleed className="overflow-hidden bg-white text-[#111]">
      <div className="flex h-dvh flex-col">
        <motion.h2
          className="display relative z-10 px-6 pt-[clamp(3.5rem,8vh,6rem)] text-center text-[clamp(2.2rem,4.4vw,4.8rem)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          ¿Qué es un GIS aplicado a la logística?
        </motion.h2>
        <div className="relative -mt-[4vh] min-h-0 flex-1">
          <BackgroundVideo src="/videos/que-es-gis.mp4" poster="/videos/que-es-gis-poster.jpg" className="object-contain" />
        </div>
      </div>
    </Slide>
  );
}
