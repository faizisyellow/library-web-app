import isFetchBaseQueryError from "./fetch-error";

interface ErrorResponse {
  code?: number;
  errors?: string;
  status?: string;
}

interface ErrorReturn extends ErrorResponse {
  messages?: string;
  details?: string;
}

function getErrorMessage(error: unknown): string | null {
  if (isFetchBaseQueryError(error)) {
    return error.data as string;
  }
  return null;
}

function getErrorObject(error: unknown): ErrorReturn | null {
  if (isFetchBaseQueryError(error)) {
    const errorData = error?.data as ErrorResponse;
    return {
      messages: errorData?.errors,
      details: (error.data as string) || "An error occurred",
      status: errorData.status,
      code: errorData.code,
    };
  }
  return null;
}

export { getErrorMessage, getErrorObject };
