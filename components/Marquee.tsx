import { marqueeText } from "@/lib/menu";
import styles from "./Marquee.module.css";

export default function Marquee() {
  return (
    <div className={styles.strip}>
      <div className={`${styles.track} anim-marquee`}>
        <span className={styles.text}>{marqueeText}</span>
        <span aria-hidden="true" className={styles.text}>
          {marqueeText}
        </span>
      </div>
    </div>
  );
}
