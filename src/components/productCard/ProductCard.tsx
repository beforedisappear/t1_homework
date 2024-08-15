import styles from "./productCard.module.scss";
import Cart from "@/assets/icons/common/cart.svg?svgr";
import Plus from "@/assets/icons/common/plus.svg?svgr";
import Minus from "@/assets/icons/common/minus.svg?svgr";

import { Link } from "react-router-dom";
import { useState } from "react";
import { IProduct } from "@/types";

interface IProps {
  index: number;
  data: IProduct;
  countInCart: number;
}

export function ProductCard({ index, data, countInCart }: IProps) {
  const [counterValue, setCounterValue] = useState(countInCart);

  const url = `product/${data.id}`;

  const price = data.price - (data.price * data.discountPercentage) / 100;

  return (
    <li aria-label={`product card № ${index}`} className={styles.product_card}>
      <div className={styles.product_card_img}>
        <Link to={url}></Link>
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
          <span
            className={styles.product_card_info_price}
          >{`$${price.toFixed()}`}</span>
        </div>
        <div className={styles.product_card_nav}>
          {counterValue > 0 ? (
            <>
              <button
                onClick={() =>
                  setCounterValue((counterValue) => counterValue - 1)
                }
                className="primary_btn"
              >
                <Minus />
              </button>

              <span>{`${counterValue} item${
                counterValue > 1 ? "s" : ""
              }`}</span>

              <button
                onClick={() =>
                  setCounterValue((counterValue) => counterValue + 1)
                }
                className="primary_btn"
              >
                <Plus />
              </button>
            </>
          ) : (
            <button
              onClick={() =>
                setCounterValue((counterValue) => counterValue + 1)
              }
              className="primary_btn"
            >
              <Cart />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
