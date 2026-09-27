import React from "react";
import DiscountCode from "../forms/DiscountForm/DiscountCode";
import DeliveryMethod from "../forms/DeliveryForm/DeliveryMethod";
import "./Review.style.css";
import TableProducts from "./TableProducts";

function Review() {
  return (
    <div className="review-content">
      <TableProducts />
      <DeliveryMethod />
      <DiscountCode />
    </div>
  );
}

export default Review;
