import styles from "@/components/cartDetails/cartDetails.module.scss";

import { CartForm } from "@/components/cartForm/CartForm";
import { CartTotal } from "@/components/cartTotal/CartTotal";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { CartDetailsFallback } from "./CartDetails.fallback";

import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";

import { fetchProductsInCartByUserId } from "./cartDetailsSlice";

export function CartDetails() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state) => state.cartDetailsSlice
  );

  useEffect(() => {
    dispatch(fetchProductsInCartByUserId("6"));
  }, []);

  if (loading || !data) return <CartDetailsFallback />;
  else if (error) return <ErrorBoundary message={error.message} />;

  return (
    <article className={styles.cart_details}>
      <h1 className={styles.cart_details_title}>My cart</h1>

      <div className={styles.cart_details_content}>
        {data.carts.length === 0 ? (
          <span className={styles.no_items}>no items</span>
        ) : (
          <>
            <CartForm data={data.carts[0]} />
            <CartTotal data={data.carts[0]} />
          </>
        )}
      </div>
    </article>
  );
}
