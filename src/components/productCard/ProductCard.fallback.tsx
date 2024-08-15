import styles from "./productCard.module.scss";
import cn from "clsx";

export function ProductCardFallback() {
  return (
    <li className={cn(styles.product_card, styles.loading)}>
      <div className={styles.product_card_img}></div>
      <div className={styles.product_card_content}></div>
    </li>
  );
}
