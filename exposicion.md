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
| Caso 01 · Mercado Libre | 20 a 26 | ~1 min 45 s |
| Caso 02 · Uber | 27 a 32 | ~1 min 30 s |
| Caso 03 · UPS | 33 a 39 | ~1 min 45 s |
| Caso 04 · Amazon | 40 a 46 | ~1 min 45 s |
| Caso 05 · DHL | 47 a 53 | ~1 min 45 s |
| Lo que viene | 54 | ~45 s |
| Libros · Para hacer · Videos · Gracias | 55 a 58 | ~30 s |
| **Total** | **58** | **~16 min 20 s** |

**Ojo con el tiempo:** con las cuatro herramientas la expo pasa los 15 minutos. Para entrar: cada diapositiva de herramienta en ~15 s, y "Lo que viene" con 3 tarjetas.

**Cómo funciona ahora la presentación:** las animaciones **corren solas, en bucle**; no hay que apretar nada para que avancen. Con → se pasa directo a la diapositiva siguiente. A la izquierda está lo necesario para guiarnos (no todo lo que se dice) y se resalta el punto que corresponde a lo que se ve. Los videos están todos juntos en la diapositiva 57.

**Para llegar con margen:** las diapositivas de **Tecnologías** se pasan en ~5 segundos ("las azules son GIS"), y "Lo que viene" se puede contar con solo 3 tarjetas. Ensayar con cronómetro: está justo.

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
**En pantalla:** *la pantalla de Kepler.gl: a la izquierda, datos y capas; a la derecha, el mapa de la bahía de San Francisco.*

> **Kepler.gl** es una herramienta **gratis y de código abierto** que **creó Uber** y liberó en **2018**. Se abre en el navegador y sirve para ver **millones de datos con ubicación** —viajes, pedidos, camiones— en un mapa, **sin programar**.

## Diapositiva 17 · Kepler.gl · ¿Cómo funciona?

**Tiempo:** ~25 segundos
**En pantalla:** *una capa de hexágonos en 3D y columnas sobre la bahía de San Francisco.*

- **Cargás los datos:** se arrastra un archivo **CSV o GeoJSON** con latitud y longitud.
- **Elegís una capa:** puntos, arcos, hexágonos, mapa de calor, H3 o viajes animados.
- **Filtrás y reproducís:** por hora, por día o por tipo, y se ve cómo cambia en el tiempo.
- **Exportás:** una imagen, un video o el mapa para compartir.

## Diapositiva 18 · Kepler.gl · ¿Para qué sirve?

**Tiempo:** ~25 segundos
**En pantalla:** *arcos de viajes de Manhattan a los aeropuertos de Nueva York, viajes animados por las calles y hexágonos en 3D.*

- **Dónde hay más pedidos:** los hexágonos muestran las zonas calientes de la ciudad.
- **De dónde a dónde:** los arcos unen el origen y el destino de cada envío o viaje.
- **Cómo se mueve la flota:** los viajes animados muestran el recorrido de cada vehículo a lo largo del día.
- **Quién lo usa:** Uber lo usa en sus propios tableros, y cualquiera lo puede usar gratis.

*Fuentes (no van en pantalla): blog de Uber Engineering (lanzamiento, mayo de 2018), docs.kepler.gl y el repositorio en GitHub (licencia MIT, tipos de capa, imágenes).*

---

## Diapositiva 19 · Los casos que vamos a ver

**Tiempo:** ~20 segundos
**En pantalla:** *cinco tarjetas con el logo de cada empresa.*

| # | Empresa | Para qué usa el GIS |
|---|---|---|
| 01 | Mercado Libre | Decidir dónde guardar (ubicación) |
| 02 | Uber | Medir la ciudad en hexágonos (demanda) |
| 03 | UPS | El orden de las paradas (rutas) |
| 04 | Amazon | Rutas que aprenden de los choferes (última milla) |
| 05 | DHL | Ver los riesgos antes de que lleguen (riesgos) |

