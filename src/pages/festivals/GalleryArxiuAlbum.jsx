import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PageMeta from "../../components/seo/PageMeta";
import ImageLightbox from "../../components/images/ImageLightbox";
import Pagination from "../../components/pagination/Pagination";
import { getGalleryBySlug } from "../../config/galleryConfig";
import { cloudinaryUrl, cloudinaryThumb } from "../../utils/constants";
import useDataStore from "../../stores/useDataStore";
import "./GalleryArxiuAlbum.css";

const PAGE_SIZE = 20;

function GalleryArxiuAlbum() {
  const [t] = useTranslation("translation");
  const { slug, year } = useParams();
  const gallery = getGalleryBySlug(slug, year);
  const [page, setPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { galleryImages, isGalleryAlbumLoading, fetchGalleryImages } = useDataStore();

  useEffect(() => {
    if (gallery) fetchGalleryImages(gallery.tag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery?.tag]);

  if (!gallery) {
    return (
      <PageLayout section="festivals" promo>
        <PageMeta title={t("menu.arxiu")} url="/festivals/arxiu" />
        <div className="gallery-arxiu-album__not-found">
          <p>{t("gallery.no-trobada")}</p>
          <Link to="/festivals/arxiu" className="gallery-arxiu-album__back-link">
            ← {t("gallery.tornar")}
          </Link>
        </div>
      </PageLayout>
    );
  }

  const fullImages = galleryImages.map((img) =>
    cloudinaryUrl(`${img.public_id}.${img.format}`),
  );
  const totalPages = Math.ceil(galleryImages.length / PAGE_SIZE);
  const pagedImages = galleryImages.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const openLightbox = (pageIndex) => setLightboxIndex(page * PAGE_SIZE + pageIndex);

  return (
    <PageLayout section="festivals" promo loading={isGalleryAlbumLoading}>
      <PageMeta title={gallery.title} url={`/festivals/arxiu/${slug}/${year}`} />
      <div className="gallery-arxiu-album">
        <nav aria-label={t("festivals.breadcrumb")} className="gallery-arxiu-album__breadcrumb">
          <Link to="/">AMEBA</Link>
          <span>|</span>
          <Link to="/festivals">{t("menu.festivals")}</Link>
          <span>|</span>
          <Link to="/festivals/arxiu">{t("menu.arxiu")}</Link>
          <span>|</span>
          <span>{gallery.title}</span>
        </nav>

        <section className="gallery-arxiu-album__hero">
          <h1 className="gallery-arxiu-album__title">{gallery.title}</h1>
          <span className="gallery-arxiu-album__date">{gallery.date}</span>
        </section>

        {pagedImages.length > 0 && (
          <div className="gallery-arxiu-album__grid">
            {pagedImages.map((img, index) => (
              <button
                key={img.public_id}
                type="button"
                className="gallery-arxiu-album__thumb"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={cloudinaryThumb(`${img.public_id}.${img.format}`)}
                  alt=""
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

        {lightboxIndex !== null && (
          <ImageLightbox
            images={fullImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </div>
    </PageLayout>
  );
}

export default GalleryArxiuAlbum;
