# GIS en Logística

Presentación para la materia **Sistemas de Información Geográfica**: qué es un GIS y cómo lo usan las empresas de logística.

> 🚧 **En desarrollo.** La presentación todavía no está terminada: puede cambiar el contenido, el orden de las diapositivas y las animaciones.

**Integrantes:** Gonzalez Matias · Lima Matias · Gaston Lovera

## Qué es

Es una presentación web que se recorre como un PowerPoint, con animaciones 2D y 3D cuyos pasos avanzan solos hasta dejar visible la idea final. El teclado permite repasar cada paso. Primero muestra herramientas de GIS en logística poco conocidas (qué son, cómo funcionan y para qué sirven, con imágenes de sus sitios) y después cinco casos reales de empresas:

| Herramienta | Qué hace |
|---|---|
| what3words | Cualquier dirección usando solo tres palabras (cuadrados de 3 × 3 m) |
| MarineTraffic | Todos los barcos del mundo, en vivo (señales AIS) |
| Kepler.gl | Millones de datos en un mapa, sin programar (gratis, de Uber) |

| Caso | Para qué usa el GIS |
|---|---|
| Mercado Libre | Decidir dónde poner los depósitos (ubicación) |
| Uber | Medir la ciudad en hexágonos H3 (demanda) |
| UPS · ORION | El mejor orden de paradas (rutas) |
| Maersk | Seguir cada contenedor en el mar (seguimiento y ruteo marítimo) |
| Walmart + Wing | Repartir por el aire: área de cobertura y mapa del cielo |

Cada caso tiene la misma estructura: quién es la empresa, para qué usa el GIS (las capas que cruza), cómo lo hace, qué logra en su logística y las tecnologías. A la izquierda va una guía corta de lo que se dice y a la derecha la animación. Cierra con herramientas para probar y los videos de cada caso, separados por tema.

Hay otros casos armados pero ocultos: Tesla, Starlink + Geotab, Walmart + Wing, Maersk y el choque de trenes en España.

## Cómo verla

Hace falta [Node.js](https://nodejs.org) 20.19 o más nuevo (o 22.12+).

```bash
npm install
npm run dev
```

Después abrir la dirección que aparece en la terminal (por defecto http://127.0.0.1:4173).

**Controles:**

| Tecla | Acción |
|---|---|
| → · espacio · Av Pág | Siguiente subpaso; desde el último, siguiente diapositiva |
| ← · Re Pág | Subpaso anterior; desde el primero, diapositiva anterior en su estado final |
| Inicio · Fin | Primera · última diapositiva |
| Botones ‹ › (abajo a la derecha) | Lo mismo que ← y →, con el mouse |

Todo se avanza a mano: nada cambia de paso solo. Al entrar en una diapositiva se ve su primer subpaso; con → se pasa al siguiente y, desde el último, a la diapositiva siguiente. Con ← se vuelve un subpaso o, desde el primero, a la diapositiva anterior en su último subpaso.

Para saltar a una subdiapositiva, acercá el mouse a los puntos superiores o hacé clic en ellos. Se despliega un selector con **Inicio** y los subpasos numerados. Al elegir uno, la diapositiva queda pausada ahí y las flechas permiten seguir repasándola. El selector también se abre con el teclado y se cierra con Escape.

Los videos y movimientos continuos de las escenas mantienen su reproducción; lo que queda fijo es el subpaso y su idea final. En la diapositiva de videos, cada video se abre grande con un clic (se cierra con la cruz o con Esc).

Para ver una animación quieta en un paso, agregar `?paso=2` a la dirección (antes del `#`).

Para generar la versión de producción: `npm run build` (queda en `dist/`).

## Estructura

| Carpeta / archivo | Qué hay |
|---|---|
| `src/sections/` | Portada, qué es un GIS, herramientas, los casos, para probar, videos y cierre |
| `src/cases/` | Un archivo por caso. En `src/App.tsx` se elige cuáles se muestran (`show: true` / `false`) |
| `src/scenes/` | Las animaciones: mapas en canvas 2D y escenas 3D con three.js |
| `src/components/` | El modo presentación (diapositivas y pasos), el estilo de los casos (texto 30 % · animación 70 %) y el visor de videos |
| `public/` | Videos, datos de mapas, logos y tapas de libros |
| `video/` | Las fuentes para volver a generar los videos de la portada y de la diapositiva 2 |
| `exposicion.md` | El guion: qué se dice en cada diapositiva, tiempos y fuentes de los datos |

Hecho con React, Vite, Tailwind CSS, Motion, three.js y MapLibre.

## Datos y créditos

- Imagen de la Tierra de noche: NASA Earth Observatory (Black Marble), dominio público.
- Calles de Resistencia: © colaboradores de [OpenStreetMap](https://www.openstreetmap.org/copyright), licencia ODbL. Rutas calculadas con OSRM.
- Contornos de países, provincias y ciudades: [Natural Earth](https://www.naturalearthdata.com), dominio público.
- Las cifras de cada caso y sus fuentes están detalladas en `exposicion.md`.
- Las imágenes de what3words y Kepler.gl son de sus sitios (what3words.com, docs.kepler.gl).
- MarineTraffic: capturas de [Wikimedia Commons](https://commons.wikimedia.org) ("AIS ship tracking", CC0; "Ever Given - Havarie im Suez-Kanal", OpenSeaMap, CC BY-SA 2.0; "MarineTraffic AIS receiver"); fotos del Ever Given desde satélite y desde la Estación Espacial (NASA), también de Commons.
- Fotos de Walmart + Wing: sitio de Wing (wing.com), usadas con fines educativos.
- Fotos de UPS y Maersk: [Wikimedia Commons](https://commons.wikimedia.org) (camión de UPS en Fresno, CC BY 4.0; Worldport, CC BY-SA 2.5; chofer de UPS, dominio público; barcos y contenedores de Maersk, CC BY-SA 2.0/4.0).
- Fotos de Mercado Libre: prensa de Mercado Libre (publicadas por The Logistics World, 2023) y Gobierno del Estado de São Paulo ([Wikimedia Commons](https://commons.wikimedia.org), CC BY 2.0).
- Los logos y las tapas de libros pertenecen a sus respectivos dueños y se usan solo con fines educativos.
- Los comercios del ejemplo de Resistencia y algunos mapas (Austin, la ciudad de Uber) son ilustrativos.
