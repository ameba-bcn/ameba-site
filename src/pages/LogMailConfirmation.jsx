import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import useCartStore from "../stores/useCartStore";
import PageLayout from "../components/layout/PageLayout/PageLayout";
import { useTranslation } from "react-i18next";

export default function LogMailConfirmation() {
  const validateEmail = useAuthStore((state) => state.validateEmail);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const getUserData = useAuthStore((state) => state.getUserData);
  const getMemberProfile = useAuthStore((state) => state.getMemberProfile);
  const getCart = useCartStore((state) => state.getCart);
  const [hasQueryParams, setHasQueryParams] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [t] = useTranslation("translation");
  const location = useLocation();

  const parsed = Object.fromEntries(new URLSearchParams(location.search));
  const strToken = parsed["?token"] || parsed["token"];

  useEffect(() => {
    if (strToken) {
      validateEmail(strToken).then(() => {
        setHasQueryParams(true);
      });
    }
  }, [strToken, validateEmail]);

  useEffect(() => {
    if (hasQueryParams && isLoggedIn) {
      getUserData().then((data) => {
        if (data?.member) {
          getMemberProfile();
        }
      });
      getCart().then(() => {
        setRedirect(true);
      });
    }
  }, [hasQueryParams, isLoggedIn, getUserData, getMemberProfile, getCart]);

  if (redirect) {
    const destination = localStorage.getItem("view") === "new_member" ? "/checkout" : "/";
    return <Navigate to={destination} replace />;
  }

  return (
    <PageLayout
      className="full-height-msg"
      centered
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-cream)",
      }}
    >
      {hasQueryParams ? (
        <div className="single-msg">{t("login.verifica")}</div>
      ) : (
        <div className="single-msg">
          T&apos;hem enviat un mail de confirmació, confirma l&apos;enllaç
        </div>
      )}
    </PageLayout>
  );
}
