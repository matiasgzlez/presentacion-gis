# Guion de la exposición · GIS en Logística

Para practicar. Lo que está en *cursiva* es lo que se ve en pantalla; el resto es lo que decimos en voz alta.
No hace falta decirlo palabra por palabra: lo importante son las ideas en **negrita**.

Integrantes: Gonzalez Matias · Lima Matias · Gaston Lovera

---

## Tiempos (la expo dura 15 minutos)

| Parte | Diapositivas | Tiempo |
|---|---|---|
| Portada · Qué es un GIS | 1 y 2 | ~1 min 45 s |
| Herramientas: what3words, Plus Codes, MarineTraffic y Kepler.gl | 3 a 18 | ~4 min 30 s |
| Los casos | 19 | ~20 s |
| Caso 01 · Mercado Libre | 20 a 24 | ~2 min |
| Caso 02 · Uber | 25 a 29 | ~1 min 45 s |
| Caso 03 · UPS | 30 a 35 | ~1 min 50 s |
| Caso 04 · Maersk | 36 a 40 | ~1 min 30 s |
| Caso 05 · Walmart + Wing | 41 a 45 | ~1 min 30 s |
| Libros · Para probar · Videos · Gracias | 46 a 49 | ~35 s |
| **Total** | **49** | **~16 min** |

**Ojo con el tiempo:** con las cuatro herramientas la expo pasa los 15 minutos. Para entrar: cada diapositiva de herramienta en ~15 s.

**Cómo funciona ahora la presentación:** los subpasos **avanzan solos hasta la idea final y quedan ahí, sin reiniciar**. Con → avanzamos un subpaso y, desde el último, pasamos a la diapositiva siguiente, que inicia su propia secuencia automática. Con ← retrocedemos un subpaso y, desde el primero, volvemos a la diapositiva anterior en su estado final. Recorrer los subpasos con el teclado deja esa diapositiva en modo manual para poder repasar sin que se adelante sola. Elegir una diapositiva desde la barra superior o un enlace interno reinicia su secuencia automática. Los videos y movimientos continuos de las escenas siguen reproduciéndose. A la izquierda está lo necesario para guiarnos (no todo lo que se dice) y se resalta el punto que corresponde a lo que se ve. Los videos están todos juntos en la diapositiva 48.

**Para llegar con margen:** las diapositivas **¿Quién es?** se pasan en ~10 segundos, y Libros, Para probar y Videos se muestran sin leerlas. Ensayar con cronómetro: está justo.

**Para elegir un subpaso:** acercar el mouse a los puntos superiores y elegir Inicio o un número. Ese subpaso queda en modo manual para explicarlo con tiempo; las flechas permiten seguir repasando y la diapositiva siguiente vuelve a avanzar automáticamente.

**Para revisar una animación quieta:** agregar `?paso=2` (o el paso que sea) a la dirección, antes del `#`.

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

**Tiempo:** ~1 minuto 15 segundos
**En pantalla:** *A la izquierda, una suma que aparece de a una: **Logística** (mover y guardar productos y su información, de ida y de vuelta) **+ GIS** (cada dato tiene su ubicación) **= GIS en logística: usar el dónde para decidir** (dónde guardar · por dónde ir · dónde está cada cosa, con los casos de cada una). A la derecha, una animación en bucle: aparecen cuatro capas del mismo barrio, una arriba de la otra (**Calles**, **Clientes**, **Tránsito**, **Camiones**); se juntan en un solo mapa y aparece en verde **la mejor ruta**, que pasa por todos los clientes y esquiva el tránsito; el camión la recorre y cada cliente queda tildado.*

**Qué decimos:**

> Antes de empezar, dos definiciones.
>
> **Logística** no es solo llevar un paquete del punto A al punto B. Es **planificar y controlar el movimiento y el almacenamiento de los productos, y de la información que los acompaña**, desde donde se producen hasta donde se consumen, **y también la vuelta**, como las devoluciones.
>
> El objetivo es que llegue **el producto correcto, en la cantidad y el estado correctos, al lugar correcto, en el momento justo y al menor costo**. Por eso incluye guardar la mercadería, armar los pedidos, elegir los caminos, seguir la carga, entregar y recibir las devoluciones. Desde un paquete de Mercado Libre hasta un contenedor que cruza el océano.
>
> Y un **GIS** es un **Sistema de Información Geográfica**. Es un sistema que guarda datos, pero con algo especial: **cada dato tiene su ubicación en el mapa**, sus coordenadas.
>
> Miren la animación. Primero tenemos las **calles**: por dónde se puede circular.
> Arriba ponemos los **clientes**: cada pin azul es una dirección donde hay que entregar.
> Después el **tránsito**: en rojo, las calles que hoy están complicadas.
> Y por último los **camiones**, que sabemos dónde están gracias al GPS.
>
> Cada una de estas cosas es una **capa**. Por separado, cada capa dice poco. Pero como todas comparten **el mismo dónde**, las podemos **apilar** en un solo mapa.
>
> Y ahí está la gracia del GIS: **cruzar las capas para tomar una decisión**. En este caso, la decisión es la ruta: el sistema calcula el camino que **pasa por todos los clientes y esquiva el tránsito**. Eso es lo que hace un GIS en logística: transforma datos con ubicación en decisiones.
>
> Y esas decisiones son las que vamos a ver en los casos: **dónde guardar**, como Mercado Libre y Walmart; **por dónde ir**, como Uber y UPS; y **dónde está cada cosa**, como Maersk.

**Para recordar:**
- **Logística** = planificar y controlar el movimiento y el almacenamiento de productos **y de su información**, de ida y de vuelta, para que llegue lo correcto, al lugar y en el momento justos, al menor costo. No es solo ir de A a B.
- **GIS = datos + ubicación.** Cada dato tiene coordenadas.
- Los datos se organizan en **capas** (calles, clientes, tránsito, camiones).
- Como comparten el mismo dónde, se pueden **superponer y cruzar**.
- El objetivo no es el mapa: es la **decisión** (qué ruta, dónde poner un depósito, qué zona atender primero).

**Si nos preguntan:**
- *¿Logística y cadena de suministro son lo mismo?* No. La cadena de suministro es todo: comprar, producir, vender. La logística es la parte que mueve y guarda los productos y su información.
- *¿Un GIS es lo mismo que Google Maps?* No. Google Maps es una aplicación que **usa** un GIS por detrás. Un GIS es la herramienta con la que una empresa carga **sus propios datos** (sus clientes, sus camiones, sus depósitos) y los analiza.
- *¿Qué tipos de datos hay?* Puntos (un cliente), líneas (una calle) y polígonos (una zona, un barrio). También imágenes, como una foto satelital.

*Fuentes (no van en pantalla): definición de logística del CSCMP (Council of Supply Chain Management Professionals), glosario oficial: "la parte de la cadena de suministro que planifica, implementa y controla el flujo directo e inverso y el almacenamiento de bienes, servicios e información relacionada, entre el punto de origen y el de consumo, para cumplir con los requisitos del cliente".*

---

## Diapositiva 3 · Herramientas de GIS en logística que casi nadie conoce

**Tiempo:** ~10 segundos
**En pantalla:** *cuatro fotos: what3words ("Cualquier dirección usando solo tres palabras"), Plus Codes ("Direcciones para todos, en Google Maps"), MarineTraffic ("Todos los barcos del mundo, en vivo") y Kepler.gl ("Millones de datos en un mapa, sin programar").*

> Antes de los casos, cuatro herramientas de GIS que casi nadie conoce y que se usan en logística. De cada una vamos a contar lo mismo: **qué es, cómo funciona y para qué sirve**.

---

## Diapositiva 4 · what3words · ¿Qué es?

