import React, { useState, useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";
import useDataStore from "../../stores/useDataStore";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import CardLayout from "../../components/layout/CardLayout/CardLayout";
import SearchBox from "../../components/searchBox/SearchBox";
import Pagination from "../../components/pagination/Pagination";
import { ACTIVE_STATUS } from "../../utils/constants";
import "./Socios.css";

const PAGE_SIZE = 20;

const Socios = () => {
  const { member_projects, isMemberProjectsLoading, fetchMemberProjects } =
    useDataStore();

  useEffect(() => {
    fetchMemberProjects();
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [t] = useTranslation("translation");
  const { user_member_data = {} } = useAuthStore();
  const { status = "" } = user_member_data;
  const member_projects_active = member_projects.filter(
    (project) => !!project.is_active,
  );
  const filteredSocios = member_projects_active.filter((project) =>
    project.project_name?.toLowerCase()?.includes(searchInput?.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredSocios.length / PAGE_SIZE);
  const paginatedSocios = filteredSocios.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  return (
    <PageLayout
      className="socios"
      title="soci@s"
      titleProps={{
        subtitle:
          !isMemberProjectsLoading &&
          Object.keys(user_member_data).length > 0 &&
          status !== ACTIVE_STATUS
            ? member_projects_active.length === 0
              ? t("general.sense-resultats")
              : t("soci.missatge-ppal")
            : "",
      }}
      banner={{
        sentence: t("banners.soci-curt"),
        color: "var(--color-rojo)",
      }}
    >
      <div className="height-block" />
      <SearchBox
        searchText="Busca"
        searchInput={searchInput}
        setSearchInput={(val) => {
          setSearchInput(val);
          setPage(0);
        }}
        hidden={true}
      />
      <CardLayout
        cardList={paginatedSocios}
        urlRoot="socis"
        loading={isMemberProjectsLoading}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </PageLayout>
  );
};

export default Socios;
