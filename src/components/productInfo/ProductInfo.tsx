import styles from "@/components/productInfo/productInfo.module.scss";
import Star from "@/assets/icons/productInfo/star.svg?svgr";

export function ProductInfo() {
  return (
    <div className={styles.product_info}>
      <div className={styles.product_info_common}>
        <h1>Essence Mascara Lash Princess</h1>

        <div className={styles.product_info_about}>
          <div className={styles.product_info_rating}>
            <Star className={styles.product_info_rating_star} />
            <Star className={styles.product_info_rating_star} />
            <Star className={styles.product_info_rating_star} />
            <Star className={styles.product_info_rating_star} />
            <Star className={styles.product_info_rating_star} />
          </div>

          <span className={styles.product_info_category}>
            electronics, selfie accessories
          </span>
        </div>
      </div>

      <span className={styles.product_info_count}>In Stock - Only 5 left!</span>

      <p className={styles.product_info_description}>
        The Essence Mascara Lash Princess is a popular mascara known for its
        volumizing and lengthening effects. Achieve dramatic lashes with this
        long-lasting and cruelty-free formula.
      </p>

      <div className={styles.product_info_details}>
        <span>1 month warranty</span>
        <span>Ships in 1 month</span>
      </div>

      <div className={styles.product_info_buy}>
        <div className={styles.product_info_prices}>
          <div className={styles.product_info_price}>
            <span className={styles.product_info_price_final_value}>$7.17</span>
            <span className={styles.product_info_price_pre_value}>$9.99</span>
          </div>

          <div className={styles.product_info_discount}>
            <span className={styles.product_info_discount_title}>
              Your discount:
            </span>
            <span className={styles.product_info_discount_value}>14.5%</span>
          </div>
        </div>

        <button className="primary_btn">Add to cart</button>
      </div>
    </div>
  );
}
