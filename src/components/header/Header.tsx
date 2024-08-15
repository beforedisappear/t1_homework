import styles from "./header.module.scss";
import cn from "clsx";
import Cart from "@/assets/icons/common/cart.svg?svgr";

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export function Header() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);

  const onShowNavigation = () => {
    setShowNavigation((showNavigation) => !showNavigation);
  };

  useOutsideClick(ref, () => setShowNavigation(false));

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <Link aria-label="site logo" to="/" className={styles.header_logo}>
          Good4you
        </Link>

        <nav ref={ref} className={cn(styles.header_navigation)}>
          <button
            aria-label="navigation menu button"
            onClick={onShowNavigation}
            className={cn(styles.header_nav_menu_btn, "primary_btn")}
          >
            Menu
          </button>

          <div
            className={cn(styles.header_nav_menu_block, {
              [styles.showed]: showNavigation,
            })}
          >
            <Link
              to="/"
              state={{ to: "catalog" }}
              aria-label="catalog"
              className={styles.header_link}
            >
              <span>Catalog</span>
            </Link>

            <Link
              to="/"
              state={{ to: "faq" }}
              aria-label="faq"
              className={styles.header_link}
            >
              <span>FAQ</span>
            </Link>

            <Link to="/cart" aria-label="cart" className={styles.header_link}>
              <span>Cart</span>

              <div className={styles.header_link_icon}>
                <Cart aria-hidden />
                {isSuccess && data.carts.length > 0 && (
                  <div>{data.carts[0].totalQuantity}</div>
                )}
              </div>
            </Link>

            <Link to="#" aria-label="profile" className={styles.header_link}>
              <span>Johnson Smith</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
