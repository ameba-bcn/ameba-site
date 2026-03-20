import React, { useState } from "react";
import PageLayout from "../components/layout/PageLayout/PageLayout";
import MailRecoveryForm from "../components/forms/MailRecoveryForm/MailRecoveryForm";
import { useTranslation } from "react-i18next";

export default function SendEmailPasswordRecovery() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [t] = useTranslation("translation");

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
          <div className="logTitle">{t("login.recupera-curt")}</div>
          {isSubmitted ? null : (
            <MailRecoveryForm
              setIsSubmitted={setIsSubmitted}
              isSubmitted={isSubmitted}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}
