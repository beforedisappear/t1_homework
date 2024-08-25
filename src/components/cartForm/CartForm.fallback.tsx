import styles from "./cartForm.module.scss";
import cn from "clsx";

export function CartFormFallback() {
  return <div className={cn(styles.cart_form, styles.loading)}></div>;
}
