import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";

export default function LogMailConfirmation() {
  const validateEmail = useAuthStore((state) => state.validateEmail);
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const [t] = useTranslation("translation");
  const location = useLocation();

  const parsed = Object.fromEntries(new URLSearchParams(location.search));
  const strToken = parsed["?token"] || parsed["token"];

  useEffect(() => {
    if (strToken) {
      validateEmail(strToken).then(setHasQueryParams(true));
    }
  }, [strToken, validateEmail]);

  if (localStorage.getItem("view") === "new_member" && setHasQueryParams) {
    return <Navigate to="/checkout" replace />;
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
