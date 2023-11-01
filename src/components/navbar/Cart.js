import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Menu from "@material-ui/core/Menu";
import DropdownCart from "./DropdownCart";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Cart(props) {
  const {
    isMobile = false,
    closeMenu,
    openCartMenu,
    closeCartMenu,
    isCartMenuOpen,
  } = props;
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variants = [], count = 0 } = cart_data;
  const [anchorEl, setAnchorEl] = useState();
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const [t] = useTranslation("translation");
  if (cart_data && item_variants.length < 1 && cartMenuOpen) {
    setCartMenuOpen(false);
  }

  const handleOpenCart = (event) => {
    setAnchorEl(event.currentTarget);
    if (isMobile) {
      isCartMenuOpen ? closeCartMenu() : openCartMenu();
    } else {
      setCartMenuOpen(true);
    }
  };

  const handleCloseCart = () => {
    setAnchorEl(null);
    if (isMobile) {
      closeCartMenu();
    } else {
      setCartMenuOpen(false);
    }
  };

  return (
    item_variants.length > 0 &&
    (!isMobile ? (
      <li>
        <div className="cart-icon-bubble-box">
          {cart_data ? <div className="bubbleCart">{count}</div> : null}
          <ShoppingCartIcon
            className="cartIconMenu"
            onClick={(e) => handleOpenCart(e)}
          />
          {cartMenuOpen && (
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              className="menuDropdownCart"
              disableAutoFocusItem
              open={cartMenuOpen}
              onClose={handleCloseCart}
            >
              <div>
                <DropdownCart
                  cartData={cart_data}
                  closeDropDown={() => handleCloseCart()}
                  isMobile={false}
                  handleCloseMenu={closeMenu}
                  setCartMenuOpen={setCartMenuOpen}
                />
              </div>
            </Menu>
          )}
        </div>
      </li>
    ) : (
      <li className="cart-cistella">
        <a
          data-item={t("checkout.cistella")}
          onClick={(e) => handleOpenCart(e)}
        >
          {t("checkout.cistella")}
        </a>
        {isCartMenuOpen && (
          <div className="cart-mobile__box">
            <DropdownCart
              cartData={cart_data}
              closeDropDown={() => handleCloseCart()}
              isMobile={isMobile}
              handleCloseMenu={closeMenu}
              setCartMenuOpen={setCartMenuOpen}
            />
          </div>
        )}
      </li>
    ))
  );
}

export default Cart;
