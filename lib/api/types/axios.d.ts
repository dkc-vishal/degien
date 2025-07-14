import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date;
    };
    _retry?: boolean;
  }
}
