import useAuthStore from "@/stores/authStore";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import refreshToken from "./refreshTokenHandler";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// === Request Interceptor === //
api.interceptors.request.use((config) => {
  // Add token to headers if available
  const token = useAuthStore.getState().getAccessToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// === Response Interceptor: refresh token if 401 === //
let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

// Function to refresh token
function onRefreshed(token: string) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

// Function to add subscriber
function addSubscriber(callback: (token: string) => void) {
  // Check if the callback is already in the subscribers array
  subscribers.push(callback);
}

// === Response Interceptor === //
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Check if the error is due to a 403 Unauthorized response
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // If the error is a 403 and the request has not been retried yet
    if (error.response?.status === 403 && !originalRequest._retry) {
      // If the request has not been retried yet, set the _retry flag to true
      // and try to refresh the token
      originalRequest._retry = true;

      const authStore = useAuthStore.getState();

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Call the refresh token API (/auth/refresh)
          const data = await refreshToken();

          // Update the token in the AuthStore
          authStore.login(authStore.userId!, authStore.userDetail!, data.accessToken);

          isRefreshing = false;
          // Update the Authorization header with the new token
          onRefreshed(data.accessToken);
        } catch (err) {
          isRefreshing = false;
          authStore.logout();
          return Promise.reject(err);
        }
      }

      // If the token is being refreshed, wait for it to finish
      // and then retry the original request with the new token
      // This is done by returning a new Promise that resolves with the result of the original request
      // after the token has been refreshed
      return new Promise((resolve) => {
        addSubscriber((token: string) => {
          if (originalRequest.headers) originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    // If the error is not a 401 or if the request has already been retried, reject the promise
    return Promise.reject(error);
  }
);

export default api;
