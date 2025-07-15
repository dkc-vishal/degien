import { toast } from "sonner";
import { cacheUtils } from "./cache-utils";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: any) => {
  if (!error.response) {
    toast.error("Network error. Please check your connection.");
    return;
  }

  const { status, data } = error.response;
  const message = data?.message || getDefaultErrorMessage(status);

  switch (status) {
    case 400:
      toast.error(`Bad Request: ${message}`);
      break;
    case 401:
      toast.error(`session expired, please login again`);
      cacheUtils.auth.clearUser();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/Auth/Login";
      break;
    case 403:
      toast.error("You do not have permission to perform this action");
      break;
    case 404:
      toast.error(`Not Found: ${message}`);
      break;
    case 404:
      toast.error("Resource not found");
      break;
    case 422:
      // Handle validation errors
      if (data?.errors) {
        Object.values(data.errors).forEach((errorMsg: any) => {
          toast.error(errorMsg);
        });
      } else {
        toast.error(message);
      }
      break;

    case 429:
      toast.error("Too many requests. Please try again later.");
      break;

    case 500:
      toast.error("Server error. Please try again later.");
      break;

    default:
      toast.error(message);
  }
};

const getDefaultErrorMessage = (status: number): string => {
  const errorMessages: Record<number, string> = {
    400: "Invalid request",
    401: "Unauthorized access",
    403: "Access forbidden",
    404: "Resource not found",
    422: "Validation failed",
    429: "Too many requests",
    500: "Internal server error",
    502: "Bad gateway",
    503: "Service unavailable",
    504: "Gateway timeout",
  };

  return errorMessages[status] || "An unexpected error occurred";
};
