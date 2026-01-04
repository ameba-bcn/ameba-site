import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { authError, warn } from "./utils/logger";

const storedLang = localStorage.getItem("i18nextLng") || "ca";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  headers: {
    Authorization: localStorage.getItem("access")
      ? `Bearer ${localStorage.getItem("access")}`
      : null,
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": storedLang,
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    warn("Axios interceptor: Request failed", error);
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      warn("Network error occurred - server may be unreachable");
      authError("network_error", error);
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === BASE_URL + "token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
        //La fecha esta en segundos, la reformateamos
        const now = Math.ceil(Date.now() / 1000);
        warn("Token refresh attempt - expires at:", tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access", response?.data.access);
              localStorage.setItem("refresh", response?.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                response?.data.access;
              axiosInstance.headers["Authorization"] = response?.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              warn("Token refresh failed", err);
              authError("token_refresh_failed", err);
            });
        } else {
          warn("Refresh token is expired", { exp: tokenParts.exp, now });
          authError("token_expired", new Error("Refresh token expired"));
          if (typeof window !== "undefined") {
            window.location.href = "/login/";
          }
        }
      } else {
        warn("Refresh token not available in localStorage");
        authError("no_refresh_token", new Error("No refresh token available"));
        if (typeof window !== "undefined") {
          window.location.href = "/login/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