> Ahora, cinco empresas y cómo cada una usa el GIS en su logística: **dónde guardar, dónde hace falta gente, en qué orden repartir, cómo aprender de los choferes y cómo ver los problemas antes de que lleguen**.

**Cómo está armado cada caso:** portada · **¿Quién es?** · **¿Para qué usa el GIS?** (las capas que cruza, como en el video de la diapositiva 2) · **¿Cómo lo hace?** · **En su logística** · Tecnologías (se pasa en 5 segundos: "las azules son GIS").

---

## Diapositivas 20 a 26 · Caso 01 · Mercado Libre · Depósitos

**Tiempo total:** ~1 minuto 45 segundos

### Diapositiva 20 · Portada
> Arrancamos con Mercado Libre. La pregunta es: **¿dónde conviene guardar los productos?**

### Diapositiva 21 · ¿Quién es?
*Datos: 1999 · 18 países · +100.000 m² en Escobar · red propia.*
> Mercado Libre es la **tienda online más grande de Latinoamérica**. Nació en Buenos Aires en 1999 y hoy está en 18 países. Además de la tienda tiene Mercado Pago y **Mercado Envíos**: casi todo lo que vende viaja por **su propia red**, con depósitos, camiones, aviones y repartidores. Su centro de Escobar tiene más de 100.000 m².

### Diapositiva 22 · ¿Para qué usa el GIS?
*Animación: se apilan las capas compradores, rutas y tiempo de viaje; se juntan y aparece "Acá va el depósito".*
> Usa el GIS para **elegir dónde guardar**. Cruza tres capas: **dónde están los compradores**, **por dónde van las rutas** y **hasta dónde se llega en un tiempo de viaje**. Del cruce sale la decisión: **dónde va cada depósito**.

### Diapositiva 23 · ¿Cómo lo hace? · El mejor lugar
*Animación: el mapa de Argentina; crecen las ciudades (compradores), aparecen círculos de "un día de camión" y gana Córdoba.*
> Primero mira **dónde están los compradores**. Después marca **hasta dónde llega un camión en un día** desde cada lugar posible. Y elige el que deja **más compradores cerca**: en el ejemplo, Córdoba, donde Mercado Libre anunció su próximo centro.

### Diapositiva 24 · ¿Cómo lo hace? · Tiempo, no distancia
*Animación: un círculo de misma distancia se transforma en una estrella que se estira por las rutas.*
> Lo que importa no es la distancia sino **el tiempo**. Por la ruta el camión va más rápido, así que lo que se alcanza en un día **se estira por las rutas**. En GIS eso se llama **isócrona**.

### Diapositiva 25 · En su logística
*Animación: del centro grande salen líneas a los centros regionales, y de cada uno, los repartos del día. Dato: US$ 3.400 M.*
> Así arma una **red**: un centro grande abastece a centros regionales, y de cada uno salen **los repartos del día**. Este año Mercado Libre invierte **US$ 3.400 millones en Argentina**, sobre todo en logística.

### Diapositiva 26 · Tecnologías
> Análisis de ubicación, isócronas y ruteo son GIS; la IA predice qué se va a comprar y dónde.

*Fuentes (no van en pantalla): DolarHoy, El Economista, The Logistics World (2026): centro de Escobar (+100.000 m², 130.000 productos por día), inversión de US$ 3.400 M en 2026, centro de Córdoba.*

---

## Diapositivas 27 a 32 · Caso 02 · Uber · Hexágonos

**Tiempo total:** ~1 minuto 30 segundos

### Diapositiva 27 · Portada
> El segundo caso es Uber, que partió las ciudades en **hexágonos**.

### Diapositiva 28 · ¿Quién es?
*Datos: 2009 · +70 países · +40 M de viajes y pedidos por día · H3 gratis.*
> Uber nació en San Francisco en 2009. Es la app para pedir **viajes con chofer**, pero también reparte comida y compras con **Uber Eats** y conecta camiones con cargas con **Uber Freight**. A fines de 2025 hacía **más de 40 millones de viajes y pedidos por día** en más de 70 países.

