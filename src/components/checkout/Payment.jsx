import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ErrorBox from "../forms/error/ErrorBox";
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
  const [t] = useTranslation("translation");
  const { isPaymentFree = false } = props;
  const { cart_data = {}, checkout = {} } = useSelector((state) => state.cart);
  const { checkout_stripe = {} } = checkout;
  const { client_secret = "", stripe_public = '' } = checkout_stripe;
  const { total } = cart_data;
  const stripePromise = loadStripe(stripe_public);
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
      {stripe_public ? (
        checkout_stripe && (
          <PaymentBox>
            {isPaymentFree ? (
              <FreeCheckout />
            ) : (
              <Elements stripe={stripePromise} options={options}>
                <PaymentForm />
              </Elements>
            )}
          </PaymentBox>
        )
      ) : (
        <ErrorBox message={t("errors.stripe")} isError={true} />
      )}
    </PaymentContent>
  );
}
