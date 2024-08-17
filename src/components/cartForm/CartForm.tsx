import styles from "./cartForm.module.scss";

import { CartFormItem } from "../cardFormItem/CartFormItem";

import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";

import { fetchProductsInCartByUserId } from "./cartFormSlice";

export function CartForm() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector(
    (state) => state.cartFormSlice
  );

  useEffect(() => {
    dispatch(fetchProductsInCartByUserId());
  }, []);

  if (loading || !data) return <div>загрузка...</div>;
  else if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <section className={styles.cart_form}>
      {data.carts[0]?.products.map((el, i) => (
        <CartFormItem key={`cart_item_${i}`} index={i} data={el} />
      ))}
    </section>
  );
}
