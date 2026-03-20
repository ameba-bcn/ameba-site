import React from "react";
import { useTranslation } from "react-i18next";
import LettersMove from "../../components/layout/LettersMove";
import PowerTitle from "../../components/layout/PowerTitle";
import AgendaTable from "./components/AgendaTable";
import useDataStore from "../../stores/useDataStore";
import EmbeddedSpinner from "../../components/spinner/EmbeddedSpinner";

export default function Agenda() {
  const [t] = useTranslation("translation");
  const { isEventsLoading } = useDataStore();

  return (
    <div className="Articles">
      <PowerTitle title="AGENDA" autoScale />
      <div>{isEventsLoading ? <EmbeddedSpinner /> : <AgendaTable />}</div>
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
}
