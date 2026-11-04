# Guion de la exposición · GIS en Logística

Para practicar. Lo que está en *cursiva* es lo que se ve en pantalla; el resto es lo que decimos en voz alta.
No hace falta decirlo palabra por palabra: lo importante son las ideas en **negrita**.

Integrantes: Gonzalez Matias · Lima Matias · Gaston Lovera

---

## Tiempos (la expo dura 15 minutos)

| Parte | Diapositivas | Tiempo |
|---|---|---|
| Portada · Qué es un GIS · Los casos | 1 a 3 | ~2 min 45 s |
| Caso 01 · Tesla | 4 a 10 | ~2 min 15 s |
| Caso 02 · Mercado Libre | 11 a 17 | ~2 min 15 s |
| Caso 03 · Starlink + Geotab | 18 a 23 | ~2 min |
| Caso 04 · UPS | 24 a 30 | ~2 min |
| Lo que viene | 31 | ~1 min |
| Cómo lo aplicaríamos | 32 | ~1 min 15 s |
| Libros · Para hacer · Gracias | 33 a 35 | ~30 s |
| **Total** | **35** | **~14 min** |

**Para llegar con margen:** en cada caso, la diapositiva de **Tecnologías** se pasa en ~10 segundos ("estas son las tecnologías; las azules son GIS") y la de **Resultados** se dice completa. Ensayar con cronómetro: cada cambio de orador suma unos segundos.

---

## Diapositiva 1 · Portada

**Tiempo:** ~30 segundos
**En pantalla:** *Título "GIS en Logística" y nuestros nombres. De fondo, un video en loop: la Tierra de noche, la cámara baja a Argentina, al Chaco y a Resistencia; aparecen las calles, un camión recorre una ruta y llega a una puerta. La puerta se abre y adentro está otra vez el planeta.*

**Qué decimos:**

> Buenas, somos Matias Gonzalez, Matias Lima y Gaston Lovera, y hoy les vamos a hablar de **GIS en logística**.
>
> El video de fondo resume la idea de toda la charla: empieza con el planeta entero y termina en **una sola puerta de Resistencia**. En el medio pasa lo que nos interesa: una empresa tiene que llevar un paquete de un lugar a otro, y para hacerlo bien necesita saber **dónde está cada cosa**.
>
> Las luces que se ven son reales: es la foto satelital de la Tierra de noche que publica la NASA. Las calles también son reales, de OpenStreetMap.

**Para recordar:**
- Del planeta a la puerta: la logística se juega en el **dónde**.
- Las imágenes son datos reales (NASA de noche + calles de OpenStreetMap).

---

## Diapositiva 2 · ¿Qué es un GIS aplicado a la logística?

**Tiempo:** ~1 minuto 15 segundos (el video dura 16 s y se repite; se puede hablar sobre dos vueltas)
**En pantalla:** *Fondo blanco. Aparecen cuatro capas del mismo barrio, una arriba de la otra: **Calles** (negro), **Clientes** (pines azules), **Tránsito** (rojo), **Camiones** (naranja). Las capas se juntan en un solo mapa y aparece en verde **la mejor ruta**, que pasa por todos los clientes y esquiva el tránsito. El camión la recorre y cada cliente queda tildado.*

**Qué decimos:**

> Antes de empezar, dos definiciones.
>
> Cuando decimos **logística** hablamos de todo lo que hace falta para que **una cosa llegue al lugar correcto, en el momento justo y al menor costo**: guardar la mercadería, armar los pedidos, elegir los caminos, seguir los camiones y entregar. Desde un paquete de Mercado Libre hasta un contenedor que cruza el océano.
>
> Y un **GIS** es un **Sistema de Información Geográfica**. Es un sistema que guarda datos, pero con algo especial: **cada dato tiene su ubicación en el mapa**, sus coordenadas.
>
> Miren el video. Primero tenemos las **calles**: por dónde se puede circular.
> Arriba ponemos los **clientes**: cada pin azul es una dirección donde hay que entregar.
> Después el **tránsito**: en rojo, las calles que hoy están complicadas.
> Y por último los **camiones**, que sabemos dónde están gracias al GPS.
>
> Cada una de estas cosas es una **capa**. Por separado, cada capa dice poco. Pero como todas comparten **el mismo dónde**, las podemos **apilar** en un solo mapa.
>
> Y ahí está la gracia del GIS: **cruzar las capas para tomar una decisión**. En este caso, la decisión es la ruta: el sistema calcula el camino que **pasa por todos los clientes y esquiva el tránsito**. Eso es lo que hace un GIS en logística: transforma datos con ubicación en decisiones.

**Para recordar:**
- **Logística** = que cada cosa llegue al lugar correcto, en el momento justo y al menor costo (guardar, preparar, transportar, seguir, entregar).
- **GIS = datos + ubicación.** Cada dato tiene coordenadas.
- Los datos se organizan en **capas** (calles, clientes, tránsito, camiones).
- Como comparten el mismo dónde, se pueden **superponer y cruzar**.
- El objetivo no es el mapa: es la **decisión** (qué ruta, dónde poner un depósito, qué zona atender primero).

**Si nos preguntan:**
- *¿Un GIS es lo mismo que Google Maps?* No. Google Maps es una aplicación que **usa** un GIS por detrás. Un GIS es la herramienta con la que una empresa carga **sus propios datos** (sus clientes, sus camiones, sus depósitos) y los analiza.
- *¿Qué tipos de datos hay?* Puntos (un cliente), líneas (una calle) y polígonos (una zona, un barrio). También imágenes, como una foto satelital.

---

## Diapositiva 3 · Los casos que vamos a ver

**Tiempo:** ~40 segundos
**En pantalla:** *cuatro tarjetas grandes con el color y el logo de cada empresa.*

| # | Empresa | Para qué usa el GIS |
|---|---|---|
| 01 | Tesla | Manejar dentro de una geocerca (zonas) |
| 02 | Mercado Libre | Decidir dónde guardar (ubicación) |
| 03 | Starlink + Geotab | Rastrear sin señal de celular (seguimiento) |
| 04 | UPS | Elegir el mejor camino (rutas) |

**Qué decimos:**

> Para que se vea que esto no es teoría, vamos a ver **cuatro empresas**, y cada una usa el GIS para algo distinto: **zonas, ubicación, seguimiento y rutas**.
>
> **Tesla** hace que sus autos sin chofer manejen solo dentro de una zona del mapa. **Mercado Libre** decide dónde poner sus depósitos. **Starlink y Geotab** permiten seguir camiones donde no hay señal de celular, como en el Impenetrable. Y **UPS** elige el mejor camino para cada camión; eso lo probamos nosotros con calles de Resistencia.

