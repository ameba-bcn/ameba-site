import React from "react";
import CheckoutMember from "../components/checkout/CheckoutMember";
import LettersMove from "./../components/layout/LettersMove";

export default function MemberRegistration() {
  return (
    <>
      <CheckoutMember />
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </>
  );
}
