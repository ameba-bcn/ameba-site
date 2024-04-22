import React from "react";
import LettersMove from "../../components/layout/LettersMove";
import { radioDublabLink } from "../../utils/constants";

function CheckoutFinished() {
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
        sentence="AMEBA RADIO @ dublab"
        link={radioDublabLink}
        color="#EB5E3E"
      />
    </>
  );
}

export default CheckoutFinished;
