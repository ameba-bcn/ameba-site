import axios from "axios";
import axiosInstance from "../../axios";
import { API_URL, BASE_URL } from "../../utils/constants";

const subscribeNewsletter = (email) => {
  return axiosInstance.post(API_URL + "subscribe/", {
    email,
  });
};

const getCarnet = (token) => {
  axiosInstance.get(API_URL + `member-card?token=${token}`);
};

export default {
  subscribeNewsletter,
  getCarnet,
};
