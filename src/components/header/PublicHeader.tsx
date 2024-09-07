import { Link } from "react-router-dom";
import styles from "./header.module.scss";

export function PublicHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <Link aria-label="site logo" to="/login" className={styles.header_logo}>
          Good4you
        </Link>
      </div>
    </header>
  );
}
