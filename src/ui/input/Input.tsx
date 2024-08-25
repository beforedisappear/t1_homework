import cn from "clsx";

import {
  type FieldValues,
  type RegisterOptions,
  useFormContext,
} from "react-hook-form";
import type { InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  rules?: RegisterOptions<FieldValues, string> | undefined;
  children?: React.ReactNode;
}

function Input(props: IInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { className, children, ...rest } = props;

  return (
    <input
      {...register(props.name, props.rules)}
      className={cn("input", className, { invalid: errors?.[props.name] })}
      {...rest}
    >
      {children}
    </input>
  );
}

export { Input };
