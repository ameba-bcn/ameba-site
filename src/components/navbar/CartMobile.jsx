import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DropdownCartMobile from "./DropdownCartMobile";
import useUIStore from "../../stores/useUIStore";
import useCartStore from "../../stores/useCartStore";

function CartMobile() {
  const { cart_data = {} } = useCartStore();
  const { isCartMenuOpen, openCartMenu, closeCartMenu, closeMenu } = useUIStore();
  const { item_variants = [] } = cart_data;
  const [cartMenuOpen, setCartMenuOpen] = useState(false);

  const [t] = useTranslation("translation");
  if (cart_data && item_variants.length < 1 && cartMenuOpen) {
    setCartMenuOpen(false);
  }

  const handleCloseCartMobile = () => {
    closeCartMenu();
  };

  const handleOpenCartMobile = () => {
    if (isCartMenuOpen) {
      handleCloseCartMobile();
    } else {
      openCartMenu();
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
              handleCloseMenu={() => closeMenu()}
              setCartMenuOpen={setCartMenuOpen}
            />
          </div>
        )}
      </li>
    )
  );
}

export default CartMobile;
