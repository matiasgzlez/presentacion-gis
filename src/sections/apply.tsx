import { useStep } from "@/components/deck";
import { FullScene, NEON, NeonFrame, StepCard } from "@/components/neon";
import { RouteMap } from "@/scenes/route-neon";

/* Cómo lo aplicaríamos: una distribuidora de Resistencia, armada por capas sobre el mapa real.
   Cada paso usa lo que aprendimos de un caso. Lo que se dice en voz alta está en exposicion.md. */

export function Apply() {
  const step = useStep();
  return (
    <NeonFrame id="aplicacion">
      <FullScene
        map={<RouteMap scene="aplicar" step={step} />}
        card={
          <StepCard
            label="Cómo lo aplicaríamos"
            title="Una distribuidora en Resistencia"
            color={NEON.green}
            step={step}
            items={[
              <><b>Como UPS:</b> cada comercio pasa a ser un punto en el mapa.</>,
              <><b>Como Tesla:</b> cada camión tiene su zona dibujada, como una geocerca.</>,
              <><b>Como ORION:</b> el mejor orden de las paradas. En Resistencia, un 26 % menos de kilómetros.</>,
              <><b>Como Geotab:</b> vemos cada camión en vivo, aunque no haya señal.</>,
              <><b>Reglas automáticas:</b> si una calle se corta, el sistema avisa y desvía solo.</>,
              <><b>Como Mercado Libre:</b> el mapa dice dónde convendría abrir un segundo depósito.</>,
            ]}
          />
        }
      />
    </NeonFrame>
  );
}
