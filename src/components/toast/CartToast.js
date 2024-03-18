import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ToastBox,
  ToastLeftInBox,
  ToastRightInBox,
} from "./CartToast.style.js";

export default function CartToast() {
  const { cart_data = {} } = useSelector((state) => state.cart);
  const profile = useSelector((state) => state.profile);
  const { user_profile = "" } = profile;
  const checkoutRedirect =
    user_profile === "LOGGED" || user_profile === "MEMBER"
      ? "/checkout"
      : "/login";
  const [redirect, setRedirect] = useState(false);
  if (redirect) return <Redirect to={checkoutRedirect} />;
  const { item_variants = [] } = cart_data;
  const [t] = useTranslation("translation");

  return (
    <ToastBox
      onClick={() => {
        setRedirect(true);
      }}
    >
      <ToastLeftInBox>
        {t("checkout.compra-toast1")}{" "}
        <span>
          {item_variants.length}{" "}
          {item_variants.length === 1
            ? t("general.producte")
            : t("general.producte") + "s"}
        </span>{" "}
        {t("checkout.compra-toast2")}
      </ToastLeftInBox>
      <ToastRightInBox>{cart_data.total}</ToastRightInBox>
    </ToastBox>
  );
}
