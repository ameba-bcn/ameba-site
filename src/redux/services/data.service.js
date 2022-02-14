import axiosInstance from "../../axios";

const API_URL = process.env.REACT_APP_API_HOST || "http://localhost/api/";

const supportYourLocalsAll = () => {
  return axiosInstance.get(`${API_URL}artists/`, {});
};

const agendaAll = () => {
  return axiosInstance.get(`${API_URL}events/`, {});
};

const botigaAll = () => {
  return axiosInstance.get(`${API_URL}articles/`, {});
};

const membershipAll = () => {
  return axiosInstance.get(`${API_URL}subscriptions/`, {});
};

const getAbout = () => {
  return axiosInstance.get(`${API_URL}about/`, {});
};

const getCover = () => {
  return axiosInstance.get(`${API_URL}covers/`, {});
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  supportYourLocalsAll,
  agendaAll,
  botigaAll,
  membershipAll,
  getAbout,
  getCover,
};
