import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Menu from "@material-ui/core/Menu";
import DropdownCart from "./DropdownCart";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Cart(props) {
  const { isMobile, onClick = {}, click } = props;
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { item_variants = [], count = 0 } = cart_data;
  const [anchorEl, setAnchorEl] = useState();
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const [isCartMobileOpen, setIsCartMobileOpen] = useState(false);
  const [t] = useTranslation("translation");
  if (cart_data && item_variants.length < 1 && cartMenuOpen) {
    setCartMenuOpen(false);
  }

  const handleOpenCart = (event) => {
    setAnchorEl(event.currentTarget);
    if (isMobile) {
      setIsCartMobileOpen(!isCartMobileOpen);
    } else {
      setCartMenuOpen(true);
    }
  };

  const handleCloseCart = () => {
    setAnchorEl(null);
    if (isMobile) {
      setIsCartMobileOpen(false);
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
                  handleCloseMenu={onClick}
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
        {isCartMobileOpen && (
          <div className="cart-mobile__box">
            <DropdownCart
              cartData={cart_data}
              closeDropDown={() => handleCloseCart()}
              isMobile={isMobile}
              handleCloseMenu={onClick}
              click={click}
              setCartMenuOpen={setCartMenuOpen}
            />
          </div>
        )}
      </li>
    ))
  );
}

export default Cart;
