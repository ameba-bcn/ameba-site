import React, { useEffect, useMemo, useRef, useState } from "react";
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
import FeaturedFestival, { useFeaturedFestivalReveal } from "../../components/festivals/FeaturedFestival";
import heroImage from "../../assets/images/home/home2.jpg";
import { gsap, Flip, prefersReducedMotion } from "../../utils/gsapSetup";
import usePageEnter from "../../hooks/use-page-enter";
import useGsapContext from "../../hooks/use-gsap-context";
import "./Festivals.css";

const PAGE_SIZE = 12;

function Festivals() {
  const { agenda = [], isEventsLoading } = useDataStore();
  const [t] = useTranslation("translation");
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const rootRef = useRef(null);
  const flipState = useRef(null);
  const fallbackFeaturedRef = useFeaturedFestivalReveal();

  usePageEnter(rootRef, "festivals");

  // §2.2 — dots row above the featured band, just before its mask opens.
  useGsapContext(() => {
    const dots = gsap.utils.toArray(".festivals__hero-dots .dots-row__dot", rootRef.current);
    if (!dots.length) return;
    if (prefersReducedMotion()) {
      gsap.set(dots, { autoAlpha: 1 });
      return;
    }
    gsap.set(dots, { scale: 0 });
    gsap.to(dots, {
      scale: 1,
      duration: 0.4,
      stagger: 0.04,
      ease: "power2.out",
      scrollTrigger: { trigger: rootRef.current.querySelector(".festivals__hero-dots"), start: "top 90%", once: true },
    });
  }, [], rootRef);

  const activeYear = searchParams.get("any");
  const activeFestival = searchParams.get("festival");

  // §2.3 "Aplicar filtre → FLIP" — capture card positions synchronously
  // before the filter changes the result set, apply the transition once
  // React has re-rendered.
  const captureFlip = () => {
    if (prefersReducedMotion()) return;
    const cards = gsap.utils.toArray(".festivals__card-grid .ameba-card");
    if (cards.length) flipState.current = Flip.getState(cards);
  };

  useEffect(() => {
    if (!flipState.current) return;
    const state = flipState.current;
    flipState.current = null;
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.55,
        ease: "power3.inOut",
        stagger: 0.03,
        absolute: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.4 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.92, duration: 0.3 }),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeYear, activeFestival]);

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
    captureFlip();
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    setVisibleCount(PAGE_SIZE);
  };

  const clearFilters = () => {
    captureFlip();
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
      <div ref={rootRef}>
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
        <div className="featured-festival" ref={fallbackFeaturedRef}>
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
          <CardGrid className="festivals__card-grid">
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
      </div>
    </PageLayout>
  );
}

export default Festivals;
