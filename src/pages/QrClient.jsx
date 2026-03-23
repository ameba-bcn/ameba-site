import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import stateService from "./../store/services/profile.services";
import PageLayout from "../components/layout/PageLayout/PageLayout";

export default function QrClient() {
  const [data, setData] = useState({});
  const location = useLocation();
  const [t] = useTranslation("translation");

  useEffect(() => {
    const parsed = Object.fromEntries(new URLSearchParams(location.search));
    const token = parsed["token"] || parsed["?token"];
    if (token?.length > 0) {
      stateService.getCarnet(token)?.then((data) => {
        setData(data);
      });
    }
  }, [location.search]);

  return (
    <PageLayout
      className="logViewRed"
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "var(--color-cream)",
      }}
    >
      <div className="cardForm">
        <div className="card-form">
          <div className="logTitle">data</div>
          {Object.keys(data).length > 0 ? (
            <>{JSON.parse(data)}</>
          ) : (
            <>{t("general.sense-resultats")}</>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
