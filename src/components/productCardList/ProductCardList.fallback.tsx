import styles from "./productCardList.module.scss";

import { ProductCardFallback } from "@/components/productCard";

import { v4 as uuidv4 } from "uuid";

interface IProps {
  withContainer?: boolean;
  count?: number;
}

export function ProductCardListFallback({
  count = 12,
  withContainer = true,
}: IProps) {
  const cards = new Array(count)
    .fill("_")
    .map((_) => <ProductCardFallback key={uuidv4()} />);

  if (!withContainer) return cards;

  return <ul className={styles.product_card_list}>{cards}</ul>;
}
