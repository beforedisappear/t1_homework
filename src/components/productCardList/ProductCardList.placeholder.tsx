import styles from "./productCardList.module.scss";

export function ProductCardListPlaceholder() {
  return <span className={styles.no_items}>No items</span>;
}
