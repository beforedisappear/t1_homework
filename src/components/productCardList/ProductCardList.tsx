import styles from "./productCardList.module.scss";

import { ProductCardListFallback } from "./ProductCardList.fallback";
import { ProductCardListPlaceholder } from "./ProductCardList.placeholder";
import { ProductCard } from "@/components/productCard/ProductCard";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";

import { setPage } from "./productCardListSlice";

import { useGetProductListQuery } from "@/api/dataApi";
import { useAppDispatch, useAppSelector } from "@/store";

export function ProductCardList() {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.productCardListSlice.page);
  const searchValue = useAppSelector(
    (state) => state.searchBarSlice.searchValue
  );

  //get cart data from AsyncThunk called in header
  const {
    data: productCardsInCart,
    loading,
    error,
  } = useAppSelector((state) => state.cartDetailsSlice.cart);

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

  if (isLoading || (isFetching && originalArgs?.page === 0) || loading)
    return <ProductCardListFallback />;
  else if (isError || !productCardList || error) return <ErrorBoundary />;

  //condition not to display "show more" button
  const isNoProducts =
    productCardList.skip + productCardList.limit < productCardList.total;

  //get object: { product id in the cart: quantity of products in the cart }
  const productIdsInCart: Record<number, number> = {};
  productCardsInCart?.products.forEach((el) => {
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
              cartId={productCardsInCart?.id}
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
