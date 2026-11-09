# Guía de estructura y diseño de la presentación

Revisión inicial: 9 de noviembre de 2026. Basada en el código del proyecto y el recorrido visual de las 48 diapositivas activas en el navegador.

Actualizada tras integrar la explicación inicial de GIS con animación nativa de seis subpasos y los nuevos controles de navegación.

## Propósito y alcance

Esta guía registra cómo está construida y diseñada la presentación para orientar cambios posteriores. Describe el estado observado; no propone un rediseño ni convierte las decisiones actuales en requisitos inamovibles. Las nuevas indicaciones del usuario tienen prioridad. Actualizar este documento cuando cambien el recorrido o las plantillas.

La presentación es una aplicación web de React y TypeScript con Vite. Usa Tailwind CSS, Motion, Canvas 2D, Three.js, MapLibre y recursos multimedia. Se recorre como una presentación, con una diapositiva por pantalla.

La revisión se centró en estructura, diseño y funcionamiento. No constituyó una verificación externa de las cifras o afirmaciones de las diapositivas.

## Recorrido activo

El orden se define en `src/App.tsx`. Actualmente hay 48 diapositivas.

| N.º | ID | Contenido |
|---|---|---|
| 1 | `inicio` | Portada: GIS en Logística |
| 2 | `capas` | Qué es un GIS aplicado a la logística, con seis subpasos de capas y ruteo |
| 3 | `herramientas` | Índice de las cuatro herramientas |
| 4 | `w3w-que` | what3words: qué es |
| 5 | `w3w-como` | what3words: cómo funciona |
| 6 | `w3w-para` | what3words: para qué sirve |
| 7 | `w3w-utn` | what3words: ejemplo de la UTN |
| 8 | `plus-que` | Plus Codes: qué es |
| 9 | `plus-como` | Plus Codes: cómo funciona |
| 10 | `plus-para` | Plus Codes: para qué sirve |
| 11 | `plus-casos` | Plus Codes: casos de éxito |
| 12 | `marine-que` | MarineTraffic: qué es |
| 13 | `marine-como` | MarineTraffic: cómo funciona |
| 14 | `marine-para` | MarineTraffic: para qué sirve |
| 15 | `marine-caso` | MarineTraffic: el Ever Given |
| 16 | `kepler-que` | Kepler.gl: qué es |
| 17 | `kepler-como` | Kepler.gl: cómo funciona |
| 18 | `kepler-para` | Kepler.gl: para qué sirve |
| 19 | `casos` | Índice de cinco empresas |
| 20 | `mercadolibre` | Mercado Libre: portada |
| 21 | `mercadolibre-viaje` | El viaje de un paquete |
| 22 | `mercadolibre-donde-gis` | El GIS detrás de cada envío |
| 23 | `mercadolibre-ubicacion` | Análisis de ubicación |
| 24 | `mercadolibre-rutas` | Ruteo dinámico |
| 25 | `uber` | Uber: portada |
| 26 | `uber-donde-gis` | El GIS detrás de cada viaje |
| 27 | `uber-que-es-h3` | Qué es H3 |
| 28 | `uber-h3` | Análisis por hexágonos |
| 29 | `uber-asignar` | Ruteo y tiempo de llegada |
| 30 | `ups` | UPS: portada |
| 31 | `ups-quien` | Quién es UPS |
| 32 | `ups-donde-gis` | El GIS detrás de cada entrega |
| 33 | `ups-orion-como` | Cómo funciona ORION |
| 34 | `ups-orion` | Resultado: a ojo frente a ORION |
| 35 | `maersk` | Maersk: portada |
| 36 | `maersk-quien` | Quién es Maersk |
| 37 | `maersk-donde-gis` | El GIS detrás de cada contenedor |
| 38 | `maersk-seguimiento` | Seguimiento en vivo |
| 39 | `maersk-desvio` | Ruteo marítimo |
| 40 | `walmart` | Walmart + Wing: portada |
| 41 | `walmart-quien` | Quiénes son Walmart y Wing |
| 42 | `walmart-donde-gis` | El GIS detrás de cada vuelo |
| 43 | `walmart-logistica` | Área de cobertura |
| 44 | `walmart-mapa` | Mapa del cielo |
| 45 | `recursos` | Cinco libros para seguir leyendo |
| 46 | `para-hacer` | Seis herramientas para probar |
| 47 | `videos` | Cuatro videos de casos |
| 48 | `gracias` | Agradecimiento final |

