import styles from "@/components/productDetails/productDetails.module.scss";

import { ProductGalleryFallback } from "../productGallery";
import { ProductInfoFallback } from "../productInfo";

export function ProductDetailsFallback() {
  return (
    <div className={styles.product_details}>
      <div className={styles.product_details_content}>
        <ProductGalleryFallback />

        <ProductInfoFallback />
      </div>
    </div>
  );
}
