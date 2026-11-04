import { Deck, type DeckSlide } from "@/components/deck";
import { Hero } from "@/sections/hero";
import { Layers } from "@/sections/layers";
import { Cases } from "@/sections/cases";
import { TESLA_SLIDES } from "@/cases/tesla";
import { UBER_SLIDES } from "@/cases/uber";
import { WALMART_SLIDES } from "@/cases/walmart";
import { MELI_SLIDES } from "@/cases/meli";
import { STARLINK_SLIDES } from "@/cases/starlink";
import { MAERSK_SLIDES } from "@/cases/maersk";
import { UPS_SLIDES } from "@/cases/ups";
import { ESPANA_SLIDES } from "@/cases/espana";
import { Tech } from "@/sections/tech";
import { Apply } from "@/sections/apply";
import { End, Resources, Tools } from "@/sections/closing";

/* El hilo: qué es un GIS → 4 casos (estilo oscuro, diapositivas cortas con pasos) → lo que viene → cómo lo aplicaríamos → libros → para hacer → gracias.
   La expo dura 15 minutos: los casos se prenden y se apagan acá. Los ocultos siguen en src/cases/ por si hacen falta. */
const CASES: { slides: DeckSlide[]; show: boolean }[] = [
  { slides: TESLA_SLIDES, show: true },
  { slides: MELI_SLIDES, show: true },
  { slides: STARLINK_SLIDES, show: true },
  { slides: UPS_SLIDES, show: true },
  { slides: UBER_SLIDES, show: false },
  { slides: WALMART_SLIDES, show: false },
  { slides: MAERSK_SLIDES, show: false },
  { slides: ESPANA_SLIDES, show: false },
];

const SLIDES: DeckSlide[] = [
  { id: "inicio", label: "Inicio", C: Hero },
  { id: "capas", label: "Qué es un GIS", C: Layers },
  { id: "casos", label: "Los casos", C: Cases },
  ...CASES.filter((c) => c.show).flatMap((c) => c.slides),
  { id: "tecnologias", label: "Lo que viene", steps: 6, C: Tech },
  { id: "aplicacion", label: "Cómo lo aplicaríamos", steps: 6, C: Apply },
  { id: "recursos", label: "Libros", C: Resources },
  { id: "para-hacer", label: "Para hacer", C: Tools },
  { id: "gracias", label: "Gracias", C: End },
];

export function App() {
  return <Deck slides={SLIDES} />;
}
