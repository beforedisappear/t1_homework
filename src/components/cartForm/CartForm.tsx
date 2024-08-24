import styles from "./cartForm.module.scss";

import { CartFormItem } from "../cartFormItem/CartFormItem";

import { ICart } from "@/types";

export function CartForm({ data }: { data: ICart }) {
  return (
    <section className={styles.cart_form}>
      {data.products.map((el, i) => (
        <CartFormItem
          key={`cart_item_${i}`}
          index={i}
          data={el}
          cartId={data.id}
        />
      ))}
    </section>
  );
}
