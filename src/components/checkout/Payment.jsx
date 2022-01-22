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
  const { checkout_stripe = {} } = checkout;
  const { client_secret = "" } = checkout_stripe;
  // const client_secret = checkout_stripe?.client_secret
  const { total } = cart_data;
  const stripe_public_key = process.env.REACT_APP_STRIPE_PUBLIC || "";
  const stripePromise = loadStripe(stripe_public_key);
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
      {checkout_stripe && (
        <PaymentBox>
          {isPaymentFree ? (
            <FreeCheckout />
          ) : (
            <Elements stripe={stripePromise} options={options}>
              <PaymentForm />
            </Elements>
          )}
        </PaymentBox>
      )}
    </PaymentContent>
  );
}
