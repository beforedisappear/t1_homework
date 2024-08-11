import styles from "./faq.module.scss";
import cn from "clsx";

import Cross from "@/assets/icons/faq/cross.svg?svgr";

import { faqData } from "./faq.data";

import { useScrollTo } from "@/hooks/useScrollTo";
import { useRef, useState } from "react";

export function Faq() {
  const ref = useRef<HTMLElement | null>(null);
  const [showSection, setShowSection] = useState([false, false, false]);

  useScrollTo({ ref });

  const onShowSection = (i: number) => {
    let array = [...showSection];
    array[i] = !showSection[i];
    setShowSection(array);
  };

  return (
    <section id="faq" ref={ref} className={styles.faq}>
      <div className={styles.faq_content}>
        <h2 className={styles.faq_title}>FAQ</h2>

        <ul className={styles.faq_list}>
          {faqData.map((el, i) => (
            <li key={el.title}>
              <button
                key={`faq_list_${i}`}
                className={cn(styles.faq_list_item, {
                  [styles.showed]: showSection[i],
                })}
                onClick={() => onShowSection(i)}
              >
                <div className={styles.faq_list_item_header}>
                  <p>{el.title}</p>
                  <Cross />
                </div>

                <span>{el.subtitle}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