**Para recordar:**
- Cuatro empresas, **cuatro funciones** del GIS en logística: zonas, ubicación, seguimiento y rutas.

---

## Diapositivas 4 a 10 · Caso 01 · Tesla · Robotaxis

**Tiempo total:** ~1 minuto 45 segundos
**Estilo:** fondo oscuro con mapa de neón (mapa ilustrativo de Austin, no es la zona real). Cada → hace aparecer el siguiente punto de la tarjeta y cambia el mapa.
**Video:** arriba a la derecha en todas las diapositivas del caso. Al pasar el cursor se abre grande; se cierra con la cruz o con Esc.

### Diapositiva 4 · Portada del caso
*En pantalla: "ROBOTAXIS" grande sobre la geocerca de neón y la pastilla roja "Sin nadie al volante · Austin, Texas".*

> Arrancamos con Tesla. Tesla tiene autos que **manejan solos, sin nadie al volante**, y los usa como taxis en Austin, Texas: los **robotaxis**.

### Diapositiva 5 · El problema (2 pasos)
*En pantalla: un Model Y rojo, "Asiento del conductor: vacío", y la tarjeta amarilla "Ver no alcanza".*

- **→ 1:** *aparece "Las cámaras ven la calle".*
  > El auto ve la calle con sus cámaras: peatones, semáforos, otros autos.
- **→ 2:** *aparece el signo de pregunta sobre el auto.*
  > Pero **ver no alcanza**: también tiene que saber **por dónde tiene permitido andar**. No todas las calles están probadas para que circule sin chofer.

### Diapositiva 6 · La solución con GIS (3 pasos)
*En pantalla: el mapa de Austin con sus rutas (I-35, MoPac, US-183) y la tarjeta azul "Una geocerca".*

- **→ 1:** *se dibuja la geocerca de neón.*
  > Acá entra el GIS. Tesla dibuja en el mapa una **geocerca**: un **polígono** que marca la zona habilitada.
- **→ 2:** *aparecen pines verdes adentro (UT Austin, Capitolio, Zilker Park).*
  > Si el viaje empieza y termina **adentro**, el auto lo acepta.
- **→ 3:** *aparecen pines grises tachados afuera.*
  > Si el destino queda **afuera**, no lleva al pasajero.

### Diapositiva 7 · En la calle (2 pasos)
*En pantalla: robotaxis (rojos) circulando dentro de la zona y la tarjeta roja "El borde manda".*

- **→ 1:** *un auto va hasta el borde, la geocerca se pone roja: "Fuera de zona · No sigue".*
  > Cuando un auto llega al borde, **no sigue**. El polígono del mapa es el que decide.
- **→ 2:** *la geocerca se agranda: "La zona crece".*
  > Y cuando Tesla quiere sumar barrios, lo que hace es **agrandar el polígono** en el mapa.

### Diapositiva 8 · ¿Y en logística? (2 pasos)
*En pantalla: la misma zona con camiones y la tarjeta verde "La misma herramienta".*

- **→ 1:** *la zona se divide en tres zonas de reparto de colores, cada una con su camión.*
  > ¿Por qué esto es GIS en logística? Porque es **la misma herramienta** que usan las empresas de reparto: cada camión tiene **su zona** dibujada en el mapa.
- **→ 2:** *un camión sale de su zona y aparece "¡Alerta! Camión fuera de su zona".*
  > Y si un camión **sale de su recorrido**, salta una **alerta**. El robotaxi es el ejemplo más llamativo, pero la idea sirve para cualquier flota.

### Diapositiva 9 · Tecnologías (pasos = una tarjeta por tecnología)
*En pantalla: Geocerca (GIS) · GPS + mapa (GIS) · Cámaras · Inteligencia artificial. Las que tienen la marca azul "GIS" son tecnologías del mundo de los mapas.*

> Estas son las tecnologías del caso. Las marcadas como **GIS** son del mundo de los mapas: la **geocerca**, que es el polígono de la zona, y el **GPS sobre el mapa**, que dice dónde está el auto. Las otras dos, las **cámaras** y la **inteligencia artificial**, son las que le permiten manejar.

### Diapositiva 10 · Resultados (3 pasos)
- **→ 1:** *+3 M.* > Los robotaxis ya recorrieron **más de 3 millones de millas sin nadie al volante** (octubre de 2026).
- **→ 2:** *~290 mi².* > La zona de Austin mide unas **290 millas cuadradas**; un año antes eran unas 170. El polígono creció.
- **→ 3:** *4 ciudades.* > En 2026 ya funcionan sin chofer en **Austin, Dallas, Houston y Miami**.

*Fuentes (no van en pantalla): Electrek, Teslarati, Wikipedia "Tesla Robotaxi" (2026). Son cifras no oficiales.*

**Para recordar:**
- **Geocerca** = un polígono en el mapa que marca dónde se puede (o no se puede) circular.
- El auto **ve** con cámaras, pero **sabe dónde puede andar** gracias al mapa.
- En logística: zonas de reparto por camión + alertas si sale de su zona.

**Si nos preguntan:**
- *¿Y el FSD (Full Self-Driving) que tienen los Tesla en todo el mundo?* El FSD maneja con cámaras y necesita un conductor atento. El robotaxi va **sin nadie al volante**, y por eso Tesla lo limita a una zona del mapa.
- *¿Ese es el mapa real?* No: es un mapa ilustrativo de Austin. La zona real se ve en la app de Tesla y va cambiando.

---

## Diapositivas 11 a 17 · Caso 02 · Mercado Libre · Depósitos

**Tiempo total:** ~2 minutos
**Estilo:** mapa real de Argentina en neón. Cada punto es una ciudad (el tamaño es la cantidad de gente).
**Video:** arriba a la derecha (A24: el centro logístico de Mercado Libre en Cyber Monday).

### Diapositiva 11 · Portada del caso
*En pantalla: "DEPÓSITOS" sobre el mapa de Argentina.*

> El segundo caso es Mercado Libre. Casi todo lo que se compra en Mercado Libre viaja por su propia red de logística. Y la gran pregunta es: **¿dónde conviene guardar los productos?**

### Diapositiva 12 · El problema (2 pasos)
- **→ 1:** *un único depósito en Buenos Aires manda paquetes a todo el país.*
  > Imaginen que todo sale de **un solo depósito en Buenos Aires**.
- **→ 2:** *las ciudades cercanas se pintan de verde ("Rosario · llega rápido") y las lejanas de rojo ("Salta · tarda días", "Neuquén · tarda días").*
  > A los que están cerca les llega rápido. Pero si el producto está lejos de quien lo compra, **la entrega tarda días**.

### Diapositiva 13 · La solución con GIS (3 pasos)
- **→ 1:** *las ciudades crecen: el mapa de dónde están los compradores.*
  > Con un GIS, primero se mira **dónde están los compradores**.
