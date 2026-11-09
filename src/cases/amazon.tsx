import { Route, MapPinned, BrainCircuit, Locate, CalendarDays, Package, Plane, Home } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, CaseSlide, CompanySlide, NEON, TechSlide } from "@/components/neon";
import { AmazonMap } from "@/scenes/amazon-neon";
import { LayerStack } from "@/scenes/layers-neon";
import type { CaseVideo } from "@/components/video-peek";

/* Caso 04 · Amazon · última milla: rutas que aprenden de los choferes (desafío Amazon + MIT, 2021).
   El barrio es ilustrativo. Las animaciones corren solas en bucle. Lo que se dice está en exposicion.md. */

const LOGO = "/logos/amazon-white.svg";
export const AMAZON_VIDEO: CaseVideo = { title: "How Amazon Uses Last Mile Delivery To Improve Logistics (Fleetroot)", youtube: "ALsyenWI4vI" };
const L = { logo: LOGO, logoClass: "h-[clamp(2.2rem,5.5vh,3.6rem)]" };
const AMZ = "#ff9900";

const Intro = () => <CaseIntro id="amazon" {...L} n="04" company="Amazon" title="Última milla" pill="Rutas que aprenden de los choferes" bg={<AmazonMap scene="intro" />} />;

const Quien = () => (
  <CompanySlide
    id="amazon-quien"
    {...L}
    name="Amazon"
    color={AMZ}
    items={[
      <>La <b>tienda online</b> más grande del mundo.</>,
      <>Es de <b>Estados Unidos</b> (Seattle).</>,
      <>Reparte con <b>su propia red</b>: depósitos, camionetas y aviones.</>,
    ]}
    facts={[
      { icon: CalendarDays, n: "1994", d: "nace en Seattle" },
      { icon: Package, n: "+13.000 M", d: "de productos entregados en el día o al día siguiente (2025)" },
      { icon: Plane, n: "Red propia", d: "depósitos, camionetas y aviones (Amazon Air)" },
      { icon: Home, n: "+4.000", d: "pueblos y ciudades chicas sumados al envío rápido en EE. UU. (2025)" },
    ]}
  />
);

const ParaQue = () => (
  <CaseSlide
    id="amazon-gis"
    {...L}
    label="¿Para qué usa el GIS?"
    title="La ruta de cada camioneta"
    color={NEON.blue}
    items={[<>Capa: <b>calles</b></>, <>Capa: <b>paradas del día</b></>, <>Capa: <b>rutas reales de choferes</b> (GPS)</>, <>Decide: <b>la ruta que haría un experto</b></>]}
    scene={(s) => (
      <LayerStack
        step={s}
        layers={[
          { name: "Calles", kind: "calles", color: NEON.blue },
          { name: "Paradas del día", kind: "puntos", color: AMZ },
          { name: "Rutas reales (GPS)", kind: "rutas", color: "#3cf2b5" },
        ]}
        decision={{ text: "La ruta de un experto", at: [0.2, 0.2] }}
      />
    )}
  />
);

const Como1 = () => (
  <CaseSlide
    id="amazon-mapa"
    {...L}
    label="¿Cómo lo hace? · 1"
    title="Lo que el mapa no sabe"
    color={NEON.amber}
    items={[<>Computadora: <b>la ruta más corta</b></>, <>En la calle: <b>obras, sin lugar para frenar</b></>, <>El chofer con experiencia <b>la cambia</b></>]}
    scene={(s) => <AmazonMap scene="problema" step={s} />}
  />
);

const Como2 = () => (
  <CaseSlide
    id="amazon-aprende"
    {...L}
    label="¿Cómo lo hace? · 2"
    title="Aprender de los choferes"
    color="#3cf2b5"
    items={[<><b>+4.000 rutas reales</b> de choferes</>, <>La IA aprende <b>qué calles eligen</b></>, <>Ruta nueva = <b>mapa + experiencia</b></>]}
    dato={{ n: "2.285", d: "participantes del desafío Amazon + MIT (2021). Ganó un equipo de la Universidad de Bonn." }}
    scene={(s) => <AmazonMap scene="solucion" step={s} />}
  />
);

const Logistica = () => (
  <CaseSlide
    id="amazon-logistica"
    {...L}
    label="En su logística"
    title="Un chofer nuevo, como un experto"
    color={NEON.green}
    items={[<>Ruta común: <b>se demora</b></>, <>Ruta aprendida: <b>llega a horario</b></>]}
    scene={(s) => <AmazonMap scene="logistica" step={s} />}
  />
);

const Tecnologias = () => (
  <TechSlide
    id="amazon-tecnologias"
    {...L}
    label="Tecnologías · Amazon"
    bg={<AmazonMap scene="intro" />}
    techs={[
      { icon: MapPinned, name: "Direcciones en el mapa", d: "Cada paquete convertido en un punto exacto.", gis: true, c: NEON.blue },
      { icon: Route, name: "Ruteo", d: "Ordena las paradas de cada camioneta sobre el mapa de calles.", gis: true, c: NEON.amber },
      { icon: Locate, name: "GPS de las rutas reales", d: "Por dónde fue de verdad cada chofer.", gis: true, c: NEON.green },
      { icon: BrainCircuit, name: "Aprendizaje automático", d: "Aprende de miles de rutas qué calles conviene elegir.", c: NEON.red },
    ]}
  />
);

export const AMAZON_SLIDES: DeckSlide[] = [
  { id: "amazon", label: "Amazon · Última milla", C: Intro },
  { id: "amazon-quien", label: "Amazon · ¿Quién es?", steps: 4, phase: 2600, C: Quien },
  { id: "amazon-gis", label: "Amazon · ¿Para qué usa el GIS?", steps: 4, C: ParaQue },
  { id: "amazon-mapa", label: "Amazon · Lo que el mapa no sabe", steps: 3, phase: 4200, C: Como1 },
  { id: "amazon-aprende", label: "Amazon · Aprender de los choferes", steps: 3, phase: 4200, C: Como2 },
  { id: "amazon-logistica", label: "Amazon · En su logística", steps: 2, phase: 5000, C: Logistica },
  { id: "amazon-tecnologias", label: "Amazon · Tecnologías", C: Tecnologias },
];
