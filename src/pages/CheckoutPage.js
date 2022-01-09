import React from "react";
import { useTranslation } from "react-i18next";
import Checkout from "../components/checkout/Checkout";
import LettersMove from "../components/layout/LettersMove";

export default function CheckoutPage() {
  const [t] = useTranslation("translation");

  return (
    <div className="checkoutViewYellow">
      <Checkout />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </div>
  );
}
