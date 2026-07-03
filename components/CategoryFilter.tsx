"use client";

import { useState } from "react";
import { categories } from "@/lib/menu";
import { useScrollSpy, scrollToSection } from "@/lib/useScrollSpy";
import styles from "./CategoryFilter.module.css";

export default function CategoryFilter() {
  const active = useScrollSpy();
  const [filterOpen, setFilterOpen] = useState(false);

  const jump = (id: string) => {
    scrollToSection(id);
    setFilterOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Filter kategori"
        className={`${styles.fab} ${filterOpen ? styles.fabHidden : ""}`}
        onClick={() => setFilterOpen(true)}
      >
        <span className={styles.fabLines}>
          <span className={`${styles.fabLine} ${styles.fabLine1}`} />
          <span className={`${styles.fabLine} ${styles.fabLine2}`} />
          <span className={`${styles.fabLine} ${styles.fabLine3}`} />
        </span>
        <span className={styles.fabLabel}>Kategori</span>
      </button>

      <div
        className={`${styles.backdrop} ${filterOpen ? styles.backdropOpen : ""}`}
        onClick={() => setFilterOpen(false)}
      />

      <div className={`${styles.sheet} ${filterOpen ? styles.sheetOpen : ""}`}>
        <div className={styles.handle} />
        <div className={styles.head}>
          <span className={styles.title}>Pilih Kategori</span>
          <button
            type="button"
            aria-label="Tutup"
            className={styles.close}
            onClick={() => setFilterOpen(false)}
          >
            ×
          </button>
        </div>
        <div className={styles.pills}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              data-cat={cat.id}
              className={`${styles.pill} ${cat.id === active ? styles.pillActive : ""}`}
              onClick={() => jump(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
