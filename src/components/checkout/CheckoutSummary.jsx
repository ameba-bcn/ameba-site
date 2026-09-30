import React from "react";
import { useTranslation } from "react-i18next";
import useCartStore from "../../stores/useCartStore";
import { formatPriceCA, hasArticlesCheckout } from "../../utils/utils";
import { PICKUP_LOCATIONS } from "../forms/DeliveryForm/DeliveryMethod";
import Icon from "../ui/Icon";
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
  const {
    item_variants = [],
    total = "",
    delivery_method = "",
    pickup_location = "",
    shipping_address = "",
    shipping_postal_code = "",
    shipping_city = "",
  } = cart_data;
  const discount = computeDiscount(item_variants);
  const isShipping = delivery_method === "shipping";
  const needsDelivery = hasArticlesCheckout(item_variants);
  const pickupLocation = PICKUP_LOCATIONS.find(
    (location) => location.value === pickup_location,
  );
  const hasShippingAddress =
    !!shipping_address && !!shipping_postal_code && !!shipping_city;

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
                {formatPriceCA(item.price)}
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
              −{formatPriceCA(discount.savings)}
            </span>
          </div>
        )}

        {needsDelivery && (
          <div className="checkout-summary__row">
            <span>
              {isShipping ? t("checkout.enviament") : t("checkout.recogida")}
            </span>
            <span>{isShipping ? `+${formatPriceCA(7)}` : t("checkout.gratis")}</span>
          </div>
        )}

        <div className="checkout-summary__row checkout-summary__row--total">
          <span>{t("checkout.total")}</span>
          <span className="checkout-summary__total-value">
            {formatPriceCA(total)}
          </span>
        </div>
      </div>

      {needsDelivery && (
        <div className="checkout-summary__pickup">
          <div className="checkout-summary__pickup-head">
            <Icon icon={isShipping ? "truck" : "place"} width="20" height="20" />
            <span className="checkout-summary__pickup-title">
              {isShipping
                ? t("checkout.enviament-domicili")
                : t("checkout.recollida-a", {
                    lloc: pickupLocation?.name || "",
                  })}
            </span>
          </div>
          {isShipping ? (
            <p>
              {hasShippingAddress
                ? `${shipping_address}, ${shipping_postal_code} ${shipping_city}`
                : t("checkout.completa-adreca")}
            </p>
          ) : (
            <p>{pickupLocation?.address}</p>
          )}
          <p className="checkout-summary__pickup-note">
            {t("checkout.review-footer-1")}
          </p>
        </div>
      )}
    </aside>
  );
}
