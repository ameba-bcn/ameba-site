import React from "react";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import AgendaTable from "./components/AgendaTable";
import PageMeta from "../../components/seo/PageMeta";
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
        color: "var(--color-rojo)",
      }}
    >
      <PageMeta
        title="Agenda"
        description="Agenda d'activitats d'AMEBA: concerts, festivals, tallers i xerrades de música electrònica a Barcelona."
        url="/activitats"
      />
      <AgendaTable />
    </PageLayout>
  );
}
