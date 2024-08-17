import { ProductCard } from "./ProductCard";

import { BrowserRouter as Router } from "react-router-dom";

import { storyProductData } from "./productCard.data";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ProductCard> = {
  title: "Molecules/ProductCard",
  component: ProductCard,
};

export const Primary = () => (
  <Router>
    <ProductCard index={0} data={storyProductData} countInCart={0} />
  </Router>
);

export const InCart = () => (
  <Router>
    <ProductCard index={0} data={storyProductData} countInCart={1} />
  </Router>
);

export default meta;
