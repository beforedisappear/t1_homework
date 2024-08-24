import styles from "./cartFormItem.module.scss";
import cn from "clsx";
import Cart from "@/assets/icons/common/cart.svg?svgr";
import Plus from "@/assets/icons/common/plus.svg?svgr";
import Minus from "@/assets/icons/common/minus.svg?svgr";

import { useState } from "react";
import { updateProductsInCartByUserId } from "../cartDetails/cartDetailsSlice";
import { useAppDispatch } from "@/store";

import { Link } from "react-router-dom";

import type { IShortProduct } from "@/types";
import { getFinalPrice, promiseToastError, promiseToastSuccess } from "@/utils";
import { toast } from "react-toastify";

interface CartFormItemProps {
  index: number;
  data: IShortProduct;
  cartId: number;
}

export function CartFormItem({ index, data, cartId }: CartFormItemProps) {
  const dispatch = useAppDispatch();
  //locale state to avoid all item list rendering
  const [isLoading, setIsLoading] = useState(false);
  const [counterValue, setCounterValue] = useState(data.quantity);

  const updateCartQuantity = async (action: "add" | "remove" | "clear") => {
    const isPending = toast.loading("Sending data...");
    setIsLoading(true);

    let prevValue = counterValue;
    let newValue = counterValue;

    if (action === "add") {
      newValue++;
      setCounterValue((counterValue) => counterValue + 1);
    } else if (action === "remove") {
      newValue--;
      setCounterValue((counterValue) => counterValue - 1);
    } else if (action === "clear") {
      setCounterValue(0);
      newValue = 0;
    }

    let dto = {
      products: [{ id: data.id, quantity: newValue }],
      cartId,
      action,
    };

    await dispatch(updateProductsInCartByUserId(dto))
      .unwrap()
      .then(() => {
        promiseToastSuccess(isPending, "Success");
      })
      .catch((err) => {
        setCounterValue(prevValue);
        promiseToastError(isPending, err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      className={cn(styles.cart_form_item, {
        [styles.deleted]: counterValue === 0,
      })}
      aria-label={`product card №${index + 1} in cart`}
    >
      <div className={styles.cart_form_item_info}>
        <img src={data.thumbnail} alt={"sneakers item №4"} />
        <div className={styles.cart_form_item_info_text}>
          <Link
            to={`/product/${data.id}`}
            className={styles.cart_form_item_info_title}
          >
            {data.title}
          </Link>
          <span className={styles.cart_form_item_info_price}>
            {`$${getFinalPrice(data.price, data.discountPercentage)}`}
          </span>
        </div>
      </div>

      <div className={styles.cart_form_item_control}>
        {counterValue > 0 ? (
          <>
            <div className={styles.cart_form_item_control_btns}>
              <button
                aria-label={`delete one more product`}
                className={cn(styles.cart_form_item_control_btn, "primary_btn")}
                onClick={() => updateCartQuantity("remove")}
                disabled={isLoading}
              >
                <Minus />
              </button>

              <span>
                {`${counterValue} item${counterValue > 1 ? "s" : ""}`}
              </span>

              <button
                aria-label={`add one more product`}
                className={cn(styles.cart_form_item_control_btn, "primary_btn")}
                onClick={() => updateCartQuantity("add")}
                disabled={isLoading}
              >
                <Plus />
              </button>
            </div>

            <button
              id={styles.delete_btn}
              aria-label={`delete product from cart`}
              onClick={() => updateCartQuantity("clear")}
              disabled={isLoading}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            aria-label={`add  one product to cart`}
            className={cn(styles.cart_form_item_control_btn, "primary_btn")}
            onClick={() => updateCartQuantity("add")}
            disabled={isLoading}
          >
            <Cart />
          </button>
        )}
      </div>
    </div>
  );
}
