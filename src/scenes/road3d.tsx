import { useRef } from "react";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { THREE, clamp01, useThreeScene } from "@/lib/three";

/* "¿Y en logística?" del caso trenes, en 3D: un camión va por una ruta que más adelante está cortada.
   1 nadie avisa: llega a la barrera y queda atrapado · 2 el sistema avisa antes y toma la salida solo. */

const BG = 0x0e131c;
const CUT_X = 24, EXIT_X = 6;

function makeTruck() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.5, 1.3).translate(-1.7, 1.15, 0), new THREE.MeshStandardMaterial({ color: 0xeef1f5, roughness: 0.5 }));
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.42, 0.16, 1.32).translate(-1.7, 0.75, 0), new THREE.MeshStandardMaterial({ color: 0xf5b31b, roughness: 0.5 }));
  const cab = new THREE.Mesh(mergeGeometries([new THREE.BoxGeometry(1.15, 1.05, 1.25).translate(0.62, 0.92, 0), new THREE.BoxGeometry(0.4, 0.45, 1.25).translate(1.2, 0.62, 0)])!, new THREE.MeshStandardMaterial({ color: 0xf5b31b, roughness: 0.45 }));
  const glass = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.42, 1.08).translate(1.21, 1.18, 0), new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.2, metalness: 0.5 }));
  const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.22, 16).rotateX(Math.PI / 2);
  const wheels = new THREE.Mesh(mergeGeometries([[-2.9, 0.6], [-2.9, -0.6], [-0.9, 0.6], [-0.9, -0.6], [0.8, 0.6], [0.8, -0.6]].map(([x, z]) => wheelGeo.clone().translate(x, 0.3, z)))!, new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.9 }));
  const lights = new THREE.Mesh(mergeGeometries([0.42, -0.42].map((z) => new THREE.BoxGeometry(0.05, 0.12, 0.2).translate(1.42, 0.62, z)))!, new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.9, 2.4) }));
  const brake = new THREE.Mesh(mergeGeometries([0.5, -0.5].map((z) => new THREE.BoxGeometry(0.05, 0.12, 0.18).translate(-3.42, 0.6, z)))!, new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.05, 0.05) }));
  g.add(box, stripe, cab, glass, wheels, lights, brake);
  return { g, brake };
}

