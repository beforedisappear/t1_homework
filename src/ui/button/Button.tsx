import cn from "clsx";

import type { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary";
  cssClass?: string;
  children?: React.ReactNode;
}

function Button(props: IButtonProps) {
  const { className, variant, children, ...rest } = props;

  return (
    <button
      className={cn(
        {
          ["primary_btn"]: variant === "primary",
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export { Button };
