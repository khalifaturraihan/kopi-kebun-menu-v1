import Image from "next/image";
import type { NumberedCategory } from "@/lib/menu";
import styles from "./MenuSection.module.css";

type Props = {
  category: NumberedCategory;
  variant: "drinks" | "food";
};

export default function MenuSection({ category, variant }: Props) {
  const isFood = variant === "food";

  return (
    <section data-sec={category.id} className={styles.section}>
      <span
        className={`${styles.num} ${isFood ? styles.numFood : ""}`}
        data-parallax
      >
        {category.num}
      </span>
      <div className={styles.content} data-reveal>
        <div className={styles.titleRow} data-reveal-item>
          <h2 className={styles.title}>{category.name}</h2>
          {category.isNew && <span className={styles.badge}>Baru</span>}
        </div>
        {category.note && (
          <p className={styles.note} data-reveal-item>
            {category.note}
          </p>
        )}

        {category.photo && (
          <div className={styles.photoWrap} data-reveal-item>
            <div className={`${styles.halo} ${isFood ? styles.haloFood : ""}`} />
            <Image
              src={category.photo}
              alt={category.name}
              className={`${styles.photo} ${category.id === "tea" ? styles.photoTea : ""} ${
                isFood ? "anim-floatsoft-7" : "anim-floatsoft"
              }`}
              sizes="350px"
            />
          </div>
        )}

        <div className={styles.items}>
          {category.items.map((it) => (
            <div key={it.name} data-reveal-item>
              <div className={styles.row}>
                <span className={styles.name}>{it.name}</span>
                <span className={styles.leader} />
                <span className={styles.price}>{it.price}</span>
              </div>
              {it.desc && (
                <div className={`${styles.desc} ${isFood ? styles.descFood : ""}`}>
                  {it.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
