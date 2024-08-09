import styles from "./catalog.module.scss";

import { SearchBar } from "@/components/searchBar/SearchBar";
import { ProductCardList } from "@/components/productCardList/ProductCardList";

import { useScrollTo } from "@/hooks/useScrollTo";
import { useRef } from "react";

export function Catalog() {
  const ref = useRef<HTMLElement | null>(null);

  useScrollTo({ ref });

  return (
    <section id="catalog" ref={ref} className={styles.catalog}>
      <h1>Catalog</h1>

      <SearchBar />

      <ProductCardList />
    </section>
  );
}
