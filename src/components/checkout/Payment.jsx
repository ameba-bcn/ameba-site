import React, { useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PaymentForm from "../forms/Payment/PaymentForm";
import FreeCheckout from "./FreeCheckout";
import Spinner from "../spinner/Spinner";
import "./Payment.style.css";
import useCartStore from "../../stores/useCartStore";

export default function Payment() {
  const [t] = useTranslation("translation");
  const { checkout = {} } = useCartStore();
  const { checkout_stripe = {}, amount } = checkout;
  const isPaymentFree = amount === 0;
  const { client_secret = "", stripe_public = "" } = checkout_stripe;
  const [terms, setTerms] = useState(false);

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
      {!isPaymentFree && (
        <>
          <div className="payment-secure-note">
            <span className="ck-lbl">{t("checkout.pago-seguro-titol")}</span>
            <span className="payment-secure-note__text">
              {t("checkout.pago-seguro-text")}
            </span>
          </div>

          <label className="payment-terms">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <span>
              {t("checkout.acceptar-pre")}
              <Link to="/legal">{t("checkout.acceptar-link")}</Link>
              {t("checkout.acceptar-post")}
            </span>
          </label>
        </>
      )}

      <div className="payment-box">
        {isPaymentFree ? (
          <FreeCheckout />
        ) : isStripeReady ? (
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm disabled={!terms} />
          </Elements>
        ) : (
          <Spinner size={40} alone />
        )}
      </div>
    </div>
  );
}
