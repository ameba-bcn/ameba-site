import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import StatusPanel from "../../components/status/StatusPanel";
import Button from "../../components/button/Button";
import { AMEBA_EMAIL } from "../../utils/constants";
import useProfileStore from "../../stores/useProfileStore";

export default function SubscriptionFinished() {
  const subscribeNewsletter = useProfileStore((state) => state.subscribeNewsletter);
  const [status, setStatus] = useState("checking");
  const [t] = useTranslation("translation");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const parsed = Object.fromEntries(new URLSearchParams(location.search));
    let email = parsed["email"]?.trim() || parsed["?email"]?.trim();
    if (email && email.indexOf(" ") > 0) email = email.replace(" ", "+");

    if (!email) {
      setStatus("error");
      return;
    }

    subscribeNewsletter(email)
      .then(() => setStatus("done"))
      .catch(() => setStatus("error"));
  }, [location.search, subscribeNewsletter]);

  return (
    <PageLayout section="status" centered>
      <PageMeta title={t("newsletterFinished.meta-title")} url="/subscribe" />
      {status === "checking" ? (
        <StatusPanel loading />
      ) : status === "done" ? (
        <StatusPanel
          tone="success"
          eyebrow={t("newsletterFinished.tag-done")}
          title={t("newsletterFinished.titol-done")}
          text={t("newsletterFinished.subtitol-done")}
          actions={
            <Button
              buttonStyle="boton--back-orange--solid"
              buttonSize="boton--medium"
              hoverStyle="bg-cream"
              onClick={() => navigate("/lab")}
            >
              {t("newsletterFinished.cta-done")}
            </Button>
          }
        />
      ) : (
        <StatusPanel
          tone="error"
          eyebrow={t("newsletterFinished.tag-error")}
          title={t("newsletterFinished.titol-error")}
          text={
            <>
              {t("errors.contacta")}
              <a href={`mailto:${AMEBA_EMAIL}`}>{AMEBA_EMAIL}</a>.
            </>
          }
          actions={
            <Button
              buttonStyle="boton--primary--solid"
              buttonSize="boton--medium"
              hoverStyle="bg-cream"
              onClick={() => navigate("/")}
            >
              {t("newsletterFinished.cta-error")}
            </Button>
          }
        />
      )}
    </PageLayout>
  );
}
