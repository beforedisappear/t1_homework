import { ProductDetails } from "@/components/productDetails/ProductDetails";
import { Helmet } from "react-helmet-async";

import { useParams } from "react-router-dom";

export function ProductByIdPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Helmet>
        <title> Essence Mascara Lash Princess | Goods4you</title>
      </Helmet>
      <ProductDetails />
      {`product by ${id} page`}
    </>
  );
}
