import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import StatusPanel from "../../components/status/StatusPanel";
import DigitalCard from "../../components/digitalCard/DigitalCard";
import { AMEBA_EMAIL, BASE_URL } from "../../utils/constants";
import { formatISODateToDate } from "../../utils/utils";
import axiosInstance from "../../axios";

const QrLanding = () => {
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [t] = useTranslation("translation");

  useEffect(() => {
    const parsed = Object.fromEntries(new URLSearchParams(location.search));
    const strToken = parsed["token"] || parsed["?token"];
    if (strToken) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    axiosInstance
      .get(BASE_URL + `member_card/?token=${encodeURIComponent(strToken)}`, {})
      .then((res) => {
        setMemberData(res?.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [location.search]);

  const hasData = memberData && Object.keys(memberData).length > 0;
  const memberName = hasData
    ? [memberData.first_name, memberData.last_name].filter(Boolean).join(" ") ||
      memberData.username
    : "";

  return (
    <PageLayout section="status" centered>
      <PageMeta title={t("soci.carnet-title")} url="/qr-view" />
      {loading ? (
        <StatusPanel loading />
      ) : hasData ? (
        <StatusPanel
          eyebrow={t("soci.carnet-title")}
          title={memberName}
          text={t("soci.carnet")}
        >
          <DigitalCard
            badge={memberData.status}
            title={memberName}
            subtitle={memberData.identity_card ? `ID: ${memberData.identity_card}` : null}
            rows={[
              { label: t("soci.carnet-member-type"), value: memberData.type },
              {
                label: t("soci.carnet-expira"),
                value: memberData.expires
                  ? formatISODateToDate(memberData.expires)
                  : "—",
              },
            ]}
          />
        </StatusPanel>
      ) : (
        <StatusPanel
          tone="error"
          eyebrow={t("soci.carnet-title")}
          title={t("errors.general")}
          text={
            <>
              {t("errors.contacta")}
              <a href={`mailto:${AMEBA_EMAIL}`}>{AMEBA_EMAIL}</a>.
            </>
          }
        />
      )}
    </PageLayout>
  );
};

export default QrLanding;