export function RoadScene({ step = 0 }: { step?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  useThreeScene(
    ref,
    ({ scene, camera, el }) => {
      scene.background = new THREE.Color(BG);
      scene.fog = new THREE.Fog(BG, 30, 80);
      scene.add(new THREE.HemisphereLight(0xbcd3ff, 0x1a2030, 1.05));
      const sun = new THREE.DirectionalLight(0xfff1e0, 1.6); sun.position.set(-8, 16, 10); scene.add(sun);
      scene.add(new THREE.Mesh(new THREE.PlaneGeometry(260, 140).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x141b29, roughness: 1 })));

      // ruta principal y salida
      const asphalt = new THREE.MeshStandardMaterial({ color: 0x232b3a, roughness: 0.95 });
      const road = new THREE.Mesh(new THREE.BoxGeometry(160, 0.06, 4.2), asphalt); road.position.set(20, 0.03, 0); scene.add(road);
      const exitCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(EXIT_X - 4, 0, 0), new THREE.Vector3(EXIT_X + 2, 0, -0.6), new THREE.Vector3(EXIT_X + 7, 0, -4), new THREE.Vector3(EXIT_X + 11, 0, -12), new THREE.Vector3(EXIT_X + 14, 0, -30)]);
      const ramp = new THREE.Mesh(new THREE.TubeGeometry(exitCurve, 80, 1.9, 4, false).scale(1, 0.02, 1), asphalt); ramp.position.y = 0.03; scene.add(ramp);
      const dashes = new THREE.InstancedMesh(new THREE.BoxGeometry(1.4, 0.02, 0.14), new THREE.MeshBasicMaterial({ color: 0xcbd5e1 }), 60);
      const m4 = new THREE.Matrix4(); for (let i = 0; i < 60; i++) { m4.makeTranslation(-40 + i * 2.6, 0.07, 0); dashes.setMatrixAt(i, m4); } scene.add(dashes);
      for (const z of [-2, 2]) { const edge = new THREE.Mesh(new THREE.BoxGeometry(160, 0.02, 0.1), new THREE.MeshBasicMaterial({ color: 0x64748b })); edge.position.set(20, 0.07, z); scene.add(edge); }
      // cartel de salida
      const sign = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 1.8), new THREE.MeshStandardMaterial({ color: 0x15803d })); sign.position.set(EXIT_X - 6, 2.2, -3); scene.add(sign);
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.2), new THREE.MeshStandardMaterial({ color: 0x64748b })); post.position.set(EXIT_X - 6, 1.1, -3); scene.add(post);

      // paisaje: árboles y galpones bajos
      const rnd = (() => { let s = 3; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
      const treeGeo = mergeGeometries([new THREE.CylinderGeometry(0.08, 0.1, 0.6).translate(0, 0.3, 0), new THREE.ConeGeometry(0.55, 1.4, 7).translate(0, 1.2, 0)])!;
      const trees = new THREE.InstancedMesh(treeGeo, new THREE.MeshStandardMaterial({ color: 0x1f5f46, roughness: 0.9 }), 120);
      for (let i = 0; i < 120; i++) { const x = -40 + rnd() * 130, side = rnd() < 0.5 ? -1 : 1, z = side * (4 + rnd() * 16); if (Math.abs(x - (EXIT_X + 8)) < 8 && z < 0) { i--; continue; } m4.compose(new THREE.Vector3(x, 0, z), new THREE.Quaternion(), new THREE.Vector3(1, 0.8 + rnd() * 0.7, 1)); trees.setMatrixAt(i, m4); }
      scene.add(trees);
      const sheds = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x3a465c, roughness: 0.8 }), 14);
      for (let i = 0; i < 14; i++) { const h = 0.8 + rnd() * 1.4; m4.compose(new THREE.Vector3(-30 + i * 9, h / 2, 9 + rnd() * 5), new THREE.Quaternion(), new THREE.Vector3(3 + rnd() * 2, h, 2.5)); sheds.setMatrixAt(i, m4); }
      scene.add(sheds);

      // ruta cortada: barreras, conos y luces que titilan
      const cut = new THREE.Group();
      for (const z of [-1.2, 0, 1.2]) {
        const b = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.7, 1.1), new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6 })); b.position.set(0, 0.45, z); cut.add(b);
        const w = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 1.12), new THREE.MeshStandardMaterial({ color: 0xf8fafc })); w.position.set(0, 0.52, z); cut.add(w);
      }
      const flashers = [-1.2, 1.2].map((z) => { const l = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 0.25, 0.15) })); l.position.set(0, 1.0, z); cut.add(l); return l; });
      for (let i = 0; i < 5; i++) { const c = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.5, 10), new THREE.MeshStandardMaterial({ color: 0xf97316 })); c.position.set(-3 + i * 0.7, 0.25, -1.6 + i * 0.8); cut.add(c); }
      cut.position.set(CUT_X, 0, 0); scene.add(cut);

      const truck = makeTruck(); scene.add(truck.g);

      // carteles HTML
      const layer = document.createElement("div"); layer.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden"; el.appendChild(layer);
      type Lab = { d: HTMLDivElement; p: () => THREE.Vector3; on: () => boolean };
      const labs: Lab[] = [];
      const label = (text: string, bg: string, p: () => THREE.Vector3, on: () => boolean) => {
        const d = document.createElement("div"); d.textContent = text;
        d.style.cssText = `position:absolute;left:0;top:0;white-space:nowrap;padding:7px 15px;border-radius:999px;background:${bg};color:#fff;font:700 clamp(12px,1.05vw,17px) 'Geist Mono',monospace;letter-spacing:.05em;text-transform:uppercase;box-shadow:0 8px 24px rgba(0,0,0,.45);transition:opacity .45s`;
        layer.appendChild(d); labs.push({ d, p, on });
      };
      let phase = "";
      label("Ruta cortada", "#dc2626", () => new THREE.Vector3(CUT_X, 2.2, 0), () => true);
      label("Ubicado ✓ · pero nadie avisó", "#475569", () => truck.g.position.clone().add(new THREE.Vector3(-5, 3, 0)), () => phase === "stuck");
      label("Alerta: ruta cortada más adelante", "#b45309", () => truck.g.position.clone().add(new THREE.Vector3(-1.5, 3, 0)), () => phase === "alert");
      label("Desvío automático ✓", "#15803d", () => truck.g.position.clone().add(new THREE.Vector3(-1.5, 3, 0)), () => phase === "exit");
      const proj = new THREE.Vector3();
      const place = () => {
        const w = el.clientWidth, h = el.clientHeight;
        for (const l of labs) { proj.copy(l.p()).project(camera); l.d.style.opacity = l.on() && proj.z < 1 ? "1" : "0"; l.d.style.transform = `translate(${((proj.x + 1) / 2) * w}px, ${((1 - proj.y) / 2) * h}px) translate(-50%, -100%)`; }
      };

      const camP = new THREE.Vector3(0, 9, 18), camL = new THREE.Vector3(10, 1, 0), eye = new THREE.Vector3(), look = new THREE.Vector3();
      let last = -1, at = 0, first = true;
      const brakeOn = new THREE.Color(3, 0.3, 0.2), brakeOff = new THREE.Color(0.5, 0.05, 0.05);

      return {
        update: (t) => {
          const s = stepRef.current; if (s !== last) { last = s; at = t; }
          const ts = t - at;
          flashers.forEach((f, i) => ((f.material as THREE.MeshBasicMaterial).color.copy(Math.sin(t * 7 + i * Math.PI) > 0 ? new THREE.Color(2.6, 0.25, 0.15) : new THREE.Color(2.4, 1.2, 0.1))));
          let x = -16, z = 0, yaw = 0, braking = false;
          phase = "";
          if (s === 0) { x = -16 + Math.sin(t * 0.4) * 0.01; }
          if (s === 1) {
            // va derecho a 9 m/s y frena en seco frente a la barrera
            const c = ts % 8, stopX = CUT_X - 2.2, d = -16 + 9 * c;
            x = Math.min(d, stopX); braking = d >= stopX - 3;
            if (d >= stopX) phase = "stuck";
          }
          if (s === 2) {
            const c = ts % 8, d = -16 + 9 * c;
            if (d < EXIT_X - 4) { x = d; if (d > -6) phase = "alert"; }
            else {
              const u = clamp01((d - (EXIT_X - 4)) / 34), p = exitCurve.getPointAt(u), tg = exitCurve.getTangentAt(u);
              x = p.x; z = p.z; yaw = Math.atan2(-tg.z, tg.x); phase = u < 0.25 ? "alert" : "exit";
            }
          }
          truck.g.position.set(x, 0, z); truck.g.rotation.y = yaw;
          (truck.brake.material as THREE.MeshBasicMaterial).color.copy(braking ? brakeOn : brakeOff);
          eye.set(x - 11, 6.5, z + 12); look.set(x + 6, 1, z * 0.6);
          if (s === 0) { eye.set(-6, 9, 18); look.set(8, 1, 0); }
          if (first) { camP.copy(eye); camL.copy(look); first = false; }
          camP.lerp(eye, 0.05); camL.lerp(look, 0.07);
          camera.position.copy(camP); camera.lookAt(camL);
          place();
        },
        dispose: () => layer.remove(),
      };
    },
    { bloom: 0.35 },
  );
  return <div ref={ref} className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_92%)]" aria-hidden />;
}