**Tiempo:** ~20 segundos
**En pantalla:** *foto de una playa con la cuadrícula de what3words y la frase "Cualquier dirección usando solo tres palabras".*

> **what3words** es un sistema que divide **toda la superficie del planeta** en una cuadrícula de **57 billones de cuadrados de 3 por 3 metros**, y le asigna a cada uno una combinación **única de tres palabras** del diccionario. Su idea es poder dar **cualquier dirección usando solo tres palabras**, aunque sea en el medio de una playa.

## Diapositiva 5 · what3words · ¿Cómo funciona?

**Tiempo:** ~25 segundos
**En pantalla:** *una vista desde arriba de San Francisco con la cuadrícula, y una calle de Tokio marcada con su cuadrado.*

- **Cuadrícula global:** el mundo está dividido en secciones exactas de 3 por 3 metros.
- **Tres palabras fijas:** en vez de usar direcciones postales, que a veces no existen, o coordenadas GPS largas y difíciles de recordar, cada lugar se traduce a tres palabras que no cambian.
- **Ejemplo:** un punto de San Francisco es **///marchar.clase.carros**; una calle de Shibuya, en Tokio, es **///mazo.ligado.denso**.

## Diapositiva 6 · what3words · ¿Para qué sirve?

**Tiempo:** ~25 segundos
**En pantalla:** *un estadio con una dirección de tres palabras en cada entrada, un bombero en un campo y el navegador de un auto mostrando "///schenkt.sammler.parkettboden".*

- **Puntos exactos:** la entrada correcta de un estadio, un punto de encuentro o un campo sin nombre de calle.
- **Logística:** empresas de reparto lo usan para llegar a la puerta justa. Según la empresa, las entregas a la puerta son **un 42 % más rápidas**.
- **Emergencias:** servicios de emergencia y ONG lo usan para encontrar a quien pide ayuda; por ejemplo, Ambulance Tasmania rescató a una excursionista herida con what3words.
- **Gratis:** la app es gratis, está en **más de 50 idiomas** y se usa a diario en **193 países**.

## Diapositiva 7 · what3words · La UTN, en tres palabras

**Tiempo:** ~20 segundos
**En pantalla:** *el mapa de la manzana de la UTN (OpenStreetMap) con la grilla de 3 × 3 m y un cuadrado rojo en la puerta del patio, al lado de la "R" de "Resistencia": ///pasen.sueldos.leyes.*

> Para verlo con un ejemplo de acá: la puerta del patio de la facultad tiene tres formas de decir dónde está.
- **Dirección postal:** French 414, Resistencia. Sirve para toda la manzana, pero no dice a qué puerta ir.
- **Coordenadas:** -27,45134 y -58,97912. Son exactas, pero nadie se las acuerda.
- **what3words:** **///pasen.sueldos.leyes**. Es el cuadrado de 3 × 3 metros justo en **la puerta del patio**, y se recuerda fácil.

*Fuentes (no van en pantalla): what3words.com/es/about (textos, cifras e imágenes). Las coordenadas de la puerta salen del Plus Code G2XC+F96 y las tres palabras de convertirlas en what3words; el mapa es © OpenStreetMap.*

---

## Diapositiva 8 · Plus Codes · ¿Qué es?

**Tiempo:** ~15 segundos
**En pantalla:** *una vecina de Calcuta con la placa azul de su Plus Code en la puerta; la frase "Direcciones para todos".*

> **Plus Codes** es el sistema de **Google** que convierte la latitud y la longitud en un **código corto de letras y números**. Es **gratis, de código abierto** y ya viene en **Google Maps**. Su lema es **"direcciones para todos"**: sirve para darle una dirección a cualquier lugar que no la tiene.

## Diapositiva 9 · Plus Codes · ¿Cómo funciona?

**Tiempo:** ~25 segundos
**En pantalla:** *el mapa de la UTN con la celda de G2XC+F96 en la puerta del patio, y abajo el código partido en pedazos: 5843 (región) · G2XC (manzana) · +F9 (14 m) · 6 (la puerta, 3 m).*

- **Cuadrícula que se achica:** cada par de caracteres achica el cuadrado. **5843** es la región, **G2XC** la manzana, **+F9** un cuadrado de unos 14 metros y el último **6** uno de unos 3 metros.
- **Código corto + ciudad:** la puerta del patio de la UTN es **G2XC+F96 Resistencia**, que es lo mismo que el código completo **5843G2XC+F96**.
- **20 caracteres sin vocales:** así no forman palabras y no se confunden letras con números.
- **Sin internet:** el código se calcula en el teléfono. En Google Maps se suelta un pin y aparece.

> La diferencia con what3words: es el **mismo lugar** (la puerta del patio), pero en vez de tres palabras es un código, y es **abierto y gratis**.

## Diapositiva 10 · Plus Codes · ¿Para qué sirve?

**Tiempo:** ~20 segundos
**En pantalla:** *un repartidor en bicicleta, una ambulancia y una calle llena de comercios.*

- **Entregas:** llevar paquetes a barrios sin nombres de calle, zonas rurales o asentamientos.
- **Emergencias:** ambulancias y rescatistas llegan al punto exacto con un código compartido.
- **Gobiernos:** correo, servicios sociales y padrón electoral para gente que no tenía dirección.
- **Comercios:** que los clientes encuentren un local que no aparece en el mapa.

## Diapositiva 11 · Plus Codes · Casos de éxito

**Tiempo:** ~25 segundos
**En pantalla:** *una puerta de Calcuta con su placa, una placa de Nepal (7MR9MP93+PM6M) y repartidores de Favela Brasil Xpress.*

- **Calcuta, India:** la ONG Addressing the Unaddressed recorrió cada callejón y le puso una **placa con su código a cada puerta**. **Más de 500.000 personas** de asentamientos informales pudieron abrir una cuenta en el banco, anotarse para votar y recibir compras online.
- **Nepal:** el **correo nacional** los adoptó y el gobierno pidió que los **753 gobiernos locales** los usen.
- **Favelas de Brasil:** Favela Brasil Xpress dio direcciones digitales a **120.000 vecinos** para que les lleguen los paquetes.
- **Kenia:** los condados de Kisumu y Vihiga crearon unas **40.000 direcciones** para comercios y servicios.

*Fuentes (no van en pantalla): maps.google.com/pluscodes (textos, cifras e imágenes) y sus casos de éxito de Calcuta, Nepal y Gambia. El mapa de la UTN es © OpenStreetMap.*

---

## Diapositiva 12 · MarineTraffic · ¿Qué es?

**Tiempo:** ~15 segundos
**En pantalla:** *un mapa con barcos de colores entrando y saliendo de un puerto; la frase "Todos los barcos del mundo, en vivo".*

> **MarineTraffic** es un mapa web **gratis** que muestra **dónde está cada barco ahora mismo**: cómo se llama, a qué velocidad va, a qué puerto se dirige y cuándo llega. Nació en **2007** como un proyecto de la **Universidad del Egeo, en Grecia**, y desde **2023** es de la empresa **Kpler**.

## Diapositiva 13 · MarineTraffic · ¿Cómo funciona?

**Tiempo:** ~25 segundos
**En pantalla:** *un receptor AIS de MarineTraffic.*

- **El barco avisa:** lleva un equipo **AIS** que transmite por radio su nombre, posición, rumbo y velocidad cada pocos segundos. Es obligatorio en los barcos grandes que hacen viajes internacionales.
- **Antenas en la costa:** **miles de receptores** en puertos y costas captan esas señales y las mandan por internet.
- **Satélites:** en alta mar, donde no llega ninguna antena, los barcos se siguen desde el espacio. Esa parte es paga.
- **El mapa:** junta todo y dibuja cada barco como una flecha, con su recorrido.

