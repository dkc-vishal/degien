import { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "sonner";

export const requestInterceptor = (config: AxiosRequestConfig) => {
  // Add request ID for tracking
  config.headers = {
    ...config.headers,
    "X-Request-ID": crypto.randomUUID(), // Add a unique request ID
  };

  if (process.env.NODE_ENV === "development") {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
  }

  return config;
};

export const responseInterceptor = (response: AxiosResponse) => {
  // Log successful responses
  if (process.env.NODE_ENV === "development") {
    console.log(
      `✅ ${response.config.method?.toUpperCase()} ${response.config.url}`
    );
  }

  return response;
};

export const errorInterceptor = (error: any) => {
  const status = error.response?.status;
  const message = error.response?.data?.message || "Something went wrommg";

  //handle  difference error types
  switch (status) {
    case 400:
      toast.error("Invalid request");
      break;
    case 403:
      toast.error("Access forbidden");
      break;
    case 404:
      toast.error("Resource not found");
      break;
    case 500:
      toast.error("Server error");
      break;
    default:
      toast.error(message);
  }

  return Promise.reject(error);
};
