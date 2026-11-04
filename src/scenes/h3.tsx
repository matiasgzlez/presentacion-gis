import { useRef } from "react";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { COL, THREE, hexShape, textSprite, useThreeScene } from "@/lib/three";

/* Uber: la ciudad partida en hexágonos. Altura = pedidos; color = cuánto falta oferta (precio dinámico).
   Con `step` se arma por partes: 1 grilla plana · 2 la altura son los pedidos · 3 se comparan con los autos libres (color, autos, precio). */

const R = 1;
const RINGS = 9;
const W = Math.sqrt(3) * R;

export function H3Scene({ step = 3, priceLabel = true }: { step?: number; priceLabel?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;
  useThreeScene(
    ref,
    ({ scene, camera }) => {
      camera.position.set(0, 25, 25);
      camera.lookAt(0, 0, 1);
      scene.background = new THREE.Color(0x0e131c);
      scene.fog = new THREE.Fog(0x0e131c, 28, 55);

      const cells: { x: number; z: number }[] = [];
      for (let q = -RINGS; q <= RINGS; q++)
        for (let r = Math.max(-RINGS, -q - RINGS); r <= Math.min(RINGS, -q + RINGS); r++) cells.push({ x: W * (q + r / 2), z: 1.5 * R * r });

      const geo = new THREE.ExtrudeGeometry(hexShape(R * 0.93), { depth: 1, bevelEnabled: false });
      geo.rotateX(-Math.PI / 2);
      const mat = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.1, emissive: 0xffffff, emissiveIntensity: 0.0 });
      const mesh = new THREE.InstancedMesh(geo, mat, cells.length);
      scene.add(mesh);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.ShapeGeometry(hexShape(R * 0.93)).rotateX(-Math.PI / 2)),
        new THREE.LineBasicMaterial({ color: COL.line2 }),
      );
      cells.forEach((c) => { const e = edges.clone(); e.position.set(c.x, 0.01, c.z); scene.add(e); });
      scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      const dl = new THREE.DirectionalLight(0xffffff, 1.6);
      dl.position.set(-8, 20, 12);
      scene.add(dl);

      // autos
      // autos: autitos low-poly mate (carrocería con perfil, vidrios oscuros, ruedas), colores de calle reales
      const CARS = 22;
      const prof = new THREE.Shape();                          // perfil lateral de la carrocería (largo en x, alto en y)
      prof.moveTo(-0.55, 0.06); prof.lineTo(0.55, 0.06); prof.quadraticCurveTo(0.6, 0.06, 0.6, 0.14);
      prof.lineTo(0.6, 0.22); prof.quadraticCurveTo(0.58, 0.27, 0.48, 0.28); prof.lineTo(-0.5, 0.28);
      prof.quadraticCurveTo(-0.58, 0.27, -0.58, 0.2); prof.lineTo(-0.58, 0.12); prof.quadraticCurveTo(-0.58, 0.06, -0.55, 0.06);
      const bodyGeo = new THREE.ExtrudeGeometry(prof, { depth: 0.46, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.025, bevelSegments: 2 }).translate(0, 0, -0.23);
      const top = new THREE.Shape();                           // cabina de vidrio
      top.moveTo(-0.34, 0.27); top.lineTo(0.3, 0.27); top.lineTo(0.14, 0.46); top.lineTo(-0.22, 0.46); top.closePath();
      const glassGeo = new THREE.ExtrudeGeometry(top, { depth: 0.4, bevelEnabled: false }).translate(0, 0, -0.2);
      const wheel = new THREE.CylinderGeometry(0.11, 0.11, 0.08, 14).rotateX(Math.PI / 2);
      const wheelGeo = mergeGeometries([[0.34, 0.25], [0.34, -0.25], [-0.34, 0.25], [-0.34, -0.25]].map(([x, z]) => wheel.clone().translate(x, 0.11, z)))!;
      const bodies = new THREE.InstancedMesh(bodyGeo, new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.25 }), CARS);
      const glass = new THREE.InstancedMesh(glassGeo, new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.2, metalness: 0.6 }), CARS);
      const wheels = new THREE.InstancedMesh(wheelGeo, new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.9 }), CARS);
      const PAINT = [0xd9dde4, 0x9aa3b0, 0x3b4250, 0x16191f, 0xd9dde4, 0x8a1c24];
      for (let i = 0; i < CARS; i++) bodies.setColorAt(i, new THREE.Color(PAINT[i % PAINT.length]).convertSRGBToLinear());
      // faros (blancos adelante, rojos atrás): lo único que brilla, apenas
      const lamp = new THREE.BoxGeometry(0.05, 0.06, 0.12);
      const headGeo = mergeGeometries([0.15, -0.15].map((z) => lamp.clone().translate(0.62, 0.2, z)))!;
      const tailGeo = mergeGeometries([0.16, -0.16].map((z) => lamp.clone().translate(-0.6, 0.2, z)))!;
      const heads = new THREE.InstancedMesh(headGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 3.1, 2.6) }), CARS);
      const tails = new THREE.InstancedMesh(tailGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color(2.6, 0.2, 0.15) }), CARS);
      const cars = new THREE.Group(); cars.add(bodies, glass, wheels, heads, tails); scene.add(cars);
      let s = 5;
      const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
      const carPos = Array.from({ length: CARS }, () => new THREE.Vector2((rnd() - 0.5) * 26, (rnd() - 0.5) * 22));
      const carOff = Array.from({ length: CARS }, () => new THREE.Vector2((rnd() - 0.5) * 9, (rnd() - 0.5) * 8));
      const carOrbit = Array.from({ length: CARS }, () => ({ r: 1.8 + rnd() * 2.6, w: (rnd() < 0.5 ? -1 : 1) * (0.25 + rnd() * 0.25), ph: rnd() * Math.PI * 2 }));
      const carYaw = new Array(CARS).fill(0);
      const q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0), one = new THREE.Vector3(1.35, 1.35, 1.35), v3 = new THREE.Vector3();

      const surge = textSprite("precio ×1,8", "#060a12", 56, "#ff7a59");
      let hK = 0, cK = 0;                                 // altura y comparación, suavizadas hacia el paso actual
      surge.scale.multiplyScalar(1.5);
      scene.add(surge);

      const hot = (t: number) => [
        { x: Math.sin(t * 0.21) * 7, z: Math.cos(t * 0.17) * 5, w: 1 },
        { x: -6 + Math.cos(t * 0.13) * 3, z: 4 + Math.sin(t * 0.19) * 3, w: 0.7 },
        { x: 7 + Math.sin(t * 0.11 + 2) * 2, z: -4 + Math.cos(t * 0.23) * 2, w: 0.6 },
      ];
      const field = (hs: ReturnType<typeof hot>, x: number, z: number) => hs.reduce((a, h) => a + h.w * Math.exp(-((x - h.x) ** 2 + (z - h.z) ** 2) / 14), 0);

      const m4 = new THREE.Matrix4();
      const col = new THREE.Color();
      const mint = new THREE.Color(COL.mint), amber = new THREE.Color(COL.amber), coral = new THREE.Color(COL.coral), base = new THREE.Color(0x1a2a44);
      return {
        update: (t) => {
          const st = stepRef.current;
          hK += ((st >= 2 ? 1 : 0) - hK) * 0.05;
          cK += ((st >= 3 ? 1 : 0) - cK) * 0.05;
          mesh.visible = st >= 1;
          const D = hot(t);
          const S = hot(t - 4.5); // la oferta llega tarde
          let maxR = 0, maxI = 0;
          cells.forEach((c, i) => {
            const d = field(D, c.x, c.z);
            const sup = field(S, c.x, c.z);
            const ratio = d / (sup + 0.25);
            const h = 0.08 + d * 3.2 * hK;
            m4.makeScale(1, h, 1).setPosition(c.x, 0, c.z);
            mesh.setMatrixAt(i, m4);
            if (d < 0.08) col.copy(base);
            else if (ratio < 1.15) col.copy(mint).lerp(base, 0.3);
            else if (ratio < 1.6) col.copy(amber);
            else col.copy(coral);
            // antes de comparar: solo los pedidos (más pedidos = más ámbar)
            if (cK < 0.999) col.lerp(new THREE.Color(base).lerp(amber, Math.min(1, d * 1.4 * hK)), 1 - cK);
            mesh.setColorAt(i, col);
            if (d > 0.4 && ratio > maxR) { maxR = ratio; maxI = i; }
          });
          mesh.instanceMatrix.needsUpdate = true;
          mesh.instanceColor!.needsUpdate = true;
          const hc = cells[maxI];
          surge.visible = priceLabel && maxR > 1.6 && cK > 0.6;
          surge.position.set(hc.x, 0.08 + field(D, hc.x, hc.z) * 3.2 * hK + 1.6, hc.z);
          cars.visible = cK > 0.3;
          // autos persiguen la oferta (rezagada)
          carPos.forEach((p, i) => {
            const target = S[i % 3], o = carOrbit[i], ang = t * o.w + o.ph;
            const gx = target.x + carOff[i].x + Math.cos(ang) * o.r, gz = target.z + carOff[i].y + Math.sin(ang) * o.r;
            const dx = gx - p.x, dz = gz - p.y;
            p.x += dx * 0.04; p.y += dz * 0.04;
            if (dx * dx + dz * dz > 1e-5) {
              const want = Math.atan2(-dz, dx);
              let d = want - carYaw[i]; d = Math.atan2(Math.sin(d), Math.cos(d));
              carYaw[i] += d * 0.12;
            }
            const y = 0.08 + field(D, p.x, p.y) * 3.2 * hK;
            q.setFromAxisAngle(up, carYaw[i]);
            m4.compose(v3.set(p.x, y, p.y), q, one);
            bodies.setMatrixAt(i, m4); glass.setMatrixAt(i, m4); wheels.setMatrixAt(i, m4); heads.setMatrixAt(i, m4); tails.setMatrixAt(i, m4);
          });
          for (const m of [bodies, glass, wheels, heads, tails]) m.instanceMatrix.needsUpdate = true;
          camera.position.x = Math.sin(t * 0.05) * 6;
          camera.lookAt(0, 0, 2);
        },
      };
    },
    { bloom: 0.3 },
  );
  // bordes fundidos: la escena se mezcla con el fondo de la diapositiva, sin recuadro
  return <div ref={ref} className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_78%)]" aria-hidden />;
}
