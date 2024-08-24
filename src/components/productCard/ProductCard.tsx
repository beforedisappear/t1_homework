import styles from "./productCard.module.scss";
import Cart from "@/assets/icons/common/cart.svg?svgr";
import Plus from "@/assets/icons/common/plus.svg?svgr";
import Minus from "@/assets/icons/common/minus.svg?svgr";

import { getFinalPrice, promiseToastError, promiseToastSuccess } from "@/utils";
import { useState } from "react";
import { useAppDispatch } from "@/store";

import { updateProductsInCartByUserId } from "../cartDetails/cartDetailsSlice";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";

import type { IProduct } from "@/types";

interface IProps {
  cartId?: number;
  index: number;
  data: IProduct;
  countInCart: number;
}

export function ProductCard({ index, data, countInCart, cartId }: IProps) {
  //locale state to avoid all item list rendering
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const [counterValue, setCounterValue] = useState(countInCart);

  const url = `product/${data.id}`;

  const price = getFinalPrice(data.price, data.discountPercentage);

  const updateCartQuantity = async (action: "add" | "remove") => {
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
    }

    let dto = {
      products: [{ id: data.id, quantity: newValue }],
      cartId: cartId as number,
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
      .finally(() => setIsLoading(false));
  };

  return (
    <li aria-label={`product card № ${index}`} className={styles.product_card}>
      <div className={styles.product_card_img}>
        <Link to={url} preventScrollReset={false} />
        <img
          src={data.thumbnail}
          decoding="async"
          loading="lazy"
          alt={`product card №${index}`}
        />
      </div>

      <div className={styles.product_card_content}>
        <div className={styles.product_card_info}>
          <Link
            to={url}
            className={styles.product_card_info_title}
            preventScrollReset={false}
          >
            {data.title}
          </Link>
          <span className={styles.product_card_info_price}>{`$${price}`}</span>
        </div>

        <div className={styles.product_card_nav}>
          {counterValue > 0 ? (
            <>
              <button
                onClick={() => updateCartQuantity("remove")}
                className="primary_btn"
                disabled={isLoading || !cartId}
              >
                <Minus />
              </button>

              <span>
                {`${counterValue} item${counterValue > 1 ? "s" : ""}`}
              </span>

              <button
                className="primary_btn"
                onClick={() => updateCartQuantity("add")}
                disabled={isLoading || data.stock === counterValue || !cartId}
              >
                <Plus />
              </button>
            </>
          ) : (
            <button
              onClick={() => updateCartQuantity("add")}
              className="primary_btn"
              disabled={isLoading || data.stock === 0 || !cartId}
            >
              <Cart />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
