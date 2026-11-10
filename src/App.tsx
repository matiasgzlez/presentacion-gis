import { Deck, type DeckSlide } from "@/components/deck";
import { Hero } from "@/sections/hero";
import { Layers } from "@/sections/layers";
import { Herramientas, TOOL_SLIDES } from "@/sections/herramientas";
import { Cases } from "@/sections/cases";
import { TESLA_SLIDES } from "@/cases/tesla";
import { UBER_SLIDES } from "@/cases/uber";
import { WALMART_SLIDES } from "@/cases/walmart";
import { MELI_SLIDES } from "@/cases/meli";
import { STARLINK_SLIDES } from "@/cases/starlink";
import { MAERSK_SLIDES } from "@/cases/maersk";
import { UPS_SLIDES } from "@/cases/ups";
import { ESPANA_SLIDES } from "@/cases/espana";
import { AMAZON_SLIDES } from "@/cases/amazon";
import { DHL_SLIDES } from "@/cases/dhl";
import { End, Tools } from "@/sections/closing";
import { Videos } from "@/sections/videos";

/* El hilo: qué es un GIS → herramientas poco conocidas → 5 casos (estilo oscuro; las animaciones corren solas en bucle) → para probar → videos → gracias.
   La expo dura 15 minutos: los casos se prenden y se apagan acá. Los ocultos siguen en src/cases/ por si hacen falta. */
const CASES: { slides: DeckSlide[]; show: boolean }[] = [
  { slides: MELI_SLIDES, show: true },
  { slides: UBER_SLIDES, show: true },
  { slides: UPS_SLIDES, show: true },
  { slides: MAERSK_SLIDES, show: true },
  { slides: WALMART_SLIDES, show: true },
  { slides: DHL_SLIDES, show: false },
  { slides: AMAZON_SLIDES, show: false },
  { slides: TESLA_SLIDES, show: false },
  { slides: STARLINK_SLIDES, show: false },
  { slides: ESPANA_SLIDES, show: false },
];

const SLIDES: DeckSlide[] = [
  { id: "inicio", label: "Inicio", C: Hero },
  { id: "capas", label: "Qué es un GIS", steps: 6, phase: 3000, C: Layers },
  { id: "herramientas", label: "Herramientas", C: Herramientas },
  ...TOOL_SLIDES,
  { id: "casos", label: "Los casos", C: Cases },
  ...CASES.filter((c) => c.show).flatMap((c) => c.slides),
  { id: "para-hacer", label: "Para probar", C: Tools },
  { id: "videos", label: "Videos", C: Videos },
  { id: "gracias", label: "Gracias", C: End },
];

export function App() {
  return <Deck slides={SLIDES} />;
}
