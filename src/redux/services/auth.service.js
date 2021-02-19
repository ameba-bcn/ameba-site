import axios from "axios";

const API_URL = "http://localhost/api/";

const register = (username, email, password) => {
    return axios.post(API_URL + "users/", {
        username,
        email,
        password,
    });
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
        });
};

const logout = () => {
    let userData = JSON.parse(localStorage.getItem("user"));
    return axios.delete(API_URL + `token/${userData.refresh}/`, {})
        .then((response) => {
            console.log("Vamos a eliminar el user")
            localStorage.removeItem("user");
        });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    logout,
};