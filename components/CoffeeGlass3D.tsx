"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import styles from "./CoffeeGlass3D.module.css";

/**
 * Es kopi gula aren rendered procedurally with three.js: a tapered glass
 * (transmission material) holding the three signature layers — dark palm
 * sugar at the base, cream milk band, caramel coffee on top — with ice
 * cubes floating at the surface. The drink turns slowly like a display
 * turntable, bobs gently, and tilts toward the pointer. Cream dust specks
 * and a warm halo match the hero mood. Under prefers-reduced-motion a
 * single static frame is rendered instead of the animation loop.
 */
export default function CoffeeGlass3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      34,
      mount.clientWidth / mount.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 0.2, 6);

    // Soft studio reflections so the glass reads as glass.
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    scene.environmentIntensity = 0.55;

    scene.add(new THREE.AmbientLight(0xf3ecdb, 0.5));
    const key = new THREE.DirectionalLight(0xffe9c4, 1.1);
    key.position.set(2.5, 3, 4);
    scene.add(key);
    const rimLight = new THREE.PointLight(0x96b46e, 1.0, 12);
    rimLight.position.set(-3, -1, 2);
    scene.add(rimLight);

    const drink = new THREE.Group();
    scene.add(drink);

    // Sit the drink low in the canvas, like the old photos did
    // (object-position: bottom), so it clears the hero tagline above.
    const BASE_Y = -0.4;

    const GLASS_H = 2.3;
    const TOP_R = 0.68;
    const BOT_R = 0.48;

    // Glass wall
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      transparent: true,
      opacity: 1,
      roughness: 0.06,
      metalness: 0,
      thickness: 0.08,
      ior: 1.45,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const glassGeo = new THREE.CylinderGeometry(TOP_R, BOT_R, GLASS_H, 48, 1, true);
    const glass = new THREE.Mesh(glassGeo, glassMat);
    drink.add(glass);

    // Glass base (solid puck of the same material)
    const baseGeo = new THREE.CylinderGeometry(BOT_R, BOT_R * 0.96, 0.12, 48);
    const base = new THREE.Mesh(baseGeo, glassMat);
    base.position.y = -GLASS_H / 2 + 0.06;
    drink.add(base);

    // Liquid: vertical gradient — palm sugar base, milk band, caramel top.
    const liqCanvas = document.createElement("canvas");
    liqCanvas.width = 4;
    liqCanvas.height = 256;
    const lctx = liqCanvas.getContext("2d")!;
    const lgrad = lctx.createLinearGradient(0, 256, 0, 0); // bottom → top
    lgrad.addColorStop(0.0, "#3d1f0c"); // gula aren pekat
    lgrad.addColorStop(0.16, "#5a3013");
    lgrad.addColorStop(0.3, "#b9926a"); // blend ke susu
    lgrad.addColorStop(0.42, "#e9ddc9"); // susu
    lgrad.addColorStop(0.56, "#d9bd97");
    lgrad.addColorStop(0.75, "#bd8d58"); // kopi karamel
    lgrad.addColorStop(1.0, "#c69763");
    lctx.fillStyle = lgrad;
    lctx.fillRect(0, 0, 4, 256);
    const liqTexture = new THREE.CanvasTexture(liqCanvas);
    liqTexture.colorSpace = THREE.SRGBColorSpace;
    const liqMat = new THREE.MeshStandardMaterial({
      map: liqTexture,
      roughness: 0.35,
      metalness: 0,
    });
    const LIQ_H = GLASS_H * 0.82;
    const LIQ_TOP_R = TOP_R * 0.9;
    const liqGeo = new THREE.CylinderGeometry(LIQ_TOP_R, BOT_R * 0.88, LIQ_H, 48, 1, true);
    const liquid = new THREE.Mesh(liqGeo, liqMat);
    liquid.position.y = -(GLASS_H - LIQ_H) / 2 + 0.05;
    drink.add(liquid);

    // Liquid surface: flat caramel disc with a hint of foam sheen.
    const surfMat = new THREE.MeshStandardMaterial({
      color: 0xcf9f6c,
      roughness: 0.5,
    });
    const surfGeo = new THREE.CircleGeometry(LIQ_TOP_R, 48);
    const surface = new THREE.Mesh(surfGeo, surfMat);
    surface.rotation.x = -Math.PI / 2;
    surface.position.y = liquid.position.y + LIQ_H / 2;
    drink.add(surface);

    // Ice cubes bobbing at the surface.
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xeef4f6,
      transmission: 0.85,
      transparent: true,
      roughness: 0.15,
      thickness: 0.2,
      ior: 1.31,
    });
    const iceGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const icePlacements = [
      { x: -0.22, z: 0.12, ry: 0.6, rz: 0.3 },
      { x: 0.2, z: -0.1, ry: 1.4, rz: -0.4 },
      { x: 0.02, z: 0.26, ry: 2.3, rz: 0.15 },
    ];
    const surfaceY = surface.position.y;
    for (const p of icePlacements) {
      const cube = new THREE.Mesh(iceGeo, iceMat);
      cube.position.set(p.x, surfaceY + 0.06, p.z);
      cube.rotation.set(p.rz, p.ry, p.rz);
      drink.add(cube);
    }

    // Soft warm halo behind the drink. Keep it smaller than the camera
    // frustum: if it reaches the canvas edges the additive gradient gets
    // clipped into a visible bright rectangle.
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 128;
    const hctx = haloCanvas.getContext("2d")!;
    // Keep the halo dim: the transmissive glass magnifies whatever sits
    // behind it, so a bright center blows out the liquid layers.
    const grad = hctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(214, 190, 130, 0.22)");
    grad.addColorStop(1, "rgba(214, 190, 130, 0)");
    hctx.fillStyle = grad;
    hctx.fillRect(0, 0, 128, 128);
    const haloTexture = new THREE.CanvasTexture(haloCanvas);
    const haloMat = new THREE.SpriteMaterial({
      map: haloTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const halo = new THREE.Sprite(haloMat);
    halo.scale.setScalar(3.4);
    halo.position.set(0, BASE_Y + 0.3, -2);
    scene.add(halo);

    // Floating cream specks, like dust catching the light above a cup.
    const SPECKS = 42;
    const speckPos = new Float32Array(SPECKS * 3);
    const speckSpeed = new Float32Array(SPECKS);
    for (let i = 0; i < SPECKS; i++) {
      speckPos[i * 3] = (Math.random() - 0.5) * 3;
      speckPos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      speckPos[i * 3 + 2] = (Math.random() - 0.5) * 2 - 0.5;
      speckSpeed[i] = 0.1 + Math.random() * 0.25;
    }
    const speckGeo = new THREE.BufferGeometry();
    speckGeo.setAttribute("position", new THREE.BufferAttribute(speckPos, 3));
    const speckMat = new THREE.PointsMaterial({
      map: haloTexture,
      color: 0xf3ecdb,
      size: 0.07,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const specks = new THREE.Points(speckGeo, speckMat);
    scene.add(specks);

    // Pointer tilt: track normalized position, ease toward it in the loop.
    let targetTiltX = 0;
    let targetTiltZ = 0;
    const onPointerMove = (e: PointerEvent) => {
      targetTiltX = (e.clientY / window.innerHeight - 0.5) * 0.3;
      targetTiltZ = (e.clientX / window.innerWidth - 0.5) * -0.18;
    };
    if (!reduce) window.addEventListener("pointermove", onPointerMove);

    const start = performance.now();
    let prev = start;
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      const t = (now - start) / 1000;

      drink.rotation.y = t * 0.4;
      drink.rotation.x += (targetTiltX - drink.rotation.x) * 0.05;
      drink.rotation.z += (targetTiltZ - drink.rotation.z) * 0.05;
      drink.position.y = BASE_Y + Math.sin(t * 0.9) * 0.1;

      const pos = speckGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < SPECKS; i++) {
        let y = pos.getY(i) + speckSpeed[i] * (dt || 0.016);
        if (y > 3.2) y = -3.2;
        pos.setY(i, y);
        pos.setX(i, pos.getX(i) + Math.sin(t * 0.6 + i) * 0.0012);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      // Static pose, single frame.
      drink.rotation.y = -0.35;
      drink.position.y = BASE_Y;
      renderer.render(scene, camera);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (reduce) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      glassGeo.dispose();
      baseGeo.dispose();
      liqGeo.dispose();
      surfGeo.dispose();
      iceGeo.dispose();
      speckGeo.dispose();
      glassMat.dispose();
      liqMat.dispose();
      surfMat.dispose();
      iceMat.dispose();
      haloMat.dispose();
      speckMat.dispose();
      liqTexture.dispose();
      haloTexture.dispose();
      envTexture.dispose();
      pmrem.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={styles.stage} aria-hidden="true" />;
}
