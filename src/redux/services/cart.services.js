import axios from "axios";
import { mergeCartIds } from "../../utils/utils";

const API_URL = process.env.REACT_APP_API_HOST;

const addInCart = (id) => {
  //  Detected user on LS case
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    return axios
      .get(API_URL + "carts/current/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      })
      .then((response) => {
        const cart_uuid = response?.data.id;
        localStorage.setItem("cart_id", cart_uuid);
        const cartItems = response.data.item_variant_ids;
        cartItems.push(id);

        return axios
          .patch(
            `${API_URL}carts/${cart_uuid}/`,
            { item_variant_ids: cartItems },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            return response?.data;
          });
      });
  } else {
    //  Not detected user on LS case
    //  Primer producto del carrito
    const cart_uuid = localStorage.getItem("cart_id");
    if (!cart_uuid) {
      return axios.post(`${API_URL}carts/`).then((response) => {
        localStorage.setItem("cart_id", response?.data.id);
        return axios
          .patch(`${API_URL}carts/${response?.data.id}/`, {
            item_variant_ids: [id],
          })
          .then((response) => {
            return response?.data;
          });
      });
    } else {
      //  No es primer producto del carrito
      return axios.get(`${API_URL}carts/${cart_uuid}/`).then((response) => {
        const cartItems = response.data.item_variant_ids;
        cartItems.push(id);
        return axios
          .patch(`${API_URL}carts/${cart_uuid}/`, {
            item_variant_ids: cartItems,
          })
          .then((response) => {
            localStorage.setItem("cart_id", response?.data.id);
            return response?.data;
          });
      });
    }
  }
};

// const addMemberToCart = (id) => {
//   const accessToken = localStorage.getItem("access");

//   if (accessToken) {
//     return axios
//       .get(API_URL + "carts/current/", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((response) => {
//         const localCartItems = response.data.item_variant_ids;
//         const newDataItems = localCartItems.push(id);
//         return axios
//           .patch(
//             `${API_URL}carts/${response?.data.id}/`,
//             { item_variant_ids: newDataItems },
//             {
//               headers: {
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           )
//           .then((response) => {
//             return response?.data;
//           });
//       });
//   } else {
//     return axios.post(`${API_URL}carts/`).then((response) => {
//       const localCartItems = response.data.item_variant_ids;
//       const newDataItems = localCartItems.push(id);
//       localStorage.setItem("cart_id", response?.data.id);
//       return axios
//         .patch(`${API_URL}carts/${response?.data.id}/`, {
//           item_variant_ids: newDataItems,
//         })
//         .then((response) => {
//           return response?.data;
//         });
//     });
//   }
// };

const removeItemCart = (id) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    return axios
      .get(API_URL + "carts/current/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const cartItems = response.data.item_variant_ids;
        const index = cartItems.indexOf(id);

        if (index > -1) {
          cartItems.splice(index, 1);
        }
        return axios
          .patch(
            `${API_URL}carts/current/`,
            { item_variant_ids: cartItems },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((response) => {
            localStorage.setItem("cart_id", response?.data.id);
            return response?.data;
          });
      });
    //  Not detected user on LS case
  } else {
    const cart_uuid = localStorage.getItem("cart_id");
    return axios.get(`${API_URL}carts/${cart_uuid}/`).then((response) => {
      const cartItems = response.data.item_variant_ids;
      const index = cartItems.indexOf(id);
      if (index > -1) {
        cartItems.splice(index, 1);
      }
      return axios
        .patch(`${API_URL}carts/${cart_uuid}/`, { item_variant_ids: cartItems })
        .then((response) => {
          localStorage.setItem("cart_id", response?.data.id);
          return response?.data;
        });
    });
  }
};

const checkoutCart = () => {
  return axios
    .get(`${API_URL}carts/current/checkout/`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
    })
    .then((response) => {
      return response?.data;
    });
};

const deleteFullCart = () => {
  let cart_uuid = JSON.parse(localStorage.getItem("cart_id"));
  return axios.delete(`${API_URL}carts/${cart_uuid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
};

const getCart = () => {
  let remoteCartItems = [];
  const cart_uuid = localStorage.getItem("cart_id");
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    return axios
      .get(`${API_URL}carts/current/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        remoteCartItems = response?.data?.item_variant_ids;
        if (cart_uuid) {
          return axios
            .get(`${API_URL}carts/${cart_uuid}/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((res) => {
              const localCartItems = res.data.item_variant_ids;
              const mergedItems = mergeCartIds(remoteCartItems, localCartItems);
              return axios.patch(
                `${API_URL}carts/current/`,
                {
                  item_variant_ids: mergedItems,
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                  },
                }
              );
            })
            .then((response) => {
              localStorage.setItem("cart_id", response?.data.id);
              return response?.data;
            });
        } else {
          localStorage.setItem("cart_id", response?.data.id);
          return response?.data;
        }
      });
  } else {
    return axios.get(`${API_URL}carts/${cart_uuid}/`).then((response) => {
      localStorage.setItem("cart_id", response?.data.id);
      return response?.data;
    });
  }
};

const deleteCartAfterSuccesfullCheckout = () => {
  return axios
    .delete(`${API_URL}carts/current/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
    .then((response) => {
      localStorage.removeItem("cart_id");
      return response?.data;
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addInCart,
  deleteFullCart,
  removeItemCart,
  checkoutCart,
  getCart,
  deleteCartAfterSuccesfullCheckout,
};
