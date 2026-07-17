"use client";

import { useEffect, useState } from "react";
import styles from "./SplashScreen.module.css";

const HOLD_MS = 2300; // how long the splash stays before it starts fading
const FADE_MS = 750; // must match the exit transition in the module CSS

/**
 * Full-screen intro shown once per page load, styled after the hero:
 * garden-green radial, cream badge logo brewing in with steam, then a
 * gentle fade into the site. Tap/click skips it; prefers-reduced-motion
 * gets a brief static frame instead of the animated sequence.
 */
export default function SplashScreen() {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 900 : HOLD_MS;
    const exitTimer = setTimeout(() => setExiting(true), hold);
    const doneTimer = setTimeout(() => setDone(true), hold + FADE_MS);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (done) return null;

  const skip = () => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => setDone(true), FADE_MS);
  };

  return (
    <div
      className={`${styles.splash} ${exiting ? styles.exit : ""}`}
      onClick={skip}
      role="presentation"
      aria-hidden="true"
    >
      <div className={styles.glow} />

      <div className={styles.leaf1} />
      <div className={styles.leaf2} />
      <div className={styles.leaf3} />

      <div className={styles.center}>
        <div className={styles.badgeWrap}>
          <div className={styles.ring} />
          <div className={`${styles.steam} ${styles.steamA}`} />
          <div className={`${styles.steam} ${styles.steamB}`} />
          <img src="/img/logo-cream.webp" alt="" className={styles.badge} />
        </div>
        <div className={styles.rule} />
        <div className={styles.eyebrow}>Est 2020 &mdash; Bintaro</div>
        <div className={styles.tagline}>Secangkir tenang di tengah kebun kota</div>
      </div>

      <div className={styles.progress}>
        <span className={styles.progressFill} />
      </div>
    </div>
  );
}
