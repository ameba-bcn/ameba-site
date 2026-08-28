import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useDataStore from "../../stores/useDataStore";
import { selectFestivals } from "../../selectors/festivals";
import { formatPrice, sortByDate, formatISODateToDate, formatDateToHour } from "../../utils/utils";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import SectionHero from "../../components/ui/SectionHero";
import DotsRow from "../../components/ui/DotsRow";
import OutlineHeading from "../../components/ui/OutlineHeading";
import DropdownFilter from "../../components/ui/DropdownFilter";
import CardGrid from "../../components/ui/CardGrid";
import AmebaCard from "../../components/ui/AmebaCard";
import LoadMoreButton from "../../components/ui/LoadMoreButton";
import FeaturedFestival from "../../components/festivals/FeaturedFestival";
import heroImage from "../../assets/images/home/home2.jpg";
import "./Festivals.css";

const PAGE_SIZE = 12;

function Festivals() {
  const { agenda = [], isEventsLoading } = useDataStore();
  const [t] = useTranslation("translation");
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const activeYear = searchParams.get("any");
  const activeFestival = searchParams.get("festival");

  const festivals = useMemo(() => selectFestivals(agenda), [agenda]);

  const featured = useMemo(() => {
    const now = new Date();
    const upcoming = festivals
      .filter((f) => new Date(f.datetime) >= now)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return upcoming[0] ?? null;
  }, [festivals]);

  const historic = useMemo(
    () => sortByDate(festivals.filter((f) => new Date(f.datetime) < new Date())),
    [festivals],
  );

  const years = useMemo(
    () => [...new Set(historic.map((f) => new Date(f.datetime).getFullYear()))].sort(
      (a, b) => b - a,
    ),
    [historic],
  );

  const festivalNames = useMemo(
    () => [...new Set(historic.map((f) => f.name).filter(Boolean))].sort(),
    [historic],
  );

  const filtered = useMemo(
    () =>
      historic
        .filter((f) =>
          activeYear ? String(new Date(f.datetime).getFullYear()) === activeYear : true,
        )
        .filter((f) => (activeFestival ? f.name === activeFestival : true)),
    [historic, activeYear, activeFestival],
  );

  const visibleItems = filtered.slice(0, visibleCount);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    setVisibleCount(PAGE_SIZE);
  };

  const clearFilters = () => {
    setSearchParams({});
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <PageLayout section="festivals" promo loading={isEventsLoading}>
      <PageMeta
        title="Festivals"
        description={t("festivals.meta")}
        url="/festivals"
      />
      <SectionHero
        title={t("menu.festivals")}
        section="festivals"
        variant="mega"
        dotsPosition="end"
        image={heroImage}
        imageAlt={t("menu.festivals")}
        lead={/* TODO copy */ "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        titleFit={false}
      >
        {/* TODO copy */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam
          sem, molestie sed orci nec, eleifend porta arcu.
        </p>
        <p className="section-hero__text-p--regular">
          Aliquam mi velit, tincidunt sit amet diam non, rhoncus cursus
          urna. Nulla semper tortor a pretium suscipit. Integer volutpat
          egestas arcu sit amet luctus.
        </p>
      </SectionHero>
      <hr className="festivals__hr--bleed-right" />
      <DotsRow className="festivals__hero-dots" />

      {featured ? (
        <FeaturedFestival festival={featured} />
      ) : (
        // TODO: placeholder until there's an upcoming festival with real images
        <div className="featured-festival">
          <img className="featured-festival__image" src={heroImage} alt="" />
        </div>
      )}

      <hr className="festivals__hr--bleed-left" />
      <OutlineHeading as="h2" className="festivals__section-title">
        {t("festivals.historic")}
      </OutlineHeading>

      <div className="festivals__filters">
        <DropdownFilter
          label={t("festivals.any")}
          value={activeYear}
          options={years.map(String)}
          onChange={(v) => setFilter("any", v)}
        />
        <DropdownFilter
          label={t("festivals.festival")}
          value={activeFestival}
          options={festivalNames}
          onChange={(v) => setFilter("festival", v)}
        />
        {(activeYear || activeFestival) && (
          <button type="button" className="festivals__clear" onClick={clearFilters}>
            {t("general.borrar-filtres")}
          </button>
        )}
      </div>

      {!isEventsLoading && filtered.length === 0 ? (
        <div className="festivals__empty">{t("general.sense-resultats")}</div>
      ) : (
        <>
          <CardGrid>
            {visibleItems.map((f) => (
              <div key={f.id} style={f.cancelled ? { opacity: 0.6 } : undefined}>
                <AmebaCard
                  to={`/activitats/${f.id}`}
                  image={f.images?.[0]}
                  imageAlt={f.name}
                  badge={`${formatISODateToDate(f.datetime)} - ${formatDateToHour(f.datetime)}h`}
                  title={f.name}
                  subtitle={f.address}
                  highlight={
                    f.cancelled
                      ? t("festivals.cancellat")
                      : f.price === 0
                        ? t("events.button.gratis").toUpperCase()
                        : f.price
                          ? formatPrice(f.price)
                          : null
                  }
                  meta={f.address}
                />
              </div>
            ))}
          </CardGrid>
          {visibleCount < filtered.length && (
            <LoadMoreButton onClick={() => setVisibleCount((c) => c + PAGE_SIZE)} />
          )}
        </>
      )}
    </PageLayout>
  );
}

export default Festivals;
