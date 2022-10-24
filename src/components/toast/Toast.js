import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  ToastBox,
  ToastLeftInBox,
  ToastRightInBox,
} from "./Toast.style";

export default function Toast() {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const checkoutRedirect = user_profile === "LOGGED" || user_profile === "MEMBER" ? "/checkout" : "/login";
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to={checkoutRedirect} />;
  const { item_variants = [] } = cart_data;

  return (
    <ToastBox onClick={() => { console.log("a la verga"); setRedirect(true) }}>
      <ToastLeftInBox>
        tens{" "}
        <span>
          {item_variants.length}{" "}
          {item_variants.length === 1 ? "producte" : "productes"}
        </span>{" "}
        a la cistella
      </ToastLeftInBox>
      <ToastRightInBox>{cart_data.total}</ToastRightInBox>
    </ToastBox>
  );
}
