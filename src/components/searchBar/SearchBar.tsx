import styles from "./searchBar.module.scss";
import cn from "clsx";

export function SearchBar() {
  return (
    <>
      <input
        aria-label="search"
        className={cn(styles.search_bar, "input")}
        placeholder="Search by title"
      />
    </>
  );
}
