import type { Meta } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
};

export const Default = () => <Input placeholder="placeholder" />;

export const Filled = () => <Input value={"some value"} />;

export default meta;
