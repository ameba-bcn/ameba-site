import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";

const subscribeNewsletter = (email) => {
  return axiosInstance.post(API_URL + "subscribe/", {
    email,
  });
};

const getCarnet = (token) => {
  return axiosInstance.get(
    API_URL + `member_card/?token=${encodeURIComponent(token)}`,
  );
};

export default {
  subscribeNewsletter,
  getCarnet,
};
