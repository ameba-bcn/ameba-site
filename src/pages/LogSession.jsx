import React from "react";
import LogComponent from "./../components/user/LogComponent";
import PageLayout from "../components/layout/PageLayout/PageLayout";
import { useTranslation } from "react-i18next";

export default function LogSession() {
  const [t] = useTranslation("translation");
  return (
    <PageLayout
      className="logViewRed"
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-rojo)",
      }}
    >
      <LogComponent />
    </PageLayout>
  );
}
