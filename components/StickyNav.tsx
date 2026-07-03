"use client";

import { useEffect, useRef } from "react";
import { categories } from "@/lib/menu";
import { useScrollSpy, scrollToSection } from "@/lib/useScrollSpy";
import styles from "./StickyNav.module.css";

export default function StickyNav() {
  const active = useScrollSpy();
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const pill = nav?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (nav && pill) {
      nav.scrollTo({
        left: pill.offsetLeft - nav.clientWidth / 2 + pill.offsetWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <nav className={styles.wrap}>
      <div ref={navRef} className={styles.nav}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            data-cat={cat.id}
            className={`${styles.pill} ${cat.id === active ? styles.pillActive : ""}`}
            onClick={() => scrollToSection(cat.id)}
          >
            {cat.nav}
          </button>
        ))}
      </div>
    </nav>
  );
}
