import styles from "./cartFormItem.module.scss";
import cn from "clsx";
import sneakersImg from "@/assets/images/productCard/image.jpg";
import Cart from "@/assets/icons/common/cart.svg?svgr";
import Plus from "@/assets/icons/common/plus.svg?svgr";
import Minus from "@/assets/icons/common/minus.svg?svgr";

import { useState } from "react";

import { Link } from "react-router-dom";

export function CartFormItem({ index }: { index: number }) {
  const [counterValue, setCounterValue] = useState(1);

  return (
    <div
      className={cn(styles.cart_form_item, {
        [styles.deleted]: counterValue === 0,
      })}
      aria-label={`product card №${index + 1} in cart`}
    >
      <div className={styles.cart_form_item_info}>
        <img src={sneakersImg} alt={"sneakers item №4"} />
        <div className={styles.cart_form_item_info_text}>
          <Link
            to={`/product/${index}`}
            className={styles.cart_form_item_info_title}
          >
            Essence Mascara Lash Princess
          </Link>
          <span className={styles.cart_form_item_info_price}>$110</span>
        </div>
      </div>
      <div className={styles.cart_form_item_control}>
        {counterValue > 0 ? (
          <>
            <div className={styles.cart_form_item_control_btns}>
              <button
                aria-label={`delete one more product`}
                className={cn(styles.cart_form_item_control_btn, "primary_btn")}
                onClick={() =>
                  setCounterValue((counterValue) => counterValue - 1)
                }
              >
                <Minus />
              </button>

              <span>
                {`${counterValue} item${counterValue > 1 ? "s" : ""}`}
              </span>

              <button
                aria-label={`add one more product`}
                className={cn(styles.cart_form_item_control_btn, "primary_btn")}
                onClick={() =>
                  setCounterValue((counterValue) => counterValue + 1)
                }
              >
                <Plus />
              </button>
            </div>

            <button
              id={styles.delete_btn}
              aria-label={`delete product from cart`}
              onClick={() => setCounterValue(0)}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            aria-label={`add  one product to cart`}
            className={cn(styles.cart_form_item_control_btn, "primary_btn")}
            onClick={() => setCounterValue((counterValue) => counterValue + 1)}
          >
            <Cart />
          </button>
        )}
      </div>
    </div>
  );
}
