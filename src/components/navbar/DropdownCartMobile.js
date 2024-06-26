import React from "react";
import { addToCart, substractToCart } from "../../store/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "../button/Button";
import { toast } from "react-toastify";
import "./DropdownCart.css";
import { setGuestUser, setLoggedUser } from "../../store/actions/profile";
import { useTranslation } from "react-i18next";
import { ReactFitty } from "react-fitty";
import { priceMayDiscount, truncate } from "../../utils/utils";
import { MOBILE_SMALL } from "../../utils/constants";
import CartToast from "../toast/CartToast";
import Icon from "../ui/Icon";
import useMediaQuery from "../../hooks/use-media-query";

export default function DropdownCartMobile(props) {
  const dispatch = useDispatch();
  const { setCartMenuOpen = {} } = props;
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
    props.handleCloseMenu();
    props.closeDropDown();
  };

  return (
    <>
      {item_variants !== undefined ? (
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
                        {priceMayDiscount(
                          el?.price,
                          el?.discount_value,
                          el?.discount_name,
                          t("form.descompte")
                        )}
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
                      <Icon icon="plus" />
                    </div>
                    <div
                      className="subsCart"
                      onClick={() => substractItem(el.id)}
                    >
                      <Icon icon="minus" />
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
      ) : null}
    </>
  );
}
