import React, { useState, useEffect } from "react";
import useAuthStore from "../../stores/useAuthStore";
import useDataStore from "../../stores/useDataStore";
import { useTranslation } from "react-i18next";
import LettersMove from "../../components/layout/LettersMove";
import PowerTitle from "../../components/layout/PowerTitle";
import CardLayout from "../../components/layout/CardLayout/CardLayout";
import "../../styles/GlobalStyles.css";
import "./Socios.css";
import SearchBox from "../../components/searchBox/SearchBox";
import DisclaimerBox from "../../components/disclaimerBox/DisclaimerBox";
import { ACTIVE_STATUS } from "../../utils/constants";

const PAGE_SIZE = 20;

const Socios = () => {
  const { member_projects, isMemberProjectsLoading, fetchMemberProjects } = useDataStore();

  useEffect(() => {
    fetchMemberProjects();
  }, []);

  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [t] = useTranslation("translation");
  const { user_member_data = {} } = useAuthStore();
  const { status = "" } = user_member_data;
  const member_projects_active = member_projects.filter(
    (project) => !!project.is_active
  );
  const filteredSocios = member_projects_active.filter((project) =>
    project.project_name?.toLowerCase()?.includes(searchInput?.toLowerCase())
  );
  const totalPages = Math.ceil(filteredSocios.length / PAGE_SIZE);
  const paginatedSocios = filteredSocios.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE
  );

  return (
    <div className="socios">
      <PowerTitle title="soci@s" className="SupportTitle" />
      {!isMemberProjectsLoading &&
        Object.keys(user_member_data).length > 0 &&
        status !== ACTIVE_STATUS && (
          <DisclaimerBox
            text={
              member_projects_active.length === 0
                ? t("general.sense-resultats")
                : t("soci.missatge-ppal")
            }
            id="project-disclaimer"
            closable
          />
        )}
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
      {totalPages > 1 && (
        <div className="pagination-controls" style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          padding: "16px 0",
          fontFamily: "Bebas Neue",
          fontSize: "1.4rem",
        }}>
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            style={{
              background: "none",
              border: "1px solid black",
              fontSize: "1.4rem",
              padding: "4px 12px",
              cursor: page === 0 ? "default" : "pointer",
              borderRadius: "4px",
              opacity: page === 0 ? 0.3 : 1,
            }}
          >
            ←
          </button>
          <span>{page + 1} / {totalPages}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= totalPages - 1}
            style={{
              background: "none",
              border: "1px solid black",
              fontSize: "1.4rem",
              padding: "4px 12px",
              cursor: page >= totalPages - 1 ? "default" : "pointer",
              borderRadius: "4px",
              opacity: page >= totalPages - 1 ? 0.3 : 1,
            }}
          >
            →
          </button>
        </div>
      )}
      <LettersMove
        className="lettersMoveDiv"
        sentence={t("banners.soci-curt")}
        color="#EB5E3E"
      />
    </div>
  );
};

export default Socios;
