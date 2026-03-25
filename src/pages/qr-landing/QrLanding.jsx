import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import { AMEBA_EMAIL, BASE_URL, radioDublabLink } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import "./QrLanding.css";
import axiosInstance from "../../axios";

const QrLanding = () => {
  const [memberData, setMemberData] = useState({});
  const location = useLocation();
  const [t] = useTranslation("translation");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parsed = Object.fromEntries(new URLSearchParams(location.search));
    const strToken = parsed["token"] || parsed["?token"];
    axiosInstance
      .get(BASE_URL + `member_card/?token=${strToken}`, {})
      .then((res) => {
        setMemberData(res?.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [location.search]);

  return (
    <PageLayout
      className="logViewYellow"
      loading={loading}
      banner={{
        sentence: "AMEBA RADIO @ dublab",
        link: radioDublabLink,
        color: "var(--color-cream)",
      }}
    >
      <div className="qr-landing">
        {memberData && Object.keys(memberData)?.length > 0 ? (
          <div className="json-formatted-box">
            <DisclaimerBox text={t("soci.carnet")} style="light" />
            <div className="json-formatted">
              <pre>{JSON.stringify(memberData, null, 2)}</pre>
            </div>
          </div>
        ) : (
          <div className="single-msg">
            {t("errors.general")}
            <br />
            {t("errors.contacta")}
            <div className="styled-link">
              <a href="mailto:info@ameba.cat">{AMEBA_EMAIL}</a>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default QrLanding;
