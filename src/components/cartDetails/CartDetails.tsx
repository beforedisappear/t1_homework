import styles from "@/components/cartDetails/cartDetails.module.scss";

import { CartForm } from "@/components/cartForm/CartForm";
import { CartTotal } from "@/components/cartTotal/CartTotal";
import { ErrorBoundary } from "../errorBoundary/ErrorBoundary";
import { CartDetailsFallback } from "./CartDetails.fallback";

import { useAppSelector } from "@/store";

export function CartDetails() {
  const { data, loading, error } = useAppSelector(
    (state) => state.cartDetailsSlice.cart
  );

  if (loading) return <CartDetailsFallback />;
  else if (error) return <ErrorBoundary message={error.message} />;

  return (
    <article className={styles.cart_details}>
      <h1 className={styles.cart_details_title}>My cart</h1>

      <div className={styles.cart_details_content}>
        {!data ? (
          <span className={styles.no_items}>no items</span>
        ) : (
          <>
            <CartForm data={data} />
            <CartTotal data={data} />
          </>
        )}
      </div>
    </article>
  );
}
