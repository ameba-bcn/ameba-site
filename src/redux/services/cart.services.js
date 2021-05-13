import axios from "axios";
import { getIDValuesFromArrayObj } from '../../utils/utils'

const API_URL = process.env.REACT_APP_API_HOST;

const addInCart = (id) => {
    //  Detected user on LS case
    if (JSON.parse(localStorage.getItem("user"))?.access !== undefined) {
        console.log("ADD USER TIPO: USUARIO LOGGEADO")
        return axios.get(API_URL + 'carts/current/', {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
            }
        }).then((response) => {
            localStorage.setItem("cart_id", JSON.stringify(response.data.id));
            let cart_prev = getIDValuesFromArrayObj(response.data.cart_items)
            cart_prev.push(id)
            return axios.patch(`${API_URL}carts/${response.data.id}/`,
                { "item_variant_ids": cart_prev },
                { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}` } }
            ).then((response) => {
                console.log("cart response", response)
                localStorage.setItem("cart_id", JSON.stringify(response.data.id));
                return response.data;
            })
        })
    } else {
        //  Not detected user on LS case
        //  Primer producto del carrito
        if (JSON.parse(localStorage.getItem("cart_id")) === null) {
            console.log("ADD USER TIPO: NO USER")
            return axios.post(`${API_URL}carts/`
            ).then((response) => {
                console.log("cart response", response)
                localStorage.setItem("cart_id", JSON.stringify(response.data.id));
                return axios.patch(`${API_URL}carts/${response.data.id}/`,
                    { "item_variant_ids": [id] }
                ).then((response) => {
                    return response.data;
                })
            })
        } else {
            //  No es primer producto del carrito
            let cart_uuid = JSON.parse(localStorage.getItem("cart_id"));
            return axios.get(`${API_URL}carts/${cart_uuid}/`
            ).then((response) => {
                let cart_prev = getIDValuesFromArrayObj(response.data.cart_items)
                cart_prev.push(id)
                return axios.patch(`${API_URL}carts/${cart_uuid}/`,
                    { "item_variant_ids": cart_prev }
                ).then((response) => {
                    console.log("cart response", response)
                    localStorage.setItem("cart_id", JSON.stringify(response.data.id));
                    return response.data;
                })
            })
        }
    }
};


const addMemberToCart = (id) => {
    return axios.post(`${API_URL}carts/`
    ).then((response) => {
        console.log("cart response", response)
        localStorage.setItem("cart_id", JSON.stringify(response.data.id));
        return axios.patch(`${API_URL}carts/${response.data.id}/`,
            { "item_variant_ids": [id] }
        ).then((response) => {
            return response.data;
        })
    })
}


const checkoutCart = () => {
    return axios.get(`${API_URL}carts/current/checkout/`,
        { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}` } }
    ).then((response) => {
        console.log("cart CHECKOUT response", response)
        return response.data;
    })
}

const removeItemCart = (id) => {
    //  Detected user on LS case
    if (JSON.parse(localStorage.getItem("user"))?.access !== undefined) {
        return axios.get(API_URL + 'carts/current/', {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
            }
        }).then((response) => {
            let cart_prev = getIDValuesFromArrayObj(response.data.cart_items)
            const index = cart_prev.indexOf(id);
            if (index > -1) {
                cart_prev.splice(index, 1);
            }
            return axios.patch(`${API_URL}carts/current/`, { "items": cart_prev },
                {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}` },

                }).then((response) => {
                    console.log("cart response", response)
                    localStorage.setItem("cart_id", JSON.stringify(response.data.id));
                    localStorage.setItem("cart_items", JSON.stringify(cart_prev));
                    return response.data;
                })
        })
        //  Not detected user on LS case
    } else {
        let cart_uuid = JSON.parse(localStorage.getItem("cart_id"));
        return axios.get(`${API_URL}carts/${cart_uuid}/`
        ).then((response) => {
            let cart_prev = getIDValuesFromArrayObj(response.data.cart_items)
            const index = cart_prev.indexOf(id);
            if (index > -1) {
                cart_prev.splice(index, 1);
            }
            return axios.patch(`${API_URL}carts/${cart_uuid}/`,
                { "item_variant_ids": cart_prev }
            ).then((response) => {
                console.log("cart response", response)
                localStorage.setItem("cart_id", JSON.stringify(response.data.id));
                // localStorage.setItem("cart_items", JSON.stringify(cart_prev));
                return response.data;
            })
        })
    }
}

const deleteFullCart = () => {
    let cart_uuid = JSON.parse(localStorage.getItem("cart_id"))
    return axios.delete(`${API_URL}carts/${cart_uuid}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
        }
    })
}

const getCartOnLog = () => {
    return axios.get(`${API_URL}carts/current/`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
        }
    }).then((response) => {
        console.log("cart response", response.data)
        localStorage.setItem("cart_id", JSON.stringify(response.data.id));
        return response.data;
    })
}

const deleteCartAfterSuccesfullCheckout = () => {
    return axios.delete(`${API_URL}carts/current/`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.access}`
        }
    }).then((response) => {
        console.log("delete cart response", response.data)
        return response.data;
    })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    addInCart,
    deleteFullCart,
    removeItemCart,
    addMemberToCart,
    checkoutCart,
    getCartOnLog,
    deleteCartAfterSuccesfullCheckout
};