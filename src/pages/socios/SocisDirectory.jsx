import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useDataStore from "../../stores/useDataStore";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import CardGrid from "../../components/ui/CardGrid";
import AmebaCard from "../../components/ui/AmebaCard";
import FilterBar from "../../components/ui/FilterBar";
import LoadMoreButton from "../../components/ui/LoadMoreButton";
import "./SocisDirectory.css";

const PAGE_SIZE = 16;

function SocisDirectory() {
  const { member_projects = [], isMemberProjectsLoading } = useDataStore();
  const [t] = useTranslation("translation");
  const [searchParams, setSearchParams] = useSearchParams();
  const activeRole = searchParams.get("rol");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const activeProjects = useMemo(
    () => member_projects.filter((p) => !!p.is_active),
    [member_projects],
  );

  // Never hardcoded — only the roles the backend actually returns show up,
  // same convention as Lab.jsx's activity-type filter.
  const roles = useMemo(
    () => [...new Set(activeProjects.flatMap((p) => p.tags || []))].sort(),
    [activeProjects],
  );

  const projects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activeProjects
      .filter((p) => (activeRole ? p.tags?.includes(activeRole) : true))
      .filter(
        (p) =>
          !q ||
          p.project_name?.toLowerCase().includes(q) ||
          p.first_name?.toLowerCase().includes(q),
      );
  }, [activeProjects, activeRole, query]);

  const visibleProjects = projects.slice(0, visibleCount);

  const handleQuery = (e) => {
    setQuery(e.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  const setRole = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("rol", value);
    else next.delete("rol");
    setSearchParams(next);
    setVisibleCount(PAGE_SIZE);
  };

  const resetFilters = () => {
    setSearchParams({});
    setQuery("");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <PageLayout section="socis" promo loading={isMemberProjectsLoading}>
      <PageMeta
        title={t("footer.socios")}
        description="Directori de projectes musicals dels socis i sòcies d'AMEBA."
        url="/associacio/socis"
      />
      <div className="socis-directory">
        <nav aria-label={t("soci.directori-breadcrumb")} className="socis-directory__breadcrumb">
          <Link to="/">AMEBA</Link>
          <span>|</span>
          <Link to="/associacio">{t("menu.associacio")}</Link>
          <span>|</span>
          <span>{t("soci.directori-breadcrumb")}</span>
        </nav>

        <section className="socis-directory__intro">
          <h1 className="socis-directory__lead">{t("soci.directori-lead")}</h1>
          <div className="socis-directory__cta">
            <p>{t("soci.directori-crear-text")}</p>
            <Link className="socis-directory__badge" to="/compte/projecte">
              {t("soci.directori-crear")}
            </Link>
          </div>
        </section>

        <section aria-label={t("soci.cerca-projecte")} className="socis-directory__filters">
          {roles.length > 0 && (
            <FilterBar
              items={roles}
              activeItem={activeRole}
              onSelect={setRole}
              allLabel={null}
              resetLabel={t("general.borrar-filtres")}
            />
          )}
          <div className="socis-directory__search">
            <input
              className="socis-directory__input"
              type="search"
              placeholder={t("soci.cerca-projecte")}
              value={query}
              onChange={handleQuery}
              aria-label={t("soci.cerca-projecte")}
            />
            <span className="socis-directory__count">
              {projects.length} {t("footer.socios")}
            </span>
          </div>
        </section>

        <section className="socis-directory__results" aria-label={t("footer.socios")}>
          {visibleProjects.length === 0 && !isMemberProjectsLoading ? (
            <div className="socis-directory__empty">
              <span className="socis-directory__empty-title">{t("soci.no-projectes")}</span>
              <p>{t("soci.no-projectes-text")}</p>
              {(query || activeRole) && (
                <button type="button" className="socis-directory__chip" onClick={resetFilters}>
                  {t("general.borrar-filtres")}
                </button>
              )}
            </div>
          ) : (
            <>
              <CardGrid>
                {visibleProjects.map((p) => (
                  <AmebaCard
                    key={p.id}
                    to={`/associacio/socis/${p.id}`}
                    image={p.images?.[0]}
                    imageAlt={p.project_name}
                    badge={p.tags?.[0]}
                    title={p.project_name}
                    meta={p.first_name ? `${t("soci.per")} ${p.first_name}` : null}
                  />
                ))}
              </CardGrid>
              {visibleCount < projects.length && (
                <LoadMoreButton onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} />
              )}
            </>
          )}
        </section>
      </div>
    </PageLayout>
  );
}

export default SocisDirectory;
