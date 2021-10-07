import React from "react";
import { useSelector } from "react-redux";
import PaymentForm from "../forms/Payment/PaymentForm";
import FreeCheckout from "./FreeCheckout";
import { PaymentBox, PaymentContent, PaymentReview, PaymentSummaryBox } from "./Payment.style";
import { ReviewRowSeparator, ReviewTotalRow } from "./Review.style";
import TableProducts from "./TableProducts";

export default function Payment(props) {
  const { isPaymentFree = false } = props;
  const { cart_data = {} } = useSelector((state) => state.cart);
  const { total } = cart_data;

  return (
    <PaymentContent>
      <PaymentSummaryBox>
        <PaymentReview>
          <ReviewTotalRow>
            <div> Total</div>
            <div> {total}</div>
          </ReviewTotalRow>
          <ReviewRowSeparator isBig={false}/>
          <TableProducts isBig={false} />
          <ReviewRowSeparator  isBig={false}/>
        </PaymentReview>
      </PaymentSummaryBox>
      <PaymentBox>
        {isPaymentFree ? <FreeCheckout /> : <PaymentForm />}
      </PaymentBox>
    </PaymentContent>
  );
}
