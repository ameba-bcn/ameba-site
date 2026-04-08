import React, { useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../forms/Payment/PaymentForm";
import FreeCheckout from "./FreeCheckout";
import MiniTableProducts from "./MiniTableProducts";
import "./Payment.style.css";
import "./Review.style.css";
import useCartStore from "../../stores/useCartStore";

export default function Payment() {
  const { cart_data = {}, checkout = {} } = useCartStore();
  const { checkout_stripe = {}, amount } = checkout;
  const isPaymentFree = amount === 0;
  const { client_secret = "", stripe_public = "" } = checkout_stripe;
  const { total } = cart_data;

  const stripePromise = useMemo(
    () => (stripe_public ? loadStripe(stripe_public) : null),
    [stripe_public],
  );

  const options = useMemo(
    () => ({
      clientSecret: client_secret,
      appearance: { theme: "stripe" },
    }),
    [client_secret],
  );

  const isStripeReady = !!(stripe_public && client_secret && stripePromise);

  return (
    <div className="payment-content">
      <div className="payment-summary-box">
        <div className="payment-review">
          <div className="payment-total-row">
            <div> Total:</div>
            <div> {total}</div>
          </div>
          <div className="review-row-separator review-row-separator--small" />
          <MiniTableProducts />
          <div className="review-row-separator review-row-separator--small" />
        </div>
      </div>

      <div className="payment-box">
        {isPaymentFree ? (
          <FreeCheckout />
        ) : isStripeReady ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        ) : (
          <span className="spinner-border"></span>
        )}
      </div>
    </div>
  );
}
