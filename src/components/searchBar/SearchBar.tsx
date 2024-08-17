import styles from "./searchBar.module.scss";
import cn from "clsx";

import { useAppDispatch } from "@/store";
import { useState } from "react";
import { useDebounce } from "@/io/hooks/useDebounce";

import { setSearchValue } from "./searchBarSlice";
import { setPage } from "../productCardList/productCardListSlice";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const debouncedSearchValue = useDebounce((newValue: string) => {
    dispatch(setSearchValue(newValue));
    dispatch(setPage(0));
  }, 1000);

  const handleChange = (value: string) => {
    setValue(value);
    debouncedSearchValue(value);
  };

  return (
    <>
      <input
        aria-label="search"
        className={cn(styles.search_bar, "input")}
        placeholder="Search by title"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
}
