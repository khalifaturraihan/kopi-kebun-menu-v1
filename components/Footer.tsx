import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.halo} />
      <div className={styles.content}>
        <img src="/img/logo-cream.webp" alt="Kopi Kebun Bintaro" className={styles.logo} />
        <p className={styles.farewell}>Sampai jumpa lagi di kebun.</p>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.handle}>
          @kopikebun.bintaro · Harga dalam ribuan Rupiah (K)
        </div>
      </div>
    </footer>
  );
}
