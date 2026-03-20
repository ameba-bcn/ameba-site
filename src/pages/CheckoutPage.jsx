import React from "react";
import { useTranslation } from "react-i18next";
import Checkout from "../components/checkout/Checkout";
import PageLayout from "../components/layout/PageLayout/PageLayout";

export default function CheckoutPage() {
  const [t] = useTranslation("translation");

  return (
    <PageLayout
      className="checkoutViewYellow"
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      <Checkout />
    </PageLayout>
  );
}
