import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.halo} />
      <div className={styles.content} data-reveal>
        <img
          src="/img/logo-cream.webp"
          alt="Kopi Kebun Bintaro"
          className={styles.logo}
          data-reveal-item
        />
        <p className={styles.farewell} data-reveal-item>
          Sampai jumpa lagi di kebun.
        </p>
        <div className={styles.dots} data-reveal-item>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.handle} data-reveal-item>
          <a
            href="https://www.instagram.com/kopikebun.bintaro"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.handleLink}
          >
            @kopikebun.bintaro
          </a>{" "}
          · Harga dalam ribuan Rupiah (K)
        </div>
      </div>
    </footer>
  );
}
