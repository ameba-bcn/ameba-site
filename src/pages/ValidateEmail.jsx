import React from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../components/layout/PageLayout/PageLayout";

export default function ValidateEmail() {
  const [t] = useTranslation("translation");
  return (
    <PageLayout
      className="full-height-msg"
      centered
      banner={{
        sentence: t("banners.soci-curt"),
        color: "var(--color-rojo)",
      }}
    >
      <div className="single-msg">
        Hem enviat un email de verificació. Valida-ho abans de continuar.
      </div>
    </PageLayout>
  );
}
