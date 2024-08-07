import styles from "./catalog.module.scss";

import { useRef } from "react";

export function Catalog() {
  // const ref = useRef<HTMLElement | null>(null);

  return (
    <div className={styles.catalog}>
      <h1>Catalog</h1>
    </div>
  );
}
