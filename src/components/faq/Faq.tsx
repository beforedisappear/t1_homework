import styles from "./faq.module.scss";

import { useScrollTo } from "@/hooks/useScrollTo";

import { useRef } from "react";

export function Faq() {
  const ref = useRef<HTMLElement | null>(null);

  useScrollTo({ ref });

  return <section id="faq" ref={ref} className={styles.faq}></section>;
}
