import { ProductCard } from "./ProductCard";
import { Provider } from "react-redux";
import { store } from "@/store";
import { BrowserRouter as Router } from "react-router-dom";

import { mockedProductData } from "./productCard.data";

import type { Meta } from "@storybook/react";
import type { PropsWithChildren } from "react";

const meta: Meta<typeof ProductCard> = {
  title: "Molecules/ProductCard",
  component: ProductCard,
};

const MockedProviders = ({ children }: PropsWithChildren) => (
  <Provider store={store}>
    <Router>{children}</Router>
  </Provider>
);

export const Primary = () => (
  <MockedProviders>
    <ProductCard
      index={0}
      data={mockedProductData}
      countInCart={0}
      cartId={0}
    />
  </MockedProviders>
);

export const InCart = () => (
  <MockedProviders>
    <ProductCard
      index={0}
      data={mockedProductData}
      countInCart={1}
      cartId={0}
    />
  </MockedProviders>
);

export default meta;
