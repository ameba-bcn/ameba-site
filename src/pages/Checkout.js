import React from "react";
import { useSelector } from "react-redux";
import CheckoutMain from "../components/checkout/CheckoutMain";
import CheckoutMember from "../components/checkout/CheckoutMember";
import LettersMove from "./../components/layout/LettersMove";

export default function Checkout() {
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  return (
    <>
      {user_profile === "MEMBER_CANDIDATE" ? (
        <CheckoutMember />
      ) : (
        <CheckoutMain />
      )}
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </>
  );
}