## Diapositiva 14 · MarineTraffic · ¿Para qué sirve?

**Tiempo:** ~20 segundos
**En pantalla:** *los barcos esperando a los dos lados del Canal de Suez en marzo de 2021.*

- **¿Cuándo llega mi carga?:** importadores y exportadores siguen el barco que lleva su contenedor y planifican los camiones.
- **Puertos:** ven qué barcos están esperando para entrar y organizan los muelles.
- **Rutas y demoras:** se ven los atascos en canales y estrechos.
- **Seguridad:** saber qué barcos hay cerca ayuda en rescates y accidentes.

## Diapositiva 15 · MarineTraffic · Caso: el Ever Given

**Tiempo:** ~25 segundos
**En pantalla:** *el Ever Given atravesado en el canal, visto desde un satélite y desde la Estación Espacial.*

- **Qué pasó:** el **23 de marzo de 2021** el Ever Given, un portacontenedores de **400 metros**, quedó atravesado en el **Canal de Suez** durante **6 días**.
- **El atasco:** llegó a haber unos **369 barcos esperando**, y se frenaban unos **9.600 millones de dólares** de mercadería por día.
- **En vivo:** todo el mundo lo siguió en MarineTraffic. Se veían los remolcadores trabajando y la fila de barcos creciendo.
- **Decisiones:** con esos datos, las navieras decidieron si **esperar o dar la vuelta por África**.

*Fuentes (no van en pantalla): Wikipedia (MarineTraffic, Ever Given, 2021 Suez Canal obstruction), comunicado de Kpler (febrero de 2023). El sitio de MarineTraffic bloquea las descargas: las capturas son de Wikimedia Commons (OpenSeaMap con datos de MarineTraffic) y las fotos del canal, de satélite y de la NASA.*

---

## Diapositiva 16 · Kepler.gl · ¿Qué es?

**Tiempo:** ~20 segundos
**En pantalla:** *la frase "Convierte una planilla en un mapa" y la pantalla de Kepler.gl: a la izquierda, la planilla y las capas; a la derecha, el mapa.*

> **Kepler.gl** convierte **una planilla en un mapa**. Imaginen un Excel con **100.000 envíos**, cada uno con su latitud y longitud. Leído como tabla, no se entiende nada. Kepler.gl lo dibuja en un mapa en segundos, y ahí se ve enseguida dónde se concentran.
>
> Es **gratis**, funciona **en el navegador** y **no hace falta programar**. Lo creó **Uber** en 2018 para mirar sus propios viajes, y lo liberó para que lo use cualquiera.

## Diapositiva 17 · Kepler.gl · ¿Cómo funciona?

**Tiempo:** ~25 segundos
**En pantalla:** *animación en 4 pasos: una planilla de envíos de Resistencia (envío, latitud, longitud, hora) · el archivo "envios.csv" se arrastra al mapa · cada fila se vuelve un punto · los puntos se juntan en hexágonos que crecen donde hay más envíos.*

- **Una planilla:** cada fila es un envío, con su ubicación.
- **La arrastrás:** el archivo se suelta en el navegador. No hay que programar.
- **Cada fila, un punto:** Kepler.gl pone cada envío en el mapa.
- **Elegís cómo verlo:** como puntos, como hexágonos (la altura es cuántos envíos hay en cada zona), como arcos o como viajes animados.

## Diapositiva 18 · Kepler.gl · ¿Para qué sirve?

**Tiempo:** ~20 segundos
**En pantalla:** *arcos de viajes en Nueva York, viajes animados por las calles y hexágonos en 3D.*

> En logística, cada forma de verlo responde una pregunta:
- **¿Dónde se piden más envíos?** Los hexágonos muestran las zonas calientes de la ciudad.
- **¿De dónde a dónde van?** Los arcos unen el origen y el destino de cada envío.
- **¿Cómo se movió la flota hoy?** Los viajes animados repiten el recorrido de cada vehículo a lo largo del día.

*Fuentes (no van en pantalla): blog de Uber Engineering (lanzamiento, mayo de 2018), docs.kepler.gl y el repositorio en GitHub (licencia MIT, tipos de capa, imágenes).*

---

## Diapositiva 19 · Los casos que vamos a ver

**Tiempo:** ~20 segundos
**En pantalla:** *cinco tarjetas con el logo de cada empresa.*

| # | Empresa | Para qué usa el GIS |
|---|---|---|
| 01 | Mercado Libre | Dónde poner la red y cómo repartir (el país y la ciudad) |
| 02 | Uber | Medir la ciudad en vivo, en hexágonos |
| 03 | UPS | El orden exacto de 120 paradas |
| 04 | Maersk | Seguir cada contenedor en el mar |
| 05 | Walmart + Wing | Repartir por el aire: el mapa del cielo |

> Cinco empresas, y cada una muestra **algo distinto** del GIS en logística: **dónde poner la red**, **medir la ciudad en vivo**, **el orden exacto de las paradas**, **seguir la carga en el mar** y **repartir por el aire**. Por tierra, por mar y por aire.

**Cómo está armado cada caso:** portada · **¿Quién es?** (solo UPS, Maersk y Walmart + Wing, que acá se conocen menos) · **El GIS detrás de…** (el recorrido, con las funciones GIS que usa) · una diapositiva por **función GIS**, con sus tecnologías abajo.

---

## Diapositivas 20 a 24 · Caso 01 · Mercado Libre · Depósitos y rutas

**Tiempo total:** ~2 minutos

*No explicamos quién es Mercado Libre: todos la conocen. El hilo es: cómo viaja un paquete → en qué partes de ese viaje entra el GIS → cada una de esas dos decisiones, con las tecnologías que usa.*

### Diapositiva 20 · Portada
> Arrancamos con Mercado Libre. Todos compramos ahí; la pregunta es **cómo hace para que la compra llegue tan rápido**, y dónde entra el GIS en eso.

### Diapositiva 21 · El viaje de un paquete
*Arriba, el recorrido de 4 pasos que avanza solo; abajo, la foto real de cada paso.*
> Primero, cómo viaja un paquete.
- **Se guarda:** los vendedores dejan su mercadería en un **centro de distribución** de Mercado Libre, antes de venderla.
- **Se prepara:** cuando alguien compra, se busca el producto, se embala y se etiqueta.
- **Se clasifica:** de noche, un camión lo lleva al **centro de última milla** de la ciudad, y ahí se separa por zona.
- **Se reparte:** a la mañana sale la camioneta. Cada una entrega **más de 100 paquetes** en 8 a 9 horas.

### Diapositiva 22 · El GIS detrás de cada envío
*El mismo recorrido; se ilumina en azul dónde entra cada función GIS: "Análisis de ubicación · ¿Dónde va el próximo centro?" y "Ruteo dinámico · ¿Cómo se arman las rutas del día?".*
> Detrás de ese viaje hay **dos funciones de GIS**. Antes de vender, el **análisis de ubicación**: decidir dónde poner los centros para que el producto esté cerca. Y todos los días, el **ruteo dinámico**: armar las rutas de reparto.

### Diapositiva 23 · Función GIS 1 · Análisis de ubicación
*Mapa de Argentina en 4 pasos: compradores · rutas · zona a un día de camión · gana Córdoba (+3,4 M de personas nuevas).*
> Ya tiene un centro grande en Buenos Aires. ¿Dónde va el próximo?
- **Compradores:** se marca dónde vive la gente; el punto es más grande cuanta más gente hay.
- **Rutas:** se suma la capa de rutas nacionales.
- **Un día de camión:** desde cada ciudad posible se dibuja hasta dónde llega un camión en un día. Se estira por las rutas: es una **isócrona**.
- **Se elige:** se cuenta la gente que queda adentro y que hoy no cubre Buenos Aires. Gana **Córdoba**, con unos 3,4 millones de personas nuevas; justo donde Mercado Libre anunció su próximo centro.

