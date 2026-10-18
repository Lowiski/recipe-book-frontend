import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    // Custom flag: this client retries a request at most once after a
    // silent token refresh.
    _retry?: boolean;
  }
}
