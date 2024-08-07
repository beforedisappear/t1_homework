import styles from "./hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero_content}>
        <span className={styles.hero_background_title}>Goods4you</span>

        <p className={styles.hero_title}>
          {`Any products from famous brands \n with worldwide delivery`}
        </p>

        <p className={styles.hero_subtitle}>
          {`We sell smartphones, laptops, clothes, shoes \n and many other products at low prices`}
        </p>

        <button>Go to shopping</button>
      </div>
    </section>
  );
}
