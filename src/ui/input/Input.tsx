import cn from "clsx";

import type { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  cssClass?: string;
  children?: React.ReactNode;
}

function Input(props: IInputProps) {
  const { className, children, ...rest } = props;

  return (
    <input className={cn("input", className)} {...rest}>
      {children}
    </input>
  );
}

export { Input };
