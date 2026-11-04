import { useRef } from "react";
import { COL, THREE, lonLatToVec3, useThreeScene } from "@/lib/three";
import { loadJSON } from "@/lib/map";

/* Starlink: miles de satélites en órbita baja. Un camión en una ruta sin señal celular sigue reportando su posición. */

const RG = 5;
const TRUCK = { lon: -61.2, lat: -24.9 }; // ruta en el Impenetrable chaqueño
const CITIES = [[-58.38, -34.6], [-64.18, -31.42], [-60.65, -32.95], [-68.84, -32.89], [-58.98, -27.46], [-65.22, -26.82]];

export function StarlinkScene() {
  const ref = useRef<HTMLDivElement>(null);
  useThreeScene(
    ref,
    ({ scene, camera }) => {
      camera.position.set(0, -0.5, 15.5);
      const globe = new THREE.Group();
      scene.add(globe);
      globe.add(new THREE.Mesh(new THREE.SphereGeometry(RG * 0.995, 64, 64), new THREE.MeshBasicMaterial({ color: 0x08101e })));
      // atmósfera
      const atm = new THREE.Mesh(
        new THREE.SphereGeometry(RG * 1.06, 64, 64),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          uniforms: { c: { value: new THREE.Color(COL.sky) } },
          vertexShader: "varying vec3 n; void main(){ n = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }",
          fragmentShader: "uniform vec3 c; varying vec3 n; void main(){ float a = pow(0.75 - dot(n, vec3(0.,0.,1.)), 3.); gl_FragColor = vec4(c, a*0.55); }",
        }),
      );
      scene.add(atm);
      let alive = true;
      loadJSON<number[][]>("/data/land.json").then((land) => {
        if (!alive) return;
        const pos = new Float32Array(land.length * 3);
        land.forEach(([lon, lat], i) => lonLatToVec3(lon, lat, RG).toArray(pos, i * 3));
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        globe.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0x3a5478, size: 0.07, sizeAttenuation: true })));
      });
      // ciudades con cobertura celular
      CITIES.forEach(([lon, lat]) => {
        const v = lonLatToVec3(lon, lat, RG * 1.002);
        const ring = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.3, 32), new THREE.MeshBasicMaterial({ color: COL.line2, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
        ring.position.copy(v);
        ring.lookAt(v.clone().multiplyScalar(2));
        globe.add(ring);
      });
      // camión
      const tv = lonLatToVec3(TRUCK.lon, TRUCK.lat, RG * 1.01);
      const truck = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), new THREE.MeshBasicMaterial({ color: COL.mint }));
      truck.position.copy(tv);
      globe.add(truck);
      const tRing = new THREE.Mesh(new THREE.RingGeometry(0.14, 0.2, 32), new THREE.MeshBasicMaterial({ color: COL.mint, transparent: true, side: THREE.DoubleSide }));
      tRing.position.copy(tv);
      tRing.lookAt(tv.clone().multiplyScalar(2));
      globe.add(tRing);

      // satélites: varias órbitas inclinadas
      const N = 520;
      const sats = new THREE.InstancedMesh(new THREE.SphereGeometry(0.06, 6, 6), new THREE.MeshBasicMaterial({ color: COL.snow }), N);
      scene.add(sats);
      const orb = Array.from({ length: N }, (_, i) => ({ plane: i % 26, phase: (i / N) * Math.PI * 2 * 20 + (i % 26) * 0.3, inc: 0.93 }));
      const RS = RG * 1.12;
      const tmp = new THREE.Object3D();
      const satPos = (o: (typeof orb)[number], t: number, out: THREE.Vector3) => {
        const a = o.phase + t * 0.12;
        const raan = (o.plane / 26) * Math.PI * 2;
        out.set(Math.cos(a) * RS, Math.sin(a) * Math.sin(o.inc) * RS, Math.sin(a) * Math.cos(o.inc) * RS);
        out.applyAxisAngle(new THREE.Vector3(0, 1, 0), raan);
        return out;
      };
      // enlace camión → satélite → estación
      const linkMat = new THREE.LineBasicMaterial({ color: COL.mint });
      const link = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]), linkMat);
      scene.add(link);
      const gs = lonLatToVec3(-58.38, -34.6, RG * 1.005);
      const v = new THREE.Vector3();
      const wTruck = new THREE.Vector3();
      const wGs = new THREE.Vector3();

      globe.rotation.y = -0.52;
      globe.rotation.x = -0.5;
      return {
        update: (t) => {
          globe.rotation.y = -0.52 + Math.sin(t * 0.07) * 0.3;
          globe.updateMatrixWorld();
          wTruck.copy(tv).applyMatrix4(globe.matrixWorld);
          wGs.copy(gs).applyMatrix4(globe.matrixWorld);
          let best = 0, bd = Infinity;
          for (let i = 0; i < N; i++) {
            satPos(orb[i], t, v);
            tmp.position.copy(v);
            tmp.updateMatrix();
            sats.setMatrixAt(i, tmp.matrix);
            const d = v.distanceToSquared(wTruck);
            if (d < bd) { bd = d; best = i; }
          }
          sats.instanceMatrix.needsUpdate = true;
          satPos(orb[best], t, v);
          const p = link.geometry.attributes.position as THREE.BufferAttribute;
          p.setXYZ(0, wTruck.x, wTruck.y, wTruck.z);
          p.setXYZ(1, v.x, v.y, v.z);
          p.setXYZ(2, wGs.x, wGs.y, wGs.z);
          p.needsUpdate = true;
          linkMat.opacity = 0.6 + 0.4 * Math.sin(t * 6);
          linkMat.transparent = true;
          const k = (t * 0.8) % 1;
          tRing.scale.setScalar(1 + k * 4);
          (tRing.material as THREE.MeshBasicMaterial).opacity = 1 - k;
        },
        dispose: () => {
          alive = false;
        },
      };
    },
    { bloom: 0.6, fov: 36 },
  );
  return <div ref={ref} className="absolute inset-0" aria-hidden />;
}
