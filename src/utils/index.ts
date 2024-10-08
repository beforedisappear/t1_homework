import { isFetchBaseQueryErrorType } from "@/typeGuards";

import { toast, type Id } from "react-toastify";

export const getFinalPrice = (
  price: number,
  discount: number,
  fixed: number = 2
) => {
  return (price - (price * discount) / 100).toFixed(fixed);
};

export function getErrorMessage(error: unknown) {
  let message = "Unexpected error";

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else if (isFetchBaseQueryErrorType(error)) {
    if (
      error.data &&
      typeof error.data === "object" &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      message = error.data.message;
    }
  }

  return message;
}

export function promiseToastSuccess(promise: Id, mess: string) {
  toast.update(promise, {
    render: mess,
    type: "success",
    isLoading: false,
    autoClose: 2000,
  });
}

export function promiseToastError(promise: Id, error: any) {
  toast.update(promise, {
    render: getErrorMessage(error),
    type: "error",
    isLoading: false,
    autoClose: 2000,
  });
}

export function createQueryString(
  queryParams: [string, string | number | string[]][]
) {
  return queryParams.reduce((acc, [key, value]) => {
    if (value !== undefined) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(String(value));

      return acc
        ? `${acc}&${encodedKey}=${encodedValue}`
        : `${encodedKey}=${encodedValue}`;
    }
    return acc;
  }, "");
}
