// https://bezkoder.com/react-hooks-redux-login-registration-example/

import axios from "axios";

const API_URL = "http://localhost/api/";

const register = (username, email, password) => {
    return axios.post(API_URL + "users", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios.post(API_URL + "token", {
        username,
        password,
    })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    let refresh_token = localStorage.getItem("refresh_token");
    return axios.delete(API_URL + `token/${refresh_token}`, {})
        .then((response) => {
            localStorage.removeItem("user");
        });
};

export default {
    register,
    login,
    logout,
};