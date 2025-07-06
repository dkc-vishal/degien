import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
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
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; //explain this line
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => resposne,
      (error) => {
        if (error.resposne?.status === 401) {
          localStorage.removeItem("auth_token");
          window.location.href = "/Auth/Login";
        }
        return Promise.reject(error);
      }
    );
  }

  //   wrapper all http method
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
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
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL);
