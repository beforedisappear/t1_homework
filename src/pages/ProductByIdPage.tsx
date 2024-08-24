import { useGetProductByIdQuery } from "@/api/dataApi";
import { ErrorBoundary } from "@/components/errorBoundary/ErrorBoundary";
import {
  ProductDetails,
  ProductDetailsFallback,
} from "@/components/productDetails";
import { useAppSelector } from "@/store";

import { Helmet } from "react-helmet-async";

import { useParams } from "react-router-dom";

export function ProductByIdPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading: isProductByIdLoading,
    isError,
    error: productError,
  } = useGetProductByIdQuery({ id: id as string }, { skip: !id });

  const {
    data: productCardsInCart,
    loading,
    error: cartError,
  } = useAppSelector((state) => state.cartDetailsSlice.cart);

  //get cart data from existing endpoint

  if (isProductByIdLoading || loading) return <ProductDetailsFallback />;
  else if (isError || !product || cartError) {
    if (productError && "status" in productError) {
      return <ErrorBoundary message="404 | Page not found" />;
    }

    return <ErrorBoundary />;
  }

  return (
    <>
      <Helmet>
        <title>{`${product.title} | Goods4you`}</title>
        <meta
          name="description"
          content="Any products from famous brands with worldwide delivery"
        />
      </Helmet>

      <ProductDetails
        data={product}
        cartId={productCardsInCart?.id}
        countInCart={
          productCardsInCart?.products.find((el) => el.id === Number(id))
            ?.quantity
        }
      />
    </>
  );
}
