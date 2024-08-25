import sneakersImg from "@/assets/images/productGallery/sneakers.jpg";

import { BrowserRouter as Router } from "react-router-dom";

import type { Meta } from "@storybook/react";

import { CartFormItem } from "./CartFormItem";

const meta: Meta<typeof CartFormItem> = {
  title: "Molecules/CartFormItem",
  component: CartFormItem,
};

export const Primary = () => (
  <Router>
    <CartFormItem
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
  </Router>
);

export const Deleted = () => (
  <Router>
    <CartFormItem
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
  </Router>
);

export default meta;
