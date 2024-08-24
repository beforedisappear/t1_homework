import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";

import type { ICart, ICartResponse, IUpdateCartRequest } from "@/types";

export interface InitialState {
  cart: { data: ICart | null; loading: boolean; error: SerializedError | null };
  updateCart: {
    loading: boolean;
    error: SerializedError | null;
  };
}

const initialState: InitialState = {
  cart: { data: null, loading: false, error: null },
  updateCart: { loading: false, error: null },
};

export const fetchProductsInCartByUserId = createAsyncThunk<
  ICart,
  { id: number }
>("cart/fetchProductsInCartByUserId", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://dummyjson.com/carts/user/${id}`);
    if (!response.ok) {
      // If the response is not ok, throw an error
      throw new Error("Network response was not ok");
    }
    const data: ICartResponse = await response.json();

    return data.carts[0];
  } catch (error) {
    // Use rejectWithValue to return a custom error message
    return rejectWithValue(JSON.stringify(error));
  }
});

export const updateProductsInCartByUserId = createAsyncThunk<
  ICart,
  IUpdateCartRequest
>(
  "cart/updateProductsInCartByUserId",
  async ({ products, cartId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ merge: false, products }),
      });

      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error("Network response was not ok");
      }

      const data: ICart = await response.json();

      return data;
    } catch (error) {
      // Use rejectWithValue to return a custom error message
      return rejectWithValue(JSON.stringify(error));
    }
  }
);

const cartDetailsSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsInCartByUserId.pending, (state) => {
        state.cart.loading = true;
        state.cart.error = null;
      })
      .addCase(fetchProductsInCartByUserId.fulfilled, (state, action) => {
        state.cart.loading = false;
        state.cart.data = action.payload;
      })
      .addCase(fetchProductsInCartByUserId.rejected, (state, action) => {
        state.cart.loading = false;
        state.cart.error = action.error;
      })
      .addCase(updateProductsInCartByUserId.pending, (state) => {
        state.updateCart.loading = true;
        state.updateCart.error = null;
      })
      .addCase(updateProductsInCartByUserId.rejected, (state, action) => {
        state.updateCart.loading = false;
        state.updateCart.error = action.error;
      })
      .addCase(
        updateProductsInCartByUserId.fulfilled,
        (state, { payload, meta: { arg } }) => {
          state.updateCart.loading = false;

          if (state.cart.data) {
            let product = payload.products[0];

            let number = 1;
            if (arg.action === "remove") number = -1;

            console.log(number);

            const productIndex = state.cart.data.products.findIndex(
              (item) => item.id === product.id
            );

            ///PRODUCT IS ALREARDY IN CART
            if (productIndex !== -1) {
              //CLEAR CART FROM PRODUCT
              if (arg.action === "clear")
                number = -state.cart.data.products[productIndex].quantity;

              state.cart.data.products[productIndex] = product;
            }
            //PRODUCT ISN'T IN CART
            else {
              //WE ADD NEW PRODUCT
              state.cart.data.products.push(product);
            }

            state.cart.data.totalQuantity += number;
            state.cart.data.total += product.price * number;
            state.cart.data.totalProducts = state.cart.data.products.filter(
              (el) => el.quantity > 0
            ).length;

            let discountedTotal =
              state.cart.data.total -
              (state.cart.data.total * product.discountPercentage) / 100;

            state.cart.data.discountedTotal = Math.round(discountedTotal);
          }
        }
      );
  },
});

const { actions, reducer } = cartDetailsSlice;

export const {} = actions;

export default reducer;
