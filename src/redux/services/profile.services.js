import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";

const subscribeNewsletter = (email) => {
  return axiosInstance.post(API_URL + "subscribe/", {
    email,
  });
};

export default {
  subscribeNewsletter,
};
