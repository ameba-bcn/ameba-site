import React from "react";
import { useTranslation } from "react-i18next";
import Icon from "../../ui/Icon";

export default function CoverageNote() {
  const [t] = useTranslation("translation");
  return (
    <div className="coverage-note">
      <Icon icon="tooltip" width="20" height="20" />
      <span>{t("checkout.enviament-nota")}</span>
    </div>
  );
}
