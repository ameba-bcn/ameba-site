import axios from "axios";
// import authHeader from "./auth-header";

const API_URL = "http://localhost/api/";

const addInCart = (id) => {

    if (JSON.parse(localStorage.getItem("user"))?.access !== undefined) {
        console.log("Hay un user loggeado, nene")
        return axios.get(API_URL + 'carts/current/', {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
            }
        }).then((response) => {
            console.log("cart response Important", response)
            localStorage.setItem("cart_id", JSON.stringify(response.data.id));
            // localStorage.setItem("cart_items", JSON.stringify(response.data.cart_items));
            let cart_prev = response.data.cart_items;
            cart_prev.push(id)
            return axios.patch(`${API_URL}carts/${response.data.id}/`,
                {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}` },
                    "items": cart_prev
                }).then((response) => {
                    console.log("cart response", response)
                    localStorage.setItem("cart_id", JSON.stringify(response.data.id));
                    localStorage.setItem("cart_items", JSON.stringify(cart_prev));
                    return response.data;
                })
        })
    } else {
        // console.log("URGGG", localStorage.getItem("cart"))
        if (JSON.parse(localStorage.getItem("cart_id")) === null) {
            console.log("No lo hay y hay que crear uuid")
            let cart_prev = []
            return axios.post(`${API_URL}carts/`
            ).then((response) => {
                console.log("cart response", response)
                localStorage.setItem("cart_id", JSON.stringify(response.data.id));
                return axios.patch(`${API_URL}carts/${response.data.id}/`,
                    { "items": [id] }
                ).then((response) => {
                    console.log("cart patch response", response)
                    cart_prev.push(response.data.cart_items[0].id)
                    localStorage.setItem("cart_items", JSON.stringify(cart_prev));
                    return response;
                })
            })
        } else {
            let cart_uuid = JSON.parse(localStorage.getItem("cart_id"));
            let cart_prev = JSON.parse(localStorage.getItem("cart_items"));
            console.log("las cosas", cart_uuid)
            cart_prev.push(id)
            return axios.patch(`${API_URL}carts/${cart_uuid}/`,
                { "items": cart_prev }
            ).then((response) => {
                console.log("cart response", response)
                localStorage.setItem("cart_id", JSON.stringify(response.data.id));
                localStorage.setItem("cart_items", JSON.stringify(cart_prev));
                return response.data;
            })
        }
    }
};

const removeItemCart = (id) => {
    let cart_uuid = JSON.parse(localStorage.getItem("cart_id"));
    let cart_prev = JSON.parse(localStorage.getItem("cart_items"));
    const index = cart_prev.indexOf(id);
    if (index > -1) {
        cart_prev.splice(index, 1);
    }
    return axios.patch(`${API_URL}carts/${cart_uuid}/`,
        { "items": cart_prev }
    ).then((response) => {
        console.log("cart response", response)
        localStorage.setItem("cart_id", JSON.stringify(response.data.id));
        localStorage.setItem("cart_items", JSON.stringify(cart_prev));
        return response.data;
    })
}

const deleteFullCart = () => {
    let cart_uuid = JSON.parse(localStorage.getItem("cart_id"))
    return axios.delete(`${API_URL}carts/${cart_uuid}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
        }
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    addInCart,
    deleteFullCart,
    removeItemCart
};