import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
import { openFullscreen } from "../../redux/actions/fullscreen";

export default function Payment() {
  const dispatch = useDispatch();
  const { cart_data = {}, checkout = {} } = useSelector((state) => state.cart);
  const { checkout_stripe = {}, amount } = checkout;
  const isPaymentFree = amount === 0;
  const { client_secret = "", stripe_public = "" } = checkout_stripe;
  const { total } = cart_data;
  const stripePromise = loadStripe(stripe_public);
  const options = {
    clientSecret: client_secret,
    appearance: {
      theme: "stripe",
    },
  };
  useEffect(() => {
    dispatch(openFullscreen());
  }, []);

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
