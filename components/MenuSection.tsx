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
      <span className={`${styles.num} ${isFood ? styles.numFood : ""}`}>
        {category.num}
      </span>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{category.name}</h2>
          {category.isNew && <span className={styles.badge}>Baru</span>}
        </div>
        {category.note && <p className={styles.note}>{category.note}</p>}

        {category.photo && (
          <div className={styles.photoWrap}>
            <div className={`${styles.halo} ${isFood ? styles.haloFood : ""}`} />
            <Image
              src={category.photo}
              alt={category.name}
              className={`${styles.photo} ${isFood ? "anim-floatsoft-7" : "anim-floatsoft"}`}
              sizes="300px"
            />
          </div>
        )}

        <div className={styles.items}>
          {category.items.map((it) => (
            <div key={it.name}>
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
