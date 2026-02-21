import React from "react";
import LogComponent from "./../components/user/LogComponent";
import LettersMove from "./../components/layout/LettersMove";
import { useTranslation } from "react-i18next";

export default function LogSession() {
  const [t] = useTranslation("translation");
  return (
    <div className="logViewRed">
      <LogComponent />
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
}
