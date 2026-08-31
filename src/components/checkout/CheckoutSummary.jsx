import React from "react";
import { useTranslation } from "react-i18next";
import useCartStore from "../../stores/useCartStore";
import { formatPrice } from "../../utils/utils";
import "./CheckoutSummary.css";

function computeDiscount(items) {
  let savings = 0;
  let name = null;
  items.forEach((item) => {
    if (!item.discount_value && !item.discount_name) return;
    const price = parseFloat(item.price);
    const subtotal = parseFloat(item.subtotal);
    if (!isNaN(price) && !isNaN(subtotal)) savings += price - subtotal;
    name = name || item.discount_name;
  });
  return savings > 0 ? { savings, name } : null;
}

export default function CheckoutSummary() {
  const [t] = useTranslation("translation");
  const { cart_data = {} } = useCartStore();
  const { item_variants = [], total = "" } = cart_data;
  const discount = computeDiscount(item_variants);

  return (
    <aside className="checkout-summary">
      <div className="checkout-summary__panel">
        <h2 className="checkout-summary__title">{t("checkout.resumen")}</h2>

        <div className="checkout-summary__items">
          {item_variants.map((item, i) => (
            <span className="checkout-summary__item" key={item.id ?? i}>
              <span className="checkout-summary__item-name">
                {item.item_name}
              </span>
              <span className="checkout-summary__item-price">
                {formatPrice(item.price)}
              </span>
            </span>
          ))}
        </div>

        {discount && (
          <div className="checkout-summary__row checkout-summary__row--discount">
            <span>
              {t("checkout.descuento")}
              {discount.name ? ` ${discount.name}` : ""}
            </span>
            <span className="checkout-summary__discount-value">
              −{formatPrice(discount.savings)}
            </span>
          </div>
        )}

        <div className="checkout-summary__row checkout-summary__row--total">
          <span>Total</span>
          <span className="checkout-summary__total-value">{total}</span>
        </div>
      </div>

      <div className="checkout-summary__pickup">
        <span className="checkout-summary__pickup-title">
          {t("checkout.recogida")}
        </span>
        <p>{t("checkout.review-footer-5")}</p>
        <p className="checkout-summary__pickup-note">
          {t("checkout.review-footer-1")}
        </p>
      </div>
    </aside>
  );
}
