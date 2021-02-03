import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost/api/";

const addInCart = (id) => {
    // Hay cart uuid en LS?
    
    // No? -->     User Logged?
    //             No? --> axios.post(url, {items})
    //             Si? --> axios.???

    // Si? -->     axios.put(url/uuid, {items})
    // error --> ???
    return axios.post(API_URL + 'carts/', {
        items: [id]
    }).then((response) => {
        console.log("cart response", response)
        localStorage.setItem("cart", JSON.stringify(response.data.id));
        return response.data;
    })
};

export default {
    addInCart
};