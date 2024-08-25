import type { Meta } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
};

export const Primary = () => (
  <Button variant="primary" onClick={() => alert("Clicked!")}>
    click me
  </Button>
);

export const Disabled = () => (
  <Button variant="primary" disabled>
    click me
  </Button>
);

export default meta;
