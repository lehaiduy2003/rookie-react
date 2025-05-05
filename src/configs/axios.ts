import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import refreshToken from "./refreshTokenHandler";
import useAuthStore from "@/stores/authStore";
import { VITE_API_URL } from "./env";

// Interface to represent a queued request that failed due to 401 and is waiting for token refresh
interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
  config: AxiosRequestConfig;
}

// Create a reusable Axios instance
const api: AxiosInstance = axios.create({
  baseURL: VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Manage refresh state and pending request queue
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

/**
 * Process all queued requests after token refresh.
 * If token is available, retry them with new token.
 * Otherwise, reject with the original error.
 */
const processQueue = (token: string | null, error: AxiosError | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
      resolve(token);
    } else {
      reject(error!);
    }
  });
  failedQueue = [];
};

// === Request Interceptor ===
api.interceptors.request.use((config) => {
  // Attach token to every request if available
  const token = useAuthStore.getState().getAccessToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// === Response Interceptor ===
api.interceptors.response.use(
  // Pass through successful responses
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    const authStore = useAuthStore.getState();

    // If token expired and request is not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Prevent multiple refresh calls
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          // Add to the queue if already refreshing
          failedQueue.push({
            resolve: async (newToken) => {
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              }
              try {
                const res = await api(originalRequest);
                resolve(res);
              } catch (err) {
                reject(err);
              }
            },
            reject,
            config: originalRequest,
          });
        });
      }

      // Set the retry flag to prevent infinite loop
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const data = await refreshToken();

        // Update the auth store with new token
        authStore.login(authStore.userId!, authStore.userDetail!, data.accessToken);

        // Retry all queued requests with new token
        processQueue(data.accessToken);

        // Retry the original failed request with new token
        originalRequest.headers!["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh fails, reject all queued requests and logout
        processQueue(null, err as AxiosError);
        authStore.logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // For all other errors (non-401 or already retried), reject normally
    return Promise.reject(error);
  }
);

export default api;
