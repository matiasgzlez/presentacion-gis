import { Container, Ship, Anchor, Truck } from "lucide-react";
import type { DeckSlide } from "@/components/deck";
import { CaseIntro, NEON } from "@/components/neon";
import { Photo, PhotoPage } from "@/components/photo-page";
import { ExplainSlide } from "@/components/explain";
import { GisSlide, type Station } from "@/components/journey";
import { SeaMap } from "@/scenes/sea-neon";

/* Caso 04 · Maersk · barcos. Lo distinto de este caso: la logística POR MAR, seguir cada contenedor en el medio del océano.
   Portada → ¿Quién es? (fotos: acá se conoce poco) → el GIS detrás de cada contenedor → seguimiento en vivo → ruteo marítimo.
   Se conecta con MarineTraffic (Herramientas): las dos usan las señales AIS de los barcos. Lo que se dice está en exposicion.md.
   Fotos: Wikimedia Commons (ver README). */

const LOGO = "/logos/maersk-white.svg";
const L = { logo: LOGO, logoClass: "h-[clamp(1.8rem,4.5vh,3rem)]" };
const CELESTE = "#42b0d5";

const Intro = () => <CaseIntro id="maersk" {...L} n="04" company="Maersk" title="Barcos" pill="¿Dónde está mi contenedor, en el medio del océano?" bg={<SeaMap scene="intro" step={0} />} />;

const Quien = () => (
  <PhotoPage
    id="maersk-quien"
    {...L}
    pill="¿Quién es?"
    name="Maersk"
    color={CELESTE}
    part="La de los barcos celestes"
    points={[
      { b: "Qué hace", t: <>lleva contenedores en barco por todo el mundo.</> },
      { b: "Desde 1904", t: <>nació en Dinamarca.</> },
      { b: "+700 barcos", t: <>una de las flotas más grandes.</> },
      { b: "Contenedores que avisan", t: <>los refrigerados tienen <b>GPS y termómetro</b>.</> },
    ]}
    right={
      <div className="grid size-full grid-cols-2 grid-rows-[1.3fr_1fr] gap-[clamp(0.8rem,1.4vw,1.4rem)]">
        <Photo src="/photos/maersk/barco.jpg" className="col-span-2 min-h-0" caption="Un portacontenedores de Maersk en el puerto de Koper (Eslovenia)" />
        <Photo src="/photos/maersk/barco-puerto.jpg" className="min-h-0" caption="Cargando en Singapur" />
        <Photo src="/photos/maersk/refrigerados.jpg" className="min-h-0" caption="Contenedores refrigerados" />
      </div>
    }
  />
);

const VIAJE: Station[] = [
  { icon: Container, b: "Se carga" },
  { icon: Ship, b: "Cruza el océano" },
  { icon: Anchor, b: "Llega al puerto" },
  { icon: Truck, b: "Sale en camión" },
];

const DondeGis = () => (
  <GisSlide
    id="maersk-donde-gis"
    {...L}
    name="Maersk"
    color={CELESTE}
    title="El GIS detrás de cada contenedor"
    stations={VIAJE}
    questions={[
      { at: [2], fn: "Seguimiento en vivo", q: "¿Dónde está mi contenedor?", c: NEON.green },
      { at: [2, 3], fn: "Ruteo marítimo", q: "¿Por dónde conviene ir, y cuándo llega?", c: NEON.amber },
    ]}
  />
);

const Seguimiento = () => (
  <ExplainSlide
    id="maersk-seguimiento"
    {...L}
    pill="Función GIS 1"
    title="Seguimiento en vivo"
    question={<><b>¿Dónde está mi contenedor?</b> Aunque esté en el medio del océano.</>}
    color={NEON.green}
    points={[
      { b: "El barco avisa", t: <>por <b>AIS</b>, como vimos en MarineTraffic.</> },
      { b: "El contenedor avisa", t: <><b>GPS y termómetro</b>, por satélite.</> },
      { b: "Cuándo llega", t: <>con la posición y la ruta.</> },
    ]}
    techs={[
      { name: "AIS", gis: true },
      { name: "GPS", gis: true },
      { name: "Satélites" },
    ]}
    scene={(s) => <SeaMap scene="solucion" step={s} />}
  />
);

const Ruteo = () => (
  <ExplainSlide
    id="maersk-desvio"
    {...L}
    pill="Función GIS 2"
    title="Ruteo marítimo"
    question={<><b>¿Por dónde conviene ir?</b> Entre Asia y Europa.</>}
    color={NEON.amber}
    points={[
      { b: "Camino corto", t: <>por el <b>Canal de Suez</b>.</> },
      { b: "Si hay peligro", t: <>la vuelta por África: <b>10 a 14 días más</b>.</> },
    ]}
    techs={[
      { name: "Ruteo marítimo", gis: true },
      { name: "Zonas de riesgo", gis: true },
    ]}
    scene={(s) => <SeaMap scene="desvio" step={s} />}
  />
);

export const MAERSK_SLIDES: DeckSlide[] = [
  { id: "maersk", label: "Maersk · Barcos", C: Intro },
  { id: "maersk-quien", label: "Maersk · ¿Quién es?", C: Quien },
  { id: "maersk-donde-gis", label: "Maersk · El GIS detrás de cada contenedor", steps: 2, phase: 4500, C: DondeGis },
  { id: "maersk-seguimiento", label: "Maersk · Seguimiento en vivo", steps: 3, phase: 4500, C: Seguimiento },
  { id: "maersk-desvio", label: "Maersk · Ruteo marítimo", steps: 2, phase: 5000, C: Ruteo },
];
