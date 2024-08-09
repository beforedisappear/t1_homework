import styles from "./productCardList.module.scss";

import { ProductCard } from "@/components/productCard/ProductCard";

import { v4 as uuidv4 } from "uuid";

export function ProductCardList() {
  return (
    <>
      <ul className={styles.product_card_list}>
        {new Array(12).fill("_").map((_, i) => (
          <ProductCard key={uuidv4()} index={i} />
        ))}
      </ul>

      <button className="primary_btn">show more</button>
    </>
  );
}
