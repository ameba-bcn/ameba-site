import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";
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
import { openFullscreen } from "../../redux/actions/fullscreen";

export default function Payment(props) {
  const { isPaymentFree = false } = props;
  const [t] = useTranslation("translation");
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(openFullscreen());
  }, [])


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
