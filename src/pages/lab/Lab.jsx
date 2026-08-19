import React from "react";
import { useTranslation } from "react-i18next";
import PageMeta from "../../components/seo/PageMeta";
import "./Lab.css";

export default function Lab() {
  const [t] = useTranslation("translation");
  return (
    <div className="Lab">
      <PageMeta title="Lab" url="/lab" description={t("lab.meta")} />
      <h1 className="outline-display Lab__title">Lab</h1>
      <p className="Lab__soon">{t("lab.proximament")}</p>
    </div>
  );
}
