import styles from "@/components/productDetails/productDetails.module.scss";

import { ProductGallery } from "@/components/productGallery/ProductGallery";
import { ProductInfo } from "@/components/productInfo/ProductInfo";

import type { IProduct } from "@/types";

interface IProps {
  data: IProduct;
  countInCart?: number;
}

export function ProductDetails({ data, countInCart }: IProps) {
  return (
    <article className={styles.product_details}>
      <div className={styles.product_details_content}>
        <ProductGallery images={data.images} />

        <ProductInfo data={data} countInCart={countInCart} />
      </div>
    </article>
  );
}
