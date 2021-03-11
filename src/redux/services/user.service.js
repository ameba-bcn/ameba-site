import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_HOST || "http://localhost/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserName = () => {
  return axios.get(API_URL + "users/current/", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserName
};