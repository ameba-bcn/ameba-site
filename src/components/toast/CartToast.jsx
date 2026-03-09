import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ToastBox,
  ToastLeftInBox,
  ToastRightInBox,
} from "./CartToast.style.js";
import useProfileStore from "../../stores/useProfileStore";
import useCartStore from "../../stores/useCartStore";

export default function CartToast() {
  const { cart_data = {} } = useCartStore();
  const { user_profile = "" } = useProfileStore();
  const checkoutRedirect =
    user_profile === "LOGGED" || user_profile === "MEMBER"
      ? "/checkout"
      : "/login";
  const { item_variants = [] } = cart_data;
  const [t] = useTranslation("translation");

  return (
    <ToastBox>
      <NavLink to={checkoutRedirect}>
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
      </NavLink>
    </ToastBox>
  );
}