Los casos DHL, Amazon, Tesla, Starlink + Geotab y trenes en España están implementados pero desactivados. No forman parte de las 48 diapositivas. `src/sections/tech.tsx` tampoco está conectado al recorrido actual.

El guion oral está en `exposicion.md`: distingue lo que se ve de lo que se dice y contiene tiempos y referencias. La pantalla funciona como apoyo para exponer; no contiene todo el discurso.

## Identidad visual

La estética dominante recuerda a una torre de control logística: mapas oscuros, grillas cartográficas, rutas luminosas, etiquetas técnicas y grandes títulos. Hay dos excepciones claras con fondo blanco: la explicación inicial de GIS y el índice de empresas. Ese contraste forma parte del ritmo actual.

### Tipografía y escala

- **Geist:** títulos y cuerpo de texto.
- **Geist Mono:** etiquetas, numeración, datos y rótulos técnicos.
- `.display`: peso 600, espaciado entre letras de `-0.04em`, interlineado `0.98` y texto equilibrado con `text-wrap: balance`.
- `.eyebrow`: monoespaciada, mayúsculas y espaciado entre letras de `0.14em`.
- La raíz usa `font-size: clamp(14px, 0.55vw + 8px, 24px)`.
- Se combinan `rem`, `vw`, `vh` y `clamp()`. Es una composición que se adapta al viewport, no un lienzo fijo de PowerPoint.

Los títulos de explicación suelen ir en mayúsculas. Las portadas de caso usan títulos mucho mayores, centrados sobre la animación. La portada general destaca «Logística» con un degradado animado.

### Paletas coexistentes

Los colores no están centralizados en un único lugar.

| Uso | Colores principales | Definición |
|---|---|---|
| Tema general | Noche `#060a12`, texto `#eaf0fb`, secundario `#8ea0bd` | `src/index.css` |
| Acentos generales | Menta `#3cf2b5`, coral `#ff7a59`, ámbar `#ffc24b`, celeste `#5ab4ff`, violeta `#a98bff` | `src/index.css` |
| Casos y escenas neón | Azul `#3b82f6`, verde `#22c55e`, ámbar `#f5b31b`, rojo `#ef4444` | `src/components/neon.tsx`, `src/scenes/kit.ts` |
| Marco de casos | Fondo `#0e131c`, paneles oscuros y bordes blancos tenues | Componentes compartidos |

También existen colores corporativos por herramienta o empresa: rojo en what3words, azul en Plus Codes, cian en MarineTraffic, menta en Kepler.gl y amarillo en Mercado Libre. Los mapas incorporan colores para rutas, oferta, demanda y riesgos.

Un cambio global de paleta requiere revisar CSS, constantes de componentes, Canvas y Three.js. Cambiar solamente los tokens CSS no actualiza todas las escenas.

## Plantillas y composición

### Marco compartido: `NeonFrame`

En `src/components/neon.tsx`. Ocupa toda la pantalla y oculta el desbordamiento. Tiene grilla azul muy tenue de 44 px, viñeta radial oscura y pequeñas marcas en las cuatro esquinas. Puede colocar el logo arriba a la izquierda. Las etiquetas `Pill` son redondeadas, monoespaciadas y normalmente ámbar.

### Portadas de caso: `CaseIntro`

Animación de fondo al 55 % de opacidad, logo, número y empresa, título central de gran tamaño y una pregunta breve en una pastilla. El fondo anticipa la familia visual del caso: Argentina, hexágonos, rutas, mapa mundial o drones.

### Texto y fotografías: `PhotoPage` y `Photo`

En `src/components/photo-page.tsx`. La columna textual mide `36vw`; el área visual empieza en `40vw`, con margen derecho. El reparto visible es aproximadamente 36 % de texto y 57–60 % de imágenes, según márgenes.

La izquierda reúne etiqueta, nombre, título y una introducción o lista con palabras clave en negrita. La derecha admite una foto grande, dos imágenes apiladas, dos columnas o un collage de tres imágenes.

