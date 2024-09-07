import styles from "./header.module.scss";
import cn from "clsx";
import Cart from "@/assets/icons/common/cart.svg?svgr";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";
// import { useGetUserCartQuery } from "@/api/dataApi";
import { useGetUserQuery } from "@/api/userApi";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProductsInCartByUserId } from "../cartDetails/cartDetailsSlice";

export function PrivateHeader() {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const { data } = useAppSelector((state) => state.cartDetailsSlice.cart);

  const onShowNavigation = () => {
    setShowNavigation((showNavigation) => !showNavigation);
  };

  useOutsideClick(ref, () => setShowNavigation(false));

  const { data: userData, isSuccess: isGetUserSuccess } =
    useGetUserQuery(undefined);

  useEffect(() => {
    if (userData) {
      dispatch(fetchProductsInCartByUserId({ id: userData.id }));
    }
  }, [isGetUserSuccess]);

  // const { data: cartData, isSuccess: isGetUserCartSuccess } =
  //   useGetUserCartQuery(
  //     { id: (userData as IUser)?.id as number },
  //     { skip: !userData }
  //   );

  return (
    <header className={styles.header}>
      <div className={styles.header_content}>
        <Link aria-label="site logo" to="/" className={styles.header_logo}>
          Good4you
        </Link>

        <nav ref={ref} className={cn(styles.header_navigation)}>
          <button
            aria-label="navigation menu button"
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
              aria-label="catalog section"
              className={styles.header_link}
            >
              <span>Catalog</span>
            </Link>

            <Link
              to="/"
              state={{ to: "faq" }}
              aria-label="faq section"
              className={styles.header_link}
            >
              <span>FAQ</span>
            </Link>

            <Link
              to="/cart"
              aria-label="cart page"
              className={styles.header_link}
            >
              <span>Cart</span>

              <div className={styles.header_link_icon}>
                <Cart aria-hidden />
                {data && <div>{data.totalQuantity}</div>}
              </div>
            </Link>

            <Link
              to="/#"
              aria-label="login page"
              className={styles.header_link}
            >
              {isGetUserSuccess && (
                <span>{`${userData.firstName} ${userData.lastName}`}</span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
