import { motion } from "motion/react";
import { Route, Waypoints, Navigation, Hexagon, GraduationCap, ExternalLink } from "lucide-react";
import { NEON, NeonFrame, Pill } from "@/components/neon";
import { BackgroundVideo } from "@/components/bg-video";

/* Cierre: los libros para seguir leyendo (como tapas de libro) y la pantalla de MUCHAS GRACIAS. */

const BOOKS = [
  { t: "The Geography of Transport Systems", a: "Jean-Paul Rodrigue", p: "Gratis online", img: "/books/rodrigue.jpg", spine: "#0f3b4a", href: "https://transportgeography.org" },
  { t: "Geographic Information Science and Systems", a: "Longley, Goodchild, Maguire y Rhind", p: "Wiley", img: "/books/longley.jpg", spine: "#3a3d42", href: "https://www.wiley.com/en-us/Geographic+Information+Science+and+Systems%2C+4th+Edition-p-9781118676950" },
  { t: "Vehicle Routing", a: "Paolo Toth y Daniele Vigo", p: "SIAM · la referencia del ruteo", img: "/books/toth-vigo.jpg", spine: "#2f5f86", href: "https://epubs.siam.org/doi/book/10.1137/1.9781611973594" },
  { t: "PostGIS in Action", a: "Regina Obe y Leo Hsu", p: "Manning", img: "/books/postgis.jpg", spine: "#2c3a1f", href: "https://www.manning.com/books/postgis-in-action-third-edition" },
  { t: "Geocomputation with Python", a: "Dorman, Graser, Nowosad y Lovelace", p: "Gratis online", img: "/books/geocomputation.jpg", spine: "#14302b", href: "https://py.geocompx.org" },
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

const TOOLS = [
  { icon: GraduationCap, t: "Workshop de pgRouting", d: "Ruteo dentro de una base de datos PostgreSQL, paso a paso.", tag: "Para aprender", href: "https://workshop.pgrouting.org", c: NEON.blue },
  { icon: Navigation, t: "OSRM", d: "Motor de ruteo sobre OpenStreetMap. Con él calculamos las rutas de Resistencia.", tag: "Lo usamos hoy", href: "https://project-osrm.org", c: NEON.green },
  { icon: Route, t: "VROOM", d: "Optimizador de rutas gratis: el orden de las paradas, como ORION.", tag: "Como UPS", href: "https://github.com/VROOM-Project/vroom", c: NEON.amber },
  { icon: Waypoints, t: "OR-Tools", d: "La librería de Google para rutas con capacidades y horarios.", tag: "Google", href: "https://developers.google.com/optimization/routing", c: NEON.red },
  { icon: Hexagon, t: "H3", d: "Los hexágonos de Uber, gratis para cualquier proyecto.", tag: "Creado por Uber", href: "https://h3geo.org", c: NEON.blue },
];

export function Tools() {
  return (
    <NeonFrame id="para-hacer">
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] top-[clamp(3.5rem,9vh,6rem)]">
        <Pill>Para hacer</Pill>
        <h2 className="display mt-3 text-[clamp(2.4rem,4.4vw,4.8rem)] uppercase leading-none">Herramientas gratis para practicar</h2>
        <div className="mt-[clamp(1.5rem,5vh,3.5rem)] grid grid-cols-5 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
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
                <span className="grid size-[clamp(3rem,4vw,4.4rem)] place-items-center rounded-2xl" style={{ background: `${tl.c}22`, color: tl.c }}>
                  <Icon className="size-[55%]" strokeWidth={2} />
                </span>
                <span className="mt-4 font-mono text-[clamp(0.65rem,0.8vw,0.9rem)] font-bold uppercase tracking-[0.12em] text-[#f5b31b]">{tl.tag}</span>
                <span className="display mt-1 text-[clamp(1.35rem,1.9vw,2.2rem)] leading-tight" style={{ color: tl.c }}>{tl.t}</span>
                <span className="mt-2 flex-1 text-[clamp(0.95rem,1.15vw,1.35rem)] font-medium leading-snug text-white/85">{tl.d}</span>
                <span className="mt-4 flex items-center gap-1.5 font-mono text-[clamp(0.65rem,0.8vw,0.9rem)] text-white/50 group-hover:text-white">
                  abrir <ExternalLink className="size-3.5" />
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
