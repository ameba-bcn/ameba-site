import React, { useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import CheckoutFinished from "./CheckoutFinished";

function CheckoutFinishedWrapper() {
  const { checkout = {} } = useSelector((state) => state.cart);
  const { checkout_stripe = {} } = checkout;
  const { stripe_public = "" } = checkout_stripe;

  // Memoize stripe promise to avoid recreating on every render
  const stripePromise = useMemo(() => {
    if (stripe_public) {
      return loadStripe(stripe_public);
    }
    return null;
  }, [stripe_public]);

  // If no stripe key available yet, render without Elements
  // The payment verification will handle the case where stripe is not available
  if (!stripePromise) {
    return <CheckoutFinished />;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutFinished />
    </Elements>
  );
}

export default CheckoutFinishedWrapper;