### Diapositiva 29 · ¿Para qué usa el GIS?
*Animación: se apilan pedidos, repartidores y hexágonos H3; se juntan y aparece "Faltan repartidores acá".*
> Usa el GIS para **saber dónde falta gente**. Cruza **dónde están los pedidos**, **dónde están los repartidores y autos libres**, y los cuenta en **hexágonos iguales**. Así decide **a dónde mandar repartidores**.

### Diapositiva 30 · ¿Cómo lo hace? · Todo en hexágonos
*Animación 3D: la ciudad en hexágonos; la altura es la cantidad de pedidos; donde faltan autos se pone rojo.*
> Uber cubre la ciudad con **hexágonos iguales**, cada uno con su código; ese sistema se llama **H3**. Cada hexágono **cuenta sus pedidos**: la altura es la demanda. Donde hay muchos pedidos y pocos autos, se pone rojo y **sube el precio**, para que vayan más autos ahí.
>
> ¿Por qué hexágonos y no barrios? Porque los barrios tienen tamaños distintos y no se pueden comparar; los hexágonos son todos iguales.

### Diapositiva 31 · En su logística
*Animación: un local y los hexágonos alrededor con su tiempo de entrega.*
> En el reparto, cada hexágono tiene su **tiempo de entrega** desde el local, y con eso se define **hasta dónde reparte** cada uno.

### Diapositiva 32 · Tecnologías
> H3 y la ubicación en vivo son GIS; el precio dinámico es la regla de negocio.

*Fuentes (no van en pantalla): Uber Engineering (H3, liberado en 2018); resultados de Uber del cuarto trimestre de 2025 (más de 40 millones de viajes por día; 13.567 millones en el año).*

---

## Diapositivas 33 a 39 · Caso 03 · UPS · ORION · Rutas

**Tiempo total:** ~1 minuto 45 segundos

### Diapositiva 33 · Portada
> El tercer caso es UPS y su sistema **ORION**, que elige **el mejor orden de paradas** para cada camión.

### Diapositiva 34 · ¿Quién es?
*Datos: 1907 · 20,8 M de paquetes por día · +200 países · ~460.000 empleados.*
> UPS es una de las **paqueterías más grandes del mundo**, de Estados Unidos; la de los camiones marrones. Nació en Seattle en 1907 y en 2025 entregó **20,8 millones de paquetes por día** en más de 200 países.

### Diapositiva 35 · ¿Para qué usa el GIS?
*Animación: se apilan calles, paradas del día y camiones con GPS; aparece "El mejor orden".*
> Usa el GIS para decidir **en qué orden ir**. Cruza el **mapa de calles con sus sentidos**, las **paradas del día** y la **posición de cada camión**.

### Diapositiva 36 · ¿Cómo lo hace? · ORION
*Animación: nuestro video de ORION: "a ojo" contra ORION, el mismo camión y las mismas paradas. Dato: US$ 50 M.*
> Cada chofer hace **unas 120 paradas por día**, y con 120 paradas hay **más órdenes posibles que átomos en el universo**: nadie puede elegir a ojo. ORION prueba **millones de órdenes sobre el mapa de calles** y se queda con el más corto. Con solo **una milla menos por chofer por día**, UPS ahorra **US$ 50 millones por año**.

### Diapositiva 37 · Lo probamos en Resistencia
*Animación: 14 paradas en calles reales; "a ojo" 55,6 km; optimizado 41,1 km.*
> Lo probamos nosotros con calles reales de Resistencia: el orden "a ojo" suma **55,6 km**; optimizado, **41,1 km**. **Un 26 % menos**, con el mismo camión y las mismas paradas.

### Diapositiva 38 · En su logística
*Animación: entra un pedido nuevo y la ruta se recalcula.*
> Si a media mañana entra **un pedido nuevo**, ORION **recalcula la ruta en segundos**.

### Diapositiva 39 · Tecnologías
> Este caso es todo GIS: mapa de calles, direcciones en el mapa, optimización de rutas y GPS.

