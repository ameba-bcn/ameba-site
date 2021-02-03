import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost/api/";

const addInCart = (id) => {

    if (JSON.parse(localStorage.getItem("user"))?.access !== undefined) {
        console.log("Hay un user loggeado, nene")
        return axios.post(API_URL + 'carts/',
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
                },
                items: [id]
            }).then((response) => {
                console.log("cart response", response)
                localStorage.setItem("cart", JSON.stringify(response.data.id));
                return response.data;
            })
    } else {
        console.log("No lo hay y hay que crear uuid")
        return axios.put(API_URL + 'carts/current/', {
            items: [id]
        }).then((response) => {
            console.log("cart response", response)
            localStorage.setItem("cart", JSON.stringify(response.data.id));
            return response.data;
        })
    }
    // Hay cart uuid en LS?

    // No? -->     User Logged?
    //             No? --> axios.post(url, {items})
    //             Si? --> axios.???

    // Si? -->     axios.put(url/uuid, {items})
    // error --> ???

};

export default {
    addInCart
};