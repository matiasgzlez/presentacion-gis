import { useRef } from "react";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { THREE, clamp01, useThreeScene } from "@/lib/three";

/* Trenes en España (28/10/2026), contado hora por hora en 3D. Mate; solo brillan señales, faros y pantallas.
   Las distancias están comprimidas (es una ilustración, no a escala). Hacia la derecha (+x) es Madrid → Sevilla.
   intro   · un AVE circula con las señales en verde
   salida  · 1 07:54 sale el Iryo · 2 08:00 sale el AVE, seis minutos detrás
   lzb     · 1 08:30 se cae la LZB: las señales se apagan · 2 los seis trenes frenan solos (25 km entre los dos)
   orden   · 1 08:36 el centro de control autoriza al AVE a seguir (BSL) · 2 la regla: solo con el tramo libre, a 40 km/h · 3 el tramo no estaba libre
   parado  · 1 el Iryo sigue detenido: no puede reiniciar · 2 en las pantallas se veía todo
   choque  · 1 el AVE avanza rápido · 2 fundido a negro antes del choque (km 118)
   leccion · 1 el dato y la regla estaban · 2 lo que tendría que haber pasado: el tramo ocupado frena al AVE */

export type TrainMode = "intro" | "salida" | "lzb" | "orden" | "parado" | "choque" | "leccion";

const BG = 0x0e131c;
const IRYO_X = 26;                                               // cola del Iryo detenido
const GREEN = new THREE.Color(0.25, 2.2, 0.7), RED = new THREE.Color(2.6, 0.22, 0.16), OFF = new THREE.Color(0.16, 0.18, 0.22);

function carGeo(len: number, nose: boolean) {
  const s = new THREE.Shape(), h = 1.0;
  s.moveTo(0, 0.12); s.lineTo(len, 0.12);
  if (nose) { s.quadraticCurveTo(len + 1.3, 0.14, len + 1.5, 0.42); s.quadraticCurveTo(len + 1.2, h - 0.05, len - 0.3, h); }
  else { s.lineTo(len, h - 0.12); s.quadraticCurveTo(len, h, len - 0.12, h); }
  s.lineTo(0.12, h); s.quadraticCurveTo(0, h, 0, h - 0.12); s.closePath();
  return new THREE.ExtrudeGeometry(s, { depth: 0.98, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 2 }).translate(0, 0, -0.49);
}
// tren con el frente en x = 0, mirando a +x
function makeTrain(body: number, stripe: number, cars: number) {
  const g = new THREE.Group(), L = 2.6, gap = 0.12;
  const bodyMat = new THREE.MeshStandardMaterial({ color: body, roughness: 0.45, metalness: 0.2 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.2, metalness: 0.5 });
  const stripeMat = new THREE.MeshStandardMaterial({ color: stripe, roughness: 0.5 });
  for (let i = 0; i < cars; i++) {
    const nose = i === 0, x = -1.5 - L - i * (L + gap);
    const car = new THREE.Mesh(carGeo(L, nose), bodyMat); car.position.x = x; g.add(car);
    const win = new THREE.Mesh(new THREE.BoxGeometry(L - 0.4, 0.2, 1.02), glass); win.position.set(x + L / 2, 0.72, 0); g.add(win);
    const str = new THREE.Mesh(new THREE.BoxGeometry(L, 0.07, 1.03), stripeMat); str.position.set(x + L / 2, 0.36, 0); g.add(str);
    if (nose) {
      const wind = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 0.8), glass); wind.position.set(x + L + 0.75, 0.78, 0); wind.rotation.z = -0.55; g.add(wind);
      for (const z of [0.28, -0.28]) { const l = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.9, 2.5) })); l.position.set(x + L + 1.42, 0.38, z); g.add(l); }
    }
  }
  g.position.y = 0.2;
  return g;
}
const LEN = (cars: number) => 1.5 + cars * 2.72;                // largo de un tren, de la punta a la cola

