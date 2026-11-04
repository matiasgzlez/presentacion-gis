import { useRef } from "react";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { THREE, useThreeScene } from "@/lib/three";

/* Caso Walmart + Wing: entregas con drones, en 3D. Mismo criterio que Uber: todo mate, solo las luces brillan un poco.
   intro     · un dron da vueltas sobre la ciudad
   problema  · 1 un camión atascado en el tránsito · 2 el cielo tiene zonas prohibidas (¿por dónde vuela?)
   solucion  · 1 el radio de entrega de la tienda · 2 las zonas prohibidas · 3 el dron vuela esquivándolas hasta la casa
   entrega   · 1 el dron llega sobre el patio · 2 baja el paquete con una cuerda en el punto marcado
   logistica · 1 varias tiendas, cada una con su radio · 2 las casas cubiertas se pintan de verde */

export type DroneMode = "intro" | "problema" | "solucion" | "entrega" | "logistica";

const BG = 0x0e131c, BLUE = 0x3b82f6, RED = 0xef4444, GREEN = 0x22c55e, AMBER = 0xf5b31b, WALMART = 0x0153e3;
const STORE = new THREE.Vector3(-8, 0, -6);
const HOSPITAL = new THREE.Vector3(0, 0, 0);
const AIRPORT = new THREE.Vector3(10.5, 0, -9);
const HOUSE = new THREE.Vector3(7.2, 0, 7.2);
const DROP = new THREE.Vector3(7.2, 0, 8.05);                 // el punto del patio donde baja el paquete
const STORES = [new THREE.Vector3(-8, 0, -6), new THREE.Vector3(6, 0, -4), new THREE.Vector3(-6, 0, 7), new THREE.Vector3(9, 0, 9), new THREE.Vector3(0, 0, -11)];

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (u: number) => { const k = clamp(u); return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
const out = (u: number) => 1 - Math.pow(1 - clamp(u), 3);

function makeDrone() {
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xe8ebf0, roughness: 0.45, metalness: 0.15 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, 0.42, 4, 10).rotateZ(Math.PI / 2), white);
  const wing = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.025, 1.1), white);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.02).translate(-0.3, 0.1, 0), white);
  const booms = new THREE.Mesh(mergeGeometries([0.36, -0.36].map((z) => new THREE.BoxGeometry(0.9, 0.035, 0.035).translate(0, 0, z)))!, dark);
  g.add(body, wing, tail, booms);
  const rotors: THREE.Mesh[] = [];
  const rotorMat = new THREE.MeshBasicMaterial({ color: 0x9ca3af, transparent: true, opacity: 0.35, depthWrite: false });
  for (const [x, z] of [[0.42, 0.36], [0.42, -0.36], [-0.42, 0.36], [-0.42, -0.36]]) {
    const r = new THREE.Mesh(new THREE.CircleGeometry(0.17, 20).rotateX(-Math.PI / 2), rotorMat);
    r.position.set(x, 0.05, z); rotors.push(r); g.add(r);
  }
  // luces de navegación: lo único que brilla
  const nav = (c: THREE.Color, z: number) => { const m = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), new THREE.MeshBasicMaterial({ color: c })); m.position.set(0, 0, z); g.add(m); };
  nav(new THREE.Color(0.3, 2.6, 0.6), 0.56); nav(new THREE.Color(2.6, 0.25, 0.2), -0.56);
  const pkg = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.22), new THREE.MeshStandardMaterial({ color: 0xc9a46b, roughness: 0.9 }));
  pkg.position.y = -0.2; g.add(pkg);
  // la cuerda: un cilindro finito de 1 de alto, colgado desde el dron; se estira con scale.y
  const tether = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1, 6).translate(0, -0.5, 0), new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.5 }));
  tether.position.y = -0.05; g.add(tether);
  return { g, rotors, pkg, tether };
}

