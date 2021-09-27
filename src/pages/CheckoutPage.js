import React from "react";
import Checkout from "../components/checkout/Checkout";
import LettersMove from "../components/layout/LettersMove";

export default function CheckoutPage() {
  return (
    <div>
      <Checkout />
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </div>
  );
}
