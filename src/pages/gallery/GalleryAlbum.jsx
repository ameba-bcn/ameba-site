import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import ImageLightbox from "../../components/images/ImageLightbox";
import Pagination from "../../components/pagination/Pagination";
import { getGalleryBySlug } from "../../config/galleryConfig";
import { cloudinaryUrl, cloudinaryThumb, radioDublabLink } from "../../utils/constants";
import useDataStore from "../../stores/useDataStore";
import "./GalleryAlbum.css";

const PAGE_SIZE = 20;

const GalleryAlbum = () => {
  const { slug, year } = useParams();
  const navigate = useNavigate();
  const gallery = getGalleryBySlug(slug, year);
  const [page, setPage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { galleryImages, isGalleryAlbumLoading, fetchGalleryImages } =
    useDataStore();

  useEffect(() => {
    if (gallery) {
      fetchGalleryImages(gallery.tag);
    }
  }, [gallery?.tag]);

  const changePage = (newPage) => {
    setPage(newPage);
  };

  if (!gallery) {
    return (
      <PageLayout className="SupportContent" title="GALERIA">
        <div className="gallery-album-empty">
          <p>Galeria no trobada</p>
          <button className="gallery-album-back" onClick={() => navigate("/gallery")}>
            &#8592; Tornar a la galeria
          </button>
        </div>
      </PageLayout>
    );
  }

  const fullImages = galleryImages.map((img) =>
    cloudinaryUrl(`${img.public_id}.${img.format}`),
  );

  const totalPages = Math.ceil(galleryImages.length / PAGE_SIZE);
  const pagedImages = galleryImages.slice(
    page * PAGE_SIZE,
    (page + 1) * PAGE_SIZE,
  );

  const openLightbox = (pageIndex) => {
    setLightboxIndex(page * PAGE_SIZE + pageIndex);
  };

  return (
    <PageLayout
      className="SupportContent"
      title={gallery.title}
      titleProps={{ subtitle: `* ${gallery.date} *` }}
      loading={isGalleryAlbumLoading}
      banner={{
        sentence: "AMEBA RADIO @ dublab",
        link: radioDublabLink,
        color: "var(--color-rojo)",
      }}
    >
      <button className="gallery-album-back" onClick={() => navigate("/gallery")}>
        &#8592; Tornar a la galeria
      </button>

      <div className="gallery-album-grid">
        {pagedImages.map((img, index) => (
          <button
            key={img.public_id}
            className="gallery-album-thumb"
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

      <Pagination page={page} totalPages={totalPages} onPageChange={changePage} />

      {lightboxIndex !== null && (
        <ImageLightbox
          images={fullImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </PageLayout>
  );
};

export default GalleryAlbum;