export function TrainScene({ mode = "intro", step = 0, labels = true }: { mode?: TrainMode; step?: number; labels?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  useThreeScene(
    ref,
    ({ scene, camera, el }) => {
      scene.background = new THREE.Color(BG);
      scene.fog = new THREE.Fog(BG, 30, 80);
      scene.add(new THREE.HemisphereLight(0xbcd3ff, 0x1a2030, 1.0));
      const sun = new THREE.DirectionalLight(0xfff1e0, 1.6); sun.position.set(-8, 14, 10); scene.add(sun);

      // ── terreno y vía
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(260, 90).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x141b29, roughness: 1 })));
      const ballast = new THREE.Mesh(new THREE.BoxGeometry(200, 0.14, 2.4), new THREE.MeshStandardMaterial({ color: 0x232c3c, roughness: 1 })); ballast.position.set(20, 0.07, 0); scene.add(ballast);
      const railMat = new THREE.MeshStandardMaterial({ color: 0x9aa7bb, metalness: 0.8, roughness: 0.3 });
      for (const z of [-0.48, 0.48]) { const r = new THREE.Mesh(new THREE.BoxGeometry(200, 0.07, 0.07), railMat); r.position.set(20, 0.2, z); scene.add(r); }
      const N = 420, sleepers = new THREE.InstancedMesh(new THREE.BoxGeometry(0.2, 0.06, 1.5), new THREE.MeshStandardMaterial({ color: 0x3a4456, roughness: 0.9 }), N);
      const m4 = new THREE.Matrix4(); for (let i = 0; i < N; i++) { m4.makeTranslation(-78 + i * 0.47, 0.16, 0); sleepers.setMatrixAt(i, m4); } scene.add(sleepers);
      const poleGeo = mergeGeometries([new THREE.CylinderGeometry(0.05, 0.06, 3.2).translate(0, 1.6, 0), new THREE.BoxGeometry(0.06, 0.06, 1.7).translate(0, 3.1, 0.75)])!;
      const poles = new THREE.InstancedMesh(poleGeo, new THREE.MeshStandardMaterial({ color: 0x4b5568 }), 34);
      for (let i = 0; i < 34; i++) { m4.makeTranslation(-78 + i * 6, 0, -1.6); poles.setMatrixAt(i, m4); } scene.add(poles);
      const wire = new THREE.Mesh(new THREE.BoxGeometry(200, 0.02, 0.02), new THREE.MeshBasicMaterial({ color: 0x5d6f8c })); wire.position.set(20, 3.05, 0); scene.add(wire);
      // señales cada 5 m
      const sigs = Array.from({ length: 34 }, (_, i) => -76 + i * 5).map((x) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6), new THREE.MeshStandardMaterial({ color: 0x5d6f8c })); post.position.set(x, 0.8, 1.45);
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.34, 0.16), new THREE.MeshStandardMaterial({ color: 0x111827 })); head.position.set(x, 1.7, 1.45);
        const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 12), new THREE.MeshBasicMaterial({ color: GREEN.clone() })); lamp.position.set(x + 0.08, 1.75, 1.45);
        scene.add(post, head, lamp); return { x, lamp };
      });

      // ── trenes
      const iryo = makeTrain(0xd2392f, 0x111111, 4); scene.add(iryo);
      const ave = makeTrain(0xeef1f5, 0x5b2a86, 4); scene.add(ave);
      const iryoTail = () => iryo.position.x - LEN(4);

      // ── centro de control (Atocha) y líneas de "lo que se ve en pantalla"
      const control = new THREE.Group();
      control.add(new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.9, 0.12), new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.4 })));
      const screenMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.12, 0.35, 0.9) });
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 1.7), screenMat); screen.position.z = 0.07; control.add(screen);
      scene.add(control);
      const dash = (c: number) => new THREE.LineDashedMaterial({ color: c, dashSize: 0.3, gapSize: 0.2 });
      const mkLink = (c: number) => { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), dash(c)); scene.add(l); return l; };
      const linkA = mkLink(0x5ab4ff), linkI = mkLink(0x5ab4ff);
      const setLine = (l: THREE.Line, a: THREE.Vector3, b: THREE.Vector3) => { const p = l.geometry.attributes.position as THREE.BufferAttribute; p.setXYZ(0, a.x, a.y, a.z); p.setXYZ(1, b.x, b.y, b.z); p.needsUpdate = true; l.computeLineDistances(); };

      // ── tramo ocupado (orden / lección)
      const zoneGeo = new THREE.BoxGeometry(1, 1.8, 2.6);
      const zone = new THREE.Mesh(zoneGeo, new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.16, depthWrite: false }));
      const zoneEdge = new THREE.LineSegments(new THREE.EdgesGeometry(zoneGeo), new THREE.LineBasicMaterial({ color: new THREE.Color(2.2, 0.3, 0.25) }));
      scene.add(zone, zoneEdge);

      // ── fundido a negro
      const fade = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshBasicMaterial({ color: BG, transparent: true, opacity: 0, depthTest: false }));
      fade.renderOrder = 99; scene.add(fade);

      // ── carteles HTML
      type Lab = { d: HTMLDivElement; p: () => THREE.Vector3; on: () => boolean; txt?: () => string };
      const labs: Lab[] = [];
      const layer = document.createElement("div"); layer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden"; el.appendChild(layer);
      const label = (text: string | (() => string), bg: string, p: () => THREE.Vector3, on: () => boolean) => {
        if (!labels) return;
        const d = document.createElement("div");
        d.style.cssText = `position:absolute;left:0;top:0;white-space:nowrap;padding:7px 15px;border-radius:999px;background:${bg};color:#fff;font:700 clamp(12px,1.05vw,17px) 'Geist Mono',monospace;letter-spacing:.05em;text-transform:uppercase;box-shadow:0 8px 24px rgba(0,0,0,.45);transition:opacity .45s`;
        if (typeof text === "string") d.textContent = text;
        layer.appendChild(d); labs.push({ d, p, on, txt: typeof text === "function" ? text : undefined });
      };
      const S = () => stepRef.current;
      const above = (o: THREE.Object3D, back: number, y = 2.5) => () => new THREE.Vector3(o.position.x - back, y, 0);
      const CTRL = new THREE.Vector3(10, 7.4, -7);
      let stoppedByRule = false;
      if (mode === "salida") {
        label("07:54 · Iryo 6076 · Madrid → Sevilla", "#d2392f", above(iryo, 6), () => S() >= 1);
        label("08:00 · AVE 2080 · 6 minutos detrás", "#475569", above(ave, 6), () => S() >= 2);
      }
      if (mode === "lzb") {
        label("08:30 · se cae la LZB (68 km)", "#b45309", () => new THREE.Vector3(8, 4.2, 0), () => S() >= 1);
        label("Iryo · frenó solo ✓", "#d2392f", above(iryo, 6), () => S() >= 2);
        label("AVE · frenó solo ✓", "#475569", above(ave, 6), () => S() >= 2);
        label("25 km entre los dos", "#1d4ed8", () => new THREE.Vector3((ave.position.x + iryoTail()) / 2, 0.9, 1.6), () => S() >= 2);
      }
      if (mode === "orden" || mode === "parado" || mode === "leccion") label("Centro de control · Atocha", "#1d4ed8", () => CTRL.clone().setY(CTRL.y + 1.5), () => true);
      if (mode === "orden") {
        label("08:36 · “AVE, podés seguir”", "#1d4ed8", above(ave, 6), () => S() >= 1);
        label("Regla: solo si el tramo está libre · 40 km/h", "#15803d", () => new THREE.Vector3(10, 4.6, 0), () => S() >= 2);
        label("Tramo ocupado · nadie lo confirmó", "#dc2626", above(iryo, 6), () => S() >= 3);
      }
      if (mode === "parado") {
        label("Iryo · detenido: no puede reiniciar", "#d2392f", above(iryo, 6), () => S() >= 1);
        label("En las pantallas se veían los dos trenes", "#1d4ed8", () => CTRL.clone().setY(CTRL.y - 1.8), () => S() >= 2);
      }
      if (mode === "choque") {
        label("AVE · 160–200 km/h", "#475569", above(ave, 6), () => S() >= 1);
        label("Km 118 · cerca de Urda", "#dc2626", above(iryo, 6), () => S() >= 1);
      }
      if (mode === "leccion") {
        label("El dato ✓ · La regla ✓", "#15803d", above(iryo, 6), () => S() >= 1);
        label("Tramo ocupado: el sistema frena la orden", "#15803d", above(ave, 5, 3.2), () => S() >= 2 && stoppedByRule);
      }
      const proj = new THREE.Vector3();
      const place = () => {
        const w = el.clientWidth, h = el.clientHeight;
        for (const l of labs) {
          if (l.txt) l.d.textContent = l.txt();
          const on = l.on(); proj.copy(l.p()).project(camera);
          l.d.style.opacity = on && proj.z < 1 ? "1" : "0";
          l.d.style.transform = `translate(${((proj.x + 1) / 2) * w}px, ${((1 - proj.y) / 2) * h}px) translate(-50%, -100%)`;
        }
      };

      const camP = new THREE.Vector3(0, 8, 20), camL = new THREE.Vector3(6, 1.5, 0), fwd = new THREE.Vector3();
      let last = -1, at = 0, firstFrame = true;

      return {
        update: (t) => {
          const s = S(); if (s !== last) { last = s; at = t; }
          const ts = t - at;
          // estado por defecto: Iryo detenido adelante, AVE lejos atrás
          let iryoX = IRYO_X + LEN(4), aveX = -60, fadeA = 0, zoneX0 = 0, zoneX1 = 0, signal: (x: number) => THREE.Color = () => GREEN;
          let focus = new THREE.Vector3(10, 1.5, 0), eye = new THREE.Vector3(-4, 8, 20);
          let showCtrl = false, linkAOn = false, linkIOn = false, ctrlAlarm = false;

          if (mode === "intro") { aveX = -40 + ((t * 7) % 110); iryoX = -200; focus.set(aveX - 5, 1.3, 0); eye.set(aveX - 16, 5.5, 13); }
          if (mode === "salida") {
            const v = 5;
            iryoX = s >= 1 ? -10 + ((ts * v) % 70) : -200;
            aveX = s >= 2 ? iryoX - 26 : -200;
            focus.set((s >= 2 ? (iryoX + aveX) / 2 : iryoX - 5), 1.3, 0); eye.set(focus.x - 10, 9, 22);
            if (s === 0) { focus.set(6, 1.3, 0); eye.set(-6, 8, 20); }
          }
          if (mode === "lzb") {
            iryoX = IRYO_X + LEN(4); aveX = IRYO_X - 30;
            const off = s >= 1;
            signal = () => (off ? (Math.sin(t * 7) > 0.6 ? GREEN : OFF) : GREEN);
            if (s >= 2) signal = () => OFF;
            focus.set(8, 1.3, 0); eye.set(-8, 11, 26);
          }
          if (mode === "orden") {
            showCtrl = true; iryoX = IRYO_X + LEN(4);
            aveX = IRYO_X - 30 + (s >= 1 ? clamp01(ts / 6) * 6 : 0);
            linkAOn = s >= 1; signal = (x) => (x > iryoTail() - 22 && x < iryoTail() ? RED : OFF);
            if (s >= 3) { zoneX0 = iryoTail() - 16; zoneX1 = iryo.position.x; }
            focus.set(8, 3, -1.5); eye.set(-6, 11, 26);
          }
          if (mode === "parado") {
            showCtrl = true; iryoX = IRYO_X + LEN(4); aveX = IRYO_X - 26;
            linkIOn = s >= 1; linkAOn = s >= 2; ctrlAlarm = s >= 1;
            signal = (x) => (x > iryoTail() - 22 && x < iryoTail() ? RED : OFF);
            focus.set(s >= 2 ? 10 : IRYO_X + 2, 2.5, -1); eye.set(s >= 2 ? -4 : IRYO_X - 8, 9, s >= 2 ? 24 : 16);
          }
          if (mode === "choque") {
            iryoX = IRYO_X + LEN(4); signal = (x) => (x > iryoTail() - 22 && x < iryoTail() ? RED : OFF);
            if (s >= 1) {
              const c = ts % 9, k = clamp01(c / 5.2);
              aveX = IRYO_X - 34 + (34 - 0.3) * (s >= 2 ? k : Math.min(k, 0.72));
              fadeA = s >= 2 ? clamp01((c - 4.8) / 0.5) * (c < 8.6 ? 1 : 0) : 0;
            } else aveX = IRYO_X - 34;
            focus.set(aveX + 6, 1.3, 0); eye.set(aveX - 6, 4.2, 10);
          }
          if (mode === "leccion") {
            showCtrl = true; iryoX = IRYO_X + LEN(4); linkIOn = s >= 1; linkAOn = s >= 1;
            signal = (x) => (x > iryoTail() - 22 && x < iryoTail() ? RED : OFF);
            const c = ts % 8, free = IRYO_X - 30 + 26 * clamp01(c / 5), stop = iryoTail() - 16 - 0.4;
            aveX = s >= 2 ? Math.min(free, stop) : IRYO_X - 30;
            stoppedByRule = s >= 2 && free >= stop;
            if (s >= 2) { zoneX0 = iryoTail() - 16; zoneX1 = iryo.position.x; }
            focus.set(10, 2.5, -1); eye.set(-6, 10, 25);
          }

          iryo.position.x = iryoX; ave.position.x = aveX;
          iryo.visible = iryoX > -150; ave.visible = aveX > -55;
          sigs.forEach((sg) => (sg.lamp.material as THREE.MeshBasicMaterial).color.copy(signal(sg.x)));
          control.visible = showCtrl; control.position.copy(CTRL); control.lookAt(CTRL.x, CTRL.y - 1, 12);
          screenMat.color.copy(ctrlAlarm && Math.sin(t * 6) > 0 ? new THREE.Color(0.9, 0.3, 0.08) : new THREE.Color(0.12, 0.35, 0.9));
          linkA.visible = showCtrl && linkAOn; linkI.visible = showCtrl && linkIOn;
          setLine(linkA, new THREE.Vector3(aveX - 4, 1.4, 0), CTRL);
          setLine(linkI, new THREE.Vector3(iryoX - 5, 1.4, 0), CTRL);
          const zw = zoneX1 - zoneX0; zone.visible = zoneEdge.visible = zw > 0.1;
          if (zw > 0.1) { zone.scale.set(zw, 1, 1); zoneEdge.scale.set(zw, 1, 1); zone.position.set((zoneX0 + zoneX1) / 2, 1.05, 0); zoneEdge.position.copy(zone.position); }

          if (firstFrame) { camP.copy(eye); camL.copy(focus); firstFrame = false; }
          camP.lerp(eye, 0.045); camL.lerp(focus, 0.06);
          camera.position.copy(camP); camera.lookAt(camL);
          (fade.material as THREE.MeshBasicMaterial).opacity = fadeA;
          fade.position.copy(camera.position).add(fwd.set(0, 0, -1).applyQuaternion(camera.quaternion)); fade.lookAt(camera.position);
          place();
        },
        dispose: () => layer.remove(),
      };
    },
    { bloom: 0.35, deps: [mode] },
  );
  return <div ref={ref} className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_92%)]" aria-hidden />;
}
