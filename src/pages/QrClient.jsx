import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import stateService from "./../store/services/profile.services";
import PageLayout from "../components/layout/PageLayout/PageLayout";

export default function QrClient(props) {
  const [data, setData] = useState({});
  const parsed = Object.fromEntries(new URLSearchParams(props.location.search));
  const [t] = useTranslation("translation");

  useEffect(() => {
    if (parsed["token"].length > 0) {
      stateService
        .getCarnet(parsed["token"] || parsed["?token"])
        ?.then((data) => {
          setData(data);
        });
    }
  }, [parsed]);

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
