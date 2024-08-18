import styles from "@/components/productDetails/productDetails.module.scss";
import { ProductGallery } from "@/components/productGallery/ProductGallery";
import { ProductInfo } from "@/components/productInfo/ProductInfo";

export function ProductDetails() {
  return (
    <article className={styles.product_details}>
      <div className={styles.product_details_content}>
        <ProductGallery />
        <ProductInfo />
      </div>
    </article>
  );
}
