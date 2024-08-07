import { ProductDetails } from "@/components/productDetails/ProductDetails";

import { useParams } from "react-router-dom";

export function ProductByIdPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <ProductDetails />
      {`product by ${id} page`}
    </>
  );
}
