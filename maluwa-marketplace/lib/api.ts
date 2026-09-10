import axios, { AxiosInstance } from "axios";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_VITE_API_BASE ||
  process.env.VITE_API_BASE ||
  "https://inventory-management-b74g.onrender.com";

// Normalize base URL (strip trailing slashes)
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 45000, // 45 seconds for Render free tier cold starts
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    // Add token from localStorage if it exists (key used by authService)
    const token = typeof window !== "undefined" ? localStorage.getItem("maluwa_token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("maluwa_token");
        localStorage.removeItem("maluwa_user");
        window.location.href = "/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