### Diapositiva 24 · Función GIS 2 · Ruteo dinámico
*Animación en 4 pasos: los pedidos como puntos · se pintan por zona · una ruta por camioneta · una calle cortada y la ruta se recalcula.*
> Esto pasa todos los días, de madrugada, en el centro de última milla.
- **Cada compra, un punto:** la dirección de cada paquete pasa a ser un punto en el mapa.
- **Zonas:** se juntan las paradas cercanas; cada zona es una camioneta.
- **Orden:** el sistema decide en qué orden ir, teniendo en cuenta el tránsito.
- **Recalcula:** si una calle está cortada o la camioneta se desvía, arma un camino nuevo.

**Tecnologías (para entenderlas nosotros, no se lee):**
- **Capas:** cada tipo de dato es una "hoja" del mapa (compradores, rutas…). El GIS las superpone para cruzarlas.
- **Isócrona:** la zona a la que se llega en un mismo tiempo (por ejemplo, un día de camión). No es un círculo porque por ruta se va más rápido.
- **Análisis de ubicación:** comparar varios lugares posibles con los mismos datos y elegir el mejor.
- **Geocodificación:** pasar una dirección escrita ("French 414, Resistencia") a un punto con coordenadas en el mapa.
- **Ruteo dinámico:** calcular el orden de las paradas y el camino, y volver a calcularlo si algo cambia en la calle.
- **Aprendizaje automático:** el sistema aprende de los viajes anteriores (por ejemplo, cuánto tarda cada calle a cada hora). No es GIS, pero usa sus datos.

*Fuentes (no van en pantalla): The Logistics World (31/5/2023) y Expansión (26/5/2023), visitas al centro de última milla de Mercado Libre en Ciudad de México (ruteo dinámico, zonas, "olas", +100 paquetes por camioneta, recálculo si se desvía); DolarHoy, El Economista y The Logistics World (2026) sobre el centro de Córdoba. La animación de Córdoba usa la población de las ciudades de más de 90.000 habitantes (Natural Earth) y rutas simplificadas: es un ejemplo de cómo se hace el análisis, no el estudio real de la empresa. Fotos: prensa de Mercado Libre (vía The Logistics World) y Gobierno de São Paulo (Wikimedia Commons, CC BY 2.0).*

---

## Diapositivas 25 a 29 · Caso 02 · Uber · Hexágonos

**Tiempo total:** ~1 minuto 45 segundos

*No explicamos quién es Uber: todos la conocen. Mostramos qué pasa por dentro cuando pedís un Uber y dónde entra el GIS.*

### Diapositiva 25 · Portada
> El segundo caso es Uber. La pregunta: **¿qué pasa por dentro cuando pedís un Uber?**

### Diapositiva 26 · El GIS detrás de cada viaje
*El recorrido de un pedido: Pedís · Elige quién va · Va en camino · Llega. Se ilumina en azul dónde entra cada función GIS: "Análisis por hexágonos · ¿Dónde faltan autos?" y "Ruteo y tiempo de llegada · ¿Qué auto lleva el pedido?".*
> Cuando pedís un viaje o comida pasan cuatro cosas. Detrás hay **dos funciones de GIS**: el **análisis por hexágonos**, que dice dónde faltan autos (y define el precio que ves al pedir), y el **ruteo**, que elige qué auto lleva tu pedido. Las dos se apoyan en algo que inventó Uber: **H3**.

### Diapositiva 27 · ¿Qué es H3?
*Animación en 4 pasos: el mapa se llena de hexágonos · uno se ilumina con su código (8928308280fffff) · cuadrados vs. hexágonos (8 vecinos con 2 distancias vs. 6 vecinos todos iguales) · un hexágono se parte en 7 más chicos, y esos en 7 más.*
> **H3** es el sistema que inventó Uber para **partir todo el planeta en hexágonos**. Lo liberó gratis en 2018 y hoy lo usan muchas empresas.
- **Hexágonos:** el mapa se cubre con celdas iguales.
- **Un código:** cada hexágono tiene su número. Así, en vez de guardar "latitud y longitud", se guarda "en qué hexágono está", y se puede contar cuántos pedidos o autos hay en cada uno.
- **Vecinos iguales:** ¿por qué hexágonos? En un cuadrado, los vecinos de las esquinas están más lejos que los de los costados. En un hexágono, los 6 vecinos están a la misma distancia. Eso hace que buscar "lo que hay alrededor" sea justo para todos lados.
- **16 tamaños:** cada hexágono tiene 7 más chicos adentro. El más grande es más grande que un país; el más chico mide menos de 1 m². Uber elige el tamaño según lo que necesita medir.

### Diapositiva 28 · Función GIS 1 · Análisis por hexágonos
*Animación 3D: la ciudad en hexágonos; la altura es la cantidad de pedidos; el color compara con los autos libres (verde alcanza, naranja o rojo faltan).*
- **Hexágonos:** Uber parte la ciudad en hexágonos iguales, cada uno con su código. Ese sistema es **H3** y lo creó Uber.
- **Pedidos:** cada hexágono cuenta sus pedidos; la altura es la demanda.
- **Color:** se compara con los autos libres. Verde: alcanza. Naranja o rojo: faltan autos, **sube el precio** y eso atrae más autos a esa zona.
> ¿Por qué hexágonos y no barrios? Porque los barrios tienen tamaños distintos; los hexágonos son todos iguales y se pueden comparar.

### Diapositiva 29 · Función GIS 2 · Ruteo y tiempo de llegada
*Animación en 4 pasos: llega un pedido · se iluminan los hexágonos de alrededor y los autos libres A y B · A está más cerca en línea recta pero hay un río (8 min); B llega en 3 min · va B.*
- **Llega un pedido:** con su ubicación.
- **Busca cerca:** mira los autos libres en los hexágonos de al lado, no en toda la ciudad.
- **Mide por las calles:** A está más cerca en línea recta, pero tiene que cruzar por el puente: tarda 8 minutos. B tarda 3.
- **Elige:** va B, y la app te muestra cuánto tarda en llegar.

**Tecnologías (para entenderlas nosotros, no se lee):**
- **H3:** la grilla de hexágonos de Uber. Cada hexágono tiene un código; sirve para contar cosas por zona y para buscar "los hexágonos de al lado". Uber la liberó gratis en 2018.
- **Índice espacial:** una forma de ordenar los datos por lugar (por ejemplo, por hexágono) para encontrar rápido qué hay en cada zona, sin recorrer todo el mapa.
- **GPS:** la ubicación en vivo de cada auto y de cada pedido.
- **Ruteo (tiempo estimado de llegada):** calcular cuánto se tarda por las calles reales, no en línea recta.
- **Precio dinámico:** la regla que sube la tarifa donde faltan autos. No es GIS, pero usa el mapa de hexágonos.
- **Asignación:** la regla que decide qué auto toma cada pedido. No es GIS, pero usa el tiempo calculado por el mapa.

*Fuentes (no van en pantalla): Uber Engineering, blog "H3: Uber’s Hexagonal Hierarchical Spatial Index" (2018) y documentación de H3 (16 resoluciones, de la 0 a la 15; cada hexágono tiene 7 hijos; las celdas más chicas miden menos de 1 m²; el código 8928308280fffff es el ejemplo de la documentación). El ejemplo del río es ilustrativo.*

---

## Diapositivas 30 a 35 · Caso 03 · UPS · ORION · Rutas

**Tiempo total:** ~1 minuto 30 segundos

