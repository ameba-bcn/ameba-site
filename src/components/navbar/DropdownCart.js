import React from "react";
import { addToCart, substractToCart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "../button/Button";
import "./DropdownCart.css";
import { setGuestUser, setLoggedUser } from "../../redux/actions/profile";
import { useTranslation } from "react-i18next";

export default function DropdownCart(props) {
  const dispatch = useDispatch();
  const { isMobile = false, setCartMenuOpen = {} } = props;
  const { item_variants = [], total = 0 } = props.cartData;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const arrMono = [];
  const [t] = useTranslation("translation");

  const getQty = (arr, id) => {
    arrMono.push(id);
    return arr.filter((x) => x.id === id).length;
  };

  const isMemberProduct = (id) => {
    return id in [26, 27]; // Controlar que el id de cart nunca cambie. IMPORTANTE
  };

  const checkoutRedirect = isLoggedIn ? "/checkout" : "/login";

  const addItem = (id) => {
    dispatch(addToCart(id));
  };

  const substractItem = (id) => {
    if (isMemberProduct(id)) {
      isLoggedIn ? dispatch(setLoggedUser()) : dispatch(setGuestUser());
    }
    dispatch(substractToCart(id));
  };

  const checkoutToCart = (item_variants) => {
    isLoggedIn ? dispatch(setLoggedUser()) : dispatch(setGuestUser());
    setCartMenuOpen(false);
    props.handleCloseMenu();
    props.closeDropDown();
  };

  return (
    <>
      {item_variants !== undefined ? (
        !isMobile ? (
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
                      <div className="titleCartProduct">{el.name}</div>
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
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--xxl"
                buttonStyle="boton--primary--solid"
                onClick={() => checkoutToCart(item_variants)}
              >
                {t("checkout.finalitzarCompra")}
              </Button>
            </NavLink>
          </>
        ) : (
          <div className="dropDownCart_mobile">
            <div className="totalCart_mobile">
              Total: <span>{total}</span>
            </div>
            <hr className="separadorCartDrop" />
            {item_variants.map((el, index) =>
              arrMono.includes(el.id) ? null : (
                <div className="menuItemCart" key={index}>
                  <div className="rowCartProduct">
                    <div className="colCartProduct1_mobile">
                      <div className="titleCartProduct">
                        {el.name.split("(")[0]}
                      </div>
                      <div className="rowDetailedCart">
                        <div className="cartPriceProduct_mobile">
                          {el.price}
                        </div>
                        <div className="quantityPriceProduct">
                          Qty: <span>{getQty(item_variants, el.id)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="colCartProduct2_mobile">
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
                  </div>
                </div>
              )
            )}
            <hr className="separadorCartDrop" />
            <NavLink
              className="button-link__checkout-mobile"
              to={checkoutRedirect}
            >
              <Button
                variant="contained"
                color="primary"
                buttonSize="boton--xxl"
                buttonStyle="boton--primary--solid"
                onClick={() => checkoutToCart(item_variants)}
              >
                {t("checkout.finalitzarCompra")}
              </Button>
            </NavLink>
          </div>
        )
      ) : null}
    </>
  );
}
