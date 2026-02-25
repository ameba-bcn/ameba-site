import React from "react";
import { useTranslation } from "react-i18next";
import LettersMove from "./../components/layout/LettersMove";
// import { ButtonBackToHome } from '../components/ButtonBackToHome'

export default function NotFound() {
  const [t] = useTranslation("translation");
  return (
    <>
      <div className="full-height-msg">
        <div className="single-msg">404!</div>
        <div className="single-msg">Pagina no encontrada</div>
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </>
  );
}
