import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import DropdownCartMobile from "./DropdownCartMobile";

function CartMobile(props) {
  const { closeMenu, openCartMenu, closeCartMenu, isCartMenuOpen } = props;
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variants = [] } = cart_data;
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const [t] = useTranslation("translation");
  if (cart_data && item_variants.length < 1 && cartMenuOpen) {
    setCartMenuOpen(false);
  }

  const handleOpenCartMobile = () => {
    if (isCartMenuOpen) {
      closeCartMenu();
    } else {
      openCartMenu();
    }
  };

  const handleCloseCartMobile = () => {
    closeCartMenu();
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
              handleCloseMenu={closeMenu}
              setCartMenuOpen={setCartMenuOpen}
            />
          </div>
        )}
      </li>
    )
  );
}

export default CartMobile;
