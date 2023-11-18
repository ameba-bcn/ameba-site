import axiosInstance from "../../axios";
import { API_URL } from "../../utils/constants";

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

const getColaborators = () => {
  return axiosInstance.get(`${API_URL}collaborators/`, {});
};

export default {
  supportYourLocalsAll,
  agendaAll,
  botigaAll,
  membershipAll,
  getAbout,
  getCover,
  getColaborators,
};
