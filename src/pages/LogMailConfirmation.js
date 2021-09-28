import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { validateEmail } from "./../redux/actions/auth";
import LettersMove from "./../components/layout/LettersMove";

export default function LogMailConfirmation(props) {
  const dispatch = useDispatch();
  const { message = "" } = useSelector((state) => state.message);
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const queryString = require("query-string");
  const parsed = queryString.parse(props.location.search);
  const strToken = parsed.token;

  useEffect(() => {
    if (strToken) {
      dispatch(validateEmail(strToken))
        .then(setHasQueryParams(true))
        .catch(setDisplayError(true));
    }
  }, [strToken]);

  if (localStorage.getItem("view") === "new_member" && setHasQueryParams) {
    return <Redirect to="/checkout" />;
  }

  return (
    <>
      <div className="full-height-msg">
        {hasQueryParams ? (
          <div className="single-msg">
            {displayError && message ? message : "Compte verificat: Benvingut!"}
          </div>
        ) : (
          <div className="single-msg">
            T'hem enviat un mail de confirmació, confirma l'enllaç
          </div>
        )}
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence="FES-TE SOCI/A "
        color="#FAE6C5"
      />
    </>
  );
}
