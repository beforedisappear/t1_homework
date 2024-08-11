import styles from "@/components/cartTotal/cartTotal.module.scss";

export function CartTotal() {
  return (
    <section className={styles.cart_total}>
      <div className={styles.cart_total_common}>
        <div className={styles.cart_total_common_count}>
          <span>Total count</span>
          <span>3 items</span>
        </div>
        <div className={styles.cart_total_common_price_wo_discount}>
          <span>Price without discount</span>
          <span>$700</span>
        </div>
      </div>
      <div className={styles.cart_total_price}>
        <span>Total price</span>
        <span>$590</span>
      </div>
    </section>
  );
}
