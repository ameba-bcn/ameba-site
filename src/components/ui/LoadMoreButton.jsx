import React from "react";
import { useTranslation } from "react-i18next";
import "./LoadMoreButton.css";

export default function LoadMoreButton({ onClick, label }) {
  const [t] = useTranslation("translation");

  return (
    <button type="button" className="load-more-button" onClick={onClick}>
      {label ?? t("general.veure-mes")}
    </button>
  );
}
