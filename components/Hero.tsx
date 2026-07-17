"use client";

import { useEffect, useRef } from "react";
import LogoCoin3D from "./LogoCoin3D";
import styles from "./Hero.module.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const layers = Array.from(hero.querySelectorAll<HTMLElement>("[data-depth]"));

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      layers.forEach((l) => {
        const d = parseFloat(l.getAttribute("data-depth") ?? "0") || 0;
        l.style.transform = `translate(${(nx * d).toFixed(1)}px,${(ny * d).toFixed(1)}px)`;
      });
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    const onLeave = () => {
      layers.forEach((l) => {
        l.style.transform = "";
      });
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header ref={heroRef} className={styles.hero}>
      <div className={`${styles.glow} anim-glow`} />
      <div className={styles.spotlight} />

      <div data-depth="22" className={`${styles.leaf} ${styles.leaf1} anim-leaf-1`} />
      <div data-depth="34" className={`${styles.leaf} ${styles.leaf2} anim-leaf-2`} />
      <div data-depth="16" className={`${styles.leaf} ${styles.leaf3} anim-leaf-3`} />
      <div data-depth="28" className={`${styles.leaf} ${styles.leaf4} anim-leaf-4`} />

      <div className={styles.topBar}>
        <img src="/img/logo-cream.webp" alt="Kopi Kebun" className={styles.topLogo} />
        <span className={styles.topLabel}>Bintaro</span>
      </div>

      <div data-depth="-10" className={styles.center}>
        <div className={styles.beanWrap}>
          <div className={`${styles.steam} ${styles.steam1} anim-steam-1`} />
          <div className={`${styles.steam} ${styles.steam2} anim-steam-2`} />
          <img src="/img/logo-bean.webp" alt="" className={`${styles.bean} anim-breathe`} />
        </div>
        <div className={styles.eyebrow}>Est 2020</div>
        <div className={styles.wordmark}>
          Kopi
          <br />
          Kebun
        </div>
        <div className={styles.tagline}>
          Secangkir tenang di tengah kebun kota — diseduh perlahan, dinikmati tanpa
          terburu.
        </div>
      </div>

      <div data-depth="40" className={styles.drinkWrap}>
        <LogoCoin3D />
        <div className={styles.drinkShadow} />
      </div>

      <div className={`${styles.cue} anim-bob`}>
        <span className={styles.cueLabel}>Daftar Menu</span>
        <span className={styles.cueChevron} />
      </div>
    </header>
  );
}
