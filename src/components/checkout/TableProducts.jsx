import React from "react";
import { useTranslation } from "react-i18next";
import "./Review.style.css";
import { priceMayDiscount } from "../../utils/utils";
import Icon from "../ui/Icon";
import useCartStore from "../../stores/useCartStore";

export default function TableProducts() {
  const { cart_data = {}, substractToCart } = useCartStore();
  const { item_variants = [] } = cart_data;
  const [t] = useTranslation("translation");

  const substractItem = (id) => {
    substractToCart(id);
  };

  return (
    <div className="review-list">
      {item_variants?.map((item, i) => (
        <div className="review-row" key={i}>
          <div className="review-row__image">
            <img src={item.preview} alt={"item-image-" + { item }} />
          </div>
          <div className="review-row__info">
            <span className="review-row__name">{item.item_name}</span>
            {item?.variant_details?.size &&
              item?.variant_details?.size !== "unique" && (
                <span className="review-row__meta">
                  {t("modal.talla")} {item?.variant_details?.size}
                </span>
              )}
          </div>
          <div className="review-row__price">
            {priceMayDiscount(
              item?.price,
              item?.discount_value,
              item?.discount_name,
              t("form.descompte"),
              item?.subtotal,
            )}
          </div>
          <button
            type="button"
            className="deleteItem"
            aria-label={t("boto.elimina")}
            onClick={() => substractItem(item.id)}
          >
            <Icon icon="trash" type="hoverable-cream" />
          </button>
        </div>
      ))}
    </div>
  );
}
