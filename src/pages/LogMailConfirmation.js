import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { validateEmail } from "./../store/actions/auth";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";

export default function LogMailConfirmation(props) {
  const dispatch = useDispatch();
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const [t] = useTranslation("translation");

  // eslint-disable-next-line no-undef
  const queryString = require("querystring-es3");
  const parsed = queryString.parse(props.location.search);
  const strToken = parsed["?token"] || parsed["token"];

  useEffect(() => {
    if (strToken) {
      dispatch(validateEmail(strToken)).then(setHasQueryParams(true));
    }
  }, [strToken, dispatch]);

  if (localStorage.getItem("view") === "new_member" && setHasQueryParams) {
    return <Redirect to="/checkout" />;
  }

  return (
    <>
      <div className="full-height-msg">
        {hasQueryParams ? (
          <div className="single-msg">{t("login.verifica")}</div>
        ) : (
          <div className="single-msg">
            T&apos;hem enviat un mail de confirmació, confirma l&apos;enllaç
          </div>
        )}
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#FAE6C5"
      />
    </>
  );
}