function noFly(r: number) {
  const g = new THREE.Group();
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 7, 48, 1, true), new THREE.MeshBasicMaterial({ color: RED, transparent: true, opacity: 0.13, side: THREE.DoubleSide, depthWrite: false }));
  wall.position.y = 3.5;
  const ringMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(RED).multiplyScalar(1.6), transparent: true, opacity: 0.9 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(r - 0.06, r, 64).rotateX(-Math.PI / 2), ringMat); ring.position.y = 0.03;
  const top = new THREE.Mesh(new THREE.RingGeometry(r - 0.05, r, 64).rotateX(-Math.PI / 2), ringMat); top.position.y = 7;
  g.add(wall, ring, top);
  return g;
}

function ring(r: number, color: number) {
  const g = new THREE.Group();
  const line = new THREE.Mesh(new THREE.RingGeometry(r - 0.16, r, 96).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(1.5), transparent: true, opacity: 0.95 }));
  const fill = new THREE.Mesh(new THREE.CircleGeometry(r, 96).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1, depthWrite: false }));
  line.position.y = 0.04; fill.position.y = 0.02;
  g.add(fill, line);
  return g;
}

export function DroneScene({ mode, step = 0 }: { mode: DroneMode; step?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  useThreeScene(
    ref,
    ({ scene, camera, el }) => {
      scene.background = new THREE.Color(BG);
      scene.fog = new THREE.Fog(BG, 30, 70);
      scene.add(new THREE.HemisphereLight(0xbcd3ff, 0x1a2030, 1.15));
      const sun = new THREE.DirectionalLight(0xfff4e6, 1.9); sun.position.set(-10, 22, 14); scene.add(sun);
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(80, 80).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x182134, roughness: 1 }));
      scene.add(ground);

      // ── ciudad: edificios en el centro, casas en los barrios
      const rnd = (() => { let s = 11; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
      const towers: THREE.Matrix4[] = [], homes: THREE.Vector3[] = [];
      for (let i = -5; i <= 5; i++) for (let j = -5; j <= 5; j++) {
        const x = i * 3.2, z = j * 3.2, p = new THREE.Vector3(x, 0, z);
        if (p.distanceTo(STORE) < 3.6 || p.distanceTo(HOSPITAL) < 1 || p.distanceTo(AIRPORT) < 5 || Math.abs(x) > 14 || Math.abs(z) > 14) continue;
        const suburb = (x > 1.6 && z > 1.6) || (x < -3 && z > 3) || mode === "logistica";
        if (suburb) {
          for (const [dx, dz] of [[-0.8, -0.8], [0.8, -0.8], [-0.8, 0.8], [0.8, 0.8]]) homes.push(new THREE.Vector3(x + dx, 0, z + dz));
        } else {
          const h = 0.5 + rnd() * (Math.abs(x) < 7 && Math.abs(z) < 7 ? 1.5 : 0.8);
          towers.push(new THREE.Matrix4().compose(new THREE.Vector3(x, h / 2, z), new THREE.Quaternion(), new THREE.Vector3(2.2, h, 2.2)));
        }
      }
      const towerMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x3a465c, roughness: 0.8 }), towers.length);
      towers.forEach((m, i) => towerMesh.setMatrixAt(i, m)); scene.add(towerMesh);
      const homeGeo = mergeGeometries([new THREE.BoxGeometry(0.9, 0.55, 0.9).translate(0, 0.275, 0), new THREE.ConeGeometry(0.72, 0.4, 4).rotateY(Math.PI / 4).translate(0, 0.75, 0)])!;
      const homeMesh = new THREE.InstancedMesh(homeGeo, new THREE.MeshStandardMaterial({ roughness: 0.8 }), homes.length);
      const homeBase = new THREE.Color(0x6b7790), homeOn = new THREE.Color(GREEN), homeMine = new THREE.Color(AMBER);
      homes.forEach((p, i) => { homeMesh.setMatrixAt(i, new THREE.Matrix4().makeTranslation(p.x, 0, p.z)); homeMesh.setColorAt(i, mode !== "logistica" && mode !== "intro" && p.distanceTo(HOUSE) < 0.2 ? homeMine : homeBase); });
      scene.add(homeMesh);

      // hospital (centro) y aeropuerto
      const hosp = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 2.4).translate(0, 0.8, 0), new THREE.MeshStandardMaterial({ color: 0xd8dde6, roughness: 0.7 }));
      const cross = new THREE.Mesh(mergeGeometries([new THREE.BoxGeometry(0.9, 0.02, 0.28), new THREE.BoxGeometry(0.28, 0.02, 0.9)])!.translate(0, 1.62, 0), new THREE.MeshStandardMaterial({ color: RED }));
      hosp.add(cross); hosp.position.copy(HOSPITAL); if (mode !== "entrega") scene.add(hosp);
      const runway = new THREE.Mesh(new THREE.PlaneGeometry(9, 1.4).rotateX(-Math.PI / 2).rotateY(0.5), new THREE.MeshStandardMaterial({ color: 0x2b3446, roughness: 1 }));
      runway.position.set(AIRPORT.x, 0.02, AIRPORT.z); scene.add(runway);

      // tiendas Walmart
      const storeGeo = new THREE.BoxGeometry(3.2, 0.9, 2.2).translate(0, 0.45, 0);
      const storeMat = new THREE.MeshStandardMaterial({ color: WALMART, roughness: 0.6 });
      const spark = new THREE.MeshBasicMaterial({ color: new THREE.Color(AMBER).multiplyScalar(1.4) });
      const storeObjs = (mode === "logistica" ? STORES : [STORE]).map((p) => {
        const s = new THREE.Mesh(storeGeo, storeMat); s.position.copy(p);
        const sp = new THREE.Mesh(new THREE.CircleGeometry(0.32, 6).rotateX(-Math.PI / 2), spark); sp.position.set(0, 0.92, 0); s.add(sp);
        scene.add(s); return s;
      });

      // casa del cliente: anillo amarillo en el piso
      const target = ring(0.75, AMBER); target.position.copy(HOUSE); if (mode !== "logistica" && mode !== "intro") scene.add(target);
      const dropMark = ring(0.32, GREEN); dropMark.position.copy(DROP); if (mode === "entrega") scene.add(dropMark);

      // radio de entrega y zonas prohibidas
      const reach = ring(21, BLUE); reach.position.copy(STORE); reach.scale.setScalar(0.001); scene.add(reach);
      const nfH = noFly(2.6); nfH.position.copy(HOSPITAL);
      const nfA = noFly(4); nfA.position.copy(AIRPORT);
      scene.add(nfH, nfA);
      const rings = STORES.map((p) => { const r = ring(6, BLUE); r.position.copy(p); r.scale.setScalar(0.001); scene.add(r); return r; });

      // ruta que esquiva el hospital
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-8, 1.1, -6), new THREE.Vector3(-7, 4.6, -4.3), new THREE.Vector3(-4.6, 4.6, 1.2), new THREE.Vector3(-1.4, 4.6, 4.2), new THREE.Vector3(3.6, 4.6, 6.6), new THREE.Vector3(7.2, 3.4, 7.8)]);
      const tubeGeo = new THREE.TubeGeometry(curve, 160, 0.05, 8);
      const tube = new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color(0.6, 0.85, 1.6) }));
      scene.add(tube);
      const straight = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, 4.6, -6), new THREE.Vector3(7.2, 4.6, 7.8)]), new THREE.LineDashedMaterial({ color: RED, dashSize: 0.35, gapSize: 0.25 }));
      straight.computeLineDistances(); scene.add(straight);

      // tránsito (problema): camión de reparto atascado entre autos con las luces de freno prendidas
      const traffic = new THREE.Group();
      const carGeo = mergeGeometries([new THREE.BoxGeometry(0.9, 0.3, 0.46).translate(0, 0.2, 0), new THREE.BoxGeometry(0.45, 0.22, 0.42).translate(-0.05, 0.45, 0)])!;
      const brake = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 0.2, 0.15) });
      const paints = [0x9aa3b0, 0x3b4250, 0xd9dde4, 0x16191f, 0x8a1c24];
      for (let i = 0; i < 9; i++) {
        const x = -10.5 + i * 1.25; if (i === 5) continue;
        const c = new THREE.Mesh(carGeo, new THREE.MeshStandardMaterial({ color: paints[i % paints.length], roughness: 0.55 })); c.position.set(x, 0, -1.6);
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.34), brake); b.position.set(-0.46, 0.25, 0); c.add(b);
        traffic.add(c);
      }
      const truck = new THREE.Group();
      truck.add(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.7, 0.6).translate(-0.15, 0.45, 0), new THREE.MeshStandardMaterial({ color: AMBER, roughness: 0.6 })));
      truck.add(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.56).translate(0.55, 0.35, 0), new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.5 })));
      truck.position.set(-10.5 + 5 * 1.25, 0, -1.6); truck.scale.setScalar(1.25); traffic.add(truck);
      traffic.scale.setScalar(1.35); traffic.position.set(2.6, 0, 0.55);
      scene.add(traffic);

      // drones
      const main = makeDrone(); main.g.scale.setScalar(1.6); scene.add(main.g);
      const fleet = mode === "logistica" ? STORES.map(() => { const d = makeDrone(); d.g.scale.setScalar(1.3); scene.add(d.g); return d; }) : [];

      // carteles en HTML (texto nítido, sin el brillo del render) que siguen a su punto en 3D
      type Lab = { div: HTMLDivElement; pos: THREE.Vector3; on: (s: number) => boolean };
      const labs: Lab[] = [];
      const layer = document.createElement("div");
      layer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden";
      el.appendChild(layer);
      const label = (text: string, bg: string, pos: THREE.Vector3, on: (s: number) => boolean, big = false) => {
        const d = document.createElement("div");
        d.textContent = text;
        d.style.cssText = big
          ? `position:absolute;left:0;top:0;width:64px;height:64px;border-radius:999px;background:${bg};color:#0e131c;font:800 40px Geist,sans-serif;display:grid;place-items:center;box-shadow:0 8px 30px rgba(0,0,0,.45);transition:opacity .5s`
          : `position:absolute;left:0;top:0;white-space:nowrap;padding:6px 14px;border-radius:999px;background:${bg};color:#fff;font:700 clamp(12px,1vw,16px) 'Geist Mono',monospace;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 8px 24px rgba(0,0,0,.45);transition:opacity .5s`;
        layer.appendChild(d); labs.push({ div: d, pos, on });
      };
      if (mode === "problema" || mode === "solucion") label("Tienda Walmart", "#0153e3", new THREE.Vector3(STORE.x, 1.6, STORE.z), (s) => mode === "solucion" || s >= 1);
      if (mode === "problema") label("Tránsito", "#dc2626", new THREE.Vector3(-8.2, 1.2, -1.6), (s) => s === 1);
      if (mode === "problema") label("?", "#ffffff", new THREE.Vector3(-4, 5.6, -2.5), (s) => s >= 2, true);
      if (mode === "problema" || mode === "solucion" || mode === "logistica") {
        label("Zona prohibida · hospital", "#dc2626", new THREE.Vector3(HOSPITAL.x, 7.4, HOSPITAL.z), (s) => mode === "logistica" || s >= 2);
        label("Aeropuerto", "#dc2626", new THREE.Vector3(AIRPORT.x, 7.4, AIRPORT.z), (s) => mode === "logistica" || s >= 2);
      }
      if (mode === "solucion" || mode === "entrega") label("Casa del cliente", "#b7791f", new THREE.Vector3(HOUSE.x + 0.6, -0.1, HOUSE.z + 1.2), () => true);
      const proj = new THREE.Vector3();
      const placeLabels = (s: number) => {
        const w = el.clientWidth, h = el.clientHeight;
        for (const l of labs) {
          proj.copy(l.pos).project(camera);
          const vis = l.on(s) && proj.z < 1;
          l.div.style.opacity = vis ? "1" : "0";
          l.div.style.transform = `translate(${((proj.x + 1) / 2) * w}px, ${((1 - proj.y) / 2) * h}px) translate(-50%, -100%)`;
        }
      };

      // cámara por escena
      type V = [number, number, number];
      const CAM: Record<DroneMode, { p: V; l: V }[]> = {
        intro: [{ p: [0, 18, 22], l: [0, 1, 0] }],
        problema: [{ p: [-5, 13, 1.5], l: [-5, 0, -1.6] }, { p: [-5, 11.5, 1.4], l: [-5, 0, -1.6] }, { p: [-2, 13, 15], l: [-2.5, 2, -1] }],
        solucion: [{ p: [2, 21, 20], l: [0, 1, 1] }],
        entrega: [{ p: [11, 5.5, 13], l: [7.2, 1.2, 7.8] }, { p: [10.4, 3.6, 12.2], l: [7.2, 1.1, 8.05] }],
        logistica: [{ p: [0, 27, 25], l: [0, 1, 0] }],
      };
      const camP = new THREE.Vector3(...CAM[mode][0].p), camL = new THREE.Vector3(...CAM[mode][0].l);

      let last = -1, at = 0;
      const setVis = (o: THREE.Object3D, v: boolean) => { o.visible = v; };
      const tmp = new THREE.Vector3(), col = new THREE.Color();
      const fly = (d: ReturnType<typeof makeDrone>, p: THREE.Vector3, yaw: number, t: number) => {
        d.g.position.copy(p); d.g.rotation.y = yaw; d.rotors.forEach((r, i) => (r.rotation.y = t * 40 + i));
      };

      return {
        update: (t) => {
          const s = stepRef.current;
          if (s !== last) { last = s; at = t; }
          const ts = t - at, since = (n: number, dur: number) => (s > n ? 1 : s === n ? out(ts / dur) : 0);
          const key = CAM[mode][Math.min(s, CAM[mode].length - 1)];
          camP.lerp(tmp.set(...key.p), 0.035); camL.lerp(tmp.set(...key.l), 0.035);
          camera.position.set(camP.x + Math.sin(t * 0.06) * 1.2, camP.y, camP.z + Math.cos(t * 0.06) * 0.8);
          camera.lookAt(camL);

          // qué se ve
          setVis(traffic, mode === "problema" && s >= 1);
          const showNF = mode === "problema" ? s >= 2 : mode === "solucion" ? s >= 2 : mode === "logistica";
          const nfK = mode === "problema" ? since(2, 1.0) : mode === "solucion" ? since(2, 1.0) : 1;
          for (const nf of [nfH, nfA]) { nf.visible = showNF; nf.scale.set(1, Math.max(0.001, nfK), 1); }
          reach.scale.setScalar(mode === "solucion" ? Math.max(0.001, since(1, 1.4)) : mode === "intro" ? 1 : 0.001);
          reach.visible = mode === "solucion" || mode === "intro";
          rings.forEach((r, i) => { r.visible = mode === "logistica"; r.scale.setScalar(Math.max(0.001, clamp(since(1, 1.6) * 1.6 - i * 0.15))); });
          const routeK = mode === "solucion" ? since(3, 1.6) : 0;
          tube.visible = routeK > 0; tubeGeo.setDrawRange(0, Math.floor(tubeGeo.index!.count * routeK / 6) * 6);
          straight.visible = mode === "solucion" && s === 2;

          // casas cubiertas (logística)
          if (mode === "logistica") {
            const cov = since(2, 1.0);
            homes.forEach((p, i) => {
              const inside = STORES.some((st) => st.distanceTo(p) < 6);
              homeMesh.setColorAt(i, col.copy(homeBase).lerp(inside ? homeOn : homeBase, cov));
            });
            homeMesh.instanceColor!.needsUpdate = true;
          }

          // dron principal
          main.g.visible = mode !== "logistica" && !(mode === "problema" && s < 2);
          main.tether.visible = false; main.pkg.position.y = -0.2;
          if (mode === "intro") {
            const a = t * 0.35, p = tmp.set(Math.cos(a) * 8, 5 + Math.sin(t * 0.8) * 0.3, Math.sin(a) * 6);
            fly(main, p, -a - Math.PI / 2, t);
          } else if (mode === "problema") {
            fly(main, tmp.set(-4, 4.4 + Math.sin(t * 1.5) * 0.15, -2.5), t * 0.4, t);
          } else if (mode === "solucion") {
            if (s >= 3) {
              const u = ((t - at) % 6.5) / 5.2, k = ease(u);
              const p = curve.getPointAt(clamp(k)), tg = curve.getTangentAt(clamp(k));
              fly(main, p, Math.atan2(-tg.z, tg.x), t);
            } else fly(main, tmp.set(STORE.x, 1.4 + Math.sin(t * 1.5) * 0.08, STORE.z), 0.8, t);
          } else if (mode === "entrega") {
            const HV = 2.3, hover = new THREE.Vector3(DROP.x, HV, DROP.z);
            if (s === 0) fly(main, tmp.set(DROP.x - 7, 4.2, DROP.z - 6), 0.7, t);
            else {
              const arrive = out(ts / 2.2);
              const from = new THREE.Vector3(DROP.x - 7, 4.2, DROP.z - 6);
              fly(main, tmp.copy(from).lerp(hover, s === 1 ? arrive : 1).setY((s === 1 ? 4.2 + (HV - 4.2) * arrive : HV) + Math.sin(t * 1.6) * 0.05), 0.7, t);
              if (s >= 2) {
                // baja el paquete (2 s), lo suelta, sube la cuerda (1,5 s); se repite
                const c = ts % 6.5, down = out(c / 2.2), up = out((c - 3.0) / 1.5);
                const drop = (HV - 0.15) / 1.6;                         // en unidades del dron (escala 1,6)
                const ext = c < 3.0 ? down * drop : drop * (1 - up);
                const pkgDown = c < 3.0 ? down * drop : drop;
                main.pkg.position.y = -0.2 - (c < 3.0 ? pkgDown : drop);
                main.tether.visible = true;
                main.tether.scale.y = Math.max(0.001, 0.15 + ext);
                main.pkg.visible = c < 5.2;
              }
            }
          }
          // flota (logística): cada tienda manda un dron a una casa de su radio
          fleet.forEach((d, i) => {
            const st = STORES[i], a = i * 1.7, dst = new THREE.Vector3(st.x + Math.cos(a) * 6, 0, st.z + Math.sin(a) * 6);
            const c = ((t * 0.18 + i * 0.21) % 1), k = c < 0.5 ? ease(c * 2) : ease(2 - c * 2);
            const p = tmp.copy(st).lerp(dst, k); p.y = 1.2 + Math.sin(Math.PI * k) * 3.2;
            fly(d, p, -a + (c < 0.5 ? 0 : Math.PI), t);
            d.g.visible = since(1, 0.8) > 0.5;
          });
          storeObjs.forEach((o) => (o.visible = true));
          placeLabels(s);
        },
        dispose: () => layer.remove(),
      };
    },
    { bloom: 0.3, deps: [mode] },
  );
  return <div ref={ref} className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_92%)]" aria-hidden />;
}
