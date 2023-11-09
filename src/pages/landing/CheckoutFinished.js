import React from "react";
import { useTranslation } from "react-i18next";
import LettersMove from "../../components/layout/LettersMove";

function CheckoutFinished() {
  const [t] = useTranslation("translation");
  return (
    <>
      <div className="full-height-msg">
        <div className="single-msg">
          GRÀCIES!
          <br />
          Hem rebut la teva comanda
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

export default CheckoutFinished;
