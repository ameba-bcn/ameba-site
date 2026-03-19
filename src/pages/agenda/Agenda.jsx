import React from "react";
import { useTranslation } from "react-i18next";
import LettersMove from "../../components/layout/LettersMove";
import PowerTitle from "../../components/layout/PowerTitle";
import AgendaTable from "./components/AgendaTable";
import Spinner from "../../components/spinner/Spinner";
import useDataStore from "../../stores/useDataStore";

export default function Agenda() {
  const [t] = useTranslation("translation");
  const { isEventsLoading } = useDataStore();

  return (
    <div className="Articles">
      <PowerTitle title="AGENDA" autoScale />
      {isEventsLoading ? <Spinner /> : <AgendaTable />}
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        link="/memberships"
        color="#EB5E3E"
      />
    </div>
  );
}
