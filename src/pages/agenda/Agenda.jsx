import React from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import AgendaTable from "./components/AgendaTable";
import useDataStore from "../../stores/useDataStore";

export default function Agenda() {
  const [t] = useTranslation("translation");
  const { isEventsLoading } = useDataStore();

  return (
    <PageLayout
      className="Articles"
      title="AGENDA"
      loading={isEventsLoading}
      banner={{
        sentence: t("banners.soci-curt"),
        link: "/memberships",
        color: "#EB5E3E",
      }}
    >
      <AgendaTable />
    </PageLayout>
  );
}
