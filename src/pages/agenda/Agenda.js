import React from "react";
import { useTranslation } from "react-i18next";
import LettersMove from "../../components/layout/LettersMove";
import PowerTitle from "../../components/layout/PowerTitle";
import AgendaTable from "./components/AgendaTable";

export default function Agenda() {
  const [t] = useTranslation("translation");

  return (
    <div className="Articles">
      <div className="ArticlesContent">
        <PowerTitle title="AGENDA" />
        <AgendaTable />
      </div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
}