Las fotos tienen esquinas amplias, borde tenue y epígrafe sobre degradado negro. Se aplica un zoom lento de escala 1 a 1,08 en 14 segundos y luego se invierte. El modo normal recorta con `object-cover`; la variante `contain` conserva la imagen completa.

Todas las herramientas usan esta base, al igual que las presentaciones de UPS, Maersk y Walmart + Wing.

### Recorridos: `JourneySlide` y `GisSlide`

En `src/components/journey.tsx`.

- `JourneySlide`: cuatro estaciones con iconos conectados por una línea. Se destaca el paso actual y cambia la fotografía. El uso activo es el viaje del paquete de Mercado Libre.
- `GisSlide`: conserva el recorrido y marca en azul dónde interviene el GIS. Debajo aparecen una o dos preguntas grandes, con énfasis en la función activa.

Este patrón relaciona el proceso logístico con la decisión geográfica antes de explicar el algoritmo o el mapa.

### Explicaciones con simulación: `ExplainSlide`

En `src/components/explain.tsx`. Columna textual de `35vw`; escena desde `38.5vw`, aproximadamente el 60 % restante. A la izquierda: logo, etiqueta, título de color, pregunta concreta y puntos numerados. Al pie aparecen tecnologías, con distintivo azul «GIS» cuando corresponde.

El paso actual recibe borde de color y mayor opacidad; los demás se atenúan. La escena de la derecha recibe el mismo paso. Es la plantilla principal de los usos GIS de cada empresa.

### Índices y pantallas finales

- Herramientas: cuatro columnas con imagen, nombre en color y descripción breve.
- Casos: fondo blanco y cinco tarjetas verticales con borde negro, bloque corporativo y pie descriptivo. Las tarjetas enlazan a cada caso.
- Libros: cinco tapas reales con perspectiva y movimiento al pasar el cursor.
- Para probar: seis tarjetas en grilla 3 × 2, colores por herramienta y direcciones web visibles.
- Videos: cuatro miniaturas con etiqueta temática y apertura en modal.
- Gracias: texto blanco enorme centrado sobre el video de portada, sin barra de navegación.

### Explicación inicial de GIS

`src/sections/layers.tsx` usa fondo blanco, un título superior y una columna textual de `40vw`. Presenta la suma Logística + GIS = usar el dónde para decidir, conectada con los casos de empresas. Los bloques de texto entran con demoras escalonadas independientes del subpaso.

A la derecha, `src/scenes/gis-layers.tsx` dibuja una escena Canvas de seis subpasos: calles, clientes, tránsito, camiones, unión de las capas y mejor ruta. Las capas se apilan en perspectiva y luego forman un único mapa. La configuración en `App.tsx` usa `steps: 6` y `phase: 3000`; la ruta final permanece visible al terminar la secuencia.

### Plantillas anteriores

`FullScene`, `StepCard`, `CompanySlide` y `TechSlide`, en `neon.tsx`, pertenecen a variantes anteriores usadas por casos ocultos. `FullScene` utiliza aproximadamente 30 % / 70 %. No confundir esa proporción con las plantillas de explicación activas.

## Navegación y animaciones

`src/components/deck.tsx` gobierna las diapositivas y comparte el paso actual mediante `useStep()`.

| Control | Acción |
|---|---|
| Flecha derecha, espacio, PageDown | Subpaso siguiente; desde el último, diapositiva siguiente |
| Flecha izquierda, PageUp | Subpaso anterior; desde el primero, diapositiva anterior en su estado final |
| Home / End | Primera / última diapositiva |
| Barra superior | Salto al inicio de una diapositiva y reproducción automática de sus subpasos |
| Puntos de subpasos | Selector desplegable para elegir Inicio o cualquier subpaso y dejarlo en modo manual |
| `#id` en la URL | Acceso al inicio de una diapositiva con reproducción automática de sus subpasos |

El recorrido usa fundidos de 0,35 segundos. Los pasos internos avanzan automáticamente hasta el último y conservan ese estado final sin reiniciar ni cambiar de diapositiva. La fase base es de 3.800 ms; cada diapositiva puede definir `phase`. El estado inicial dura media fase. No se programa otro avance al llegar al final. No hay diapositivas activas con `manual: true`; esa opción sigue disponible para desactivar el avance automático de una diapositiva.

