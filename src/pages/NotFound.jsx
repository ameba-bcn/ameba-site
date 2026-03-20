import React from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../components/layout/PageLayout/PageLayout";

export default function NotFound() {
  const [t] = useTranslation("translation");
  return (
    <PageLayout
      className="full-height-msg"
      centered
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      <div className="single-msg">404!</div>
      <div className="single-msg">Pagina no encontrada</div>
    </PageLayout>
  );
}
