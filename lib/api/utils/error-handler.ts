import { toast } from "sonner";

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleApiError = (error: any) => {
  if (error instanceof ApiError) {
    toast.error(error.message);
  } else if (error.message) {
    const message = error.response.data?.message || "API Error";
    toast.error(message);
  } else if (error.request) {
    toast.error("Network error - please check your connection");
  } else {
    toash.error("An unexpected error occurred");
  }
};
