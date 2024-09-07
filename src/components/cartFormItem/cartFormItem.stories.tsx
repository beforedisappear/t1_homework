import sneakersImg from "@/assets/images/productGallery/sneakers.jpg";

import { BrowserRouter as Router } from "react-router-dom";
import { CartFormItem } from "./CartFormItem";
import { store } from "@/store";
import { Provider } from "react-redux";

import type { Meta } from "@storybook/react";
import type { PropsWithChildren } from "react";

const MockedProviders = ({ children }: PropsWithChildren) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);

const meta: Meta<typeof CartFormItem> = {
  title: "Molecules/CartFormItem",
  component: CartFormItem,
};

export const Primary = () => (
  <MockedProviders>
    <CartFormItem
      cartId={0}
      index={0}
      data={{
        id: 1,
        title: "sime title",
        price: 1234,
        quantity: 2,
        total: 2,
        discountPercentage: 13,
        discountedTotal: 13,
        thumbnail: sneakersImg,
      }}
    />
  </MockedProviders>
);

export const Deleted = () => (
  <MockedProviders>
    <CartFormItem
      cartId={0}
      index={0}
      data={{
        id: 1,
        title: "sime title",
        price: 1234,
        quantity: 0,
        total: 0,
        discountPercentage: 13,
        discountedTotal: 13,
        thumbnail: sneakersImg,
      }}
    />
  </MockedProviders>
);

export default meta;
