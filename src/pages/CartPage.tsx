import { CartDetails } from "@/components/cartDetails/CartDetails";
import { Helmet } from "react-helmet-async";

export function CartPage() {
  return (
    <>
      <Helmet>
        <title>My cart | Goods4you</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
      </Helmet>
      <CartDetails />
    </>
  );
}
