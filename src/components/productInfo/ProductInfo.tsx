import styles from "@/components/productInfo/productInfo.module.scss";
import cn from "clsx";
import Star from "@/assets/icons/productInfo/star.svg?svgr";
import Plus from "@/assets/icons/common/plus2.svg?svgr";
import Minus from "@/assets/icons/common/minus2.svg?svgr";

import { v4 as uuidv4 } from "uuid";
import { getFinalPrice, promiseToastError, promiseToastSuccess } from "@/utils";
import { toast } from "react-toastify";

import { updateProductsInCartByUserId } from "../cartDetails/cartDetailsSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useState } from "react";

import type { IProduct } from "@/types";

interface IProps {
  data: IProduct;
  countInCart?: number;
  cartId: number | undefined;
}

export function ProductInfo({ data, countInCart, cartId }: IProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(
    (state) => state.cartDetailsSlice.updateCart
  );
  const [counterValue, setCounterValue] = useState(countInCart || 0);

  let rating = Math.ceil(data.rating);

  let activeStarClass = cn(styles.product_info_rating_star, styles.active);

  let inactiveStarClass = styles.product_info_rating_star;

  const updateCartQuantity = async (action: "add" | "remove") => {
    const isPending = toast.loading("Sending data...");

    let prevValue = counterValue;
    let newValue = counterValue;

    if (action === "add") {
      setCounterValue((counterValue) => counterValue + 1);
      newValue++;
    } else if (action === "remove") {
      setCounterValue((counterValue) => counterValue - 1);
      newValue--;
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
      });
  };

  return (
    <section className={styles.product_info}>
      <div className={styles.product_info_common}>
        <h1>{data.title}</h1>

        <div className={styles.product_info_about}>
          <div className={styles.product_info_rating}>
            {new Array(5).fill("_").map((_) => {
              let star = (
                <Star
                  key={uuidv4()}
                  className={rating > 1 ? activeStarClass : inactiveStarClass}
                />
              );

              rating--;
              return star;
            })}
          </div>
          <span className={styles.product_info_category}>{data.category}</span>
        </div>
      </div>

      <span className={styles.product_info_count}>
        {`In Stock - Only ${data.stock} left!`}
      </span>

      <p className={styles.product_info_description}>{data.description}</p>

      <div className={styles.product_info_details}>
        <span>{data.warrantyInformation}</span>
        <span>{data.shippingInformation}</span>
      </div>

      <div className={styles.product_info_buy}>
        <div className={styles.product_info_prices}>
          <div className={styles.product_info_price}>
            <span className={styles.product_info_price_final_value}>
              {`$${getFinalPrice(data.price, data.discountPercentage)}`}
            </span>
            <span className={styles.product_info_price_pre_value}>
              {`$${data.price}`}
            </span>
          </div>

          <div className={styles.product_info_discount}>
            <span className={styles.product_info_discount_title}>
              Your discount:
            </span>
            <span className={styles.product_info_discount_value}>
              {`${data.discountPercentage}%`}
            </span>
          </div>
        </div>

        <div className={styles.product_info_nav}>
          {counterValue > 0 ? (
            <>
              <button
                onClick={() => updateCartQuantity("remove")}
                className={cn(styles.product_info_nav_btn, "primary_btn")}
                disabled={loading || data.stock === 0 || !cartId}
              >
                <Minus />
              </button>

              <span>
                {`${counterValue} item${counterValue > 1 ? "s" : ""}`}
              </span>

              <button
                onClick={() => updateCartQuantity("add")}
                className={cn(styles.product_info_nav_btn, "primary_btn")}
                disabled={loading || data.stock === 0 || !cartId}
              >
                <Plus />
              </button>
            </>
          ) : (
            <button
              id={styles.add_to_cart}
              onClick={() => updateCartQuantity("add")}
              className="primary_btn"
              disabled={loading || data.stock === 0 || !cartId}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
