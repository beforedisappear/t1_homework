import styles from "./header.module.scss";
import cn from "clsx";
import Cart from "@/assets/icons/common/cart.svg?svgr";
import { useState, useRef } from "react";

import { Link } from "react-router-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export function Header() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);

  const onShowNavigation = () => {
    setShowNavigation((showNavigation) => !showNavigation);
  };

  useOutsideClick(ref, () => setShowNavigation);

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <Link to="/" className={styles.header_logo}>
          Good4you
        </Link>

        <nav className={cn(styles.header_navigation)}>
          <button
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
              className={styles.header_link}
              onClick={() => setShowNavigation(false)}
            >
              <span>Catalog</span>
            </Link>

            <Link
              to="/"
              state={{ to: "faq" }}
              className={styles.header_link}
              onClick={() => setShowNavigation(false)}
            >
              <span>FAQ</span>
            </Link>

            <Link
              to="/cart"
              className={styles.header_link}
              onClick={() => setShowNavigation(false)}
            >
              <span>Cart</span>

              <div className={styles.header_link_icon}>
                <Cart />
                <div>1</div>
              </div>
            </Link>

            <Link
              to="/"
              className={styles.header_link}
              onClick={() => setShowNavigation(false)}
            >
              <span>Johnson Smith</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
