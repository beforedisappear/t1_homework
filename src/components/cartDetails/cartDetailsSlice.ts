import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";

import type { ICart, ICartResponse, IUpdateCartRequest } from "@/types";
import { RootState } from "@/store";

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
>(
  "cart/fetchProductsInCartByUserId",
  async ({ id }, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/user/${id}`, {
        headers: {
          Authorization: `Bearer ${(getState() as RootState).authSlice.token}`,
        },
      });

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
  }
);

export const updateProductsInCartByUserId = createAsyncThunk<
  ICart,
  IUpdateCartRequest
>(
  "cart/updateProductsInCartByUserId",
  async ({ products, cartId }, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(getState() as RootState).authSlice.token}`,
        },
        body: JSON.stringify({ merge: false, products }),
      });

      if (!response.ok) {
        // If the response is not ok, throw an error
        throw new Error("Network response was not ok");
      }

      const data: ICart = await response.json();

      //на разных эндпоинатах - одно свойство имеет разное имя
      //поэтому трансформируем объект, чтобы добиться согласованности данных
      let result = data;
      let { discountedPrice, ...rest } = data.products[0];
      result.products[0] = {
        ...rest,
        discountedTotal: discountedPrice as number,
      };

      return result;
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

          //change cart state
          if (state.cart.data) {
            //get changeable product
            let product = payload.products[0];

            //direction for math operation (plus for add, minus for remove)
            let direction = arg.action === "remove" ? -1 : 1;

            //check product availability in the cart
            const productIndex = state.cart.data.products.findIndex(
              (item) => item.id === product.id
            );

            ///PRODUCT IS ALREARDY IN THE CART
            if (productIndex !== -1) {
              //CLEAR CART FROM PRODUCT
              if (arg.action === "clear")
                direction = -state.cart.data.products[productIndex].quantity;

              state.cart.data.products[productIndex] = product;
            }
            //PRODUCT ISN'T IN THE CART
            else {
              //WE ADD NEW PRODUCT
              state.cart.data.products.push(product);
            }

            state.cart.data.totalQuantity += direction;
            state.cart.data.total += product.price * direction;
            state.cart.data.totalProducts = state.cart.data.products.filter(
              (el) => el.quantity > 0
            ).length;

            //проходимся по каждому продукту, для того, чтобы вычислить актульный размер скидки
            //discountPercentage продукта может рознится при получении корзины и добавлении товара в корзину
            let discountedTotal = 0;
            state.cart.data.products.forEach((el) => {
              discountedTotal += el.discountedTotal;
            });

            state.cart.data.discountedTotal = Math.round(discountedTotal);
          }
        }
      );
  },
});

const { actions, reducer } = cartDetailsSlice;

export const {} = actions;

export default reducer;
