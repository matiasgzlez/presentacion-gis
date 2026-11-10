import { motion } from "motion/react";
import type { ReactNode } from "react";
import type { DeckSlide } from "@/components/deck";
import { NeonFrame, Pill } from "@/components/neon";
import { Photo, PhotoPage, type Point } from "@/components/photo-page";
import { useStep } from "@/components/deck";
import { KeplerHow } from "@/scenes/kepler-how";

/* Herramientas de GIS en logística poco conocidas. Cada una se cuenta igual:
   ¿Qué es? · ¿Cómo funciona? · ¿Para qué sirve? (y un ejemplo cercano).
   Las imágenes son de los sitios de cada herramienta (what3words.com/es/about, maps.google.com/pluscodes,
   docs.kepler.gl). MarineTraffic bloquea las descargas: sus capturas vienen de Wikimedia Commons.
   Lo que se dice en voz alta está en exposicion.md. */

const ease = [0.16, 1, 0.3, 1] as const;
const W3W = "#e11f26", PLUS = "#4285f4", MARINE = "#22d3ee", KEPLER = "#3cf2b5";

/** Diapositiva de herramienta: la etiqueta dice "Herramienta n". */
function ToolPage({ tool, n, ...rest }: { id: string; tool: string; color: string; n: number; part: string; lead?: ReactNode; points?: Point[]; active?: number; right: ReactNode }) {
  return <PhotoPage pill={`Herramienta ${n}`} name={tool} {...rest} />;
}

