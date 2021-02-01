import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost/api/";

const addInCart = (id) => {
    return axios.post(API_URL + '', {
        id
    }).then((response) => {
        console.log("cart response", response)
        return response.data;
    })
};

export default {
    addInCart
};