*Fuentes (no van en pantalla): UPS e INFORMS (premio Franz Edelman 2016): 1 milla menos por chofer por día ≈ US$ 50 M por año. Informe anual y ficha de UPS 2025: 20,8 M de paquetes por día, +200 países, ~460.000 empleados. La prueba de Resistencia es nuestra (OSRM sobre OpenStreetMap; los comercios son de ejemplo).*

---

## Diapositivas 40 a 46 · Caso 04 · Amazon · Última milla

**Tiempo total:** ~1 minuto 45 segundos
**Nota:** el barrio de la animación es ilustrativo.

### Diapositiva 40 · Portada
> El cuarto caso es Amazon, con **rutas que aprenden de los choferes**.

### Diapositiva 41 · ¿Quién es?
*Datos: 1994 · +13.000 M de productos en el día o al día siguiente (2025) · red propia · +4.000 pueblos sumados.*
> Amazon es la **tienda online más grande del mundo**; nació en Seattle en 1994. Reparte con **su propia red**: depósitos, camionetas y hasta aviones. En 2025 entregó **más de 13.000 millones de productos en el día o al día siguiente**.

### Diapositiva 42 · ¿Para qué usa el GIS?
*Animación: se apilan calles, paradas del día y rutas reales de choferes (GPS); aparece "La ruta de un experto".*
> Usa el GIS para armar **la ruta de cada camioneta**. Cruza las **calles**, las **paradas del día** y algo más: las **rutas reales que hicieron sus choferes**, registradas por GPS.

### Diapositiva 43 · ¿Cómo lo hace? · Lo que el mapa no sabe
*Animación: la computadora traza la ruta más corta · aparecen una calle en obra y un lugar sin dónde frenar: la camioneta se demora · el chofer con experiencia toma otra ruta que los esquiva.*
> La computadora traza **la ruta más corta** sobre el mapa. Pero en la calle hay cosas que el mapa no sabe: **obras, lugares donde no se puede frenar**, horarios. Por eso el chofer con experiencia **cambia la ruta**.

### Diapositiva 44 · ¿Cómo lo hace? · Aprender de los choferes
*Animación: se suman miles de rutas reales · la IA marca las calles que más eligen · aparece la ruta nueva. Dato: 2.285 participantes.*
> En 2021 Amazon hizo un desafío con el **MIT**: compartió **más de 4.000 rutas reales** de sus choferes y equipos de todo el mundo entrenaron programas para **predecir la ruta que haría un chofer con experiencia**. Participaron **2.285 personas** y ganó un equipo de la Universidad de Bonn. La ruta nueva es **mapa + experiencia**.

### Diapositiva 45 · En su logística
*Animación: un chofer nuevo con la ruta común se demora · con la ruta aprendida llega a horario.*
> Así, **un chofer nuevo maneja como un experto** desde el primer día.

### Diapositiva 46 · Tecnologías
> Direcciones en el mapa, ruteo y el GPS de las rutas reales son GIS; el aprendizaje automático es lo que aprende de ellas.

*Fuentes (no van en pantalla): MIT CTL y Amazon Science, Amazon Last Mile Routing Research Challenge (2021): +4.000 rutas, 2.285 participantes, premios de US$ 100.000, 50.000 y 25.000, ganó un equipo con la Universidad de Bonn. Amazon (Business Wire, febrero de 2026): +13.000 M de productos en el día o al día siguiente en 2025; +4.000 ciudades chicas y pueblos sumados en EE. UU.*

---

## Diapositivas 47 a 53 · Caso 05 · DHL · Riesgos

**Tiempo total:** ~1 minuto 45 segundos
**Nota:** el ejemplo de los chips de Taiwán es ilustrativo; las capas y el tipo de alerta son los de la herramienta.

### Diapositiva 47 · Portada
> Cerramos con DHL: cómo **ver un problema antes de que llegue**.

### Diapositiva 48 · ¿Quién es?
*Datos: 1969 · +220 países · ~584.000 empleados · € 82.900 M.*
> DHL es una de las **empresas de logística más grandes del mundo**. Nació en San Francisco en 1969 y hoy es alemana. Lleva **paquetes, carga y depósitos de otras empresas** en más de 220 países, con unos 584.000 empleados.

