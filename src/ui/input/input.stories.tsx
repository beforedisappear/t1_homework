import type { Meta } from "@storybook/react";

import { Input, type IInputProps } from "./Input";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
};

const InputTemplate = (props: IInputProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <Input {...props} />
    </FormProvider>
  );
};

export const Default = () => (
  <InputTemplate name="input" placeholder="placeholder" />
);

export const Filled = () => <InputTemplate name="input" value={"some value"} />;

export default meta;
