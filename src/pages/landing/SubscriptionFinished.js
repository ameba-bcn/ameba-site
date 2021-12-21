import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LettersMove from "../../components/layout/LettersMove";
import { subscribeNewsletter } from "../../redux/actions/profile";
import { AMEBA_EMAIL } from "../../utils/constants";

export default function SubscriptionFinished(props) {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { message = "" } = useSelector((state) => state.message);

  const queryString = require("query-string");
  const parsed = queryString.parse(props.location.search);
  let email = parsed?.email?.trim();

  // Un email con un '+' lo recupera como espaciado, hay que reconstruirlo
  if (email && email.indexOf(" ") > 0) email = email.replace(" ", "+");

  useEffect(() => {
    if (email && email.length > 0)
      dispatch(subscribeNewsletter(email)).then(setIsSubmitted(true));
  }, [email, dispatch]);

  return (
    <>
      <div className="full-height-msg">
        {!isSubmitted ? (
          <div className="single-msg">
            Algo no ha anat bé...
            <br />
            Contacta amb {AMEBA_EMAIL}
          </div>
        ) : (
          <div className="single-msg">
            Fet!
            <br />
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
