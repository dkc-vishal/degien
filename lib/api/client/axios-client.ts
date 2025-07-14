import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { handleApiError } from "../utils/error-handler";
import { tokenRefreshManager } from "../utils/token-refresh";
export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string | undefined) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        // check this header logic
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        config.metadata = { startTime: new Date() };

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response time in development
        if (
          process.env.NODE_ENV === "development" &&
          response.config.metadata
        ) {
          const endTime = new Date();
          const duration =
            endTime.getTime() - response.config.metadata.startTime.getTime();
          console.log(
            `✅ ${response.config.method?.toUpperCase()} ${
              response.config.url
            } - ${duration}ms`
          );
        }

        return response;
      },

      async (error) => {
        const originalRequest = error.config;

        // Check if error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh the token
            const newToken = await tokenRefreshManager.handleTokenRefresh();

            // Update the authorization header with new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;

            // Retry the original request
            return this.client(originalRequest);
          } catch (refreshError) {
            // If refresh fails, handle the error and redirect to login
            handleApiError(error);
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors normally
        handleApiError(error);
        return Promise.reject(error);
      }
    );
  }

  //   wrapper all http method
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL);
