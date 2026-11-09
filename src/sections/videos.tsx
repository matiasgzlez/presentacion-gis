import { useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { NEON, NeonFrame, Pill } from "@/components/neon";
import { VideoModal, videoThumb, type CaseVideo } from "@/components/video-peek";
import { MELI_VIDEO } from "@/cases/meli";
import { UBER_VIDEO } from "@/cases/uber";
import { UPS_VIDEO } from "@/cases/ups";
import { AMAZON_VIDEO } from "@/cases/amazon";
import { DHL_VIDEO } from "@/cases/dhl";

/* Al final: todos los videos de los casos juntos, separados por tema. Al hacer clic se abren grandes
   (se cierran con la cruz, con Esc o tocando afuera). Los casos ocultos también tienen video (TESLA_VIDEO, STARLINK_VIDEO, WALMART_VIDEO)
   por si se vuelven a mostrar. */

const GROUPS: { tema: string; caso: string; v: CaseVideo; c: string }[] = [
  { tema: "Ubicación", caso: "Mercado Libre", v: MELI_VIDEO, c: NEON.amber },
  { tema: "Demanda", caso: "Uber · H3", v: UBER_VIDEO, c: NEON.blue },
  { tema: "Rutas", caso: "UPS · ORION", v: UPS_VIDEO, c: NEON.green },
  { tema: "Última milla", caso: "Amazon", v: AMAZON_VIDEO, c: "#ff9900" },
  { tema: "Riesgos", caso: "DHL · Resilience360", v: DHL_VIDEO, c: NEON.red },
];
const ease = [0.16, 1, 0.3, 1] as const;

export function Videos() {
  const [open, setOpen] = useState<CaseVideo | null>(null);
  return (
    <NeonFrame id="videos">
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] inset-y-[clamp(3.5rem,9vh,6rem)] flex flex-col justify-center">
        <div>
          <Pill>Videos</Pill>
        </div>
        <h2 className="display mt-3 text-[clamp(2.4rem,4.4vw,4.8rem)] uppercase leading-none">Los casos en video</h2>
        <div className="mt-[clamp(1.5rem,5vh,3.5rem)] grid grid-cols-2 gap-[clamp(1rem,1.8vw,2rem)] lg:grid-cols-5">
          {GROUPS.map((g, i) => (
            <motion.div key={g.tema} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease }}>
              <div className="flex items-center gap-3">
                <Pill color={g.c}>{g.tema}</Pill>
              </div>
              <p className="display mt-2 text-[clamp(1.2rem,1.6vw,1.9rem)] leading-tight" style={{ color: g.c }}>{g.caso}</p>
              <button
                onClick={() => setOpen(g.v)}
                className="group relative mt-3 block aspect-video w-full overflow-hidden rounded-2xl border-[3px] bg-[#111] transition-transform duration-300 hover:-translate-y-1"
                style={{ borderColor: g.c, boxShadow: `0 0 36px ${g.c}33` }}
                aria-label={`Ver video: ${g.v.title}`}
              >
                <img src={videoThumb(g.v)} alt="" className="size-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-16 place-items-center rounded-full text-[#0e131c] shadow-xl transition-transform group-hover:scale-110" style={{ background: g.c }}>
                    <Play className="size-7 translate-x-0.5" fill="currentColor" />
                  </span>
                </span>
              </button>
              <p className="mt-2 text-[clamp(0.9rem,1.05vw,1.2rem)] leading-snug text-white/70">{g.v.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <VideoModal v={open} onClose={() => setOpen(null)} />
    </NeonFrame>
  );
}
