import React from "react";
import { useSelector } from "react-redux";
import PaymentForm from "../forms/Payment/PaymentForm";
import FreeCheckout from "./FreeCheckout";
import MiniTableProducts from "./MiniTableProducts";
import {
  PayementTotalRow,
  PaymentBox,
  PaymentContent,
  PaymentReview,
  PaymentSummaryBox,
} from "./Payment.style";
import { ReviewRowSeparator } from "./Review.style";

export default function Payment(props) {
  const { isPaymentFree = false } = props;
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { total } = cart_data;

  return (
    <PaymentContent>
      <PaymentSummaryBox>
        <PaymentReview>
          <PayementTotalRow>
            <div> Total</div>
            <div> {total}</div>
          </PayementTotalRow>
          <ReviewRowSeparator isBig={false} />
          <MiniTableProducts />
          <ReviewRowSeparator isBig={false} />
        </PaymentReview>
      </PaymentSummaryBox>
      <PaymentBox>
        {isPaymentFree ? <FreeCheckout /> : <PaymentForm />}
      </PaymentBox>
    </PaymentContent>
  );
}