- **→ 2:** *aparecen círculos: hasta dónde llega un camión en un día desde Buenos Aires y desde cada lugar posible (Córdoba, Mendoza, Tucumán, Neuquén).*
  > Después se marca **hasta dónde llega un camión en un día** desde cada lugar posible.
- **→ 3:** *Córdoba se pinta de verde y las ciudades que cubre también: "Elegido: Córdoba".*
  > Y se elige el lugar que deja **más compradores cerca**. En este caso, Córdoba, que es justamente donde Mercado Libre anunció su próximo centro.

### Diapositiva 14 · La clave: tiempo, no distancia (2 pasos)
*En pantalla: un depósito en el centro, rutas rápidas (amarillas) y caminos lentos.*
- **→ 1:** *un círculo punteado: "misma distancia".*
  > Un círculo marca lo que está **a la misma distancia**.
- **→ 2:** *el círculo se transforma en una estrella verde que se estira por las rutas: "mismo tiempo: 1 día de camión".*
  > Pero por la ruta el camión va más rápido. Entonces, lo que se alcanza en un día **no es un círculo: se estira por las rutas**. En un GIS esto se llama **isócrona**: todo lo que está a un mismo tiempo de viaje.

### Diapositiva 15 · ¿Y en logística? (2 pasos)
- **→ 1:** *desde el centro grande (Escobar) salen líneas a los centros regionales.*
  > Así se arma una **red**: un centro grande abastece a centros regionales…
- **→ 2:** *de cada centro regional salen líneas verdes a las ciudades cercanas: "reparto del día".*
  > …y de cada uno salen **los repartos del día**, armados sobre el mapa.

### Diapositiva 16 · Tecnologías (pasos = una tarjeta por tecnología)
*En pantalla: Análisis de ubicación (GIS) · Isócronas (GIS) · Ruteo dinámico (GIS) · Predicción con IA. Las que tienen la marca azul "GIS" son tecnologías del mundo de los mapas.*

> Las tecnologías GIS son el **análisis de ubicación** para elegir dónde poner un centro, las **isócronas** (hasta dónde se llega en un tiempo) y el **ruteo dinámico** de los repartos del día. La **IA** predice qué se va a comprar y dónde.

### Diapositiva 17 · Resultados (3 pasos)
- **→ 1:** *US$ 3.400 M.* > Mercado Libre invierte **US$ 3.400 millones en Argentina en 2026**, sobre todo en logística.
- **→ 2:** *+100.000 m².* > En octubre abrió en Escobar su **mayor centro del país: más de 100.000 m²**.
- **→ 3:** *130.000.* > Y ese centro puede procesar **130.000 productos por día**.

**Para recordar:**
- El GIS ayuda a decidir **dónde poner un depósito**: donde quedan más compradores cerca.
- Lo que importa es el **tiempo de viaje**, no la distancia (isócrona).
- En logística: **red de depósitos** + repartos diarios.

*Fuentes (no van en pantalla): DolarHoy, El Economista, The Logistics World (2026): centro de Escobar (US$ 115 M, +100.000 m², 2 millones de productos, 130.000 por día), inversión de US$ 3.400 M en 2026, centro de Córdoba (US$ 91 M).*

---

## Diapositivas 18 a 23 · Caso 03 · Starlink + Geotab · Sin señal

**Tiempo total:** ~1 minuto 45 segundos
**Estilo:** mapa del norte argentino en neón y una vista de costado con el satélite. Geotab es la empresa líder en rastreo de flotas; Starlink es la red de satélites de SpaceX.
**Video:** arriba a la derecha (cómo funciona Starlink).

### Diapositiva 18 · Portada del caso
*En pantalla: "SIN SEÑAL" sobre el globo con satélites.*

> El tercer caso junta a dos empresas: **Geotab**, que rastrea camiones de empresas de todo el mundo, y **Starlink**, la red de satélites de SpaceX. El problema que resuelven: **¿qué pasa cuando el camión se queda sin señal?**

### Diapositiva 19 · El problema (2 pasos)
*En pantalla: el norte argentino; en azul, las zonas con señal de celular alrededor de las ciudades.*
- **→ 1:** *un camión sale de Resistencia hacia Salta y se ve en el mapa: "Camión en el mapa".*
  > El GPS sabe dónde está el camión, pero **para avisarlo necesita señal de celular**.
- **→ 2:** *el camión entra al Impenetrable, donde no hay señal: queda un "?" gris y "Sin señal: desapareció del mapa".*
  > En el Impenetrable chaqueño, o en la Patagonia, **no hay señal**. Y el camión **desaparece del mapa**: la empresa no sabe dónde está su carga.

### Diapositiva 20 · La solución con GIS: avisar por satélite (3 pasos)
*En pantalla: vista de costado. A la izquierda una antena de celular con su alcance; el camión más allá, donde termina la señal; arriba pasan satélites; a la derecha una estación en tierra.*
- **→ 1:** *el camión manda su posición y nadie la recibe (ondas rojas).*
  > Sin una antena cerca, la posición del camión **no le llega a nadie**.
- **→ 2:** *aparece la conexión camión → satélite: "Starlink · ~550 km de altura".*
  > En 2026 Geotab lanzó equipos que **le mandan la posición directo a un satélite de Starlink**. Los satélites vuelan bajo y son tantos que **siempre hay uno pasando por arriba**.
- **→ 3:** *el satélite la baja a la estación en tierra y aparece la pantalla "Mapa de la flota ✓".*
  > El satélite la baja a tierra y **el camión vuelve a aparecer en el mapa**.

### Diapositiva 21 · ¿Y en logística? (2 pasos)
*En pantalla: toda la flota de una empresa recorriendo el país.*
- **→ 1:** *"Sin satélite: puntos ciegos": los camiones que pasan por zonas sin señal quedan como "?" gris.*
  > Una empresa con muchos camiones necesita verlos a todos. **Sin satélite, hay puntos ciegos**.
- **→ 2:** *"Con satélite: se ven todos".*
  > **Con satélite se ven todos**, siempre: se pueden detectar demoras, desvíos o robos en cualquier ruta del país.

### Diapositiva 22 · Tecnologías (4 pasos)
*En pantalla: GPS (GIS) · Telemática Geotab · Satélites Starlink · Mapa de la flota (GIS).*

> Las tecnologías GIS son el **GPS**, que da la posición, y el **mapa de la flota**, donde se ven todos los camiones. La **telemática** es el equipo del camión que manda los datos, y los **satélites** son el camino por donde viajan cuando no hay celular.

