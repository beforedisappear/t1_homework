import styles from "@/components/productInfo/productInfo.module.scss";
import cn from "clsx";
import Star from "@/assets/icons/productInfo/star.svg?svgr";
import Plus from "@/assets/icons/common/plus2.svg?svgr";
import Minus from "@/assets/icons/common/minus2.svg?svgr";

import { getFinalPrice } from "@/utils";

import type { IProduct } from "@/types";
import { useState } from "react";

interface IProps {
  data: IProduct;
  countInCart?: number;
}

export function ProductInfo({ data, countInCart }: IProps) {
  const [counterValue, setCounterValue] = useState(countInCart || 0);

  const stars = [];
  let rating = Math.ceil(data.rating);

  let activeStar = (
    <Star className={cn(styles.product_info_rating_star, styles.active)} />
  );

  let inactiveStar = <Star className={styles.product_info_rating_star} />;

  stars.push(
    ...new Array(rating).fill(activeStar),
    ...new Array(5 - rating).fill(inactiveStar)
  );

  return (
    <section className={styles.product_info}>
      <div className={styles.product_info_common}>
        <h1>{data.title}</h1>

        <div className={styles.product_info_about}>
          <div className={styles.product_info_rating}>{stars}</div>
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
                onClick={() =>
                  setCounterValue((counterValue) => counterValue - 1)
                }
                className={cn(styles.product_info_nav_btn, "primary_btn")}
              >
                <Minus />
              </button>

              <span>
                {`${counterValue} item${counterValue > 1 ? "s" : ""}`}
              </span>

              <button
                onClick={() =>
                  setCounterValue((counterValue) => counterValue + 1)
                }
                className={cn(styles.product_info_nav_btn, "primary_btn")}
              >
                <Plus />
              </button>
            </>
          ) : (
            <button
              id={styles.add_to_cart}
              onClick={() =>
                setCounterValue((counterValue) => counterValue + 1)
              }
              className="primary_btn"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
