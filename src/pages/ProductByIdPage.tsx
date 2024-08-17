import dataApi, { useGetProductByIdQuery } from "@/api/dataApi";
import { ErrorBoundary } from "@/components/errorBoundary/ErrorBoundary";
import {
  ProductDetails,
  ProductDetailsFallback,
} from "@/components/productDetails";

import { Helmet } from "react-helmet-async";

import { useParams } from "react-router-dom";

export function ProductByIdPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading: isProductByIdLoading,
    isError,
    error,
  } = useGetProductByIdQuery({ id: id as string }, { skip: !id });

  //get cart data from existing endpoint
  const { data: productCardsInCart, isLoading: isCartLoading } =
    dataApi.endpoints.getUserCart.useQueryState({
      id: "6",
    });

  if (isProductByIdLoading || isCartLoading) return <ProductDetailsFallback />;
  else if (isError || !data) {
    if (error && "status" in error) {
      return <ErrorBoundary message="404 | Страница не существует" />;
    }

    return <ErrorBoundary />;
  }

  return (
    <>
      <Helmet>
        <title>{`${data.title} | Goods4you`}</title>
      </Helmet>

      <ProductDetails
        data={data}
        countInCart={
          productCardsInCart?.carts[0].products.find(
            (el) => el.id === Number(id)
          )?.quantity
        }
      />
    </>
  );
}
