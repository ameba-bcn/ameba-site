import React, { useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Menu from "@material-ui/core/Menu";
import DropdownCart from "./DropdownCart";
import { connect, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart_data,
  };
};

function Cart(props) {
  const { cart = {}, isMobile, onClick = {}, click } = props;
  const data = useSelector((state) => state.profile);
  const { user_profile = "" } = data;
  const { item_variants = [], count = 0 } = cart;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCartMobileOpen, setIsCartMobileOpen] = useState(false);

  const handleOpenCart = (event) => {
    if (user_profile !== "MEMBER_CANDIDATE") {
      setAnchorEl(event.currentTarget);
    }
    if (isMobile) {
      setIsCartMobileOpen(!isCartMobileOpen);
    }
  };

  const handleCloseCart = () => {
    setAnchorEl(null);
    if (isMobile) {
      setIsCartMobileOpen(false);
    }
  };

  return (
    item_variants.length > 0 &&
    (!isMobile ? (
      <li>
        <div className="cart-icon-bubble-box">
          {cart ? <div className="bubbleCart">{count}</div> : null}
          <ShoppingCartIcon className="cartIconMenu" onClick={handleOpenCart} />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            className="menuDropdownCart"
            disableAutoFocusItem
            open={Boolean(anchorEl)}
            onClose={handleCloseCart}
          >
            <div>
              <DropdownCart
                cartData={cart}
                closeDropDown={handleCloseCart}
                isMobile={false}
                handleCloseMenu={onClick}
              />
            </div>
          </Menu>
        </div>
      </li>
    ) : (
      <li>
        <NavLink to="/botiga" data-item="CISTELLA" onClick={handleOpenCart}>
          CISTELLA
        </NavLink>
        {isCartMobileOpen && (
          <div className="cart-mobile__box">
            <DropdownCart
              cartData={cart}
              closeDropDown={handleCloseCart}
              isMobile={isMobile}
              handleCloseMenu={onClick}
              click={click}
            />
          </div>
        )}
      </li>
    ))
  );
}

export default connect(mapStateToProps)(Cart);
