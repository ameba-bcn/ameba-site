import axios from "axios";


const API_URL = process.env.REACT_APP_API_HOST || "http://localhost/api/";

const register = (username, email, password) => {
    return axios.post(API_URL + "users/", {
        username,
        email,
        password,
    });
};

const validateEmail = (token) => {
    return axios.post(API_URL + "activate/", {
        'token': token
    });
};

const passwordRecovery = () => {
    // return axios.post(API_URL + "users/", {
    // });
};

const sendEmailPasswordRecovery = () => {
    // return axios.post(API_URL + "users/", {
    // });
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
    login,
    logout,
    validateEmail,
    passwordRecovery,
    sendEmailPasswordRecovery
};