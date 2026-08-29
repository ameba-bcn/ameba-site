import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useDataStore from "../../stores/useDataStore";
import { selectLabActivities } from "../../selectors/festivals";
import { formatPrice, priceMayDiscount, sortByDate, formatISODateToDate, formatDateToHour } from "../../utils/utils";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import SectionHero from "../../components/ui/SectionHero";
import DotsRow from "../../components/ui/DotsRow";
import OutlineHeading from "../../components/ui/OutlineHeading";
import FilterBar from "../../components/ui/FilterBar";
import CardGrid from "../../components/ui/CardGrid";
import AmebaCard from "../../components/ui/AmebaCard";
import LoadMoreButton from "../../components/ui/LoadMoreButton";
import LabCalendar from "../../components/lab/LabCalendar";
import NextActivityCard from "../../components/lab/NextActivityCard";
import { activityDateSet, dateKey } from "../../components/lab/calendarGrid";
import heroImage from "../../assets/images/home/home3.jpg";
import { gsap, Flip, prefersReducedMotion } from "../../utils/gsapSetup";
import "./Lab.css";

const PAGE_SIZE = 12;

function Lab() {
  const { agenda = [], isEventsLoading } = useDataStore();
  const [t] = useTranslation("translation");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const flipState = useRef(null);

  const activeType = searchParams.get("tipus");

  // §7 "Filtres (Lab/Festivals)" — FLIP the card grid whenever a filter
  // (type or calendar day) changes the result set. Capture state
  // synchronously in the click handlers below, apply it here once React
  // has re-rendered the new set.
  const captureFlip = () => {
    if (prefersReducedMotion()) return;
    const cards = gsap.utils.toArray(".lab__card-grid .ameba-card");
    if (cards.length) flipState.current = Flip.getState(cards);
  };

  useEffect(() => {
    if (!flipState.current) return;
    const state = flipState.current;
    flipState.current = null;
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.5,
        ease: "power3.inOut",
        stagger: 0.03,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.3 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.2 }),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType, selectedDate]);

  const activities = useMemo(() => selectLabActivities(agenda), [agenda]);

  const nextActivity = useMemo(() => {
    const now = new Date();
    const upcoming = activities
      .filter((a) => new Date(a.datetime) >= now)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return upcoming[0] ?? null;
  }, [activities]);

  const activityDates = useMemo(() => activityDateSet(activities), [activities]);

  // Order of appearance follows the render (Tallers, Xerrades, Itineraris,
  // Club Lectura, Radio, Streams, Jams) only for types the backend actually
  // returns — never hardcoded, per the doc.
  const types = useMemo(
    () => [...new Set(activities.map((a) => a.type).filter(Boolean))].sort(),
    [activities],
  );

  const filtered = useMemo(
    () =>
      sortByDate(activities)
        .filter((a) => (activeType ? a.type === activeType : true))
        .filter((a) => (selectedDate ? dateKey(new Date(a.datetime)) === dateKey(selectedDate) : true)),
    [activities, activeType, selectedDate],
  );

  const visibleItems = filtered.slice(0, visibleCount);

  const setType = (value) => {
    captureFlip();
    const next = new URLSearchParams(searchParams);
    if (value) next.set("tipus", value);
    else next.delete("tipus");
    setSearchParams(next);
    setVisibleCount(PAGE_SIZE);
  };

  const clearFilters = () => {
    captureFlip();
    setSearchParams({});
    setSelectedDate(null);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <PageLayout section="lab" promo loading={isEventsLoading}>
      <PageMeta title="Lab" description={t("lab.meta")} url="/lab" />
      <SectionHero
        title={t("menu.lab")}
        section="lab"
        variant="mega"
        dotsPosition="end"
        titleColor="var(--color-cream)"
        image={heroImage}
        imageAlt={t("menu.lab")}
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
      <hr />
      <DotsRow className="lab__hero-dots" />

      <div className="lab__calendar-row">
        <div>
          <OutlineHeading as="h2" className="lab__section-title">
            {t("lab.calendari")}
          </OutlineHeading>
          <LabCalendar
            activityDateSet={activityDates}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              captureFlip();
              setSelectedDate(d);
              setVisibleCount(PAGE_SIZE);
            }}
          />
        </div>
        <div>
          <OutlineHeading as="h2" className="lab__section-title">
            {t("lab.propera-activitat")}
          </OutlineHeading>
          <NextActivityCard activity={nextActivity} />
        </div>
      </div>

      <hr />
      <OutlineHeading as="h2" className="lab__section-title">
        {t("lab.activitats-en-curs")}
      </OutlineHeading>

      <FilterBar
        items={types}
        activeItem={activeType}
        onSelect={setType}
        allLabel={null}
        variant="solid"
        resetLabel={t("general.borrar-filtres")}
      />

      {!isEventsLoading && filtered.length === 0 ? (
        <div className="lab__empty">{t("general.sense-resultats")}</div>
      ) : (
        <>
          <CardGrid className="lab__card-grid">
            {visibleItems.map((a) => (
              <AmebaCard
                key={a.id}
                to={`/activitats/${a.id}`}
                image={a.images?.[0]}
                imageAlt={a.header || a.name}
                badge={`${formatISODateToDate(a.datetime)} - ${formatDateToHour(a.datetime)}h`}
                title={a.header || a.name}
                highlight={
                  a.price === 0
                    ? t("events.button.gratis").toUpperCase()
                    : a.price
                      ? priceMayDiscount(formatPrice(a.price), a.discount, null, t("form.descompte"))
                      : null
                }
                meta={a.address}
              />
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

export default Lab;
