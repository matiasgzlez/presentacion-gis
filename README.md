# GIS en Logística

Presentación para la materia **Sistemas de Información Geográfica**: qué es un GIS y cómo lo usan las empresas de logística.

> 🚧 **En desarrollo.** La presentación todavía no está terminada: puede cambiar el contenido, el orden de las diapositivas y las animaciones.

**Integrantes:** Gonzalez Matias · Lima Matias · Gaston Lovera

## Qué es

Es una presentación web que se recorre como un PowerPoint, con animaciones 2D y 3D en vez de diapositivas estáticas. Cuenta qué es un GIS aplicado a la logística a través de casos reales de empresas:

| Caso | Para qué usa el GIS |
|---|---|
| Tesla · Robotaxis | Manejar dentro de una geocerca (zonas) |
| Mercado Libre | Decidir dónde poner los depósitos (ubicación) |
| Starlink + Geotab | Rastrear camiones sin señal de celular (seguimiento) |
| UPS · ORION | Elegir el mejor camino de cada camión (rutas) |

Cada caso tiene la misma estructura: el problema, la solución con GIS, la relación con la logística, las tecnologías que usa y los resultados. Cierra con las tecnologías que están saliendo, un ejemplo de cómo lo aplicaríamos en Resistencia, libros y herramientas para practicar.

Hay otros cuatro casos armados pero ocultos, para que la exposición entre en 15 minutos: Uber (H3), Walmart + Wing, Maersk y el choque de trenes en España.

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
| → · espacio | Siguiente paso; si no quedan pasos, siguiente diapositiva |
| ← | Paso o diapositiva anterior |
| Inicio · Fin | Primera · última diapositiva |

También se puede saltar a cualquier diapositiva haciendo clic en la barra de arriba. En algunas diapositivas hay un video chico arriba a la derecha: al pasar el cursor se abre grande (se cierra con la cruz o con Esc).

Para generar la versión de producción: `npm run build` (queda en `dist/`).

## Estructura

| Carpeta / archivo | Qué hay |
|---|---|
| `src/sections/` | Portada, qué es un GIS, los casos, lo que viene, cómo lo aplicaríamos y cierre |
| `src/cases/` | Un archivo por caso. En `src/App.tsx` se elige cuáles se muestran (`show: true` / `false`) |
| `src/scenes/` | Las animaciones: mapas en canvas 2D y escenas 3D con three.js |
| `src/components/` | El modo presentación (diapositivas y pasos), el estilo de los casos y el visor de videos |
| `public/` | Videos, datos de mapas, logos y tapas de libros |
| `video/` | Las fuentes para volver a generar los videos de la portada y de la diapositiva 2 |
| `exposicion.md` | El guion: qué se dice en cada diapositiva, tiempos y fuentes de los datos |

Hecho con React, Vite, Tailwind CSS, Motion, three.js y MapLibre.

## Datos y créditos

- Imagen de la Tierra de noche: NASA Earth Observatory (Black Marble), dominio público.
- Calles de Resistencia: © colaboradores de [OpenStreetMap](https://www.openstreetmap.org/copyright), licencia ODbL. Rutas calculadas con OSRM.
- Contornos de países, provincias y ciudades: [Natural Earth](https://www.naturalearthdata.com), dominio público.
- Las cifras de cada caso y sus fuentes están detalladas en `exposicion.md`.
- Los logos y las tapas de libros pertenecen a sus respectivos dueños y se usan solo con fines educativos.
- Los comercios del ejemplo de Resistencia y algunos mapas (Austin, la ciudad de Uber) son ilustrativos.
