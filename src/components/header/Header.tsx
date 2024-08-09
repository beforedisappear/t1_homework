import styles from "./header.module.scss";
import Cart from "@/assets/icons/common/cart.svg?svgr";

import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <Link to="/" className={styles.header_logo}>
          Good4you
        </Link>

        <nav className={styles.header_navigation}>
          <Link to="/" state={{ to: "catalog" }} className={styles.header_link}>
            <span>Catalog</span>
          </Link>

          <Link to="/" state={{ to: "faq" }} className={styles.header_link}>
            <span>FAQ</span>
          </Link>

          <Link to="/cart" className={styles.header_link}>
            <span>Cart</span>

            <div className={styles.header_link_icon}>
              <Cart />
              <div>1</div>
            </div>
          </Link>

          <Link to="/" className={styles.header_link}>
            <span>Johnson Smith</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
