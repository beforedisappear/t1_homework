import styles from "./cartForm.module.scss";
import { CartFormItem } from "../cardFormItem/CartFormItem";

export function CartForm() {
  return (
    <section className={styles.cart_form}>
      {new Array(4).fill("_").map((_, i) => (
        <CartFormItem key={`cart_item_${i}`} index={i} />
      ))}
    </section>
  );
}
