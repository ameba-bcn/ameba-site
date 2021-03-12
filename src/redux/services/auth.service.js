import axios from "axios";


const API_URL = process.env.REACT_APP_API_HOST;

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
        // }).then((response) => {
        //     console.log("responseeeeeee", response)
        //     return axios.get(`${API_URL}carts/current/`, {
        //         headers: {
        //             Authorization: `Bearer ${response.access}`
        //         }
        //     })
        //     .then((response) => {
        //         console.log("responsEEEEEE", response)
        //         return response;
        //     })
        })

        // si hay cart en LS hacer un get localhost/api/carts/{cart-id}/ ide de carro del LS
};

const logout = () => {
    // let userData = JSON.parse(localStorage.getItem("user"));

    // let config = {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("user").access}` }
    // };

    return axios.delete(API_URL + `token/${JSON.parse(localStorage.getItem("user"))?.refresh}/`
        , {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
            }
        })
        .then((response) => {
            console.log("Vamos a eliminar el user")
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
        });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    logout,
};