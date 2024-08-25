import styles from "@/components/cartDetails/cartDetails.module.scss";
import cn from "clsx";

import { CartFormFallback } from "../cartForm";
import { CartTotalFallback } from "../cartTotal";

export function CartDetailsFallback() {
  return (
    <div className={styles.cart_details}>
      <div className={cn(styles.cart_details_title, styles.loading)}>
        <span></span>
      </div>

      <div className={styles.cart_details_content}>
        <CartFormFallback />
        <CartTotalFallback />
      </div>
    </div>
  );
}