*Lo distinto de este caso: no es dónde ni cuándo, es **el orden exacto** de las paradas. Es optimización pura.*

### Diapositiva 30 · Portada
> El tercer caso es UPS y su sistema **ORION**, que elige **el mejor orden de paradas** para cada camión.

### Diapositiva 31 · ¿Quién es?
*Fotos: un camión marrón de UPS, el centro Worldport visto desde el aire y un chofer adentro del camión con los paquetes ordenados.*
> UPS es una de las paqueterías más grandes del mundo; la de los **camiones marrones**. Nació en Seattle, Estados Unidos, en 1907, y entrega **20,8 millones de paquetes por día**. Su centro Worldport, en Louisville, clasifica **416.000 paquetes por hora**.

### Diapositiva 32 · El GIS detrás de cada entrega
*El recorrido: Viaja · Se clasifica · Se carga · Se entrega. Se iluminan "Se carga" y "Se entrega" con la función clave: "Optimización de rutas · ¿En qué orden visitar las 120 paradas del día?".*
> En UPS hay una función GIS que es la clave: la **optimización de rutas**, con un sistema que se llama **ORION**. UPS empezó a desarrollarlo a principios de los 2000 y en 2016 ya armaba las rutas de unos **55.000 recorridos** en Estados Unidos. Cuando se carga el camión, ya se sabe en qué orden va a visitar cada parada; por eso los paquetes van ordenados adentro.

### Diapositiva 33 · La función GIS clave · ¿Cómo funciona ORION?
*Animación en 4 pasos: aparecen las paradas del día sobre las calles, tres con "antes 10:30" · titilan órdenes al azar: "120 paradas = más órdenes que átomos en el universo" · se dibuja una ruta cualquiera y se va corrigiendo de a pedazos mientras bajan los kilómetros · la ruta final, con las paradas numeradas, va "al aparato del chofer". Abajo: Mapa de calles, Geocodificación y Optimización de rutas (GIS).*
- **Los datos:** ORION junta los paquetes del día, un mapa de calles muy detallado (UPS usa unos 250 millones de puntos de direcciones) y los horarios: hay entregas que tienen que llegar antes de cierta hora.
- **No prueba todos:** con 120 paradas hay más órdenes posibles que átomos en el universo. Ninguna computadora puede probarlos todos.
- **Arma y mejora:** entonces arma una ruta cualquiera y la va corrigiendo de a pedazos: da vuelta un tramo, prueba si queda más corta, y repite. Así revisa unas **200.000 opciones en pocos segundos**. No busca la ruta perfecta, sino una muy buena y rápida.
- **Al chofer:** la ruta final, respetando los horarios, aparece en el aparato de mano del chofer.

### Diapositiva 34 · Lo más famoso de UPS · Doblar a la izquierda cuesta
*Animación en una esquina vista desde arriba: el camión quiere doblar a la izquierda, vienen autos de frente y espera con el reloj corriendo · después la otra opción: tres veces a la derecha alrededor de la manzana, y llega sin frenar.*
> Lo más famoso de las rutas de UPS es que **casi no doblan a la izquierda**. Es una regla de UPS de antes de ORION, y ORION la aplica.
- **A la izquierda:** hay que esperar a que pasen los autos de frente y cruzar el tránsito. Se pierde tiempo, se gasta combustible con el motor en marcha y hay más riesgo de choque.
- **Tres a la derecha:** muchas veces conviene dar la vuelta a la manzana doblando a la derecha, sin frenar.
> No es que esté prohibido: ORION le suma una **penalidad de tiempo** a cada giro a la izquierda, y si igual conviene, lo hace.

### Diapositiva 35 · El resultado · A ojo vs. ORION
*Nuestro video: "a ojo" contra ORION, el mismo camión y las mismas paradas.*
- **1 milla menos:** con solo una milla menos por chofer por día, UPS ahorra **US$ 50 millones por año**.
- **100 millones de millas:** ORION les ahorra unas 100 millones de millas por año, unos 160 millones de kilómetros, y unos 10 millones de galones de combustible.
- **En total:** UPS calcula que ORION le ahorra **entre 300 y 400 millones de dólares por año**.

**Tecnologías (para entenderlas nosotros, no se lee):**
- **Mapa de calles:** todas las calles con sus sentidos, distancias y giros permitidos. Sin esto no se puede calcular nada.
- **Geocodificación:** pasar la dirección de cada paquete a un punto en el mapa.
- **Optimización de rutas:** probar muchísimos órdenes de paradas y quedarse con el más corto. Es el "problema del viajante".
- **Penalidad de giro:** en el mapa de calles, cada giro tiene un "costo" en tiempo. A los giros a la izquierda se les suma más (por ejemplo, 20 segundos), así el sistema los evita cuando puede.
- **Heurística:** un "atajo" para encontrar una solución muy buena sin probar todas. ORION arma una ruta y la mejora de a pedazos (búsqueda local).

*Fuentes (no van en pantalla): UPS e INFORMS (premio Franz Edelman 2016): 1 milla menos por chofer por día ≈ US$ 50 M por año. Informe anual y ficha de UPS 2025: 20,8 M de paquetes por día. Worldport: 416.000 paquetes por hora (UPS, citado por Engadget y otros). Cómo funciona ORION: Holland et al., "UPS Optimizes Delivery Routes", revista Interfaces de INFORMS (2017): metaheurística con búsqueda local, ventanas horarias, US$ 300–400 M por año; Transport Topics (250 millones de puntos de direcciones); Fortune y Dataconomy (unas 200.000 opciones por ruta en segundos). Giros a la izquierda: UPS citado por Mental Floss y CBS (no es una prohibición; el software suma una penalidad, por ejemplo 20 segundos); la regla es anterior a ORION. Desarrollo desde principios de los 2000, 55.000 recorridos en 2016, 100 millones de millas y 10 millones de galones por año: UPS, INFORMS, Fortune e InformationWeek. Las animaciones son ilustrativas. Fotos: Wikimedia Commons.*

---

## Diapositivas 36 a 40 · Caso 04 · Maersk · Barcos

**Tiempo total:** ~1 minuto 30 segundos

*Lo distinto de este caso: la logística **por mar**. Seguir cada contenedor cuando está en el medio del océano. Se conecta con MarineTraffic, que mostramos en Herramientas.*

### Diapositiva 36 · Portada
> El cuarto caso es Maersk. La pregunta: **¿dónde está mi contenedor, en el medio del océano?**

### Diapositiva 37 · ¿Quién es?
*Fotos: un portacontenedores celeste de Maersk, otro cargando en Singapur y una pila de contenedores refrigerados.*
> Maersk es una de las navieras más grandes del mundo; la de los **barcos celestes**. Nació en Dinamarca en 1904 y tiene **más de 700 barcos** que llevan contenedores por todos los océanos. Sus contenedores refrigerados tienen **GPS y termómetro**.

### Diapositiva 38 · El GIS detrás de cada contenedor
*El recorrido: Se carga · Cruza el océano · Llega al puerto · Sale en camión. Se iluminan las funciones: "Seguimiento en vivo · ¿Dónde está mi contenedor?" y "Ruteo marítimo · ¿Por dónde conviene ir, y cuándo llega?".*
> Detrás de cada contenedor hay **dos funciones de GIS**: el **seguimiento en vivo**, para saber dónde está en todo momento, y el **ruteo marítimo**, para elegir por dónde ir y calcular cuándo llega.

