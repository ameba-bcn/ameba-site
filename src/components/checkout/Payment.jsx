import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
  const { checkout = {} } = useSelector((state) => state.cart);
  const { client_secret = "" } = checkout.checkout;
  const { total } = cart_data;
  const stripePromise = loadStripe(
    "pk_test_51IGkXjHRg08Ncmk7fPlbb9DfTF5f7ckXBKiR4g01euLgXs04CqmgBPOQuqQfOhc6aj9mzsYE1oiQ3TFjHH9Hv3Mj00GNyG9sep"
  );
  const options = {
    clientSecret: client_secret,
    appearance: {
      theme: "stripe",
    },
  };

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
        {isPaymentFree ? (
          <FreeCheckout />
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        )}
      </PaymentBox>
    </PaymentContent>
  );
}
