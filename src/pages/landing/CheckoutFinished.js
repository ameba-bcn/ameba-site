import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LettersMove from "../../components/layout/LettersMove";

function CheckoutFinished() {
  const [t] = useTranslation("translation");
  const { message } = useSelector((state) => state.message);
  return (
    <>
      <div className="full-height-msg">
        {!message ? (
          <div className="single-msg">
            GRÀCIES!
            <br />
            Hem rebut la teva comanda
          </div>
        ) : (
          <div className="single-msg">
            {message}
          </div>
        )}
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
