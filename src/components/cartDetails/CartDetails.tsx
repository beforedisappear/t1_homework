import styles from "@/components/cartDetails/cartDetails.module.scss";

import { CartForm } from "@/components/cartForm/CartForm";
import { CartTotal } from "@/components/cartTotal/CartTotal";

export function CartDetails() {
  return (
    <article className={styles.cart_details}>
      <h1>My cart</h1>

      <div className={styles.cart_details_content}>
        <CartForm />
        <CartTotal />
      </div>
    </article>
  );
}
