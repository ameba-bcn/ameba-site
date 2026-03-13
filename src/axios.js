import axios from "axios";
import * as Sentry from "@sentry/react";
import { BASE_URL } from "./utils/constants";

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

// Protección contra race conditions: si múltiples requests fallan con 401
// simultáneamente, solo una debe hacer el refresh y las demás esperan.
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newAccessToken) {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.warn("Axios, On nok", error);
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      console.warn(
        "A server/network error occurred. " +
          "Sorry about this - we will get it fixed shortly."
      );
      Sentry.captureException(error);
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === BASE_URL + "token/refresh/"
    ) {
      isRefreshing = false;
      refreshSubscribers = [];
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        console.warn("Refresh token not available");
        window.location.href = "/login/";
        return Promise.reject(error);
      }

      // Si ya hay un refresh en curso, encolar esta request
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newAccessToken) => {
            originalRequest.headers["Authorization"] =
              `Bearer ${newAccessToken}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
      const now = Math.ceil(Date.now() / 1000);

      if (tokenParts.exp <= now) {
        console.warn("Refresh token is expired", tokenParts.exp, now);
        window.location.href = "/login/";
        return Promise.reject(error);
      }

      isRefreshing = true;

      return axiosInstance
        .post("/token/refresh/", { refresh: refreshToken })
        .then((response) => {
          const newAccessToken = response?.data.access;
          const newRefreshToken = response?.data.refresh;

          localStorage.setItem("access", newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem("refresh", newRefreshToken);
          }

          axiosInstance.defaults.headers["Authorization"] =
            `Bearer ${newAccessToken}`;

          originalRequest.headers["Authorization"] =
            `Bearer ${newAccessToken}`;

          isRefreshing = false;
          onRefreshed(newAccessToken);

          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          isRefreshing = false;
          refreshSubscribers = [];
          console.warn("Token refresh failed", err);
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
