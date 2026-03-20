import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import { galleries } from "../../config/galleryConfig";
import { cloudinaryCover, radioDublabLink } from "../../utils/constants";
import useDataStore from "../../stores/useDataStore";
import "./Gallery.css";

const Gallery = () => {
  const navigate = useNavigate();
  const { galleryCovers, fetchGalleryCover } = useDataStore();

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
      title="GALERIA"
      banner={{
        sentence: "AMEBA RADIO @ dublab",
        link: radioDublabLink,
        color: "var(--color-rojo)",
      }}
    >
      <div className="gallery-grid">
        {galleries.map((gallery) => {
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

      {galleries.length === 0 && (
        <div className="gallery-empty">
          <p>No hi ha galeries disponibles</p>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