### Diapositiva 39 · Función GIS 1 · Seguimiento en vivo
*Mapa del mundo: los barcos dejan su rastro; aparece un contenedor refrigerado con "GPS · 4 °C"; la ruta se pinta y aparece "Llega a Rotterdam en 12 días". Abajo: AIS y GPS (GIS), Satélites.*
- **El barco avisa:** por **AIS**, la misma señal que vimos en MarineTraffic.
- **El contenedor avisa:** los refrigerados llevan **GPS y termómetro**, y mandan los datos por satélite. Se sabe dónde está y si la carga (fruta, remedios) sigue fría.
- **Cuándo llega:** con la posición y la ruta, el mapa calcula la llegada.

### Diapositiva 40 · Función GIS 2 · Ruteo marítimo
*Europa, África y Asia: un barco por el Canal de Suez; el Mar Rojo se marca como peligroso y aparece la vuelta por África: "10 a 14 días más". Abajo: Ruteo marítimo y Zonas de riesgo (GIS).*
- **Camino corto:** entre Asia y Europa, por el **Canal de Suez**.
- **Si hay peligro:** desde fines de 2023, por los ataques en el Mar Rojo, Maersk mandó muchos barcos por **la vuelta por África**: **10 a 14 días más**. El mapa calcula el desvío y avisa la nueva llegada.

**Tecnologías (para entenderlas nosotros, no se lee):**
- **AIS:** el equipo de radio de cada barco que avisa su nombre, posición, rumbo y velocidad. Es lo que usa MarineTraffic.
- **GPS en contenedores:** cada contenedor refrigerado lleva GPS, termómetro y un chip; Maersk lo llama Remote Container Management.
- **Satélites:** llevan los datos desde el medio del océano, donde no hay señal de celular. No son GIS, pero sin ellos no llegaría el dato.
- **Ruteo marítimo:** calcular el mejor camino por mar y cuánto tarda, y cambiarlo si hay un problema.
- **Zonas de riesgo:** una capa del mapa con las zonas peligrosas (guerras, piratas, tormentas) para evitarlas.

*Fuentes (no van en pantalla): Maersk (fundada en 1904; más de 700 barcos a fines de 2025); Remote Container Management (Maersk, lanzado para clientes en 2017: GPS, módem y SIM en cada contenedor refrigerado); gCaptain y Maritime Executive (2024–2026) sobre los desvíos por el Cabo de Buena Esperanza y la vuelta gradual a Suez. "Llega a Rotterdam en 12 días" es un ejemplo. Fotos: Wikimedia Commons.*

---

## Diapositivas 41 a 45 · Caso 05 · Walmart + Wing · Drones

**Tiempo total:** ~1 minuto 30 segundos

*Lo distinto de este caso: la logística **por el aire**. El aire no tiene calles, así que el GIS tiene que dibujar un "mapa del cielo".*

### Diapositiva 41 · Portada
> El último caso es Walmart con Wing. La pregunta: **¿cómo se reparte por el aire?**

### Diapositiva 42 · ¿Quiénes son?
*Fotos del sitio de Wing: un dron con un pedido de Walmart, una tienda Walmart y una persona retirando el paquete en la puerta.*
> **Walmart** es el supermercado más grande del mundo. **Wing** es la empresa de drones de **Alphabet**, la dueña de Google. Juntos reparten pedidos con drones en Estados Unidos. El dron **no aterriza**: baja el paquete **con una cuerda**, en un lugar del tamaño de un mantel de picnic. En 2026 ya superaron el **millón de entregas** a casas.

### Diapositiva 43 · El GIS detrás de cada vuelo
*El recorrido: Pedís · Sale de la tienda · Vuela · Baja con cuerda. Se iluminan las funciones: "Área de cobertura · ¿A qué casas llega cada tienda?" y "Mapa del cielo · ¿Por dónde puede volar el dron?".*
> Detrás de cada vuelo hay **dos funciones de GIS**: el **área de cobertura**, que dice a qué casas llega cada tienda, y el **mapa del cielo**, que dice por dónde puede volar el dron.

### Diapositiva 44 · Función GIS 1 · Área de cobertura
*Animación 3D: varias tiendas, cada una con su círculo y su dron; las casas cubiertas se pintan de verde.*
- **Un círculo por tienda:** el dron va y vuelve, unos 19 km en total (12 millas), a unos 100 km/h. Eso dibuja un círculo alrededor de cada tienda.
- **Casas cubiertas:** en verde, las que pueden recibir en minutos. Con el mapa se ve dónde conviene sumar una tienda nueva. **La tienda se vuelve depósito.**

### Diapositiva 45 · Función GIS 2 · Mapa del cielo
*Animación 3D: el radio de vuelo; se levantan las zonas prohibidas (hospital, aeropuerto); se dibuja la ruta que las esquiva hasta la casa del cliente.*
- **Radio de vuelo:** hasta dónde puede ir el dron desde la tienda.
- **Zonas prohibidas:** encima se cargan las zonas donde no se puede volar, como un hospital o un aeropuerto.
- **La ruta:** el sistema elige solo el camino que las esquiva, hasta el punto exacto del patio. Un piloto controla varios drones a la vez desde una central.

**Tecnologías (para entenderlas nosotros, no se lee):**
- **Área de influencia (buffer):** dibujar todo lo que queda a cierta distancia de un punto; acá, el círculo que cubre cada tienda.
- **Análisis de cobertura:** cruzar ese círculo con las casas para ver cuáles quedan adentro y cuáles afuera.
- **Capas del espacio aéreo:** las zonas del cielo donde se puede o no se puede volar, cargadas como capas del mapa.
- **Ruteo aéreo:** calcular el camino del dron que esquiva esas zonas y otros obstáculos.
- **GPS de precisión:** ubicar el punto exacto del patio donde baja el paquete.

*Fuentes (no van en pantalla): wing.com (/technology, /walmart): hasta 60 mph, 12 millas ida y vuelta, hasta 5 libras, "un espacio del tamaño de un mantel de picnic", un piloto supervisa varios vuelos; noticias de Wing (11/1/2026: 150 tiendas nuevas y más de 270 en 2027; 5/10/2026: casi 20 ciudades; 6/11/2026: más de un millón de entregas a casas en 2026). Fotos: wing.com. La ciudad 3D es ilustrativa.*

---

## Diapositiva 46 · Libros para seguir leyendo

**Tiempo:** ~10 segundos (mostrarla, no leerla)
**En pantalla:** las tapas de los cinco libros, en perspectiva (con un clic se abre el sitio de cada uno). Debajo de cada tapa, para qué sirve.

> Si les interesó, estos libros cubren todo lo que vimos:
- *The Geography of Transport Systems*, de Jean-Paul Rodrigue (6.ª edición, 2024): transporte, puertos y barcos, como Maersk. Su sitio, transportgeography.org, tiene mucho material gratis.
- *Geographic Information Science and Systems*, de Longley, Goodchild, Maguire y Rhind: la base del GIS.
- *Location Science*, de Laporte, Nickel y Saldanha da Gama (2.ª edición, 2019): cómo elegir dónde poner un centro, como Mercado Libre y Walmart.
- *Vehicle Routing*, de Toth y Vigo: la referencia del ruteo, lo que hace ORION.
- *Geographic Data Science with Python*, de Rey, Arribas-Bel y Wolf (2023, gratis online): analizar datos con ubicación, como Uber o Kepler.gl.

*Por qué estos (no se lee): se sacaron *PostGIS in Action* (es de bases de datos, no de los temas de la charla) y *Geocomputation with Python* (se pisaba con el de Rey y otros). Longley no tiene edición más nueva que la 4.ª (2015) y sigue siendo el texto base.*

---

## Diapositiva 47 · Para probar: pruébenlo ustedes

**Tiempo:** ~15 segundos
**En pantalla:** seis tarjetas con las herramientas de la charla y su dirección a la vista (con un clic se abren).

