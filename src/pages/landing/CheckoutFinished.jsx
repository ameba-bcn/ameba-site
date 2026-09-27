import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import StatusPanel from "../../components/status/StatusPanel";
import Button from "../../components/button/Button";
import useCartStore from "../../stores/useCartStore";

function CheckoutFinished() {
  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const clearPendingPayment = useCartStore((state) => state.clearPendingPayment);

  useEffect(() => {
    localStorage.removeItem("checkoutStep");
    clearPendingPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout section="status" centered>
      <PageMeta title={t("checkoutFinished.meta-title")} url="/resum-comanda" />
      <StatusPanel
        tone="success"
        eyebrow={t("checkoutFinished.tag")}
        title={t("checkoutFinished.titol")}
        text={t("checkoutFinished.subtitol")}
        actions={
          <>
            <Button
              buttonStyle="boton--back-orange--solid"
              buttonSize="boton--medium"
              hoverStyle="bg-cream"
              onClick={() => navigate("/")}
            >
              {t("checkoutFinished.cta-home")}
            </Button>
            <Button
              buttonStyle="boton--primary--solid"
              buttonSize="boton--medium"
              hoverStyle="bg-cream"
              onClick={() => navigate("/botiga")}
            >
              {t("checkoutFinished.cta-botiga")}
            </Button>
          </>
        }
      />
    </PageLayout>
  );
}

export default CheckoutFinished;
