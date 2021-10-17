import React from "react";
import { useSelector } from "react-redux";
import LettersMove from "../../components/layout/LettersMove";

function CheckoutFinished() {
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
        sentence="FES-TE SOCI/A "
        color="#EB5E3E"
      />
    </>
  );
}

export default CheckoutFinished;
