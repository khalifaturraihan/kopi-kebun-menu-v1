"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./LogoCoin3D.module.css";

/**
 * The Kopi Kebun badge rendered as a slowly spinning 3D coin: the cream
 * logo on both faces of a deep-green medallion with a brass rim. The coin
 * floats gently, tilts toward the pointer, and is backed by a warm halo
 * with cream dust specks drifting upward. Under prefers-reduced-motion a
 * single static frame is rendered instead of the animation loop.
 */
export default function LogoCoin3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      34,
      mount.clientWidth / mount.clientHeight,
      0.1,
      50
    );
    camera.position.z = 6;

    scene.add(new THREE.AmbientLight(0xf3ecdb, 0.85));
    const key = new THREE.DirectionalLight(0xffe9c4, 1.6);
    key.position.set(2.5, 3, 4);
    scene.add(key);
    const rimLight = new THREE.PointLight(0x96b46e, 1.2, 12);
    rimLight.position.set(-3, -1, 2);
    scene.add(rimLight);

    const coin = new THREE.Group();
    scene.add(coin);

    const RADIUS = 1.3;
    const THICKNESS = 0.12;
    // Sit the coin low in the canvas, like the drink photos did
    // (object-position: bottom), so it clears the hero tagline above.
    const BASE_Y = -0.45;

    // Coin body: brass rim around deep-green faces.
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xb98d4f,
      metalness: 0.6,
      roughness: 0.35,
    });
    const faceMat = new THREE.MeshStandardMaterial({
      color: 0x24452f,
      metalness: 0.1,
      roughness: 0.6,
    });
    const bodyGeo = new THREE.CylinderGeometry(RADIUS, RADIUS, THICKNESS, 64);
    const body = new THREE.Mesh(bodyGeo, [rimMat, faceMat, faceMat]);
    body.rotation.x = Math.PI / 2;
    coin.add(body);

    // Cream badge artwork on both faces.
    const logoTexture = new THREE.TextureLoader().load(
      "/img/logo-cream.webp",
      () => {
        if (reduce) renderer.render(scene, camera);
      }
    );
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
    });
    const logoGeo = new THREE.CircleGeometry(RADIUS * 0.94, 64);
    const front = new THREE.Mesh(logoGeo, logoMat);
    front.position.z = THICKNESS / 2 + 0.005;
    coin.add(front);
    const back = new THREE.Mesh(logoGeo, logoMat);
    back.rotation.y = Math.PI;
    back.position.z = -(THICKNESS / 2 + 0.005);
    coin.add(back);

    // Soft warm halo behind the coin. Keep it smaller than the camera
    // frustum: if it reaches the canvas edges the additive gradient gets
    // clipped into a visible bright rectangle.
    const haloCanvas = document.createElement("canvas");
    haloCanvas.width = haloCanvas.height = 128;
    const hctx = haloCanvas.getContext("2d")!;
    const grad = hctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(214, 190, 130, 0.55)");
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
    halo.position.set(0, BASE_Y, -1.2);
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
      targetTiltX = (e.clientY / window.innerHeight - 0.5) * 0.35;
      targetTiltZ = (e.clientX / window.innerWidth - 0.5) * -0.2;
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

      coin.rotation.y = t * 0.55;
      coin.rotation.x += (targetTiltX - coin.rotation.x) * 0.05;
      coin.rotation.z += (targetTiltZ - coin.rotation.z) * 0.05;
      coin.position.y = BASE_Y + Math.sin(t * 0.9) * 0.12;

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
      // Static pose, single frame (re-rendered when the texture arrives).
      coin.rotation.y = -0.35;
      coin.position.y = BASE_Y;
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
      bodyGeo.dispose();
      logoGeo.dispose();
      speckGeo.dispose();
      rimMat.dispose();
      faceMat.dispose();
      logoMat.dispose();
      haloMat.dispose();
      speckMat.dispose();
      logoTexture.dispose();
      haloTexture.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={styles.stage} aria-hidden="true" />;
}
