import { motion } from "motion/react";
import { Route, Hexagon, MapPin, Ship, Layers3, ExternalLink } from "lucide-react";
import { NEON, NeonFrame, Pill } from "@/components/neon";
import { BackgroundVideo } from "@/components/bg-video";

/* Cierre: los libros para seguir leyendo (como tapas de libro), las herramientas para probar (con su dirección a la vista) y MUCHAS GRACIAS. */

const BOOKS = [
  { t: "The Geography of Transport Systems", a: "Jean-Paul Rodrigue", p: "6.ª ed. · 2024 · transporte y puertos", img: "/books/rodrigue.jpg", spine: "#0f6b6b", href: "https://transportgeography.org" },
  { t: "Geographic Information Science and Systems", a: "Longley, Goodchild, Maguire y Rhind", p: "La base del GIS", img: "/books/longley.jpg", spine: "#3a3d42", href: "https://www.wiley.com/en-us/Geographic+Information+Science+and+Systems%2C+4th+Edition-p-9781118676950" },
  { t: "Location Science", a: "Laporte, Nickel y Saldanha da Gama", p: "Dónde poner un centro", img: "/books/location-science.jpg", spine: "#c2410c", href: "https://link.springer.com/book/10.1007/978-3-030-32177-2" },
  { t: "Vehicle Routing", a: "Paolo Toth y Daniele Vigo", p: "El ruteo, como ORION", img: "/books/toth-vigo.jpg", spine: "#2f5f86", href: "https://epubs.siam.org/doi/book/10.1137/1.9781611973594" },
  { t: "Geographic Data Science with Python", a: "Rey, Arribas-Bel y Wolf", p: "2023 · gratis online", img: "/books/gds-python.jpg", spine: "#9f1239", href: "https://geographicdata.science/book" },
];
const ease = [0.16, 1, 0.3, 1] as const;

export function Resources() {
  return (
    <NeonFrame id="recursos">
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] top-[clamp(3.5rem,9vh,6rem)]">
        <Pill>Libros</Pill>
        <h2 className="display mt-3 text-[clamp(2.4rem,4.4vw,4.8rem)] uppercase leading-none">Para seguir leyendo</h2>
      </div>
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] bottom-[clamp(6rem,17vh,10rem)] top-[clamp(11rem,27vh,16rem)] flex items-center justify-center gap-[clamp(1rem,2.6vw,3rem)] [perspective:1600px]">
        {BOOKS.map((b, i) => (
          <motion.a
            key={b.t}
            href={b.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-[2/3] w-[min(15vw,17rem)] shrink-0 [transform-style:preserve-3d]"
            initial={{ opacity: 0, y: 40, rotateY: -28 }}
            animate={{ opacity: 1, y: 0, rotateY: -18 }}
            whileHover={{ rotateY: 0, y: -12, scale: 1.04 }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease }}
          >
            {/* lomo */}
            <span className="absolute inset-y-0 left-0 w-[9%] origin-left rounded-l-md [transform:rotateY(90deg)]" style={{ background: b.spine }} />
            {/* tapa real */}
            <span className="absolute inset-0 overflow-hidden rounded-r-lg rounded-l-sm bg-white shadow-[18px_24px_50px_rgba(0,0,0,0.6)]">
              <img src={b.img} alt={`Tapa de ${b.t}`} className="size-full object-cover" />
              <span className="absolute inset-y-0 left-0 w-[5%] bg-gradient-to-r from-black/35 to-transparent" />
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/15" />
            </span>
            <span className="absolute inset-x-0 top-full mt-4 block text-center [transform:translateZ(1px)]">
              <span className="block text-[clamp(0.8rem,0.95vw,1.05rem)] font-semibold leading-snug text-white/85">{b.a}</span>
              <span className="mt-1 block font-mono text-[clamp(0.6rem,0.7vw,0.8rem)] font-bold uppercase tracking-[0.12em] text-[#f5b31b]">{b.p}</span>
            </span>
          </motion.a>
        ))}
      </div>
    </NeonFrame>
  );
}

/** Para probar: las herramientas que mostramos, con la dirección a la vista (el público no puede hacer clic en la pantalla). */
const TOOLS = [
  { icon: MapPin, t: "what3words", d: "Buscá ///pasen.sueldos.leyes: la puerta del patio de la UTN.", url: "what3words.com", href: "https://what3words.com/pasen.sueldos.leyes", c: "#e11f26" },
  { icon: Ship, t: "MarineTraffic", d: "Mirá en vivo los barcos que entran al puerto de Buenos Aires.", url: "marinetraffic.com", href: "https://www.marinetraffic.com", c: "#22d3ee" },
  { icon: Layers3, t: "Kepler.gl", d: "Abrí la demo y cargá un mapa de ejemplo, sin programar.", url: "kepler.gl/demo", href: "https://kepler.gl/demo", c: "#3cf2b5" },
  { icon: Hexagon, t: "H3 de Uber", d: "Los hexágonos de Uber: documentación y ejemplos.", url: "h3geo.org", href: "https://h3geo.org", c: NEON.amber },
  { icon: Route, t: "OR-Tools", d: "Para programadores: armar rutas con horarios, como ORION.", url: "developers.google.com/optimization", href: "https://developers.google.com/optimization/routing", c: NEON.red },
];

export function Tools() {
  return (
    <NeonFrame id="para-hacer">
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] top-[clamp(3.5rem,9vh,6rem)]">
        <Pill>Para probar</Pill>
        <h2 className="display mt-3 text-[clamp(2.4rem,4.4vw,4.8rem)] uppercase leading-none">Pruébenlo ustedes</h2>
        <div className="mt-[clamp(1.5rem,5vh,3.5rem)] grid grid-cols-3 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
          {TOOLS.map((tl, i) => {
            const Icon = tl.icon;
            return (
              <motion.a
                key={tl.t}
                href={tl.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col rounded-3xl border-[3px] bg-[#151b26]/92 p-[clamp(1rem,1.6vw,1.7rem)] transition-shadow"
                style={{ borderColor: tl.c }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: `0 0 50px ${tl.c}55` }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease }}
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-[clamp(2.6rem,3.4vw,3.8rem)] shrink-0 place-items-center rounded-2xl" style={{ background: `${tl.c}22`, color: tl.c }}>
                    <Icon className="size-[55%]" strokeWidth={2} />
                  </span>
                  <span className="display text-[clamp(1.35rem,1.9vw,2.2rem)] leading-tight" style={{ color: tl.c }}>{tl.t}</span>
                </span>
                <span className="mt-2 flex-1 text-[clamp(0.95rem,1.15vw,1.35rem)] font-medium leading-snug text-white/85">{tl.d}</span>
                <span className="mt-3 flex items-center gap-1.5 font-mono text-[clamp(0.85rem,1.05vw,1.25rem)] font-bold text-white group-hover:underline">
                  {tl.url} <ExternalLink className="size-4 shrink-0 opacity-60" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </NeonFrame>
  );
}

export function End() {
  return (
    <section id="gracias" className="relative h-dvh overflow-hidden bg-[#03050b]">
      <BackgroundVideo src="/videos/hero.mp4" poster="/videos/hero-poster.jpg" className="object-cover object-[72%_50%]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(3_5_11/0.55)_0%,rgb(3_5_11/0.75)_70%)]" />
      <div className="absolute inset-0 grid place-items-center">
        <motion.h2
          className="display text-center text-[clamp(4.5rem,12vw,14rem)] uppercase leading-[0.9] text-white [text-shadow:0_8px_60px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          Muchas
          <br />
          gracias
        </motion.h2>
      </div>
    </section>
  );
}