> Y todo lo que mostramos lo pueden probar hoy, gratis:
- **what3words** (what3words.com): busquen ///pasen.sueldos.leyes, la puerta del patio de la UTN.
- **Plus Codes** (maps.google.com/pluscodes): en Google Maps, toquen cualquier punto y aparece su código.
- **MarineTraffic** (marinetraffic.com): los barcos en vivo, por ejemplo en el puerto de Buenos Aires.
- **Kepler.gl** (kepler.gl/demo): carguen un mapa de ejemplo, sin programar.
- **H3 de Uber** (h3geo.org): los hexágonos de Uber, con documentación y ejemplos.
- **OR-Tools** (developers.google.com/optimization): para los que programan, armar rutas con horarios como ORION.

---

## Diapositiva 48 · Los casos en video

**Tiempo:** ~10 segundos (mostrarla, no reproducir salvo que pregunten)
**En pantalla:** *los videos de cuatro casos, separados por tema: **Ubicación** (Mercado Libre), **Demanda** (Uber), **Rutas** (UPS) y **Por el aire** (Walmart + Wing). Maersk todavía no tiene video verificado. Con un clic se abren grandes; se cierran con la cruz, con Esc o tocando afuera.*

> Y acá dejamos los videos de cada caso, por si quieren verlos.

---

## Diapositiva 49 · Muchas gracias

**En pantalla:** solo "MUCHAS GRACIAS" sobre el video del planeta de la portada.

> Muchas gracias.

---

# Apéndice · Casos ocultos (no se presentan)

Estos casos están armados pero **ocultos** para que la expo entre en 15 minutos. Siguen en el código (`src/cases/`) y se vuelven a mostrar cambiando `show: false` por `show: true` en `src/App.tsx` (y quitando `hidden: true` de su tarjeta en `src/sections/cases.tsx`). Los números de diapositiva de abajo son de versiones anteriores, y estos casos todavía usan el formato viejo (pasos con →, problema → solución).

*DHL se sacó porque el desvío de Maersk ya muestra la idea de "un riesgo lejos → plan B"; en su lugar entró Walmart + Wing (drones).*

## Caso oculto · DHL · Riesgos (formato anterior)

**Tiempo total:** ~1 minuto 45 segundos
**Nota:** el ejemplo de los chips de Taiwán es ilustrativo; las capas y el tipo de alerta son los de la herramienta.

### · Portada
> Cerramos con DHL: cómo **ver un problema antes de que llegue**.

### · ¿Quién es?
*Datos: 1969 · +220 países · ~584.000 empleados · € 82.900 M.*
> DHL es una de las **empresas de logística más grandes del mundo**. Nació en San Francisco en 1969 y hoy es alemana. Lleva **paquetes, carga y depósitos de otras empresas** en más de 220 países, con unos 584.000 empleados.

### · ¿Para qué usa el GIS?
*Animación: se apilan proveedores, rutas y riesgos en vivo; aparece "Alerta: riesgo cerca".*
> Usa el GIS para **ver los riesgos en el mapa**. Cruza dónde están los **proveedores y fábricas** de sus clientes, **por dónde van** los barcos y camiones, y una capa de **riesgos en vivo**.

### · ¿Cómo lo hace? · Un problema lejos frena todo
*Animación: chips de Taiwán viajan en barco hasta una fábrica de autos en Alemania · un tifón cierra el puerto · la fábrica cuenta los días hasta que se entera: "Día 10 · ¡línea parada!".*
> Imaginen una fábrica de autos en Alemania que compra **chips en Taiwán**. Un **tifón** cierra el puerto. Si nadie lo mira en el mapa, la fábrica **se entera cuando los chips no llegan**, y para la línea.

### · ¿Cómo lo hace? · Resilience360
*Animación: capa 1, la cadena · capa 2, riesgos en vivo con su radio (tifón, conflicto, inundación, huelga) · el radio del tifón toca al proveedor: "Alerta · día 1" y se dibuja el plan B desde Malasia. Dato: +30 tipos de riesgo.*
> DHL creó **Resilience360**: un mapa con **la cadena de la empresa** y, encima, **más de 30 tipos de riesgo** en vivo: clima, huelgas, conflictos, accidentes. Cada riesgo tiene un **radio de alcance**. Cuando ese radio toca a un proveedor o una ruta, **avisa en el momento** y se puede activar un **plan B**.

### · En su logística
*Animación: dos líneas de tiempo: sin mapa, la alerta llega el día 10; con mapa, el día 1.*
> La diferencia es **cuándo te enterás**: sin el mapa, el día 10; con el mapa, **el día 1**, con tiempo para cambiar de proveedor o de puerto. DHL lo creó en 2014 y hoy sigue como **Everstream Analytics**.

### · Tecnologías
> Mapa de la cadena, capas de riesgo y radio de alcance son GIS; además, programas que leen noticias y clima todo el día.

**Relación con la materia:** el "radio de alcance" es un **área de influencia** (buffer) y el aviso es un **cruce de capas**, como en el video de la diapositiva 2.

*Fuentes (no van en pantalla): DHL (lanzamiento de Resilience360, 2014; Risk Exposure Index con más de 30 categorías de riesgo); DC Velocity y Everstream (Resilience360 y Riskpulse forman Everstream Analytics); caso DuPont. DHL Group: +220 países y territorios, ~584.000 empleados, € 82.900 M de facturación 2025.*

---

*Amazon se sacó para no repetir lo de Mercado Libre y UPS (rutas de reparto en la ciudad); en su lugar entró Maersk (barcos).*

## Caso oculto · Amazon · Última milla (formato anterior)

**Tiempo total:** ~1 minuto 45 segundos
**Nota:** el barrio de la animación es ilustrativo.

### · Portada
> El cuarto caso es Amazon, con **rutas que aprenden de los choferes**.

### · ¿Para qué usa el GIS?
*Animación: se apilan calles, paradas del día y rutas reales de choferes (GPS); aparece "La ruta de un experto".*
> Usa el GIS para armar **la ruta de cada camioneta**. Cruza las **calles**, las **paradas del día** y algo más: las **rutas reales que hicieron sus choferes**, registradas por GPS.

### · ¿Cómo lo hace? · Lo que el mapa no sabe
*Animación: la computadora traza la ruta más corta · aparecen una calle en obra y un lugar sin dónde frenar: la camioneta se demora · el chofer con experiencia toma otra ruta que los esquiva.*
> La computadora traza **la ruta más corta** sobre el mapa. Pero en la calle hay cosas que el mapa no sabe: **obras, lugares donde no se puede frenar**, horarios. Por eso el chofer con experiencia **cambia la ruta**.

### · ¿Cómo lo hace? · Aprender de los choferes
*Animación: se suman miles de rutas reales · la IA marca las calles que más eligen · aparece la ruta nueva. Dato: 2.285 participantes.*
> En 2021 Amazon hizo un desafío con el **MIT**: compartió **más de 4.000 rutas reales** de sus choferes y equipos de todo el mundo entrenaron programas para **predecir la ruta que haría un chofer con experiencia**. Participaron **2.285 personas** y ganó un equipo de la Universidad de Bonn. La ruta nueva es **mapa + experiencia**.

### · En su logística
*Animación: un chofer nuevo con la ruta común se demora · con la ruta aprendida llega a horario.*
> Así, **un chofer nuevo maneja como un experto** desde el primer día.

### · Tecnologías
> Direcciones en el mapa, ruteo y el GPS de las rutas reales son GIS; el aprendizaje automático es lo que aprende de ellas.

