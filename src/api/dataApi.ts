import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  // ICartRequest,
  // ICartResponse,
  IProductListRequest,
  IProductListResponse,
  IProductRequest,
  ProductResponse,
  // IUpdateCartRequest,
  // ICart,
} from "@/types";

const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),

  endpoints: (builder) => ({
    // getUserCart: builder.query<ICartResponse, ICartRequest>({
    //   query: ({ id }) => `/carts/user/${id}`,
    // }),

    getProductList: builder.query<IProductListResponse, IProductListRequest>({
      query: ({ q, page = 0, limit = 12 }) =>
        `/products/search?q=${q}&limit=${limit}&skip=${page * limit}`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      //реализация без использования entity adapter
      merge(currentCacheData, responseData) {
        //обнуляем кэш если выборка данных первая
        if (responseData.skip === 0) {
          return { ...responseData, products: responseData.products };
        }

        return {
          ...responseData,
          products: [...currentCacheData.products, ...responseData.products],
        };
      },

      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.q !== previousArg?.q ||
          currentArg?.page !== previousArg?.page
        );
      },
    }),

    getProductById: builder.query<ProductResponse, IProductRequest>({
      query: ({ id }) => `/products/${id}`,
    }),

    // updateUserCart: builder.mutation<ICart, IUpdateCartRequest>({
    //   query: ({ products, cartId }) => ({
    //     url: `/carts/${cartId}`,
    //     method: "PUT",
    //     body: { merge: false, products },
    //   }),
    // }),
  }),
});

export const {
  // useGetUserCartQuery,
  useGetProductListQuery,
  useGetProductByIdQuery,
  // useUpdateUserCartMutation,
} = dataApi;

export default dataApi;
