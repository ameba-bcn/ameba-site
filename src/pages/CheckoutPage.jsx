import React from "react";
import Checkout from "../components/checkout/Checkout";
import PageLayout from "../components/layout/PageLayout/PageLayout";

export default function CheckoutPage() {
  return (
    <PageLayout className="checkoutViewYellow">
      <Checkout />
    </PageLayout>
  );
}
