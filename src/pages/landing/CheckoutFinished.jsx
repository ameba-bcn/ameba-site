import React, { useEffect } from "react";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import { radioDublabLink } from "../../utils/constants";

function CheckoutFinished() {
  useEffect(() => {
    localStorage.removeItem("checkoutStep");
  }, []);

  return (
    <PageLayout
      className="full-height-msg"
      centered
      banner={{
        sentence: "AMEBA RADIO @ dublab",
        link: radioDublabLink,
        color: "var(--color-rojo)",
      }}
    >
      <div className="single-msg">
        GRÀCIES!
        <br />
        Hem rebut la teva comanda
      </div>
    </PageLayout>
  );
}

export default CheckoutFinished;