### Diapositiva 23 · Resultados (3 pasos)
- **→ 1:** *~6 M.* > Geotab tiene conectados **unos 6 millones de vehículos y equipos**.
- **→ 2:** *+10.000.* > Starlink ya tiene **más de 10.000 satélites** funcionando.
- **→ 3:** *18 %.* > Y para dimensionar el problema: en Canadá, **solo el 18 % del territorio tiene señal de celular**. Argentina, con sus distancias, tiene el mismo desafío.

**Para recordar:**
- El GPS **sabe** dónde está el camión; el problema es **avisarlo** sin señal.
- El satélite es el "mensajero" cuando no hay antenas.
- En logística: **ver toda la flota, siempre**, sin puntos ciegos.

*Fuentes (no van en pantalla): Geotab, comunicado "GO Anywhere" (Geotab Connect, febrero de 2026); TruckNews y Transport Topics (2026); KeepTrack (satélites Starlink en órbita, 2026); Rogers (cobertura celular en Canadá, febrero de 2026).*

---

## Diapositivas 24 a 30 · Caso 04 · UPS · ORION · Rutas

**Tiempo total:** ~2 minutos
**Estilo:** mapa de neón con **calles reales de Resistencia** (OpenStreetMap). La diapositiva de la solución usa **nuestro video de ORION**.
**Video:** arriba a la derecha (UPS ORION en YouTube).

### Diapositiva 24 · Portada del caso
*En pantalla: "RUTAS" sobre Resistencia, con la ruta optimizada y un camión recorriéndola.*

> Cerramos los casos con UPS, la empresa de paquetería más grande de Estados Unidos, y su sistema **ORION**, que elige el mejor camino para cada camión.

### Diapositiva 25 · El problema (2 pasos)
- **→ 1:** *aparecen el depósito y las paradas del día.*
  > Cada chofer de UPS hace **unas 120 paradas por día**.
- **→ 2:** *una maraña de líneas rojas: todos los órdenes posibles. "¿Cuál es el mejor orden?".*
  > Con 120 paradas hay **más órdenes posibles que átomos en el universo**. Nadie puede elegir el mejor a ojo.

### Diapositiva 26 · La solución con GIS: ORION (3 pasos)
*En pantalla: nuestro video de ORION. A la izquierda, el recorrido "a ojo"; a la derecha, el de ORION, con el mismo camión y las mismas paradas.*
- **→ 1:** > **A ojo**, el chofer va siempre a la parada más cercana.
- **→ 2:** > **ORION** usa el mismo camión y las mismas paradas, pero **en otro orden**.
- **→ 3:** > Un programa prueba millones de órdenes **sobre el mapa de calles** y se queda con el más corto.

### Diapositiva 27 · Lo probamos en Resistencia (2 pasos)
*En pantalla: 14 paradas en calles reales de Resistencia.*
- **→ 1:** *se dibuja la ruta "a ojo" en coral: 55,6 km.*
  > Lo probamos nosotros, con calles reales de Resistencia. Con 14 paradas, el orden "a ojo" suma **55,6 km**.
- **→ 2:** *se dibuja la ruta optimizada en verde: 41,1 km, "−26 % de kilómetros".*
  > Optimizado, el mismo reparto suma **41,1 km**: **un 26 % menos**. Mismo camión, mismas paradas.

### Diapositiva 28 · ¿Y en logística? (2 pasos)
- **→ 1:** *a mitad del recorrido aparece "Nuevo pedido".*
  > A media mañana entra **un pedido nuevo**.
- **→ 2:** *la ruta se recalcula: "Ruta recalculada en segundos".*
  > ORION **recalcula la ruta en segundos** y el chofer sigue sin perder tiempo.

### Diapositiva 29 · Tecnologías (4 pasos)
*En pantalla: Mapa de calles (GIS) · Direcciones en el mapa (GIS) · Optimización de rutas (GIS) · GPS de los camiones (GIS).*

> Este caso es **todo GIS**: el **mapa de calles**, las **direcciones convertidas en puntos**, la **optimización de rutas** sobre ese mapa y el **GPS** de cada camión para recalcular en vivo.

### Diapositiva 30 · Resultados (3 pasos)
- **→ 1:** *US$ 50 M.* > Con solo **una milla menos por chofer por día**, UPS ahorra **US$ 50 millones por año**.
- **→ 2:** *100 M.* > En total recorren **100 millones de millas menos por año**.
- **→ 3:** *100.000 t.* > Y dejan de emitir **100.000 toneladas de CO₂** por año.

**Para recordar:**
- El problema es **el orden de las paradas**: hay demasiadas combinaciones.
- El GIS + un algoritmo eligen **el orden más corto sobre el mapa real de calles**.
- Pequeñas mejoras por camión, multiplicadas por miles de camiones, son **millones de dólares**.

*Fuentes (no van en pantalla): UPS e INFORMS (premio Franz Edelman 2016 a ORION): 1 milla menos por chofer por día ≈ US$ 50 M por año; ~100 millones de millas y ~100.000 t de CO₂ menos por año. La prueba de Resistencia es nuestra: rutas calculadas con OSRM sobre OpenStreetMap; los comercios son de ejemplo.*

---

## Diapositiva 31 · Lo que viene: tecnologías nuevas en GIS y logística (6 pasos)

**Tiempo:** ~1 minuto 30 segundos
**En pantalla:** seis tarjetas que aparecen de a una. Son **solo tecnologías nuevas** que no vimos en los casos (GPS, geocercas, H3, satélites, drones, isócronas, ruteo y cámaras ya se contaron).

> Todo lo que vimos ya funciona. Esto es lo que está saliendo ahora (si estamos justos de tiempo, contar solo 3: camiones sin chofer, robots de vereda y gemelos digitales).

- **→ 1 · Gemelos digitales.** > Una copia del depósito o del puerto en la computadora, que se mueve igual que el real. Por ejemplo, DSV armó una de su depósito en Singapur este año. Sirve para probar cambios antes de hacerlos.
- **→ 2 · Camiones sin chofer.** > Lo mismo que vimos con Tesla, pero con camiones de carga. Aurora ya los usa en rutas de Texas y apunta a más de 200 camiones a fines de 2026. Funcionan sobre mapas muy detallados de cada ruta.
- **→ 3 · Robots de vereda.** > Robots que llevan el pedido las últimas cuadras, por la vereda. Serve Robotics tiene más de 2.000, trabajando con Uber Eats.
- **→ 4 · IA agéntica.** > Programas que ven un problema, como un corte de ruta o un puerto cerrado, y **replanifican solos**. Gartner proyecta que la inversión se multiplique por 25 entre 2025 y 2030.
- **→ 5 · Ruteo conversacional.** > En vez de mirar tablas, se le pregunta al mapa en palabras: "¿por qué llegamos tarde al norte?".
- **→ 6 · Mapas abiertos.** > Mapas gratis y de calidad, armados entre empresas como Amazon, Meta, Microsoft y TomTom: Overture Maps, que ya suma 50 miembros.