/* ── Portada de la sección ── */
export function Herramientas() {
  const tools = [
    { n: "what3words", d: "Cualquier dirección usando solo tres palabras", img: "/tools/w3w/playa.jpg", c: W3W },
    { n: "Plus Codes", d: "Direcciones para todos, en Google Maps", img: "/tools/plus/kolkata.png", c: PLUS },
    { n: "MarineTraffic", d: "Todos los barcos del mundo, en vivo", img: "/tools/marine/ais.jpg", c: MARINE },
    { n: "Kepler.gl", d: "Convierte una planilla en un mapa", img: "/tools/kepler/columnas.jpg", c: KEPLER },
  ];
  return (
    <NeonFrame id="herramientas">
      <div className="absolute inset-x-[clamp(1.5rem,4vw,5rem)] inset-y-[clamp(3.5rem,9vh,6rem)] flex flex-col justify-center">
        <div>
          <Pill>Herramientas</Pill>
        </div>
        <h2 className="display mt-3 text-[clamp(2.2rem,4vw,4.4rem)] uppercase leading-none">
          GIS en logística que <span className="text-[#3cf2b5]">casi nadie conoce</span>
        </h2>
        <div className="mt-[clamp(1.5rem,4vh,3rem)] grid h-[52vh] grid-cols-4 gap-[clamp(1rem,2vw,2rem)]">
          {tools.map((t, i) => (
            <motion.div key={t.n} className="flex min-h-0 flex-col" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}>
              <Photo src={t.img} className="min-h-0 flex-1" />
              <p className="display mt-3 text-[clamp(1.4rem,2vw,2.4rem)] leading-none" style={{ color: t.c }}>{i + 1} · {t.n}</p>
              <p className="mt-1.5 min-h-[2.7em] text-[clamp(1rem,1.25vw,1.45rem)] leading-snug text-white/85">{t.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </NeonFrame>
  );
}

/* ── what3words ── */
const W3wQue = () => (
  <ToolPage
    id="w3w-que"
    tool="what3words"
    color={W3W}
    n={1}
    part="¿Qué es?"
    lead={
      <>
        <p className="display text-[clamp(1.6rem,2.4vw,2.8rem)] leading-tight" style={{ color: W3W }}>Cualquier dirección usando solo tres palabras.</p>
        <p className="mt-[clamp(0.8rem,2vh,1.3rem)]">
          Un sistema que divide <b>toda la superficie del planeta</b> en <b>57 billones de cuadrados de 3 × 3 metros</b> y le da a cada uno una combinación <b>única de tres palabras</b>.
        </p>
      </>
    }
    right={<Photo src="/tools/w3w/playa.jpg" className="size-full" caption="Hasta en una playa, cada cuadrado tiene su dirección." />}
  />
);

const W3wComo = () => (
  <ToolPage
    id="w3w-como"
    tool="what3words"
    color={W3W}
    n={1}
    part="¿Cómo funciona?"
    points={[
      { b: "Cuadrícula global", t: <>el mundo está dividido en cuadrados exactos de <b>3 × 3 metros</b>.</> },
      { b: "Tres palabras fijas", t: <>en vez de una dirección postal (que a veces no existe) o coordenadas largas, cada cuadrado tiene <b>tres palabras</b> que no cambian.</> },
      { b: "Ejemplo", t: <>un punto de San Francisco es <b>///marchar.clase.carros</b>; una calle de Tokio, <b>///mazo.ligado.denso</b>.</> },
    ]}
    right={
      <div className="grid size-full grid-rows-2 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/tools/w3w/sanfrancisco.jpg" className="min-h-0" caption="San Francisco · ///marchar.clase.carros" />
        <Photo src="/tools/w3w/tokio.jpg" className="min-h-0" caption="Shibuya, Tokio · ///mazo.ligado.denso" />
      </div>
    }
  />
);

const W3wPara = () => (
  <ToolPage
    id="w3w-para"
    tool="what3words"
    color={W3W}
    n={1}
    part="¿Para qué sirve?"
    points={[
      { b: "Puntos exactos", t: <>la entrada correcta de un estadio, un punto de encuentro o un campo <b>sin nombre de calle</b>.</> },
      { b: "Logística", t: <>empresas de reparto lo usan para llegar <b>a la puerta justa</b>; la empresa dice que las entregas son <b>un 42 % más rápidas</b>.</> },
      { b: "Emergencias", t: <>bomberos y ambulancias encuentran a quien pide ayuda <b>en el cuadrado exacto</b>.</> },
      { b: "Gratis", t: <>la app es gratis, está en <b>más de 50 idiomas</b> y se usa en <b>193 países</b>.</> },
    ]}
    right={
      <div className="grid size-full grid-cols-2 grid-rows-2 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/tools/w3w/estadio.jpg" className="col-span-2 min-h-0" caption="Cada entrada del estadio, con su dirección" />
        <Photo src="/tools/w3w/bombero.jpg" className="min-h-0" caption="Emergencias" />
        <Photo src="/tools/w3w/auto.jpg" className="min-h-0" caption="En el navegador del auto" />
      </div>
    }
  />
);

/** La puerta del patio de la UTN FRRe: Plus Code G2XC+F96 → coordenadas → what3words (mapapi.what3words.com). */
const W3wUtn = () => (
  <ToolPage
    id="w3w-utn"
    tool="what3words"
    color={W3W}
    n={1}
    part="La UTN, en tres palabras"
    points={[
      { b: "Dirección postal", t: <><b>French 414</b>, Resistencia: sirve para toda la manzana.</> },
      { b: "Coordenadas", t: <><b>-27,45134 · -58,97912</b>: exactas, pero difíciles de recordar.</> },
      { b: "what3words", t: <><b style={{ color: W3W }}>///pasen.sueldos.leyes</b>: el cuadrado de 3 × 3 m justo en <b>la puerta del patio</b>.</> },
    ]}
    right={<Photo src="/tools/w3w/utn.jpg" className="size-full" caption="La puerta del patio de la UTN FRRe · cada cuadradito de la grilla mide 3 × 3 m" />}
  />
);

/* ── Plus Codes (Google) ── */
/** El código de la puerta del patio, partido en pedazos: cada pedazo achica el cuadrado. */
function CodeParts() {
  const parts = [
    { c: "5843", d: "región", m: "~100 km", dim: true },
    { c: "G2XC", d: "manzana", m: "~275 m" },
    { c: "+F9", d: "cuadrado", m: "14 m" },
    { c: "6", d: "puerta", m: "3 m" },
  ];
  return (
    <div className="flex size-full min-h-0 flex-col justify-center rounded-3xl border-2 border-white/15 bg-white/[0.04] px-[clamp(1rem,2vw,2rem)]">
      <div className="flex items-end justify-center gap-[clamp(0.4rem,1vw,1.2rem)]">
        {parts.map((p, i) => (
          <motion.div key={p.c} className="flex flex-col items-center" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.25, ease }}>
            <span className="font-mono text-[clamp(2rem,3.6vw,4.2rem)] font-bold leading-none" style={{ color: p.dim ? "rgba(255,255,255,0.45)" : PLUS }}>{p.c}</span>
            <span className="mt-2 h-1 w-full rounded-full" style={{ background: p.dim ? "rgba(255,255,255,0.3)" : PLUS }} />
            <span className="mt-2 text-[clamp(0.95rem,1.2vw,1.4rem)] font-semibold text-white">{p.d}</span>
            <span className="text-[clamp(0.85rem,1vw,1.2rem)] text-white/60">{p.m}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-[clamp(0.8rem,2vh,1.4rem)] text-center text-[clamp(0.95rem,1.15vw,1.35rem)] text-white/75">
        La región se puede cambiar por el nombre de la ciudad: <b className="text-white">G2XC+F96 Resistencia</b>
      </p>
    </div>
  );
}

const PlusQue = () => (
  <ToolPage
    id="plus-que"
    tool="Plus Codes"
    color={PLUS}
    n={2}
    part="¿Qué es?"
    lead={
      <>
        <p className="display text-[clamp(1.6rem,2.4vw,2.8rem)] leading-tight" style={{ color: PLUS }}>Direcciones para todos.</p>
        <p className="mt-[clamp(0.8rem,2vh,1.3rem)]">
          El sistema de <b>Google</b> que convierte la latitud y la longitud en un <b>código corto de letras y números</b>. Es <b>gratis, de código abierto</b> y ya viene en <b>Google Maps</b>: sirve para darle dirección a cualquier lugar que no la tiene.
        </p>
      </>
    }
    right={<Photo src="/tools/plus/kolkata.png" className="size-full" caption="Calcuta, India · la placa azul de la puerta es su Plus Code" />}
  />
);

const PlusComo = () => (
  <ToolPage
    id="plus-como"
    tool="Plus Codes"
    color={PLUS}
    n={2}
    part="¿Cómo funciona?"
    points={[
      { b: "Cuadrícula que se achica", t: <>cada par de caracteres achica el cuadrado: <b>5843</b> es la región, <b>G2XC</b> la manzana, <b>+F9</b> un cuadrado de <b>14 m</b> y <b>6</b> uno de <b>3 m</b>.</> },
      { b: "Código corto + ciudad", t: <><b style={{ color: PLUS }}>G2XC+F96 Resistencia</b> es lo mismo que el código completo <b>5843G2XC+F96</b>.</> },
      { b: "20 caracteres sin vocales", t: <>no forman palabras y no se confunden (no hay O ni 0, ni I ni 1).</> },
      { b: "Sin internet", t: <>se calcula en el teléfono: en Google Maps soltás un pin y aparece el código.</> },
    ]}
    right={
      <div className="grid size-full grid-rows-[1.6fr_1fr] gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/tools/plus/utn.jpg" className="min-h-0" caption="La puerta del patio de la UTN FRRe · G2XC+F96" />
        <CodeParts />
      </div>
    }
  />
);

const PlusPara = () => (
  <ToolPage
    id="plus-para"
    tool="Plus Codes"
    color={PLUS}
    n={2}
    part="¿Para qué sirve?"
    points={[
      { b: "Entregas", t: <>llevar paquetes a <b>barrios sin nombres de calle</b>, zonas rurales o asentamientos.</> },
      { b: "Emergencias", t: <>ambulancias y rescatistas llegan al punto exacto con un código que se comparte.</> },
      { b: "Gobiernos", t: <>correo, servicios sociales y <b>padrón electoral</b> para gente que no tenía dirección.</> },
      { b: "Comercios", t: <>que los clientes encuentren un local que no aparece en el mapa.</> },
    ]}
    right={
      <div className="grid size-full grid-cols-2 grid-rows-2 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/tools/plus/entrega.jpg" className="col-span-2 min-h-0" caption="Entregas sin calles ni números" />
        <Photo src="/tools/plus/emergencia.jpg" className="min-h-0" caption="Emergencias" />
        <Photo src="/tools/plus/pyme.jpg" className="min-h-0" caption="Comercios" />
      </div>
    }
  />
);

const PlusCasos = () => (
  <ToolPage
    id="plus-casos"
    tool="Plus Codes"
    color={PLUS}
    n={2}
    part="Casos de éxito"
    points={[
      { b: "Calcuta, India", t: <>una ONG le puso una <b>placa con su código a cada puerta</b>: <b>más de 500.000 personas</b> pudieron abrir una cuenta en el banco, votar y recibir compras online.</> },
      { b: "Nepal", t: <>el <b>correo nacional</b> los adoptó y los <b>753 gobiernos locales</b> tienen que usarlos.</> },
      { b: "Favelas de Brasil", t: <><b>120.000 vecinos</b> con dirección digital para recibir sus <b>paquetes</b>.</> },
      { b: "Kenia", t: <>unas <b>40.000 direcciones</b> nuevas para comercios y servicios.</> },
    ]}
    right={
      <div className="grid size-full grid-cols-2 grid-rows-2 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/tools/plus/kolkata2.jpg" className="row-span-2 min-h-0" caption="Calcuta · el código en la puerta" />
        <Photo src="/tools/plus/nepal2.png" className="min-h-0" caption="Nepal · placa con el Plus Code" />
        <Photo src="/tools/plus/favela.png" className="min-h-0" caption="Favela Brasil Xpress" />
      </div>
    }
  />
);

/* ── MarineTraffic ── */
const MarineQue = () => (
  <ToolPage
    id="marine-que"
    tool="MarineTraffic"
    color={MARINE}
    n={3}
    part="¿Qué es?"
    lead={
      <>
        <p className="display text-[clamp(1.6rem,2.4vw,2.8rem)] leading-tight" style={{ color: MARINE }}>Todos los barcos del mundo, en vivo.</p>
        <p className="mt-[clamp(0.8rem,2vh,1.3rem)]">
          Un mapa web <b>gratis</b> que muestra <b>dónde está cada barco ahora mismo</b>: cómo se llama, a qué velocidad va, a qué puerto se dirige y cuándo llega. Nació en <b>2007</b> en una universidad de <b>Grecia</b>; hoy es de la empresa <b>Kpler</b>.
        </p>
      </>
    }
    right={<Photo src="/tools/marine/ais.jpg" className="size-full" caption="Cada flechita es un barco; el color dice qué tipo es (carga, petrolero, pasajeros…)" />}
  />
);

const MarineComo = () => (
  <ToolPage
    id="marine-como"
    tool="MarineTraffic"
    color={MARINE}
    n={3}
    part="¿Cómo funciona?"
    points={[
      { b: "El barco avisa", t: <>lleva un equipo <b>AIS</b> que transmite por radio su <b>nombre, posición, rumbo y velocidad</b> cada pocos segundos. Es obligatorio en los barcos grandes.</> },
      { b: "Antenas en la costa", t: <><b>miles de receptores</b> en puertos y costas captan esas señales y las mandan por internet.</> },
      { b: "Satélites", t: <>en alta mar, donde no llega ninguna antena, los barcos se siguen <b>desde el espacio</b> (es la parte paga).</> },
      { b: "El mapa", t: <>junta todo y dibuja cada barco como una <b>flecha en el mapa</b>, con su recorrido.</> },
    ]}
    right={<Photo src="/tools/marine/receptor.jpg" className="size-full" caption="Un receptor AIS de MarineTraffic" />}
  />
);

const MarinePara = () => (
  <ToolPage
    id="marine-para"
    tool="MarineTraffic"
    color={MARINE}
    n={3}
    part="¿Para qué sirve?"
    points={[
      { b: "¿Cuándo llega mi carga?", t: <>importadores y exportadores siguen el barco con <b>su contenedor</b> y planifican los camiones.</> },
      { b: "Puertos", t: <>ven qué barcos <b>están esperando</b> para entrar y organizan los muelles.</> },
      { b: "Rutas y demoras", t: <>muestran <b>atascos</b> en canales y estrechos antes de que se note en los precios.</> },
      { b: "Seguridad", t: <>saber qué barcos hay cerca ayuda en <b>rescates</b> y accidentes.</> },
    ]}
    right={<Photo src="/tools/marine/suez-ais.png" className="size-full" caption="Barcos esperando a los dos lados del Canal de Suez, marzo de 2021" />}
  />
);

const MarineCaso = () => (
  <ToolPage
    id="marine-caso"
    tool="MarineTraffic"
    color={MARINE}
    n={3}
    part="Caso: el Ever Given"
    points={[
      { b: "Qué pasó", t: <>el <b>23 de marzo de 2021</b> un portacontenedores de <b>400 m</b> quedó atravesado en el <b>Canal de Suez</b> durante <b>6 días</b>.</> },
      { b: "El atasco", t: <>unos <b>369 barcos</b> esperando; se frenaban unos <b>US$ 9.600 millones</b> de mercadería por día.</> },
      { b: "En vivo", t: <>todo el mundo lo siguió en MarineTraffic: se veían los <b>remolcadores</b> trabajando y la fila de barcos creciendo.</> },
      { b: "Decisiones", t: <>con esos datos, las navieras eligieron <b>esperar o dar la vuelta por África</b>.</> },
    ]}
    right={
      <div className="grid size-full grid-cols-2 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/tools/marine/evergiven-sat.jpg" className="min-h-0" caption="El Ever Given atravesado, visto desde un satélite" />
        <Photo src="/tools/marine/evergiven-iss.jpg" className="min-h-0" caption="Desde la Estación Espacial, con los remolcadores" />
      </div>
    }
  />
);

/* ── Kepler.gl ── */
const KeplerQue = () => (
  <ToolPage
    id="kepler-que"
    tool="Kepler.gl"
    color={KEPLER}
    n={4}
    part="¿Qué es?"
    lead={
      <>
        <p className="display text-[clamp(1.6rem,2.4vw,2.8rem)] leading-tight" style={{ color: KEPLER }}>Convierte una planilla en un mapa.</p>
        <p className="mt-[clamp(0.8rem,2vh,1.3rem)]">
          Imaginá un Excel con <b>100.000 envíos</b>, cada uno con su latitud y longitud. Leído como tabla, no se entiende nada. Kepler.gl lo dibuja en un <b>mapa</b> en segundos.
        </p>
        <p className="mt-[clamp(0.6rem,1.5vh,1rem)] text-white/75">Gratis, en el navegador y sin programar. Lo creó <b className="text-white">Uber</b> en 2018.</p>
      </>
    }
    right={<Photo src="/tools/kepler/app.jpg" className="size-full" caption="A la izquierda, la planilla y las capas; a la derecha, el mapa." />}
  />
);

function KeplerComo() {
  const step = useStep();
  return (
    <ToolPage
      id="kepler-como"
      tool="Kepler.gl"
      color={KEPLER}
      n={4}
      part="¿Cómo funciona?"
      active={step}
      points={[
        { b: "Una planilla", t: <>cada fila, un envío con su ubicación.</> },
        { b: "La arrastrás", t: <>al navegador, <b>sin programar</b>.</> },
        { b: "Cada fila, un punto", t: <>aparece en el mapa.</> },
        { b: "Elegís cómo verlo", t: <>puntos, <b>hexágonos</b>, arcos, viajes…</> },
      ]}
      right={
        <div className="size-full overflow-hidden rounded-3xl border border-white/10 bg-[#0b1018]/40">
          <KeplerHow step={step} />
        </div>
      }
    />
  );
}

const KeplerPara = () => (
  <ToolPage
    id="kepler-para"
    tool="Kepler.gl"
    color={KEPLER}
    n={4}
    part="¿Para qué sirve?"
    points={[
      { b: "¿Dónde se piden más envíos?", t: <>los <b>hexágonos</b> muestran las zonas calientes.</> },
      { b: "¿De dónde a dónde van?", t: <>los <b>arcos</b> unen origen y destino.</> },
      { b: "¿Cómo se movió la flota hoy?", t: <>los <b>viajes animados</b> repiten el recorrido de cada vehículo.</> },
    ]}
    right={
      <div className="grid size-full grid-cols-2 grid-rows-2 gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/tools/kepler/arcos.jpg" className="col-span-2 min-h-0" caption="Arcos: de dónde sale y a dónde llega cada viaje" />
        <Photo src="/tools/kepler/viajes.gif" className="min-h-0" caption="Viajes animados" />
        <Photo src="/tools/kepler/hexagonos.jpg" className="min-h-0" caption="Hexágonos: zonas con más envíos" />
      </div>
    }
  />
);

export const TOOL_SLIDES: DeckSlide[] = [
  { id: "w3w-que", label: "what3words · ¿Qué es?", C: W3wQue },
  { id: "w3w-como", label: "what3words · ¿Cómo funciona?", C: W3wComo },
  { id: "w3w-para", label: "what3words · ¿Para qué sirve?", C: W3wPara },
  { id: "w3w-utn", label: "what3words · La UTN", C: W3wUtn },
  { id: "plus-que", label: "Plus Codes · ¿Qué es?", C: PlusQue },
  { id: "plus-como", label: "Plus Codes · ¿Cómo funciona?", C: PlusComo },
  { id: "plus-para", label: "Plus Codes · ¿Para qué sirve?", C: PlusPara },
  { id: "plus-casos", label: "Plus Codes · Casos de éxito", C: PlusCasos },
  { id: "marine-que", label: "MarineTraffic · ¿Qué es?", C: MarineQue },
  { id: "marine-como", label: "MarineTraffic · ¿Cómo funciona?", C: MarineComo },
  { id: "marine-para", label: "MarineTraffic · ¿Para qué sirve?", C: MarinePara },
  { id: "marine-caso", label: "MarineTraffic · El Ever Given", C: MarineCaso },
  { id: "kepler-que", label: "Kepler.gl · ¿Qué es?", C: KeplerQue },
  { id: "kepler-como", label: "Kepler.gl · ¿Cómo funciona?", steps: 4, phase: 4000, C: KeplerComo },
  { id: "kepler-para", label: "Kepler.gl · ¿Para qué sirve?", C: KeplerPara },
];
