import { isFetchBaseQueryErrorType } from "@/typeGuards";

export const getFinalPrice = (price: number, discount: number) => {
  return (price - (price * discount) / 100).toFixed();
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
