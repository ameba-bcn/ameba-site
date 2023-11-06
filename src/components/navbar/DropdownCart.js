import React from "react";
import { addToCart, substractToCart } from "../../redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "../button/Button";
import { toast } from "react-toastify";
import "./DropdownCart.css";
import { setGuestUser, setLoggedUser } from "../../redux/actions/profile";
import { useTranslation } from "react-i18next";
import { ReactFitty } from "react-fitty";
import { truncate } from "../../utils/utils";
import { MOBILE_SMALL } from "../../utils/constants";
import { useMediaQuery } from "@material-ui/core";
import CartToast from "../toast/CartToast";

export default function DropdownCart(props) {
  const dispatch = useDispatch();
  const { isMobile = false, setCartMenuOpen = {} } = props;
  const { item_variants = [], total = 0 } = props.cartData;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const isMinMobile = useMediaQuery(MOBILE_SMALL);
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
    isMobile &&
      toast(<CartToast />, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "toast-black-background",
      });
  };

  const substractItem = (id) => {
    if (isMemberProduct(id)) {
      isLoggedIn ? dispatch(setLoggedUser()) : dispatch(setGuestUser());
    }
    dispatch(substractToCart(id));
    isMobile &&
      toast(<CartToast />, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        className: "toast-black-background",
      });
  };

  const checkoutToCart = () => {
    isLoggedIn ? dispatch(setLoggedUser()) : dispatch(setGuestUser());
    setCartMenuOpen(false);
    isMobile && props.handleCloseMenu();
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
                      <div className="titleCartProduct">
                        <ReactFitty maxSize={22}>
                          {truncate(el.item_name, 25)}
                        </ReactFitty>
                      </div>
                      <div className="rowDetailedCart">
                        <div className="cartPriceProduct">{el.price}</div>
                        <div className="quantitySizeProduct">
                          {el?.variant_details?.size !== "unique" &&
                            el?.variant_details?.size}
                        </div>
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
                onClick={() => checkoutToCart()}
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
                        <ReactFitty maxSize={22}>
                          {truncate(el.item_name, isMinMobile ? 25 : 40)}
                        </ReactFitty>
                      </div>
                      <div className="rowDetailedCart">
                        <div className="cartPriceProduct_mobile">
                          {el.price}
                        </div>
                        <div className="quantitySizeProduct">
                          {el?.variant_details?.size !== "unique" &&
                            el?.variant_details?.size}
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
                onClick={() => checkoutToCart()}
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
