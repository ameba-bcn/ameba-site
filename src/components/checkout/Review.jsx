import React from "react";
import DiscountCode from "../forms/DiscountForm/DiscountCode";
import "./Review.style.css";
import TableProducts from "./TableProducts";

function Review() {
  return (
    <div className="review-content">
      <TableProducts />
      <DiscountCode />
    </div>
  );
}

export default Review;
