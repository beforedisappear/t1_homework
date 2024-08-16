import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  ICartRequest,
  ICartResponse,
  IProductListRequest,
  IProductListResponse,
} from "@/types";

const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),

  endpoints: (builder) => ({
    getUserCart: builder.query<ICartResponse, ICartRequest>({
      query: ({ id }) => `/carts/user/${id}`,
    }),

    getProductList: builder.query<IProductListResponse, IProductListRequest>({
      query: ({ q, page = 0, limit = 12 }) =>
        `/products/search?q=${q}&limit=${limit}&skip=${page * limit}`,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

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
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetUserCartQuery, useGetProductListQuery } = dataApi;

export default dataApi;
