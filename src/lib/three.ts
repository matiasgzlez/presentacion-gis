import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

export { THREE };

export const COL = {
  night: 0x060a12,
  mint: 0x3cf2b5,
  coral: 0xff7a59,
  amber: 0xffc24b,
  sky: 0x5ab4ff,
  violet: 0xa98bff,
  snow: 0xeaf0fb,
  line: 0x1e2c44,
  line2: 0x2a3b58,
};

export type SceneCtx = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  el: HTMLDivElement;
};
export type SceneApi = {
  /** t: segundos desde que la escena es visible; dt: delta */
  update?: (t: number, dt: number) => void;
  dispose?: () => void;
};

/** Visible mientras el elemento esté (casi) en pantalla. Se desmonta al alejarse para no acumular contextos WebGL. */
export function useOnScreen(ref: RefObject<Element | null>, margin = "20%") {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => setOn(e[0].isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return on;
}

/**
 * Monta una escena three.js en `ref` cuando entra en pantalla.
 * `init` arma la escena y devuelve update/dispose. `bloom` agrega el brillo de neón.
 */
export function useThreeScene(
  ref: RefObject<HTMLDivElement | null>,
  init: (ctx: SceneCtx) => SceneApi,
  opts: { fov?: number; bloom?: number; deps?: unknown[] } = {},
) {
  const on = useOnScreen(ref);
  const apiRef = useRef<SceneApi | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(opts.fov ?? 40, 1, 0.1, 2000);
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), opts.bloom ?? 0.6, 0.5, 0.42);
    if (opts.bloom !== 0) composer.addPass(bloom);
    composer.addPass(new OutputPass());

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      composer.setSize(w, h);
      bloom.resolution.set(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const api = init({ scene, camera, renderer, el });
    apiRef.current = api;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let raf = 0;
    let t = 0;
    const loop = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      t += reduce ? dt * 0.25 : dt;
      api.update?.(t, dt);
      composer.render();
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      api.dispose?.();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose?.();
      });
      composer.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, ...(opts.deps ?? [])]);
  return apiRef;
}

/* ——— utilidades ——— */

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** lon/lat → punto sobre una esfera de radio r */
export function lonLatToVec3(lon: number, lat: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
}

/** Línea gruesa simple (tubo) a partir de puntos. */
export function tube(points: THREE.Vector3[], radius: number, color: number, opacity = 1) {
  const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0);
  const g = new THREE.TubeGeometry(curve, Math.max(8, points.length * 6), radius, 6, false);
  const m = new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity });
  return new THREE.Mesh(g, m);
}

/** Polilínea de segmentos rectos como tubo (para rutas en grilla). */
export function polyTube(points: THREE.Vector3[], radius: number, color: number) {
  const path = new THREE.CurvePath<THREE.Vector3>();
  for (let i = 1; i < points.length; i++) path.add(new THREE.LineCurve3(points[i - 1], points[i]));
  const g = new THREE.TubeGeometry(path as unknown as THREE.Curve<THREE.Vector3>, Math.max(16, points.length * 4), radius, 6, false);
  return new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color }));
}

/** Sprite de texto (etiquetas 3D). */
export function textSprite(text: string, color = "#eaf0fb", size = 48, bg = "rgba(6,10,18,0.75)") {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d")!;
  ctx.font = `600 ${size}px Geist, sans-serif`;
  const w = Math.ceil(ctx.measureText(text).width) + size;
  c.width = w;
  c.height = size * 1.6;
  ctx.font = `600 ${size}px Geist, sans-serif`;
  if (bg) {
    ctx.fillStyle = bg;
    const r = size * 0.35;
    ctx.beginPath();
    ctx.roundRect(0, 0, w, c.height, r);
    ctx.fill();
  }
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.fillText(text, size / 2, c.height / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
  s.scale.set(w / c.height, 1, 1);
  s.renderOrder = 10;
  return s;
}

/** Grilla de calles tenue sobre el plano XZ. */
export function streetGrid(size: number, step: number, color = COL.line2, opacity = 0.6) {
  const pts: number[] = [];
  for (let x = -size; x <= size; x += step) pts.push(x, 0, -size, x, 0, size);
  for (let z = -size; z <= size; z += step) pts.push(-size, 0, z, size, 0, z);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
}

/** Hexágono plano (para H3 y zonas). */
export function hexShape(r: number) {
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  return s;
}
