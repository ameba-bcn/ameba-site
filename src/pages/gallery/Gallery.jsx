import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import FilterBar from "../../components/ui/FilterBar";
import { galleries } from "../../config/galleryConfig";
import { cloudinaryCover, radioDublabLink } from "../../utils/constants";
import useDataStore from "../../stores/useDataStore";
import "./Gallery.css";

const Gallery = () => {
  const [t] = useTranslation("translation");
  const navigate = useNavigate();
  const { galleryCovers, fetchGalleryCover } = useDataStore();
  const [activeYear, setActiveYear] = useState(null);

  const years = useMemo(
    () => [...new Set(galleries.map((g) => g.year))].sort((a, b) => b - a),
    [],
  );

  const filtered = (activeYear
    ? galleries.filter((g) => g.year === activeYear)
    : galleries
  ).toSorted((a, b) => b.year - a.year);

  useEffect(() => {
    galleries.forEach((gallery) => {
      if (!galleryCovers[gallery.tag]) {
        fetchGalleryCover(gallery.tag);
      }
    });
  }, []);

  const handleAlbumClick = (gallery) => {
    navigate(`/gallery/${gallery.slug}/${gallery.year}`);
  };

  return (
    <PageLayout
      className="SupportContent"
      title={t("menu.arxiu")}
      banner={{
        sentence: "AMEBA RADIO @ dublab",
        link: radioDublabLink,
        color: "var(--color-rojo)",
      }}
    >
      <FilterBar
        items={years}
        activeItem={activeYear}
        onSelect={setActiveYear}
        allLabel={t("gallery.tot")}
      />

      <div className="gallery-grid">
        {filtered.map((gallery) => {
          const coverPublicId = galleryCovers[gallery.tag];
          return (
            <button
              key={`${gallery.slug}-${gallery.year}`}
              className="gallery-card"
              onClick={() => handleAlbumClick(gallery)}
            >
              <div className="gallery-card__img-box">
                {coverPublicId && (
                  <img
                    className="gallery-card__img"
                    src={cloudinaryCover(coverPublicId)}
                    alt={gallery.title}
                    loading="lazy"
                  />
                )}
              </div>
              <div className="gallery-card__title-box">
                <span className="gallery-card__title">{gallery.title}</span>
              </div>
              <div className="gallery-card__footer">
                <span className="gallery-card__date">{gallery.date}</span>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="gallery-empty">
          <p>{t("gallery.buida")}</p>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
