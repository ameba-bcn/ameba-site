import axiosInstance from "./../../axios";

const API_URL = process.env.REACT_APP_API_HOST || "http://localhost/api/";

const register = (registerData) => {
  return axiosInstance.post(API_URL + "users/", registerData);
};

const validateLocalToken = (refreshToken) => {
  return axiosInstance
    .post(API_URL + "token/refresh/", {
      refresh: refreshToken,
    })
    .then((response) => {
      if (response?.data.access) {
        localStorage.setItem("access", response?.data.access);
      }
      return response?.data;
    });
};

const validateEmail = (token) => {
  return axiosInstance
    .post(API_URL + "activate/", {
      token: token,
    })
    .then((response) => {
      return response?.data;
    });
};

const passwordRecovery = (token, password) => {
  return axiosInstance
    .post(API_URL + "recovery/", {
      token: token,
      password: password,
    })
    .then((response) => {
      return response?.data;
    });
};

const sendEmailPasswordRecovery = (email) => {
  return axiosInstance.get(API_URL + `recovery/?email=${email}`).then((response) => {
    return response?.data;
  });
};

const login = (email, password) => {
  return axiosInstance
    .post(API_URL + "token/", {
      email,
      password,
    })
    .then((response) => {
      if (response?.data.access) {
        localStorage.setItem("access", response?.data.access);
        localStorage.setItem("refresh", response?.data.refresh);
      }
      return response?.data;
    });
  // si hay cart en LS hacer un get localhost/api/carts/{cart-id}/ ide de carro del LS
};

const getMemberProfile = () => {
  return axiosInstance
    .get(API_URL + `users/current/member_profile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response?.data;
    });
};

const updateMemberProfile = (identity_card, first_name, last_name, phone_number) => {
  return axiosInstance
    .patch(
      API_URL + `users/current/member_profile/`,
      {
        identity_card,
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
      return response?.data;
    });
};

const createMemberProfile = (identity_card, first_name, last_name, phone_number) => {
  return axiosInstance
    .post(
      API_URL + `users/current/member_profile/`,
      {
        identity_card,
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
      return response?.data;
    });
};

const getUserData = () => {
  return axiosInstance
    .get(API_URL + `users/current/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response?.data;
    });
};

const logout = () => {
  const refresh = localStorage.getItem("refresh");
  return axiosInstance
    .delete(API_URL + `token/${refresh}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then(() => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("cart_id");
      document.location.href = "/";
    });
};

const deleteUser = () => {
  return axiosInstance
    .delete(API_URL + "users/current/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      return response?.data;
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  validateLocalToken,
  login,
  logout,
  getUserData,
  validateEmail,
  passwordRecovery,
  sendEmailPasswordRecovery,
  getMemberProfile,
  updateMemberProfile,
  createMemberProfile,
  deleteUser,
};