Recorrer los subpasos con el teclado toma el control manual y cancela el temporizador de esa diapositiva. Al avanzar a una diapositiva nueva por teclado se entra en su estado inicial y se activa su secuencia automática, aunque la anterior estuviera en modo manual. Al retroceder desde el estado inicial se entra en el estado final de la anterior y se conserva el control manual para repasar. En los extremos del recorrido, los controles no salen de sus límites. Home vuelve al comienzo con reproducción automática; End muestra el final del recorrido en modo manual.

Elegir una diapositiva desde la barra o un enlace interno reinicia sus subpasos y habilita nuevamente el avance automático. La barra superior muestra un segmento por diapositiva, numeración, título y progreso interno cuando corresponde.

Los puntos de progreso son un selector interactivo (`src/components/step-picker.tsx`). Se despliega al acercar el puntero o activar el botón, con fundido, desplazamiento corto y opciones en cascada que usan la misma curva de Motion del proyecto. Muestra Inicio (paso 0) y un botón por subpaso; el actual se destaca en ámbar. Seleccionar una opción cancela el avance automático y conserva el control con flechas. El panel se cierra al elegir, retirar el puntero, sacar el foco o pulsar Escape. Con el foco dentro del panel, las flechas recorren sus opciones; tras elegir vuelven a controlar la presentación. El componente se reinicia al cambiar de diapositiva y respeta la preferencia de movimiento reducido.

La navegación usa contraste explícito según el fondo claro u oscuro para que el panel conserve sus colores, sin inversión por mezcla de capas.

Conservar la idea final significa mantener el subpaso, los textos y las capas correspondientes. Los videos y los movimientos continuos de vehículos, pulsos o cámaras siguen usando su propio reloj.

Para revisar una fase se puede cargar, por ejemplo, `http://127.0.0.1:4173/?paso=2#uber-asignar`. El parámetro se lee al cargar la aplicación y detiene el temporizador de pasos. No congela videos, vehículos, pulsos o cámaras que usan su propio reloj. Elegir un paso válido para la diapositiva inspeccionada.

Motion emplea repetidamente la curva `[0.16, 1, 0.3, 1]`, opacidad y desplazamientos cortos. Las entradas de texto y tarjetas suelen durar entre 0,45 y 1,1 segundos. Al revisar una captura, dejar que termine la entrada antes de interpretar elementos atenuados o ausentes como un defecto.

## Escenas y multimedia

| Caso / bloque | Archivos principales | Lenguaje visual |
|---|---|---|
| Explicación de GIS | `gis-layers.tsx` | Capas sobre blanco, calles negras, clientes azules, tránsito rojo, camiones ámbar y ruta verde |
| Mercado Libre | `arg-neon.tsx`, `meli-routes.tsx` | Argentina, población, cobertura, pedidos, zonas y rutas urbanas |
| Uber | `h3-explain.tsx`, `h3.tsx`, `uber-match.tsx` | Celdas H3, columnas de demanda y comparación de tiempos por calles |
| UPS | `route-neon.tsx`, `orion-how.tsx` | Paradas, órdenes posibles y mejora de rutas |
| Maersk | `sea-neon.tsx` | Mapa mundial, barcos, señales y desvíos marítimos |
| Walmart + Wing | `drone.tsx` | Barrio 3D, cobertura, zonas prohibidas y corredores de vuelo |
| Utilidades Canvas | `kit.ts` | Halos, rutas, rótulos y revelado progresivo por fase |
| Utilidades Three.js | `src/lib/three.ts` | Render, cámaras, bloom, resize y liberación de recursos |

Los archivos de escenas están en `src/scenes/`. Algunas animaciones se construyen con Canvas 2D y otras con Three.js. La portada tiene un mapa MapLibre alternativo si falla el video.

Los videos locales están en `public/videos/`: `hero.mp4`, `que-es-gis.mp4` y `ups-orion.mp4`. Las fuentes para regenerarlos están en `video/`. El video `que-es-gis.mp4` se conserva como recurso anterior; la explicación inicial activa usa Canvas. Sustituir un MP4 no equivale a editar una escena React.

`BackgroundVideo` reproduce sin sonido y en bucle, y pausa cuando sale de pantalla. Portada y cierre usan el video general; el resultado de UPS usa un comparativo dentro de la escena.

