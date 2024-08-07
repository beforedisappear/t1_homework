import styles from "./footer.module.scss";

import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <Link to="/" className={styles.footer_logo}>
          Goods4you
        </Link>

        <div className={styles.footer_navigation}>
          <Link to="/" state={{ to: "catalog" }}>
            Catalog
          </Link>

          <Link to="/" state={{ to: "faq" }}>
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
}
