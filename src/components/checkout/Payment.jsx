import React, { useEffect, useMemo } from "react";
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
import useUIStore from "../../stores/useUIStore";
import useCartStore from "../../stores/useCartStore";

export default function Payment() {
  const openFullscreen = useUIStore((state) => state.openFullscreen);
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

  useEffect(() => {
    openFullscreen();
  }, []);

  return (
    <PaymentContent>
      <PaymentSummaryBox>
        <PaymentReview>
          <PayementTotalRow>
            <div> Total:</div>
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
        ) : isStripeReady ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        ) : (
          <span className="spinner-border"></span>
        )}
      </PaymentBox>
    </PaymentContent>
  );
}
