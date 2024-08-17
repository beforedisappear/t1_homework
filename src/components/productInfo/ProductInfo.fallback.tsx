import styles from "@/components/productInfo/productInfo.module.scss";
import cn from "clsx";

export function ProductInfoFallback() {
  return (
    <div className={styles.product_info}>
      <div className={cn(styles.product_info_common, styles.loading)}></div>

      <div className={cn(styles.product_info_count, styles.loading)}></div>

      <div
        className={cn(styles.product_info_description, styles.loading)}
      ></div>

      <div className={cn(styles.product_info_buy, styles.loading)}></div>
    </div>
  );
}