*Fuentes (no van en pantalla): IMDA Singapur, enero de 2026 (gemelo digital 5G de DSV); FreightWaves, Supply Chain 247 y Dallas Innovates (Aurora: rutas Dallas–Houston y Fort Worth–El Paso, meta de más de 200 camiones a fines de 2026; es una meta de la empresa); The Robot Report y QSR Magazine (Serve Robotics, más de 2.000 robots, diciembre de 2025); proyección de Gartner (IA agéntica); Aptean, octubre de 2026 (ruteo conversacional); Linux Foundation, julio de 2026 (Overture Maps).*

---

## Diapositiva 32 · Cómo lo aplicaríamos (6 pasos)

**Tiempo:** ~1 minuto 30 segundos
**En pantalla:** el mapa de Resistencia (calles reales). Una distribuidora con su depósito y sus comercios se arma **capa por capa**; cada capa es algo que aprendimos de un caso.

> ¿Y si nos contratara una distribuidora de acá, de Resistencia? Juntamos todo lo que vimos.

- **→ 1 · Como UPS:** *aparecen los comercios como puntos.* > Primero, **cada comercio pasa a ser un punto en el mapa**.
- **→ 2 · Como Tesla:** *los comercios se agrupan en tres zonas de colores.* > Después, **cada camión tiene su zona dibujada**, como la geocerca de Tesla.
- **→ 3 · Como ORION:** *se dibuja la ruta optimizada.* > Ordenamos las paradas como ORION. Con nuestros datos de Resistencia, **un 26 % menos de kilómetros**.
- **→ 4 · Como Geotab:** *un camión recorre la ruta con un "ping" de posición: "En vivo".* > Vemos **cada camión en vivo**, incluso donde no hay señal.
- **→ 5 · Reglas automáticas:** *aparece una calle cortada; el camión frena antes: "Calle cortada: alerta y desvío".* > Y ponemos **reglas automáticas**: si una calle se corta, el sistema avisa y desvía solo. No alcanza con ver el dato: el mapa tiene que actuar.
- **→ 6 · Como Mercado Libre:** *aparece un segundo depósito con su área: "¿Un segundo depósito acá?".* > Por último, el mapa nos dice **dónde convendría abrir un segundo depósito** para llegar más rápido.

---

## Diapositiva 33 · Libros para seguir leyendo

**Tiempo:** ~10 segundos (mostrarla, no leerla)
**En pantalla:** las tapas reales de los cinco libros, en perspectiva (al pasar el cursor se enderezan; con un clic se abre el sitio de cada uno).

> Si les interesó, estos son los libros que usamos para preparar la charla:
- *The Geography of Transport Systems*, de Jean-Paul Rodrigue (gratis online).
- *Geographic Information Science and Systems*, de Longley, Goodchild, Maguire y Rhind.
- *Vehicle Routing*, de Toth y Vigo: la referencia del problema de ruteo.
- *PostGIS in Action*, de Obe y Hsu.
- *Geocomputation with Python*, de Dorman, Graser, Nowosad y Lovelace (gratis online).

---

## Diapositiva 34 · Para hacer: herramientas gratis para practicar

**Tiempo:** ~10 segundos (mostrarla, no leerla)
**En pantalla:** cinco tarjetas con herramientas gratuitas (con un clic se abre cada una).

> Y si quieren probarlo con las manos, todo esto es gratis:
- **Workshop de pgRouting:** para aprender a calcular rutas dentro de una base de datos.
- **OSRM:** el motor de ruteo sobre OpenStreetMap; **con él calculamos las rutas de Resistencia** que mostramos.
- **VROOM:** un optimizador de rutas, lo mismo que hace ORION.
- **OR-Tools:** la librería de Google para rutas con capacidades y horarios.
- **H3:** los hexágonos de Uber, gratis para cualquier proyecto.

---

## Diapositiva 35 · Muchas gracias

**En pantalla:** solo "MUCHAS GRACIAS" sobre el video del planeta de la portada.

> Muchas gracias.

---

# Apéndice · Casos ocultos (no se presentan)

Estos casos están armados pero **ocultos** para que la expo entre en 15 minutos. Siguen en el código (`src/cases/`) y se vuelven a mostrar cambiando `show: false` por `show: true` en `src/App.tsx` (y quitando `hidden: true` de su tarjeta en `src/sections/cases.tsx`). Los números de diapositiva de abajo son de la versión anterior.

---

## Diapositivas 11 a 17 · Caso 02 · Uber · Hexágonos (H3)

**Tiempo total:** ~1 minuto 45 segundos
**Estilo:** el mismo que Tesla (oscuro, neón). La ciudad es ilustrativa. Lo contamos con **reparto** (pedidos y repartidores) para que quede claro el vínculo con logística.
**Video:** arriba a la derecha (Uber Engineering explicando H3).

### Diapositiva 11 · Portada del caso
*En pantalla: "HEXÁGONOS" sobre la animación 3D de la ciudad partida en hexágonos.*

> El segundo caso es Uber. Uber tiene un problema que es muy de logística: saber **dónde hay más pedidos** y **dónde faltan repartidores o autos**, en cada momento. Para eso inventó algo muy simple: partir la ciudad en **hexágonos**.

### Diapositiva 12 · El problema (2 pasos)
*En pantalla: barrios de formas y tamaños distintos, cada uno con su cantidad de pedidos.*

- **→ 1:** *aparecen los barrios con sus pedidos (120, 95, 60, 75, 40).*
  > Para saber dónde faltan repartidores hay que **contar pedidos por zona**.
- **→ 2:** *se resaltan el barrio grande (120) y el chico (40): "¿Dónde hay más demanda por cuadra?".*
  > Pero los barrios tienen **formas y tamaños distintos**. 120 pedidos en un barrio enorme pueden ser menos, por cuadra, que 40 en uno chico. Así **no se pueden comparar**.

### Diapositiva 13 · La solución con GIS (3 pasos)
*En pantalla: la animación 3D de hexágonos.*

- **→ 1:** *aparece la grilla de hexágonos, plana.*
  > La solución de Uber se llama **H3**: cubre toda la ciudad, y en realidad todo el planeta, con **hexágonos iguales**, cada uno con su código.
- **→ 2:** *los hexágonos crecen: la altura es la cantidad de pedidos.*
  > Cada hexágono **cuenta sus pedidos**. Ahora sí se pueden comparar, porque todas las zonas son del mismo tamaño.
- **→ 3:** *los hexágonos se pintan según si faltan autos (rojo/ámbar) o alcanzan (verde), aparecen los autos y el cartel "precio ×1,8".*
  > Y los compara con los **autos libres**. Donde faltan, **sube el precio**, y eso hace que los conductores vayan hacia ahí.

