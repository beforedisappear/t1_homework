import styles from "./productCardList.module.scss";

import { ProductCardListFallback } from "./ProductCardList.fallback";
import { ProductCardListPlaceholder } from "./ProductCardList.placeholder";
import { ProductCard } from "@/components/productCard/ProductCard";

import { setPage } from "./productCardListSlice";

import dataApi, { useGetProductListQuery } from "@/api/dataApi";
import { useAppDispatch, useAppSelector } from "@/store";

export function ProductCardList() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.productCardListSlice.page);
  const searchValue = useAppSelector(
    (state) => state.searchBarSlice.searchValue
  );

  const {
    originalArgs,
    data: productCardList,
    isLoading,
    isFetching,
    isError,
  } = useGetProductListQuery({
    q: searchValue,
    page,
  });

  //get cart data from existing endpoint
  const { data: productCardsInCart } =
    dataApi.endpoints.getUserCart.useQueryState({
      id: "6",
    });

  if (isLoading || (isFetching && originalArgs?.page === 0))
    return <ProductCardListFallback />;
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

        {productCardList.products.length === 0 && (
          <ProductCardListPlaceholder />
        )}
      </ul>

      {!isFetching && isNoProducts && (
        <button
          aria-label="load more product cards"
          className="primary_btn"
          onClick={() => dispatch(setPage(page + 1))}
        >
          show more
        </button>
      )}
    </>
  );
}
