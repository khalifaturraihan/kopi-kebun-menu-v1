import Image from "next/image";
import dimsumPhoto from "@/public/img/dimsum.webp";
import styles from "./PhotoBand.module.css";

export default function PhotoBand() {
  return (
    <section className={styles.band}>
      <Image src={dimsumPhoto} alt="" fill sizes="520px" className={`${styles.photo} anim-pan`} />
      <div className={styles.overlay} />
      <div className={styles.content} data-reveal>
        <div className={styles.eyebrow} data-reveal-item>Dari Dapur</div>
        <h2 className={styles.title} data-reveal-item>
          Gigitan kecil,
          <br />
          sepanjang hari
        </h2>
        <div className={styles.subcopy} data-reveal-item>
          Camilan goreng renyah, roti panggang, nasi & mie — teman setia secangkir
          kopi.
        </div>
      </div>
    </section>
  );
}