*Fuentes (no van en pantalla): MIT CTL y Amazon Science, Amazon Last Mile Routing Research Challenge (2021): +4.000 rutas, 2.285 participantes, premios de US$ 100.000, 50.000 y 25.000, ganó un equipo con la Universidad de Bonn. Amazon (Business Wire, febrero de 2026): +13.000 M de productos en el día o al día siguiente en 2025; +4.000 ciudades chicas y pueblos sumados en EE. UU.*

---

---

## Caso · Tesla · Robotaxis

**Tiempo total:** ~1 minuto 45 segundos
**Estilo:** fondo oscuro con mapa de neón (mapa ilustrativo de Austin, no es la zona real). Cada → hace aparecer el siguiente punto de la tarjeta y cambia el mapa.

### Diapositiva 6 · Portada del caso
*En pantalla: "ROBOTAXIS" grande sobre la geocerca de neón y la pastilla roja "Sin nadie al volante · Austin, Texas".*

> Arrancamos con Tesla. Tesla tiene autos que **manejan solos, sin nadie al volante**, y los usa como taxis en Austin, Texas: los **robotaxis**.
>
> **¿Quién es Tesla?** Una empresa de Estados Unidos que **fabrica autos eléctricos**. Sus autos manejan solos con cámaras e inteligencia artificial.

### Diapositiva 7 · El problema (2 pasos)
*En pantalla: un Model Y rojo, "Asiento del conductor: vacío", y la tarjeta amarilla "Ver no alcanza".*

- **→ 1:** *aparece "Las cámaras ven la calle".*
  > El auto ve la calle con sus cámaras: peatones, semáforos, otros autos.
- **→ 2:** *aparece el signo de pregunta sobre el auto.*
  > Pero **ver no alcanza**: también tiene que saber **por dónde tiene permitido andar**. No todas las calles están probadas para que circule sin chofer.

### Diapositiva 8 · La solución con GIS (3 pasos)
*En pantalla: el mapa de Austin con sus rutas (I-35, MoPac, US-183) y la tarjeta azul "Una geocerca".*

- **→ 1:** *se dibuja la geocerca de neón.*
  > Acá entra el GIS. Tesla dibuja en el mapa una **geocerca**: un **polígono** que marca la zona habilitada.
- **→ 2:** *aparecen pines verdes adentro (UT Austin, Capitolio, Zilker Park).*
  > Si el viaje empieza y termina **adentro**, el auto lo acepta.
- **→ 3:** *aparecen pines grises tachados afuera.*
  > Si el destino queda **afuera**, no lleva al pasajero.

### Diapositiva 9 · En la calle (2 pasos)
*En pantalla: robotaxis (rojos) circulando dentro de la zona y la tarjeta roja "El borde manda".*

- **→ 1:** *un auto va hasta el borde, la geocerca se pone roja: "Fuera de zona · No sigue".*
  > Cuando un auto llega al borde, **no sigue**. El polígono del mapa es el que decide.
- **→ 2:** *la geocerca se agranda: "La zona crece".*
  > Y cuando Tesla quiere sumar barrios, lo que hace es **agrandar el polígono** en el mapa.
- **El dato** *(abajo a la izquierda: ~290 mi²)*: > La zona de Austin ya mide **unas 290 millas cuadradas**; un año antes eran 170. Hoy los robotaxis andan sin chofer en Austin, Dallas, Houston y Miami, y ya hicieron más de 3 millones de millas.

### Diapositiva 10 · ¿Y en logística? (2 pasos)
*En pantalla: la misma zona con camiones y la tarjeta verde "La misma herramienta".*

- **→ 1:** *la zona se divide en tres zonas de reparto de colores, cada una con su camión.*
  > ¿Por qué esto es GIS en logística? Porque es **la misma herramienta** que usan las empresas de reparto: cada camión tiene **su zona** dibujada en el mapa.
- **→ 2:** *un camión sale de su zona y aparece "¡Alerta! Camión fuera de su zona".*
  > Y si un camión **sale de su recorrido**, salta una **alerta**. El robotaxi es el ejemplo más llamativo, pero la idea sirve para cualquier flota.

### Diapositiva 11 · Tecnologías (pasos = una tarjeta por tecnología)
*En pantalla: Geocerca (GIS) · GPS + mapa (GIS) · Cámaras · Inteligencia artificial. Las que tienen la marca azul "GIS" son tecnologías del mundo de los mapas.*

> Estas son las tecnologías del caso. Las marcadas como **GIS** son del mundo de los mapas: la **geocerca**, que es el polígono de la zona, y el **GPS sobre el mapa**, que dice dónde está el auto. Las otras dos, las **cámaras** y la **inteligencia artificial**, son las que le permiten manejar.


*Fuentes (no van en pantalla): Electrek, Teslarati, Wikipedia "Tesla Robotaxi" (2026). Son cifras no oficiales.*

**Para recordar:**
- **Geocerca** = un polígono en el mapa que marca dónde se puede (o no se puede) circular.
- El auto **ve** con cámaras, pero **sabe dónde puede andar** gracias al mapa.
- En logística: zonas de reparto por camión + alertas si sale de su zona.

**Si nos preguntan:**
- *¿Y el FSD (Full Self-Driving) que tienen los Tesla en todo el mundo?* El FSD maneja con cámaras y necesita un conductor atento. El robotaxi va **sin nadie al volante**, y por eso Tesla lo limita a una zona del mapa.
- *¿Ese es el mapa real?* No: es un mapa ilustrativo de Austin. La zona real se ve en la app de Tesla y va cambiando.

---

## Caso · Starlink + Geotab · Sin señal

**Tiempo total:** ~1 minuto 45 segundos
**Estilo:** mapa del norte argentino en neón y una vista de costado con el satélite. Geotab es la empresa líder en rastreo de flotas; Starlink es la red de satélites de SpaceX.

### Diapositiva 18 · Portada del caso
*En pantalla: "SIN SEÑAL" sobre el globo con satélites.*

> El tercer caso junta a dos empresas: **Geotab**, que rastrea camiones de empresas de todo el mundo, y **Starlink**, la red de satélites de SpaceX. El problema que resuelven: **¿qué pasa cuando el camión se queda sin señal?**
>
> **¿Quiénes son?** **Starlink** es la red de internet por satélite de SpaceX, la empresa de Elon Musk. **Geotab** es una empresa canadiense que rastrea flotas: pone un equipo en cada camión que avisa dónde está y cómo va.

### Diapositiva 19 · El problema (2 pasos)
*En pantalla: el norte argentino; en azul, las zonas con señal de celular alrededor de las ciudades.*
- **→ 1:** *un camión sale de Resistencia hacia Salta y se ve en el mapa: "Camión en el mapa".*
  > El GPS sabe dónde está el camión, pero **para avisarlo necesita señal de celular**.
- **→ 2:** *el camión entra al Impenetrable, donde no hay señal: queda un "?" gris y "Sin señal: desapareció del mapa".*
  > En el Impenetrable chaqueño, o en la Patagonia, **no hay señal**. Y el camión **desaparece del mapa**: la empresa no sabe dónde está su carga.
- **El dato** *(abajo a la izquierda: 18 %)*: > Para dimensionarlo: en Canadá **solo el 18 % del territorio tiene señal de celular**. Argentina, con sus distancias, tiene el mismo desafío.

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


**Para recordar:**
- El GPS **sabe** dónde está el camión; el problema es **avisarlo** sin señal.
- El satélite es el "mensajero" cuando no hay antenas.
- En logística: **ver toda la flota, siempre**, sin puntos ciegos.

*Fuentes (no van en pantalla): Geotab, comunicado "GO Anywhere" (Geotab Connect, febrero de 2026); TruckNews y Transport Topics (2026); KeepTrack (satélites Starlink en órbita, 2026); Rogers (cobertura celular en Canadá, febrero de 2026).*

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