### Diapositiva 49 · ¿Para qué usa el GIS?
*Animación: se apilan proveedores, rutas y riesgos en vivo; aparece "Alerta: riesgo cerca".*
> Usa el GIS para **ver los riesgos en el mapa**. Cruza dónde están los **proveedores y fábricas** de sus clientes, **por dónde van** los barcos y camiones, y una capa de **riesgos en vivo**.

### Diapositiva 50 · ¿Cómo lo hace? · Un problema lejos frena todo
*Animación: chips de Taiwán viajan en barco hasta una fábrica de autos en Alemania · un tifón cierra el puerto · la fábrica cuenta los días hasta que se entera: "Día 10 · ¡línea parada!".*
> Imaginen una fábrica de autos en Alemania que compra **chips en Taiwán**. Un **tifón** cierra el puerto. Si nadie lo mira en el mapa, la fábrica **se entera cuando los chips no llegan**, y para la línea.

### Diapositiva 51 · ¿Cómo lo hace? · Resilience360
*Animación: capa 1, la cadena · capa 2, riesgos en vivo con su radio (tifón, conflicto, inundación, huelga) · el radio del tifón toca al proveedor: "Alerta · día 1" y se dibuja el plan B desde Malasia. Dato: +30 tipos de riesgo.*
> DHL creó **Resilience360**: un mapa con **la cadena de la empresa** y, encima, **más de 30 tipos de riesgo** en vivo: clima, huelgas, conflictos, accidentes. Cada riesgo tiene un **radio de alcance**. Cuando ese radio toca a un proveedor o una ruta, **avisa en el momento** y se puede activar un **plan B**.

### Diapositiva 52 · En su logística
*Animación: dos líneas de tiempo: sin mapa, la alerta llega el día 10; con mapa, el día 1.*
> La diferencia es **cuándo te enterás**: sin el mapa, el día 10; con el mapa, **el día 1**, con tiempo para cambiar de proveedor o de puerto. DHL lo creó en 2014 y hoy sigue como **Everstream Analytics**.

### Diapositiva 53 · Tecnologías
> Mapa de la cadena, capas de riesgo y radio de alcance son GIS; además, programas que leen noticias y clima todo el día.

**Relación con la materia:** el "radio de alcance" es un **área de influencia** (buffer) y el aviso es un **cruce de capas**, como en el video de la diapositiva 2.

*Fuentes (no van en pantalla): DHL (lanzamiento de Resilience360, 2014; Risk Exposure Index con más de 30 categorías de riesgo); DC Velocity y Everstream (Resilience360 y Riskpulse forman Everstream Analytics); caso DuPont. DHL Group: +220 países y territorios, ~584.000 empleados, € 82.900 M de facturación 2025.*

---

## Diapositiva 54 · Lo que viene: tecnologías nuevas en GIS y logística

**Tiempo:** ~1 minuto 30 segundos
**En pantalla:** seis tarjetas, todas a la vista. Son **solo tecnologías nuevas** que no vimos en los casos (GPS, geocercas, H3, satélites, drones, isócronas, ruteo y cámaras ya se contaron).

> Todo lo que vimos ya funciona. Esto es lo que está saliendo ahora (si estamos justos de tiempo, contar solo 3: camiones sin chofer, robots de vereda y gemelos digitales).

