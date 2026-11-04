import { motion } from "motion/react";
import { Hexagon, Locate, TrendingUp } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { useStep } from "@/components/deck";
import { FullScene, NEON, StepCard, NeonFrame, Pill, ResultsSlide, TechSlide } from "@/components/neon";
import { H3Scene } from "@/scenes/h3";
import { H3Map } from "@/scenes/h3-neon";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 02 · Uber · H3 (hexágonos). Cinco diapositivas cortas, mismo estilo que Tesla.
   Contado con reparto (pedidos y repartidores), para que quede claro el vínculo con logística.
   Lo que se dice en voz alta está en exposicion.md. */

const LOGO = "/logos/uber.png";
const VIDEO: CaseVideo = { title: "H3: Tiling the Earth with Hexagons (Uber Engineering)", youtube: "ay2uwtRO3QE" };
const ease = [0.16, 1, 0.3, 1] as const;

function Intro() {
  return (
    <NeonFrame id="uber" logo={LOGO} video={VIDEO}>
      <div className="absolute inset-0 opacity-55">
        <H3Scene priceLabel={false} />
      </div>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <motion.p className="font-mono text-[clamp(0.9rem,1.2vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Caso 02 · Uber
          </motion.p>
          <motion.h2
            className="display mt-2 text-[clamp(4rem,11vw,12rem)] uppercase leading-none [text-shadow:0_6px_40px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease }}
          >
            Hexágonos
          </motion.h2>
          <motion.div className="mt-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7, ease }}>
            <Pill color={NEON.amber}>H3 · la ciudad partida en hexágonos iguales</Pill>
          </motion.div>
        </div>
      </div>
    </NeonFrame>
  );
}

function Problema() {
  const step = useStep();
  return (
    <NeonFrame id="uber-problema" logo={LOGO} video={VIDEO}>
      <FullScene
        map={<H3Map scene="problema" step={step} />}
        card={
          <StepCard
            label="El problema"
            title="Los barrios no se comparan"
            color={NEON.amber}
            step={step}
            items={[
              <>Para saber dónde faltan repartidores hay que <b>contar pedidos por zona</b>.</>,
              <>Pero los barrios tienen <b>formas y tamaños distintos</b>: 120 pedidos en uno grande no es lo mismo que 40 en uno chico.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

function Solucion() {
  const step = useStep();
  return (
    <NeonFrame id="uber-h3" logo={LOGO} video={VIDEO}>
      <FullScene
        map={<H3Scene step={step} />}
        card={
          <StepCard
            label="La solución con GIS"
            title="H3: todo en hexágonos"
            color={NEON.blue}
            step={step}
            items={[
              <>Uber cubre la ciudad con <b>hexágonos iguales</b>, cada uno con su código.</>,
              <>Cada hexágono <b>cuenta sus pedidos</b>: la altura es la demanda.</>,
              <>Y los compara con los <b>autos libres</b>. Donde faltan (rojo), <b>sube el precio</b> y los autos van hacia ahí.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

function Hexagonos() {
  const step = useStep();
  return (
    <NeonFrame id="uber-hexagonos" logo={LOGO} video={VIDEO}>
      <FullScene
        map={<H3Map scene="hexagonos" step={step} />}
        card={
          <StepCard
            label="¿Por qué hexágonos?"
            title="Todos igual de cerca"
            color={NEON.green}
            step={step}
            items={[
              <>Con <b>cuadrados</b>, el camión llega rápido a 4 vecinos y <b>tarde a los de las esquinas</b>.</>,
              <>Con <b>hexágonos</b>, llega a los 6 vecinos <b>al mismo tiempo</b>: todos están igual de cerca.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

function Logistica() {
  const step = useStep();
  return (
    <NeonFrame id="uber-logistica" logo={LOGO} video={VIDEO}>
      <FullScene
        map={<H3Map scene="logistica" step={step} />}
        card={
          <StepCard
            label="GIS en logística"
            title="Reparto por hexágono"
            color={NEON.green}
            step={step}
            items={[
              <>Cada hexágono tiene su <b>tiempo de entrega estimado</b> desde el local.</>,
              <>Con eso se define <b>hasta dónde reparte</b> cada local y dónde conviene esperar a los repartidores.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}

const Tecnologias = () => (
  <TechSlide
    id="uber-tecnologias"
    logo={LOGO}
    video={VIDEO}
    label="Tecnologías · Uber H3"
    bg={<H3Scene priceLabel={false} />}
    techs={[
      { icon: Hexagon, name: "H3", d: "Divide el planeta en hexágonos iguales, cada uno con su código.", gis: true, c: NEON.blue },
      { icon: Locate, name: "Ubicación en vivo", d: "Dónde está cada pedido y cada auto libre, al segundo.", gis: true, c: NEON.green },
      { icon: TrendingUp, name: "Precio dinámico", d: "Sube la tarifa en los hexágonos donde faltan autos.", c: NEON.amber },
    ]}
  />
);

const Resultados = () => (
  <ResultsSlide
    id="uber-resultados"
    logo={LOGO}
    video={VIDEO}
    label="Resultados · Uber H3"
    bg={<H3Scene priceLabel={false} />}
    stats={[
      { to: 2018, raw: true, d: "Uber lo liberó gratis: hoy lo usan empresas de reparto y de mapas de todo el mundo", c: NEON.blue },
      { to: 16, suf: " tamaños", d: "de hexágono, desde un continente hasta una cuadra", c: NEON.green },
      { pre: "×", to: 7, d: "cada tamaño es 7 veces más chico que el anterior", c: NEON.amber },
    ]}
  />
);

export const UBER_SLIDES: DeckSlide[] = [
  { id: "uber", label: "Uber · Hexágonos", C: Intro },
  { id: "uber-problema", label: "Uber · El problema", steps: 2, C: Problema },
  { id: "uber-h3", label: "Uber · H3", steps: 3, C: Solucion },
  { id: "uber-hexagonos", label: "Uber · Por qué hexágonos", steps: 2, C: Hexagonos },
  { id: "uber-logistica", label: "Uber · En logística", steps: 2, C: Logistica },
  { id: "uber-tecnologias", label: "Uber H3 · Tecnologías", steps: 3, C: Tecnologias },
  { id: "uber-resultados", label: "Uber · Resultados", steps: 3, C: Resultados },
];
