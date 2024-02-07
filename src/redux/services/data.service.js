import axiosInstance from "../../axios";
import { API_URL, BASE_URL } from "../../utils/constants";

console.log(
  "in service process.env.REACT_APP_API_HOST ",
  process.env.REACT_APP_API_HOST
);
console.log("in service BASE_URL", BASE_URL);
console.log("in service API_URL", API_URL);

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

const getCollaborators = () => {
  return axiosInstance.get(`${API_URL}collaborators/`, {});
};

const getMemberProjects = () => {
  return axiosInstance.get(`${API_URL}member_projects/`, {});
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  supportYourLocalsAll,
  agendaAll,
  botigaAll,
  membershipAll,
  getAbout,
  getCover,
  getCollaborators,
  getMemberProjects,
};
