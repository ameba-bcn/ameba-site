import React from "react";
import DiscountCode from "../forms/DiscountForm/DiscountCode";
import DeliveryMethod from "../forms/DeliveryForm/DeliveryMethod";
import useCartStore from "../../stores/useCartStore";
import { hasArticlesCheckout } from "../../utils/utils";
import "./Review.style.css";
import TableProducts from "./TableProducts";

function Review() {
  const { cart_data = {} } = useCartStore();
  const showDeliveryMethod = hasArticlesCheckout(cart_data.item_variants || []);

  return (
    <div className="review-content">
      <TableProducts />
      {showDeliveryMethod && (
        <>
          <hr className="review-divider" />
          <DeliveryMethod />
        </>
      )}
      <hr className="review-divider" />
      <DiscountCode />
    </div>
  );
}

export default Review;