### Diapositiva 14 · ¿Por qué hexágonos? (2 pasos)
*En pantalla: camionetas de reparto que salen del centro hacia cada casilla de al lado. Una carrera.*

- **→ 1:** *con cuadrados: a 4 casillas llegan rápido (✓ verde) y a las 4 de las esquinas llegan tarde (en rojo, "tarde").*
  > ¿Por qué hexágonos y no cuadrados? Miren: sale una camioneta del centro hacia cada casilla de al lado. Con cuadrados, a las de los costados llega rápido, pero **a las de las esquinas llega tarde**, porque están más lejos.
- **→ 2:** *con hexágonos: las 6 camionetas llegan todas juntas, todo en verde.*
  > Con hexágonos, **llega a todas al mismo tiempo**. Todos los vecinos están **igual de cerca**. Por eso Uber eligió hexágonos: así es justo medir qué está cerca.

### Diapositiva 15 · ¿Y en logística? (2 pasos)
- **→ 1:** *hexágonos alrededor de un local, cada uno con su tiempo de entrega en minutos.*
  > En reparto, cada hexágono puede tener su **tiempo de entrega estimado** desde el local.
- **→ 2:** *se marca en verde la "zona de entrega · hasta 25 min".*
  > Con eso se decide **hasta dónde reparte cada local** y dónde conviene que esperen los repartidores. 

### Diapositiva 16 · Tecnologías (pasos = una tarjeta por tecnología)
*En pantalla: H3 (GIS) · Ubicación en vivo (GIS) · Precio dinámico. Las que tienen la marca azul "GIS" son tecnologías del mundo de los mapas.*

> Las tecnologías GIS acá son **H3**, la grilla de hexágonos, y la **ubicación en vivo** de pedidos y autos. Con eso funciona el **precio dinámico**.

### Diapositiva 17 · Resultados (3 pasos)
- **→ 1:** *2018.* > En 2018 Uber **liberó H3 gratis**. Hoy lo usan empresas de reparto, de mapas y hasta bancos en todo el mundo.
- **→ 2:** *16 tamaños.* > Tiene **16 tamaños** de hexágono, desde un continente hasta una cuadra.
- **→ 3:** *×7.* > Y cada tamaño es **7 veces más chico** que el anterior, así se puede mirar la ciudad con más o menos detalle.

*Fuente (no va en pantalla): Uber Engineering, "H3: Uber's Hexagonal Hierarchical Spatial Index".*

**Para recordar:**
- **H3** = la ciudad (y el planeta) partida en **hexágonos iguales**, cada uno con un código.
- Sirve para **comparar zonas**: pedidos contra repartidores, tiempos de entrega.
- Hexágono porque **todos sus vecinos están igual de cerca** (la camioneta llega a todos al mismo tiempo).

**Si nos preguntan:**
- *¿De qué tamaño son los hexágonos?* H3 tiene 16 tamaños, desde casi un continente hasta menos de un metro; cada nivel es unas 7 veces más chico que el anterior. Para una ciudad se usan los de unas pocas cuadras.

---

## Diapositivas 18 a 24 · Caso 03 · Walmart + Wing · Drones

**Tiempo total:** ~2 minutos
**Estilo:** 3D, oscuro. Ciudad ilustrativa. Wing es la empresa de drones de Google (Alphabet) que entrega para Walmart.

### Diapositiva 18 · Portada del caso
*En pantalla: "DRONES" grande y un dron dando vueltas sobre la ciudad.*

> El tercer caso es Walmart, el supermercado más grande de Estados Unidos, junto con **Wing**, la empresa de drones de Google. Juntos **entregan pedidos con drones**.

### Diapositiva 19 · El problema (2 pasos)
- **→ 1:** *un camión de reparto atascado en una fila de autos, cartel "Tránsito".*
  > Mandar un camión por un paquete chico es **caro y lento**: queda atrapado en el tránsito como cualquier auto.
- **→ 2:** *la cámara se aleja, aparece el dron con un "?" y se levantan las zonas prohibidas (hospital, aeropuerto).*
  > Un dron va por el aire y esquiva el tránsito… pero **el aire no tiene calles**. Hay lugares donde no se puede volar, como cerca de un hospital o de un aeropuerto. ¿Por dónde va?

### Diapositiva 20 · La solución con GIS: un mapa del cielo (3 pasos)
- **→ 1:** *aparece el círculo azul del radio de entrega alrededor de la tienda.*
  > Con un GIS, cada tienda tiene su **radio de entrega** dibujado en el mapa: hasta dónde llega el dron.
- **→ 2:** *se levantan las zonas prohibidas; una línea roja punteada muestra que el camino recto las atraviesa.*
  > Encima se cargan las **zonas prohibidas**. El camino recto pasa por arriba del hospital: no se puede.
- **→ 3:** *se dibuja la ruta que las esquiva y el dron la recorre hasta la casa del cliente.*
  > Entonces el sistema traza **la ruta que las esquiva** y el dron la sigue solo.

### Diapositiva 21 · La entrega (2 pasos)
- **→ 1:** *el dron llega volando sobre la casa del cliente (en amarillo).*
  > El dron llega a la casa del cliente…
- **→ 2:** *baja el paquete con una cuerda en un punto marcado del patio y vuelve a subir.*
  > …y **no aterriza**: baja el paquete **con una cuerda** en un punto libre del patio, que también está marcado en el mapa. Suelta el paquete y se va.

### Diapositiva 22 · ¿Y en logística? (2 pasos)
- **→ 1:** *varias tiendas, cada una con su círculo y su dron.*
  > En logística, esto cambia el rol de la tienda: **cada tienda pasa a ser un depósito** que cubre un círculo de casas a pocos minutos.
- **→ 2:** *las casas cubiertas se pintan de verde; las que quedan afuera, en gris.*
  > Y con el mapa se ve enseguida **qué casas quedan cubiertas** y dónde conviene sumar una tienda nueva.

### Diapositiva 23 · Tecnologías (pasos = una tarjeta por tecnología)
*En pantalla: Mapa del cielo (GIS) · Ruteo aéreo (GIS) · GPS de precisión (GIS) · Drones de Wing. Las que tienen la marca azul "GIS" son tecnologías del mundo de los mapas.*

> Casi todo este caso es GIS: el **mapa del cielo** con las zonas prohibidas, el **ruteo** que las esquiva y el **GPS de precisión** que marca dónde baja el paquete. El dron es el vehículo.

