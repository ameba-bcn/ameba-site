import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import { AMEBA_EMAIL } from "../../utils/constants";
import "../../styles/GlobalStyles.css";
import useProfileStore from "../../stores/useProfileStore";

export default function SubscriptionFinished() {
  const subscribeNewsletter = useProfileStore((state) => state.subscribeNewsletter);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [t] = useTranslation("translation");
  const location = useLocation();

  useEffect(() => {
    const parsed = Object.fromEntries(new URLSearchParams(location.search));
    let email = parsed["email"]?.trim() || parsed["?email"]?.trim();
    if (email && email.indexOf(" ") > 0) email = email.replace(" ", "+");
    if (email && email.length > 0)
      subscribeNewsletter(email).then(setIsSubmitted(true));
  }, [location.search, subscribeNewsletter]);

  return (
    <PageLayout
      className="full-height-msg"
      centered
      banner={{
        sentence: t("banners.soci-curt"),
        color: "var(--color-rojo)",
      }}
    >
      {!isSubmitted ? (
        <div className="single-msg">
          {t("errors.general")}
          <br />
          {t("errors.contacta")}
          <div className="styled-link">
            <a href="mailto:info@ameba.cat">{AMEBA_EMAIL}</a>
          </div>
        </div>
      ) : (
        <div className="single-msg">{t("general.agraiment")}</div>
      )}
    </PageLayout>
  );
}
