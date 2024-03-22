import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import LettersMove from "../../components/layout/LettersMove";
import PowerTitle from "../../components/layout/PowerTitle";
import AgendaTable from "./components/AgendaTable";
import Spinner from "../../components/spinner/Spinner";

export default function Agenda() {
  const [t] = useTranslation("translation");
  const { isEventsLoading } = useSelector((state) => state.loaders);

  return (
    <div className="Articles">
      <div className="ArticlesContent">
        <PowerTitle title="AGENDA" />
        {isEventsLoading ? <Spinner /> : <AgendaTable />}
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