`VideoModal`, en `src/components/video-peek.tsx`, admite YouTube o MP4. Usa fondo oscuro y video grande 16:9. Se cierra con la cruz, Escape o el fondo y bloquea los controles de avance mientras está abierto. La galería actual incluye Mercado Libre, Uber, UPS y Walmart + Wing; Maersk no tiene tarjeta.

## Dónde hacer cada cambio

| Cambio | Ubicación |
|---|---|
| Orden de diapositivas y activación de casos | `src/App.tsx` |
| Tarjetas y visibilidad del índice de empresas | `src/sections/cases.tsx` |
| Contenido de una empresa, pasos y duración | `src/cases/<empresa>.tsx` |
| Herramientas y sus diapositivas | `src/sections/herramientas.tsx` |
| Portada, integrantes y fecha | `src/sections/hero.tsx`, objeto `TEAM` |
| Explicación inicial de GIS | `src/sections/layers.tsx`, `src/scenes/gis-layers.tsx` y configuración de pasos en `src/App.tsx` |
| Libros, recursos prácticos y agradecimiento | `src/sections/closing.tsx` |
| Galería de videos | `src/sections/videos.tsx` |
| Navegación y temporización general | `src/components/deck.tsx`, `src/components/nav.tsx` |
| Selector de subdiapositivas | `src/components/step-picker.tsx` |
| Composición compartida | `src/components/neon.tsx`, `photo-page.tsx`, `journey.tsx`, `explain.tsx` |
| Tema global | `src/index.css` |
| Dibujos, mapas y animaciones | `src/scenes/`, `src/lib/` |
| Imágenes, logos, datos y videos servidos | `public/` |
| Discurso y tiempos de exposición | `exposicion.md` |

## Consideraciones para los próximos cambios

1. **Mantener coordinados texto y escena.** Al cambiar una explicación, revisar los puntos, `steps`, `phase` y las condiciones de la animación. El mismo número de paso debe representar la misma idea a ambos lados.
2. **Revisar el índice al activar o quitar casos.** `App.tsx` y `sections/cases.tsx` tienen listas independientes. El guion y la galería de videos también pueden necesitar actualización.
3. **Respetar el espacio disponible.** Muchas composiciones usan posiciones absolutas y `overflow-hidden`. Los títulos largos y puntos adicionales pueden recortarse. Las plantillas de casos no tienen una variante móvil general apilada.
4. **Conservar el protagonismo del mapa o la foto**, salvo que el cambio pedido modifique expresamente esa jerarquía. Los textos actuales sirven como ayuda para la exposición.
5. **Revisar fases posteriores.** Las escenas Canvas suelen conservar elementos de pasos anteriores mediante condiciones como `since()` o `step >= n`. Reordenar puntos puede exigir reordenar también la lógica visual.
6. **Comprobar los rótulos dentro de Canvas.** No siempre permiten salto de línea ni reducen el tamaño automáticamente. Un nuevo texto puede salir del área visible.
7. **Verificar el encuadre al sustituir imágenes o videos.** La portada usa `object-cover`, posición horizontal del 72 % y un degradado oscuro para sostener la legibilidad del título.
8. **No asumir que movimiento reducido significa imagen estática.** Existen tratamientos parciales en CSS y Three.js; no hay una pausa general uniforme para todas las animaciones.
9. **Revisar el resultado en escritorio y proyección.** La revisión visual inicial se hizo principalmente a 1600 × 900. La composición depende del ancho y la altura del viewport.
10. **Actualizar esta guía cuando cambie la base.** Sobre todo recorrido, casos activos, proporciones, paletas y comportamiento de las animaciones.

## Diferencias con la documentación anterior

El README contiene descripciones que no reflejan completamente el estado revisado:

- Maersk y Walmart + Wing aparecen mencionados entre los ocultos aunque están activos.
- Se menciona un bloque de tecnologías emergentes que no forma parte del recorrido actual.
- La división 30 % / 70 % describe plantillas anteriores; las principales plantillas activas usan alrededor de 35–36 % de texto y cerca de 60 % de visual.
- Los casos actuales no siguen todos exactamente la misma secuencia de presentación.

Para determinar el estado vigente, contrastar esta guía con `App.tsx` y los componentes utilizados. La documentación de controles del README y del guion se actualizó junto con el cambio de navegación; las diferencias anteriores siguen pendientes.
