import styles from "./hero.module.scss";
import cn from "clsx";

import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.hero_content}>
        <h1 className={styles.hero_background_title}>Goods4you</h1>

        <p className={styles.hero_title}>
          {`Any products from famous brands \n with worldwide delivery`}
        </p>

        <p className={styles.hero_subtitle}>
          {`We sell smartphones, laptops, clothes, shoes \n and many other products at low prices`}
        </p>

        <button
          onClick={() => navigate("/", { state: { to: "catalog" } })}
          className={cn(styles.hero_btn, "primary_btn")}
        >
          Go to shopping
        </button>
      </div>
    </section>
  );
}
