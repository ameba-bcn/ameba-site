import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import Dropdown from "../dropdown/Dropdown";
import { truncate, priceMayDiscount } from "../../utils/utils";
import useOutsideClick from "../../hooks/use-outside-click";
import useProfileStore from "../../stores/useProfileStore";
import useAuthStore from "../../stores/useAuthStore";
import useUIStore from "../../stores/useUIStore";
import useCartStore from "../../stores/useCartStore";
import "./DropdownCart.css";

function Cart() {
  const { cart_data = {}, addToCart, substractToCart, cartBusy } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const setGuestUser = useProfileStore((state) => state.setGuestUser);
  const setLoggedUser = useProfileStore((state) => state.setLoggedUser);
  const { isCartMenuOpen, openCartMenu, closeCartMenu } = useUIStore();
  const [t] = useTranslation("translation");
  const { item_variants = [], count = 0, total = 0 } = cart_data;
  const dropdownRef = useRef("menulocart");

  useOutsideClick(dropdownRef, () => {
    if (isCartMenuOpen) closeCartMenu();
  });

  if (item_variants.length === 0) return null;

  const seenIds = [];
  const uniqueItems = item_variants.filter((item) => {
    if (seenIds.includes(item.id)) return false;
    seenIds.push(item.id);
    return true;
  });
  const getQty = (id) => item_variants.filter((item) => item.id === id).length;
  const discounted = item_variants.find(
    (item) => item.discount_name && item.discount_value,
  );

  const isMemberProduct = (id) => id in [26, 27]; // Controlar que el id de cart nunca cambie. IMPORTANTE

  const addItem = (id) => addToCart(id);
  const substractItem = (id) => {
    if (isMemberProduct(id)) {
      isLoggedIn ? setLoggedUser() : setGuestUser();
    }
    substractToCart(id);
  };
  const handleToggle = () => (isCartMenuOpen ? closeCartMenu() : openCartMenu());
  const handleCheckoutClick = () => {
    isLoggedIn ? setLoggedUser() : setGuestUser();
    closeCartMenu();
  };

  return (
    <div className="cart-popover" ref={dropdownRef}>
      <button
        type="button"
        className="nb-icon"
        aria-label={t("checkout.cistella")}
        aria-haspopup="dialog"
        aria-expanded={isCartMenuOpen}
        onClick={handleToggle}
      >
        <Icon
          icon="shoppingCart"
          className="cartIconMenu"
          type="hoverable-black"
          width="21"
          height="21"
        />
        <span className="nb-count">{count}</span>
      </button>

      <Dropdown open={isCartMenuOpen} setIsOpen={closeCartMenu} externalClickOutside>
        <div className="cart-pop" role="dialog" aria-label={t("checkout.cistella")}>
          <div className="cart-pop__head">
            <span className="cart-pop__title">{t("checkout.cistella")}</span>
            <span className="cart-pop__count">
              {t("checkout.article-count", { count })}
            </span>
          </div>

          <div className="cart-pop__items">
            {uniqueItems.map((item) => (
              <div className="cart-pop__item" key={item.id}>
                {item.preview ? (
                  <img className="cart-pop__thumb" src={item.preview} alt="" />
                ) : (
                  <div className="cart-pop__thumb cart-pop__thumb--empty" aria-hidden="true" />
                )}
                <div className="cart-pop__info">
                  <span className="cart-pop__name">{truncate(item.item_name, 30)}</span>
                  {item.variant_details?.size &&
                    item.variant_details.size !== "unique" && (
                      <span className="cart-pop__meta">{item.variant_details.size}</span>
                    )}
                  <span className="cart-pop__price">
                    {priceMayDiscount(
                      item.price,
                      item.discount_value,
                      item.discount_name,
                      t("form.descompte"),
                      item.subtotal,
                    )}
                  </span>
                </div>
                <div className="cart-pop__qty">
                  <button
                    type="button"
                    className="nb-qty"
                    aria-label={t("checkout.resta")}
                    disabled={cartBusy}
                    onClick={() => substractItem(item.id)}
                  >
                    −
                  </button>
                  <span className="cart-pop__qty-value">{getQty(item.id)}</span>
                  <button
                    type="button"
                    className="nb-qty"
                    aria-label={t("checkout.suma")}
                    disabled={cartBusy}
                    onClick={() => addItem(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {discounted && (
            <div className="cart-pop__discount">
              {t("checkout.codigo-aplicado", {
                code: discounted.discount_name,
                value: discounted.discount_value,
              })}
            </div>
          )}

          <div className="cart-pop__foot">
            <div className="cart-pop__total-row">
              <span className="cart-pop__total-label">{t("checkout.total")}</span>
              <span className="cart-pop__total-value">{total}</span>
            </div>
            <NavLink
              className="nb-badge"
              to={isLoggedIn ? "/checkout" : "/login"}
              onClick={handleCheckoutClick}
            >
              {t("checkout.finalitzarCompra")}
            </NavLink>
            <button type="button" className="cart-pop__continue" onClick={closeCartMenu}>
              {t("checkout.continua-comprant")}
            </button>
          </div>
        </div>
      </Dropdown>
    </div>
  );
}

export default Cart;
