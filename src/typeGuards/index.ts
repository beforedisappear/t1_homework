import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const isFetchBaseQueryErrorType = (
  error: any
): error is FetchBaseQueryError => "status" in error;
