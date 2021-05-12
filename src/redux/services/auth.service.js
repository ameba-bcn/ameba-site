import axios from "axios";
import axiosInstance from './../../axios';

const API_URL = process.env.REACT_APP_API_HOST || "http://localhost/api/";

const register = (username, email, password) => {
    return axios.post(API_URL + "users/", {
        username,
        email,
        password,
    });
};

const registerMember = (address, first_name, last_name, phone_number, username, password, email) => {
    return axiosInstance.post(API_URL + "member_register/", {
        username,
        email,
        password,
        first_name,
        last_name,
        address,
        phone_number,
    }).then((response) => {
        return response.data;
    });
};

const validateEmail = (token) => {
    return axios.post(API_URL + "activate/", {
        'token': token
    }).then((response) => {
        return response.data;
    })
};

const passwordRecovery = (token, password) => {
    return axios.post(API_URL + "recovery/", {
        'token': token,
        'password': password
    }).then((response) => {
        return response.data;
    })
};

const sendEmailPasswordRecovery = (email) => {
    return axios.get(API_URL + `recovery/?email=${email}`)
        .then((response) => {
            return response.data;
        })
};

const login = (email, password) => {
    return axios.post(API_URL + "token/", {
        email,
        password,
    })
        .then((response) => {
            console.log("reponse", response)
            if (response.data.access) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
    // si hay cart en LS hacer un get localhost/api/carts/{cart-id}/ ide de carro del LS
};

const getUserData = () => {
    return axios.get(API_URL + `users/current/`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
        }
    })
        .then((response) => {
            return response.data;
        })
};

const logout = () => {
    return axios.delete(API_URL + `token/${JSON.parse(localStorage.getItem("user"))?.refresh}/`
        , {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
            }
        })
        .then(() => {
            console.log("Vamos a eliminar el user")
            localStorage.removeItem("user");
            if (JSON.parse(localStorage.getItem("cart_id"))) localStorage.removeItem("cart_id");
        });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    registerMember,
    login,
    logout,
    getUserData,
    validateEmail,
    passwordRecovery,
    sendEmailPasswordRecovery
};