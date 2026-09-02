import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import DotsRow from "../../components/ui/DotsRow";
import FilterBar from "../../components/ui/FilterBar";
import CardGrid from "../../components/ui/CardGrid";
import AmebaCard from "../../components/ui/AmebaCard";
import { galleries } from "../../config/galleryConfig";
import { cloudinaryCover } from "../../utils/constants";
import useDataStore from "../../stores/useDataStore";
import "./GalleryArxiu.css";

function GalleryArxiu() {
  const [t] = useTranslation("translation");
  const { galleryCovers, fetchGalleryCover } = useDataStore();
  const [activeYear, setActiveYear] = useState(null);

  const years = useMemo(
    () => [...new Set(galleries.map((g) => g.year))].sort((a, b) => b - a),
    [],
  );

  const filtered = useMemo(
    () =>
      [...(activeYear ? galleries.filter((g) => g.year === activeYear) : galleries)].sort(
        (a, b) => b.year - a.year,
      ),
    [activeYear],
  );

  useEffect(() => {
    galleries.forEach((gallery) => {
      if (!galleryCovers[gallery.tag]) {
        fetchGalleryCover(gallery.tag);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout section="festivals" promo>
      <PageMeta
        title={t("menu.arxiu")}
        description={t("festivals.arxiu-meta")}
        url="/festivals/arxiu"
      />
      <div className="gallery-arxiu">
        <nav aria-label={t("festivals.breadcrumb")} className="gallery-arxiu__breadcrumb">
          <Link to="/">AMEBA</Link>
          <span>|</span>
          <Link to="/festivals">{t("menu.festivals")}</Link>
          <span>|</span>
          <span>{t("menu.arxiu")}</span>
        </nav>

        <section className="gallery-arxiu__hero">
          <DotsRow count={6} className="gallery-arxiu__dots" />
          <h1 className="gallery-arxiu__title">{t("menu.arxiu")}</h1>
          <p className="gallery-arxiu__lead">{t("festivals.arxiu-lead")}</p>
        </section>

        <div className="gallery-arxiu__filters">
          <FilterBar
            items={years}
            activeItem={activeYear}
            onSelect={setActiveYear}
            allLabel={t("gallery.tot")}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="gallery-arxiu__empty">{t("gallery.buida")}</div>
        ) : (
          <CardGrid className="gallery-arxiu__grid">
            {filtered.map((gallery) => {
              const coverPublicId = galleryCovers[gallery.tag];
              return (
                <AmebaCard
                  key={`${gallery.slug}-${gallery.year}`}
                  to={`/festivals/arxiu/${gallery.slug}/${gallery.year}`}
                  image={coverPublicId ? cloudinaryCover(coverPublicId) : undefined}
                  imageAlt={gallery.title}
                  badge={gallery.date}
                  title={gallery.title}
                />
              );
            })}
          </CardGrid>
        )}
      </div>
    </PageLayout>
  );
}

export default GalleryArxiu;
