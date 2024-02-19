import axios from "axios";
import { API_URL, BASE_URL } from "./utils/constants";

const storedLang = localStorage.getItem("i18nextLng") || "ca";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
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
    console.warn("Axios, On nok", error);
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      console.warn(
        "A server/network error occurred. " +
          "Sorry about this - we will get it fixed shortly."
      );
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
        console.warn(tokenParts.exp);

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
              console.warn(err);
            });
        } else {
          console.warn("Refresh page token is expired", tokenParts.exp, now);
          if (typeof window !== "undefined") {
            window.location.href = "/login/";
          }
        }
      } else {
        console.warn("Refresh token not available");
        if (typeof window !== "undefined") {
          window.location.href = "/login/";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
