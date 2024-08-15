import styles from "./productCardList.module.scss";

import { ProductCardListFallback } from "./ProductCardList.fallback";
import { ProductCard } from "@/components/productCard/ProductCard";

import dataApi, { useGetProductListQuery } from "@/api/dataApi";
import { useState } from "react";

export function ProductCardList() {
  const [page, setPage] = useState(0);

  const {
    data: productCardList,
    isLoading,
    isFetching,
    isError,
  } = useGetProductListQuery({
    q: "",
    page,
  });

  //get cart data from existing endpoint
  const { data: productCardsInCart } =
    dataApi.endpoints.getUserCart.useQueryState({
      id: "6",
    });

  if (isLoading) return <ProductCardListFallback />;
  else if (isError || !productCardList) return <h2>ошибка</h2>;

  //condition not to display "show more" button
  const isNoProducts =
    productCardList.skip + productCardList.limit < productCardList.total;

  //get object: { product id in the cart: quantity of products in the cart }
  const productIdsInCart: Record<number, number> = {};
  productCardsInCart?.carts[0].products.forEach((el) => {
    productIdsInCart[el.id] = el.quantity;
  });

  return (
    <>
      {/* TODO: add react window */}
      <ul className={styles.product_card_list}>
        {productCardList.products.map((el, i) => {
          let countInCart: number | undefined = productIdsInCart[el.id];

          return (
            <ProductCard
              key={el.id}
              index={i}
              data={el}
              countInCart={countInCart ?? 0}
            />
          );
        })}

        {isFetching && (
          <ProductCardListFallback count={6} withContainer={false} />
        )}
      </ul>

      {!isFetching && isNoProducts && (
        <button
          aria-label="load more product cards"
          className="primary_btn"
          onClick={() => setPage((page) => page + 1)}
        >
          show more
        </button>
      )}
    </>
  );
}
