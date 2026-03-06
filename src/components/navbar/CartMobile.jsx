import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import DropdownCartMobile from "./DropdownCartMobile";
import {
  setCloseCartMenu,
  setCloseMenu,
  setOpenCartMenu,
} from "../../store/actions/menu";

function CartMobile() {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { isCartMenuOpen } = useSelector((state) => state.menu);
  const { item_variants = [] } = cart_data;
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const [t] = useTranslation("translation");
  if (cart_data && item_variants.length < 1 && cartMenuOpen) {
    setCartMenuOpen(false);
  }

  const handleCloseCartMobile = () => {
    dispatch(setCloseCartMenu());
  };

  const handleOpenCartMobile = () => {
    if (isCartMenuOpen) {
      handleCloseCartMobile();
    } else {
      dispatch(setOpenCartMenu());
    }
  };

  return (
    item_variants.length > 0 && (
      <li className="cart-cistella">
        <a
          data-item={t("checkout.cistella")}
          onClick={(e) => handleOpenCartMobile(e)}
        >
          {t("checkout.cistella")}
        </a>
        {isCartMenuOpen && (
          <div className="cart-mobile__box">
            <DropdownCartMobile
              cartData={cart_data}
              closeDropDown={() => handleCloseCartMobile()}
              isMobile={true}
              handleCloseMenu={() => dispatch(setCloseMenu())}
              setCartMenuOpen={setCartMenuOpen}
            />
          </div>
        )}
      </li>
    )
  );
}

export default CartMobile;
