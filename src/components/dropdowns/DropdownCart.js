import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { addToCart, substractToCart } from "./../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./DropdownCart.css";

export default function DropdownCart(props) {
  const dispatch = useDispatch();
  // const { cart } = props.cartData;
  const { item_variants = [], total = 0 } = props.cartData;
  const arrMono = [];
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const getQty = (arr, id) => {
    arrMono.push(id);
    return arr.filter((x) => x.id === id).length;
  };
  const checkoutRedirect = user_profile === "LOGGED" ? "/checkout" : "/login";

  const addItem = (id) => {
    console.log("Add item", id);
    dispatch(addToCart(id));
  };

  const substractItem = (id) => {
    dispatch(substractToCart(id));
  };

  const checkoutToCart = () => {
    props.closeDropDown();
  };

  return (
    <>
      {item_variants !== undefined ? (
        <>
          <div className="totalCart">
            Total: <span>{total}</span>
          </div>
          <hr className="separadorCartDrop" />
          {item_variants.map((el, index) =>
            arrMono.includes(el.id) ? null : (
              <div className="menuItemCart" key={index}>
                <div className="rowCartProduct">
                  <div className="colCartProduct1">
                    <div className="addCart" onClick={() => addItem(el.id)}>
                      <AddIcon />
                    </div>
                    <div
                      className="subsCart"
                      onClick={() => substractItem(el.id)}
                    >
                      <RemoveIcon />
                    </div>
                  </div>
                  <div className="colCartProduct2">
                    <div className="titleCartProduct">
                      {el.name.split("(")[0]}
                    </div>
                    <div className="rowDetailedCart">
                      <div className="cartPriceProduct">{el.price}</div>
                      <div className="quantityPriceProduct">
                        Qty: <span>{getQty(item_variants, el.id)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
          <hr className="separadorCartDrop" />
          <NavLink className="menuOptions" to={checkoutRedirect}>
            <div
              onClick={() => checkoutToCart()}
              className="buttonCheckoutCart"
            >
              Finalitzar compra
            </div>
          </NavLink>
        </>
      ) : null}
    </>
  );
}
