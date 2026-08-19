import axios from "axios";
import * as Sentry from "@sentry/react";
import { BASE_URL } from "./utils/constants";
import { safeLocalStorage } from "./utils/safeStorage";

const storedLang = safeLocalStorage.getItem("i18nextLng") || "ca";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 120000,
  headers: {
    Authorization: safeLocalStorage.getItem("access")
      ? `Bearer ${safeLocalStorage.getItem("access")}`
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

function clearSession() {
  isRefreshing = false;
  refreshSubscribers = [];
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // No volcar el objeto de error completo: error.config.headers.Authorization
    // contiene el Bearer token. Log solo de metadatos no sensibles.
    console.warn(
      "Axios error:",
      error.response?.status,
      error.config?.url
    );
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      // Ruido de cliente no accionable — no reportar a Sentry:
      // - abortos/cancelaciones (navegación, cierre de pestaña)
      // - ERR_NETWORK (sin conexión, adblockers, WiFi caída); la
      //   disponibilidad del backend se monitoriza en servidor.
      // Los timeouts (ECONNABORTED por timeout) sí se reportan.
      const isClientNoise =
        axios.isCancel(error) ||
        error.code === "ERR_CANCELED" ||
        error.code === "ERR_NETWORK" ||
        (error.code === "ECONNABORTED" && error.message === "Request aborted");
      if (!isClientNoise) {
        console.warn(
          "A server/network error occurred. " +
            "Sorry about this - we will get it fixed shortly."
        );
        Sentry.captureException(error);
      }
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === BASE_URL + "token/refresh/"
    ) {
      clearSession();
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
        clearSession();
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

      let tokenParts;
      try {
        tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
      } catch (e) {
        console.warn("Refresh token is malformed");
        clearSession();
        window.location.href = "/login/";
        return Promise.reject(error);
      }
      const now = Math.ceil(Date.now() / 1000);

      if (tokenParts.exp <= now) {
        console.warn("Refresh token is expired", tokenParts.exp, now);
        clearSession();
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
          clearSession();
          console.warn("Token refresh failed", err?.response?.status);
          return Promise.reject(err);
        });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
