import styles from "@/components/cartTotal/cartTotal.module.scss";

import type { ICart } from "@/types";

interface IProps {
  data: ICart;
}

export function CartTotal({ data }: IProps) {
  return (
    <section className={styles.cart_total}>
      <div className={styles.cart_total_common}>
        <div className={styles.cart_total_common_count}>
          <span>Total count</span>
          <span>{`${data.totalProducts} items`}</span>
        </div>
        <div className={styles.cart_total_common_price_wo_discount}>
          <span>Price without discount</span>
          <span>{`$${data.discountedTotal}`}</span>
        </div>
      </div>
      <div className={styles.cart_total_price}>
        <span>Total price</span>
        <span>{`$${data.total}`}</span>
      </div>
    </section>
  );
}
