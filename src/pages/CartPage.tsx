import { Cart } from "@/components/cart/Cart";
import { Helmet } from "react-helmet-async";

export function CartPage() {
  return (
    <>
      <Helmet>
        <title>My cart | Goods4you</title>
      </Helmet>
      <h1>My cart</h1>
      <Cart />
    </>
  );
}
