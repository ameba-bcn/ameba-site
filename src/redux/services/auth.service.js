import axios from "axios";
import axiosInstance from "./../../axios";

const API_URL = process.env.REACT_APP_API_HOST || "http://localhost/api/";

const register = (registerData) => {
  return axiosInstance.post(API_URL + "users/", registerData);
};

const registerMember = (
  address,
  first_name,
  last_name,
  phone_number,
  username,
  password,
  email,
  cart_id
) => {
  return axiosInstance
    .post(API_URL + "member_register/", {
      username,
      email,
      password,
      first_name,
      last_name,
      address,
      phone_number,
      cart_id,
    })
    .then((response) => {
      return response.data;
    });
};

const validateLocalToken = (refreshToken) => {
  return axios
    .post(API_URL + "token/refresh/", {
      refresh: refreshToken,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("access", response.data.access);
      }
      return response.data;
    });
};

const validateEmail = (token) => {
  return axios
    .post(API_URL + "activate/", {
      token: token,
    })
    .then((response) => {
      return response.data;
    });
};

const passwordRecovery = (token, password) => {
  return axios
    .post(API_URL + "recovery/", {
      token: token,
      password: password,
    })
    .then((response) => {
      return response.data;
    });
};

const sendEmailPasswordRecovery = (email) => {
  return axios.get(API_URL + `recovery/?email=${email}`).then((response) => {
    return response.data;
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "token/", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
      }
      return response.data;
    });
  // si hay cart en LS hacer un get localhost/api/carts/{cart-id}/ ide de carro del LS
};

const getMemberProfile = () => {
  return axios
    .get(API_URL + `users/current/member_profile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const updateMemberProfile = (memberData) => {
  const {
    address = "",
    first_name = "",
    last_name = "",
    phone_number = "",
  } = memberData;
  return axios
    .patch(
      API_URL + `users/current/member_profile/`,
      {
        address,
        first_name,
        last_name,
        phone_number,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

const getUserData = () => {
  return axios
    .get(API_URL + `users/current/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  const refresh = localStorage.getItem("refresh");
  return axios
    .delete(API_URL + `token/${refresh}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then(() => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      if (JSON.parse(localStorage.getItem("cart_id")))
        localStorage.removeItem("cart_id");
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  registerMember,
  validateLocalToken,
  login,
  logout,
  getUserData,
  validateEmail,
  passwordRecovery,
  sendEmailPasswordRecovery,
  getMemberProfile,
  updateMemberProfile,
};
