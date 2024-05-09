import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../ui/Icon";
import Dropdown from "../dropdown/Dropdown";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import Button from "../button/Button";
import { ReactFitty } from "react-fitty";
import { addToCart, substractToCart } from "../../store/actions/cart";
import { setGuestUser, setLoggedUser } from "../../store/actions/profile";
import { truncate, priceMayDiscount } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import useOutsideClick from "../../hooks/use-outside-click";
import "./DropdownCart.css";

function Cart() {
  const dispatch = useDispatch();
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { item_variants = [], count = 0, total = 0 } = cart_data;
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const [t] = useTranslation("translation");
  const arrMono = [];

  const getQty = (arr, id) => {
    arrMono.push(id);
    return arr.filter((x) => x.id === id).length;
  };

  const handleCloseCart = () => {
    setCartMenuOpen(false);
  };

  const addItem = (id) => {
    dispatch(addToCart(id));
  };

  const isMemberProduct = (id) => {
    return id in [26, 27]; // Controlar que el id de cart nunca cambie. IMPORTANTE
  };

  const substractItem = (id) => {
    if (isMemberProduct(id)) {
      isLoggedIn ? dispatch(setLoggedUser()) : dispatch(setGuestUser());
    }
    dispatch(substractToCart(id));
  };

  const checkoutToCart = () => {
    isLoggedIn ? dispatch(setLoggedUser()) : dispatch(setGuestUser());
    setCartMenuOpen(false);
    handleCloseCart();
  };
  const dropdownRef = React.useRef(null);

  useOutsideClick(dropdownRef, () => {
    if (cartMenuOpen) handleCloseCart();
  });

  const checkoutRedirect = isLoggedIn ? "/checkout" : "/login";
  return (
    item_variants.length > 0 && (
      <li>
        <div className="cart-icon-bubble-box" ref={dropdownRef}>
          {cart_data ? <div className="bubbleCart">{count}</div> : null}
          <Icon
            icon="shoppingCart"
            className="cartIconMenu"
            type="orange"
            onClick={() => setCartMenuOpen(!cartMenuOpen)}
          />

          {cartMenuOpen && (
            <Dropdown
              externalClickOutside={true}
              open={cartMenuOpen}
              setIsOpen={handleCloseCart}
            >
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
                            <div
                              className="addCart"
                              onClick={() => addItem(el.id)}
                            >
                              <Icon icon="plus" />
                            </div>
                            <div
                              className="subsCart"
                              onClick={() => substractItem(el.id)}
                            >
                              <Icon icon="minus" />
                            </div>
                          </div>
                          <div className="colCartProduct2">
                            <div className="titleCartProduct">
                              <ReactFitty maxSize={22}>
                                {truncate(el.item_name, 25)}
                              </ReactFitty>
                            </div>
                            <div className="rowDetailedCart">
                              <div className="cartPriceProduct">
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
              ) : null}
            </Dropdown>
          )}
        </div>
      </li>
    )
  );
}

export default Cart;
