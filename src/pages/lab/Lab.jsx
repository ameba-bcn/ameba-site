import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useDataStore from "../../stores/useDataStore";
import { selectLabActivities, selectFestivals } from "../../selectors/festivals";
import {
  formatPrice,
  priceMayDiscount,
  sortByDate,
  formatISODateToDate,
  formatDateToHour,
} from "../../utils/utils";
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
import {
  activityDateSet,
  titlesByDate,
  dateKey,
} from "../../components/lab/calendarGrid";
import heroImage from "../../assets/images/home/home3.jpg";
import { gsap, Flip, prefersReducedMotion } from "../../utils/gsapSetup";
import usePageEnter from "../../hooks/use-page-enter";
import "./Lab.css";

const PAGE_SIZE = 12;

function Lab() {
  const { agenda = [], isEventsLoading } = useDataStore();
  const [t] = useTranslation("translation");
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [visiblePastCount, setVisiblePastCount] = useState(PAGE_SIZE);
  const rootRef = useRef(null);
  const flipState = useRef(null);

  usePageEnter(rootRef, "lab");

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
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, scale: 0.9 },
            { autoAlpha: 1, scale: 1, duration: 0.3 },
          ),
        onLeave: (els) =>
          gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.2 }),
      });
    });
  }, [activeType, selectedDate]);

  const activities = useMemo(() => selectLabActivities(agenda), [agenda]);

  const nextActivity = useMemo(() => {
    const now = new Date();
    const upcoming = activities
      .filter((a) => new Date(a.datetime) >= now)
      .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return upcoming[0] ?? null;
  }, [activities]);

  const activityDates = useMemo(
    () => activityDateSet(activities),
    [activities],
  );

  const festivalDates = useMemo(
    () => activityDateSet(selectFestivals(agenda)),
    [agenda],
  );

  const activityTitles = useMemo(() => titlesByDate(activities), [activities]);
  const festivalTitles = useMemo(
    () => titlesByDate(selectFestivals(agenda)),
    [agenda],
  );

  // Order of appearance follows the render (Tallers, Xerrades, Itineraris,
  // Club Lectura, Radio, Streams, Jams) only for types the backend actually
  // returns — never hardcoded, per the doc.
  const types = useMemo(
    () => [...new Set(activities.map((a) => a.type).filter(Boolean))].sort(),
    [activities],
  );

  const filtered = useMemo(
    () =>
      activities
        .filter((a) => (activeType ? a.type === activeType : true))
        .filter((a) =>
          selectedDate
            ? dateKey(new Date(a.datetime)) === dateKey(selectedDate)
            : true,
        ),
    [activities, activeType, selectedDate],
  );

  // Upcoming activities lead, soonest first; anything already past drops
  // into its own grid below, most recent first.
  const { upcomingItems, pastItems } = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const past = [];
    filtered.forEach((a) => {
      (new Date(a.datetime) >= now ? upcoming : past).push(a);
    });
    return {
      upcomingItems: sortByDate(upcoming).reverse(),
      pastItems: sortByDate(past),
    };
  }, [filtered]);

  const visibleUpcoming = upcomingItems.slice(0, visibleCount);
  const visiblePast = pastItems.slice(0, visiblePastCount);

  // FilterBar's allLabel is null here, so onSelect(null) only ever comes
  // from "Borrar filtres" — safe to treat it as clearing the calendar-day
  // filter too, not just the type.
  const setType = (value) => {
    captureFlip();
    const next = new URLSearchParams(searchParams);
    if (value) next.set("tipus", value);
    else next.delete("tipus");
    setSearchParams(next);
    if (!value) setSelectedDate(null);
    setVisibleCount(PAGE_SIZE);
    setVisiblePastCount(PAGE_SIZE);
  };

  const renderActivityCard = (a) => (
    <AmebaCard
      key={a.id}
      to={`/lab/${a.id}`}
      image={a.images?.[0]}
      imageAlt={a.header || a.name}
      badge={`${formatISODateToDate(a.datetime)} - ${formatDateToHour(a.datetime)}h`}
      title={a.header || a.name}
      highlight={
        a.price === 0
          ? t("events.button.gratis").toUpperCase()
          : a.price
            ? priceMayDiscount(
                formatPrice(a.price),
                a.discount,
                null,
                t("form.descompte"),
              )
            : null
      }
      meta={a.address}
    />
  );

  return (
    <PageLayout section="lab" promo loading={isEventsLoading}>
      <PageMeta title="Lab" description={t("lab.meta")} url="/lab" />
      <div ref={rootRef}>
        <SectionHero
          title={t("menu.lab")}
          section="lab"
          variant="mega"
          dotsPosition="end"
          titleColor="var(--color-cream)"
          image={heroImage}
          imageAlt={t("menu.lab")}
          lead={t("lab.hero-lead")}
          titleFit={false}
        >
          <p>{t("lab.hero-body-1")}</p>
          <p className="section-hero__text-p--regular">
            {t("lab.hero-body-2")}
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
              festivalDateSet={festivalDates}
              activityTitlesByDate={activityTitles}
              festivalTitlesByDate={festivalTitles}
              selectedDate={selectedDate}
              onSelectDate={(d) => {
                captureFlip();
                setSelectedDate(d);
                setVisibleCount(PAGE_SIZE);
                setVisiblePastCount(PAGE_SIZE);
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
            {upcomingItems.length > 0 ? (
              <>
                <CardGrid className="lab__card-grid">
                  {visibleUpcoming.map((a) => renderActivityCard(a))}
                </CardGrid>
                {visibleCount < upcomingItems.length && (
                  <LoadMoreButton
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  />
                )}
              </>
            ) : (
              <div className="lab__empty">
                {t("lab.sense-activitats-en-curs")}
              </div>
            )}

            {pastItems.length > 0 && (
              <>
                <OutlineHeading as="h2" className="lab__section-title">
                  {t("lab.activitats-passades")}
                </OutlineHeading>
                <CardGrid className="lab__card-grid">
                  {visiblePast.map((a) => renderActivityCard(a))}
                </CardGrid>
                {visiblePastCount < pastItems.length && (
                  <LoadMoreButton
                    onClick={() => setVisiblePastCount((c) => c + PAGE_SIZE)}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}

export default Lab;
