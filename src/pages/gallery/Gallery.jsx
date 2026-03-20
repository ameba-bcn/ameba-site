import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Galeria from "../../components/galeria/Galeria";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import {
  FLICKR_ALBUM_ID,
  FLICKR_KEY,
  radioDublabLink,
} from "../../utils/constants";
import useDataStore from "../../stores/useDataStore";

const PAGE_SIZE = 20;

const Gallery = () => {
  const [galleryList, setGalleryList] = useState([]);
  const [page, setPage] = useState(0);
  const galleryTopRef = useRef(null);

  const changePage = (newPage) => {
    setPage(newPage);
    galleryTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { isGaleriaLoading, setGaleriaLoading } = useDataStore();

  const url = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${FLICKR_KEY}&photoset_id=${FLICKR_ALBUM_ID}&format=rest`;

  useEffect(() => {
    setGaleriaLoading(true);
    axios
      .get(`${url}`, {})
      .then((s) => {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(s?.data, "text/xml");
        var photos = xmlDoc.querySelectorAll("photo");
        setGalleryList(Array.from(photos));
        setGaleriaLoading(false);
      })
      .catch(() => {
        setGaleriaLoading(false);
      });
  }, []);

  const imgArrayBuilder = galleryList.map((el) => {
    const SERVER_ID = el.getAttribute("server");
    const ID = el.getAttribute("id");
    const SECRET = el.getAttribute("secret");
    return `https://live.staticflickr.com/${SERVER_ID}/${ID}_${SECRET}_b.jpg`;
  });

  return (
    <PageLayout
      className="SupportContent"
      title="PARKFEST 22"
      titleProps={{ subtitle: "* 21-05-22 *" }}
      loading={isGaleriaLoading}
      banner={{
        sentence: "AMEBA RADIO @ dublab",
        link: radioDublabLink,
        color: "var(--color-rojo)",
      }}
    >
      <div ref={galleryTopRef} />
      <Galeria
        images={imgArrayBuilder.slice(
          page * PAGE_SIZE,
          (page + 1) * PAGE_SIZE,
        )}
      />
      {Math.ceil(imgArrayBuilder.length / PAGE_SIZE) > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            padding: "16px 0",
            fontFamily: "Bebas Neue",
            fontSize: "1.4rem",
          }}
        >
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 0}
            style={{
              background: "none",
              border: "1px solid black",
              fontSize: "1.4rem",
              padding: "4px 12px",
              cursor: page === 0 ? "default" : "pointer",
              borderRadius: "4px",
              opacity: page === 0 ? 0.3 : 1,
            }}
          >
            ←
          </button>
          <span>
            {page + 1} / {Math.ceil(imgArrayBuilder.length / PAGE_SIZE)}
          </span>
          <button
            onClick={() => changePage(page + 1)}
            disabled={
              page >= Math.ceil(imgArrayBuilder.length / PAGE_SIZE) - 1
            }
            style={{
              background: "none",
              border: "1px solid black",
              fontSize: "1.4rem",
              padding: "4px 12px",
              cursor:
                page >= Math.ceil(imgArrayBuilder.length / PAGE_SIZE) - 1
                  ? "default"
                  : "pointer",
              borderRadius: "4px",
              opacity:
                page >= Math.ceil(imgArrayBuilder.length / PAGE_SIZE) - 1
                  ? 0.3
                  : 1,
            }}
          >
            →
          </button>
        </div>
      )}
    </PageLayout>
  );
};

export default Gallery;