### Diapositiva 24 · Resultados (3 pasos)
- **→ 1:** *+1 M.* > Walmart ya superó **un millón de entregas con drones** (mayo de 2026), y cerca del 40 % fueron en los últimos tres meses: crece muy rápido.
- **→ 2:** *23 min.* > En promedio, el pedido llega en **23 minutos**.
- **→ 3:** *270+.* > Y el plan es llegar a **más de 270 tiendas** con drones.

**Para recordar:**
- El aire no tiene calles: el GIS dibuja **el mapa del cielo** (radio de entrega + zonas prohibidas + ruta).
- El paquete **baja con una cuerda** en un punto marcado del patio.
- En logística: **la tienda se vuelve depósito**.

**Fuentes (para nosotros, no van en pantalla):**
- DroneXL, "Walmart Hits 1M Drone Deliveries, 40% This Quarter" (31/05/2026): 1 millón de entregas, 23 min promedio, 66 tiendas en 4 estados.
- eWeek / Axios (enero 2026): Wing y Walmart suman 150 tiendas; más de 270 ubicaciones con drones al terminar la expansión.

---

## Diapositivas 38 a 44 · Caso 06 · Maersk · Barcos

**Tiempo total:** ~2 minutos
**Estilo:** mapa del mundo en neón con las rutas marítimas y barcos navegando. Maersk es una de las navieras más grandes del mundo: mueve contenedores entre continentes.
**Video:** todavía no tiene (pendiente).

### Diapositiva 38 · Portada del caso
*En pantalla: "BARCOS" sobre el mapa del mundo con barcos en sus rutas.*

> El sexto caso es Maersk, una de las navieras más grandes del mundo. Lleva contenedores en barcos enormes entre Asia, Europa y América. Acá el GIS sirve para algo muy concreto: **seguir cada barco y cada contenedor en el medio del océano**.

### Diapositiva 39 · El problema (2 pasos)
- **→ 1:** *un barco en el Océano Índico: "¿Dónde está mi contenedor?".*
  > Un contenedor puede viajar **semanas en el medio del océano**. Y el cliente pregunta: ¿dónde está mi carga?
- **→ 2:** *aparece una zona roja: "Peligro: Mar Rojo".*
  > Y en el camino puede aparecer un **peligro**. En 2026, por los ataques en la zona, el Mar Rojo no era seguro para pasar.

### Diapositiva 40 · La solución con GIS: todo sobre el mapa (3 pasos)
- **→ 1:** *todos los barcos dejan su rastro y emiten "pings" de posición.*
  > Cada barco **avisa su posición todo el tiempo** (con un sistema que se llama AIS) y deja su rastro en el mapa.
- **→ 2:** *aparece un contenedor refrigerado con "GPS" y "4 °C".*
  > Los contenedores refrigerados llevan **GPS y termómetro**: se sabe dónde están y si la carga, por ejemplo fruta o remedios, sigue fría.
- **→ 3:** *la ruta se pinta de verde y aparece "Llega a Rotterdam en 12 días".*
  > Con la posición y la ruta, el mapa calcula **cuándo llega**.

### Diapositiva 41 · La clave: cambiar de ruta (2 pasos)
*En pantalla: Europa, África y Asia.*
- **→ 1:** *un barco va por la ruta corta, por el Canal de Suez.*
  > El camino corto entre Asia y Europa pasa por el **Canal de Suez**.
- **→ 2:** *el Mar Rojo se pone rojo con una cruz; aparece en verde la vuelta por África: "Vuelta por África · +14 días".*
  > Si el Mar Rojo no es seguro, el mapa calcula **la vuelta por África**, por el Cabo de Buena Esperanza, y avisa **cuánto más tarda**. Eso pasó de verdad en 2026: algunos viajes de Maersk tardaron hasta 14 días más.

### Diapositiva 42 · ¿Y en logística? (2 pasos)
*En pantalla: el puerto de Rotterdam.*
- **→ 1:** *un panel de "Llegadas" con los barcos y sus horarios.*
  > Como se sabe dónde está cada barco, el puerto ve **cuándo llega cada uno**, días antes.
- **→ 2:** *camiones esperando en el puerto: "Camiones listos cuando llega el barco".*
  > Así **los camiones esperan listos** para llevarse los contenedores, sin perder tiempo.

### Diapositiva 43 · Tecnologías (4 pasos)
*En pantalla: AIS (GIS) · GPS en contenedores (GIS) · Satélites · Ruteo marítimo (GIS).*

> Las tecnologías GIS son el **AIS**, que transmite la posición de cada barco, el **GPS de los contenedores** y el **ruteo marítimo**, que calcula el mejor camino y lo cambia si hay peligro. Los **satélites** llevan esos datos desde el medio del océano.

### Diapositiva 44 · Resultados (3 pasos)
- **→ 1:** *~4,3 M.* > La flota de Maersk tiene capacidad para **unos 4,3 millones de contenedores** (medidos en TEU, contenedores de 20 pies).
- **→ 2:** *270.000.* > **270.000 contenedores refrigerados** llevan GPS y termómetro.
- **→ 3:** *+14 días.* > Y cuando hubo que dar la vuelta por África, el viaje se alargó **hasta 14 días**: el mapa lo calcula y avisa a todos.

**Para recordar:**
- En el mar también hay GIS: **posición de cada barco y de cada contenedor**.
- El mapa permite **cambiar de ruta** si hay peligro y avisar cuánto se demora.
- En logística: el puerto **se prepara** porque sabe cuándo llega cada barco.

*Fuentes (no van en pantalla): Maersk Remote Container Management (270.000 contenedores refrigerados con GPS; Container Mag, Food Logistics); gCaptain y Maritime Professional (desvíos por el Cabo, 2026: hasta 14 días más); reportes de flota 2026 (~4,3 millones de TEU, Datamar News / India Seatrade News).*

---

## Diapositivas 52 a 59 · Caso reciente · Trenes en España · Cuando falla

**Qué tipo de caso es:** el **caso de reflexión**. No es un caso de éxito: es un **contraejemplo**. Muestra **GIS aplicado al control de trenes** (la posición de cada tren sobre el mapa de la red) y qué pasa cuando el sistema automático se cae y una orden humana pasa por alto la regla.
**Cómo se cuenta:** como una historia, **hora por hora**, con animación 3D. Las distancias del 3D están comprimidas: es una ilustración.
**Tono:** respetuoso; hubo víctimas. Aclarar en voz alta que **las causas siguen bajo investigación** (la justicia y la comisión de investigación de accidentes).

### Diapositiva 52 · Portada del caso
*En pantalla: "CUANDO FALLA" sobre una vía en 3D, con las pastillas "Caso de reflexión" y "Tener el dato no alcanza".*

> Para cerrar los casos, uno muy reciente y muy distinto: no es una historia de éxito. Pasó hace unos días en España y nos sirve para pensar **los límites del GIS**. Lo vamos a contar hora por hora.

