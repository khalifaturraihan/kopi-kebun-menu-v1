import { signature } from "@/lib/menu";
import styles from "./SignatureSpread.module.css";

export default function SignatureSpread() {
  return (
    <section data-sec="signature" className={styles.spread}>
      <div className={styles.halo} />
      <img src="/img/signature.webp" alt="Signature" className={`${styles.photo} anim-floatsoft`} />
      <div className={styles.fade} />
      <div className={styles.content} data-reveal>
        <div className={styles.eyebrow} data-reveal-item>No. 01 — Speciality</div>
        <h2 className={styles.title} data-reveal-item>Signature</h2>
        <div className={styles.items}>
          {signature.items.map((it) => (
            <div key={it.name} className={styles.row} data-reveal-item>
              <span className={styles.name}>{it.name}</span>
              <span className={styles.leader} />
              <span className={styles.price}>{it.price}</span>
            </div>
          ))}
        </div>
        <div className={styles.note} data-reveal-item>
          Gula aren asli & pandan segar — resep rumah yang paling dicari.
        </div>
      </div>
    </section>
  );
}
