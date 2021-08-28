import React from "react";
import { connect } from "react-redux";
import LettersMove from "../../components/layout/LettersMove";

const mapStateToProps = (state) => {
  return {
    errorMessage: state.message.message,
  };
};

function CheckoutFinished(props) {
  const { errorMessage } = props;
  return (
    <>
      <div className="full-height-msg">
        {errorMessage ? (
          <div className="single-msg">
            UPS!
            <br />
            {errorMessage}
            <br />
            Possat en contacte amb info@ameba.cat indicant l'usuari/email
            empreats.
          </div>
        ) : (
          <div className="single-msg">
            GRÀCIES!
            <br />
            Hem rebut la teva comanda
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

export default connect(mapStateToProps)(CheckoutFinished);