- **→ 1 · Gemelos digitales.** > Una copia del depósito o del puerto en la computadora, que se mueve igual que el real. Por ejemplo, DSV armó una de su depósito en Singapur este año. Sirve para probar cambios antes de hacerlos.
- **→ 2 · Camiones sin chofer.** > Lo mismo que vimos con Tesla, pero con camiones de carga. Aurora ya los usa en rutas de Texas y apunta a más de 200 camiones a fines de 2026. Funcionan sobre mapas muy detallados de cada ruta.
- **→ 3 · Robots de vereda.** > Robots que llevan el pedido las últimas cuadras, por la vereda. Serve Robotics tiene más de 2.000, trabajando con Uber Eats.
- **→ 4 · IA agéntica.** > Programas que ven un problema, como un corte de ruta o un puerto cerrado, y **replanifican solos**. Gartner proyecta que la inversión se multiplique por 25 entre 2025 y 2030.
- **→ 5 · Ruteo conversacional.** > En vez de mirar tablas, se le pregunta al mapa en palabras: "¿por qué llegamos tarde al norte?".
- **→ 6 · Mapas abiertos.** > Mapas gratis y de calidad, armados entre empresas como Amazon, Meta, Microsoft y TomTom: Overture Maps, que ya suma 50 miembros.

*Fuentes (no van en pantalla): IMDA Singapur, enero de 2026 (gemelo digital 5G de DSV); FreightWaves, Supply Chain 247 y Dallas Innovates (Aurora: rutas Dallas–Houston y Fort Worth–El Paso, meta de más de 200 camiones a fines de 2026; es una meta de la empresa); The Robot Report y QSR Magazine (Serve Robotics, más de 2.000 robots, diciembre de 2025); proyección de Gartner (IA agéntica); Aptean, octubre de 2026 (ruteo conversacional); Linux Foundation, julio de 2026 (Overture Maps).*

---

## Diapositiva 55 · Libros para seguir leyendo

**Tiempo:** ~10 segundos (mostrarla, no leerla)
**En pantalla:** las tapas reales de los cinco libros, en perspectiva (al pasar el cursor se enderezan; con un clic se abre el sitio de cada uno).

> Si les interesó, estos son los libros que usamos para preparar la charla:
- *The Geography of Transport Systems*, de Jean-Paul Rodrigue (gratis online).
- *Geographic Information Science and Systems*, de Longley, Goodchild, Maguire y Rhind.
- *Vehicle Routing*, de Toth y Vigo: la referencia del problema de ruteo.
- *PostGIS in Action*, de Obe y Hsu.
- *Geocomputation with Python*, de Dorman, Graser, Nowosad y Lovelace (gratis online).

---

## Diapositiva 56 · Para hacer: herramientas gratis para practicar

**Tiempo:** ~10 segundos (mostrarla, no leerla)
**En pantalla:** cinco tarjetas con herramientas gratuitas (con un clic se abre cada una).

> Y si quieren probarlo con las manos, todo esto es gratis:
- **Workshop de pgRouting:** para aprender a calcular rutas dentro de una base de datos.
- **OSRM:** el motor de ruteo sobre OpenStreetMap; **con él calculamos las rutas de Resistencia** que mostramos.
- **VROOM:** un optimizador de rutas, lo mismo que hace ORION.
- **OR-Tools:** la librería de Google para rutas con capacidades y horarios.
- **H3:** los hexágonos de Uber, gratis para cualquier proyecto.

---

## Diapositiva 57 · Los casos en video

**Tiempo:** ~10 segundos (mostrarla, no reproducir salvo que pregunten)
**En pantalla:** *los videos de los cinco casos, separados por tema: **Ubicación** (Mercado Libre), **Demanda** (Uber), **Rutas** (UPS), **Última milla** (Amazon) y **Riesgos** (DHL). Con un clic se abren grandes; se cierran con la cruz, con Esc o tocando afuera.*

> Y acá dejamos los videos de cada caso, por si quieren verlos.

---

## Diapositiva 58 · Muchas gracias

**En pantalla:** solo "MUCHAS GRACIAS" sobre el video del planeta de la portada.

> Muchas gracias.

---

# Apéndice · Casos ocultos (no se presentan)

Estos casos están armados pero **ocultos** para que la expo entre en 15 minutos. Siguen en el código (`src/cases/`) y se vuelven a mostrar cambiando `show: false` por `show: true` en `src/App.tsx` (y quitando `hidden: true` de su tarjeta en `src/sections/cases.tsx`). Los números de diapositiva de abajo son de versiones anteriores, y estos casos todavía usan el formato viejo (pasos con →, problema → solución).

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
