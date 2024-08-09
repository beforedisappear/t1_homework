import styles from "./productCard.module.scss";
import image from "@/assets/images/productCard/image.jpg";
import Cart from "@/assets/icons/common/cart.svg?svgr";
import Plus from "@/assets/icons/productCard/plus.svg?svgr";
import Minus from "@/assets/icons/productCard/minus.svg?svgr";

import { Link } from "react-router-dom";
import { useState } from "react";

interface IProps {
  index: number;
}

export function ProductCard({ index }: IProps) {
  const [counterValue, setCounterValue] = useState(0);

  const url = `product/${index}`;

  return (
    <li className={styles.product_card}>
      <div className={styles.product_card_img}>
        <Link to={url}></Link>
        <img src={image} alt={`product card №${index}`} />
      </div>
      <div className={styles.product_card_content}>
        <div className={styles.product_card_info}>
          <Link to={url} className={styles.product_card_info_title}>
            Essence Mascara Lash Princess
          </Link>
          <span className={styles.product_card_info_price}>$110</span>
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
