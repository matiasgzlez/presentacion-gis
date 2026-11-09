import { motion } from "motion/react";
import { Slide } from "@/components/ui";

/* Los casos que vamos a ver. Cada tarjeta tiene el color de la marca, el logo en grande
   y para qué usa el GIS. Cada tarjeta lleva a su caso. Los casos ocultos (hidden) no se presentan: la expo dura 15 minutos. */

type Logo = { src: string; h: string; white?: boolean };
type Card = { id: string; name: string; use: string; bg: string; logos: Logo[]; extra?: string; badge?: string; hidden?: boolean };

const CASES: Card[] = [
  { id: "mercadolibre", name: "Mercado Libre", use: "Dónde poner la red y cómo repartir", bg: "#ffe700", logos: [{ src: "/logos/mercadolibre.png", h: "38%" }] },
  { id: "uber", name: "Uber", use: "Medir la ciudad en vivo, en hexágonos", bg: "#000000", logos: [{ src: "/logos/uber.png", h: "34%" }] },
  { id: "ups", name: "UPS", use: "El orden exacto de 120 paradas", bg: "#330000", logos: [{ src: "/logos/ups.png", h: "80%" }] },
  { id: "maersk", name: "Maersk", use: "Seguir cada contenedor en el mar", bg: "#ffffff", logos: [{ src: "/logos/maersk.svg", h: "30%" }] },
  { id: "walmart", name: "Walmart + Wing", use: "Repartir por el aire: el mapa del cielo", bg: "#0153e3", logos: [{ src: "/logos/walmart.png", h: "24%" }], extra: "+ Wing" },
  { hidden: true, id: "tesla", name: "Tesla", use: "Manejar dentro de una geocerca", bg: "#f2f2f2", logos: [{ src: "/logos/tesla.png", h: "78%" }] },
  { hidden: true, id: "dhl", name: "DHL", use: "Ver los riesgos en el mapa del mundo", bg: "#ffcc00", logos: [{ src: "/logos/dhl.svg", h: "30%" }] },
  { hidden: true, id: "starlink", name: "Starlink + Geotab", use: "Rastrear sin señal de celular", bg: "#0e0e10", logos: [{ src: "/logos/starlink-wordmark.svg", h: "30%", white: true }], extra: "+ Geotab" },
  { hidden: true, id: "amazon", name: "Amazon", use: "Rutas que aprenden de los choferes", bg: "#232f3e", logos: [{ src: "/logos/amazon-white.svg", h: "26%" }] },
  { hidden: true, id: "espana", name: "Trenes en España", use: "Saber dónde está no alcanza", bg: "#ffffff", logos: [{ src: "/logos/renfe.svg", h: "30%" }, { src: "/logos/iryo.svg", h: "34%" }], badge: "Caso reciente · 28 oct 2026" },
];

const SHOWN = CASES.filter((c) => !c.hidden);
const ease = [0.16, 1, 0.3, 1] as const;

function Tile({ c, i }: { c: Card; i: number }) {
  const n = String(i + 1).padStart(2, "0");
  return (
    <motion.a
      href={`#${c.id}`}
      className="group flex min-h-[15rem] flex-col overflow-hidden rounded-[1.6rem] border-[3px] border-[#111] bg-white transition-transform duration-300 hover:-translate-y-1.5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease }}
    >
      <div className={`relative flex min-h-0 flex-1 items-center justify-center gap-[6%] px-[8%] ${c.extra ? "flex-col" : ""}`} style={{ background: c.bg }}>
        {c.logos.map((l) => (
          <img key={l.src} src={l.src} alt="" className="w-auto max-w-[80%] object-contain transition-transform duration-500 group-hover:scale-105" style={{ height: l.h, filter: l.white ? "brightness(0) invert(1)" : undefined }} />
        ))}
        {c.extra && <span className="display shrink-0 text-[clamp(1.4rem,2vw,2.4rem)] text-white">{c.extra}</span>}
        {c.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#ef3b2c] px-3 py-1 font-mono text-[clamp(0.7rem,0.8vw,0.9rem)] font-semibold uppercase tracking-[0.1em] text-white">{c.badge}</span>
        )}
      </div>
      <div className="flex items-start gap-3 border-t-[3px] border-[#111] px-[clamp(0.9rem,1.2vw,1.4rem)] py-[clamp(0.7rem,1.4vh,1.1rem)]">
        <span className="num pt-[0.35em] font-mono text-[clamp(0.85rem,0.95vw,1.05rem)] font-semibold text-[#111]/40">{n}</span>
        <div className="min-w-0">
          <p className="display text-[clamp(1.35rem,1.75vw,2.1rem)] leading-tight text-[#111]">{c.name}</p>
          <p className="mt-0.5 text-[clamp(1rem,1.15vw,1.35rem)] leading-snug text-[#111]/70">{c.use}</p>
        </div>
      </div>
    </motion.a>
  );
}

export function Cases() {
  return (
    <Slide id="casos" className="bg-white text-[#111]">
      <div className="mx-auto flex w-full max-w-[112rem] flex-col">
        <motion.h2
          className="display text-[clamp(2.4rem,4.4vw,4.8rem)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
        >
          Los casos que vamos a ver
        </motion.h2>
        <div className="mt-[clamp(1rem,3vh,2.5rem)] grid gap-[clamp(0.9rem,1.4vw,1.6rem)] sm:grid-cols-2 lg:h-[62vh] lg:grid-cols-5">
          {SHOWN.map((c, i) => (
            <Tile key={c.id} c={c} i={i} />
          ))}
        </div>
      </div>
    </Slide>
  );
}
