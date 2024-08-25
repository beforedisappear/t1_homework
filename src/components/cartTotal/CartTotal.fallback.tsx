import styles from "./cartTotal.module.scss";
import cn from "clsx";

export function CartTotalFallback() {
  return <div className={cn(styles.cart_total, styles.loading)}></div>;
}
