import { CartDetails } from "@/components/cartDetails/CartDetails";
import { Helmet } from "react-helmet-async";

export function CartPage() {
  return (
    <>
      <Helmet>
        <title>My cart | Goods4you</title>
      </Helmet>
      <CartDetails />
    </>
  );
}
