import React from "react";
import { useTranslation } from "react-i18next";
import LettersMove from "./../components/layout/LettersMove";

export default function ValidateEmail() {
  const [t] = useTranslation("translation");
  return (
    <>
      <div className="full-height-msg">
        <div className="single-msg">
          Hem enviat un email de verificació. Valida-ho abans de continuar.
        </div>
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </>
  );
}