### Diapositiva 53 · 07:54 – 08:00 · Salen de Atocha (2 pasos)
- **→ 1:** *sale el tren rojo (Iryo).*
  > A las 07:54 sale de Madrid el **Iryo 6076**, rumbo a Sevilla.
- **→ 2:** *sale el tren blanco (AVE) detrás, por la misma vía.*
  > A las 08:00 sale el **AVE 2080** de Renfe, por la misma vía, **seis minutos detrás**.

### Diapositiva 54 · 08:30 · Se cae el sistema automático (2 pasos)
- **→ 1:** *las señales parpadean y se apagan: "08:30 · Se cae la LZB (68 km)".*
  > La **LZB** es el sistema automático que sabe dónde está cada tren, controla la velocidad y **lo frena solo** si hace falta. A las 08:30, por un problema informático, **deja de funcionar en 68 km de vía**.
- **→ 2:** *"Iryo · frenó solo ✓", "AVE · frenó solo ✓", "25 km entre los dos".*
  > Y hizo lo que tenía que hacer: **los seis trenes del tramo frenaron solos**. El Iryo y el AVE quedaron a 25 km de distancia. Hasta acá, el sistema funcionó.

### Diapositiva 55 · 08:36 · La orden (3 pasos)
*En pantalla aparece el centro de control de Atocha.*
- **→ 1:** *"08:36 · ‘AVE, podés seguir’".*
  > A las 08:36, desde el centro de control de Atocha **autorizan al AVE a seguir** con el **sistema de respaldo**, que se llama BSL. Ese sistema ya no es automático: **depende de las personas**.
- **→ 2:** *"Regla: solo si el tramo está libre · 40 km/h".*
  > El respaldo tiene una regla: seguir **solo si el tramo de adelante está libre**, mirando la vía y a **40 km/h como máximo**.
- **→ 3:** *se marca en rojo el tramo donde está el Iryo: "Tramo ocupado · nadie lo confirmó".*
  > Pero nadie confirmó que el tramo estuviera libre. **El Iryo seguía ahí.**

### Diapositiva 56 · 08:41 – 08:48 · El Iryo no arranca (2 pasos)
- **→ 1:** *"Iryo · detenido: no puede reiniciar"; la pantalla del centro de control se pone en alerta.*
  > La conductora del Iryo avisa al centro de control que **no puede reiniciar el sistema**: el tren sigue detenido.
- **→ 2:** *líneas desde los dos trenes a la pantalla: "En las pantallas se veían los dos trenes".*
  > En las pantallas de Atocha **se veía dónde estaba cada tren**. Eso es GIS: la posición de cada tren sobre el mapa de la red. Pero **nadie dio la orden de frenar al AVE**.

### Diapositiva 57 · 08:54 · El choque (2 pasos)
- **→ 1:** *el AVE avanza rápido: "AVE · 160–200 km/h", "Km 118 · cerca de Urda".*
  > El AVE avanza a **entre 160 y 200 km/h**, muy por encima de lo que permitía la regla.
- **→ 2:** *la imagen se funde a negro antes del choque.*
  > A las 08:54 alcanza al Iryo en el **kilómetro 118, cerca de Urda**, en Toledo. **Murieron 69 personas** y más de 200 resultaron heridas. *(Pausa.)*

### Diapositiva 58 · La lección: dato + regla + sistema (2 pasos)
- **→ 1:** *"El dato ✓ · La regla ✓".*
  > ¿Qué falló? **El dato estaba** en las pantallas, y **la regla también existía**.
- **→ 2:** *el tramo ocupado se marca en rojo y el AVE se detiene antes: "Tramo ocupado: el sistema frena la orden".*
  > Cuando el sistema automático se cayó, todo quedó en manos de las personas, y **una orden pasó por alto la regla**. La lección: el sistema tendría que **frenar una orden que el mapa muestra como peligrosa**, aunque la dé una persona. Esto es lo que tendría que haber pasado.

### Diapositiva 59 · ¿Y en logística? (2 pasos)
*En pantalla (3D): un camión por una ruta; más adelante, una barrera de "Ruta cortada" con luces. Hay una salida lateral.*
- **→ 1:** *el camión sigue derecho, frena en seco frente a la barrera y queda atrapado: "Ubicado ✓ · pero nadie avisó".*
  > En logística pasa lo mismo: el mapa de la flota sabe dónde está el camión y sabe que la ruta está cortada, pero **si nadie avisa, el camión queda atrapado**.
- **→ 2:** *antes de llegar aparece "Alerta: ruta cortada más adelante" y el camión toma la salida solo: "Desvío automático ✓".*
  > El GIS sirve de verdad cuando **no deja pasar una orden peligrosa**: avisa a tiempo y desvía.

**Para recordar:**
- El sistema automático (LZB) **funcionó** al principio: frenó a los seis trenes.
- El problema fue después: con el respaldo, que depende de las personas, **se autorizó seguir sin verificar** lo que el mapa mostraba.
- **Dato + regla + un sistema que haga cumplir la regla.** Si falta uno, el mapa no alcanza.

**Datos verificados (para nosotros, no van en pantalla):**
- Iryo 6076 (sale de Atocha 07:54) y AVE 2080 de Renfe (sale 08:00), los dos hacia Sevilla.
- 08:30: falla de la LZB por un problema informático en 68 km; seis trenes se detienen automáticamente. Los dos trenes quedan a 25 km.
- 08:36: el centro de control autoriza al AVE a seguir con BSL. Según la norma de Adif (Consigna COI 01/25, de febrero de 2025), tras una caída de la LZB solo se puede seguir con BSL si el cantón siguiente está libre, en marcha a la vista (hasta 40 km/h).
- 08:41 y 08:48: la conductora del Iryo informa que no puede reiniciar la LZB.
- 08:54: el AVE (a 160–200 km/h) alcanza por detrás al Iryo en el km 118, entre Urda y Los Yébenes (Toledo). 69 muertos (último recuento; algunos medios dicen 68), más de 200 heridos.
- El ministro Óscar Puente calificó de "inexplicable" la orden. Fuentes del Gobierno apuntan a un error humano de un operador de Adif "en el contexto de una falla del sistema de señalización principal". Los sindicatos (SEMAF, CSIF) cuestionan esa versión. **Las causas siguen bajo investigación judicial y técnica.**
- Fuentes: Wikipedia, "2026 Toledo train collision"; elDiario.es (cobertura en vivo, 28/10/2026); Europa Press; Infobae; CNN en Español.
- **Corrección respecto de versiones anteriores:** no está confirmado que el AVE haya recorrido "25 km con señales en rojo"; los 25 km eran la distancia entre los dos trenes a las 08:30.
