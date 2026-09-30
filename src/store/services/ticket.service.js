import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";

const getEventTicket = (token) => {
  return axiosInstance
    .get(API_URL + "ticket/", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response?.data);
};

export default { getEventTicket };
