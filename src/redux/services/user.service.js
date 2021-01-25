import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost/api/";

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