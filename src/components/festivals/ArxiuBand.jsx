import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useDataStore from "../../stores/useDataStore";
import { galleries } from "../../config/galleryConfig";
import { cloudinaryCover } from "../../utils/constants";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
import "./ArxiuBand.css";

const PREVIEW_COUNT = 4;

// §2.5 "Banda de l'arxiu" — teaser band at the bottom of /festivals linking
// to the redesigned photo archive at /festivals/arxiu, with a fanned
// preview of the most recent editions' covers (same Cloudinary covers
// GalleryArxiu itself fetches, cached in useDataStore once loaded).
export default function ArxiuBand() {
  const [t] = useTranslation("translation");
  const { galleryCovers, fetchGalleryCover } = useDataStore();
  const rootRef = useRef(null);

  const previewGalleries = [...galleries]
    .sort((a, b) => b.year - a.year)
    .slice(0, PREVIEW_COUNT);

  useEffect(() => {
    previewGalleries.forEach((gallery) => {
      if (!galleryCovers[gallery.tag]) fetchGalleryCover(gallery.tag);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGsapContext(() => {
    const root = rootRef.current;
    if (!root) return;
    const previews = gsap.utils.toArray(".arxiu-band__preview", root);
    const text = gsap.utils.toArray(".arxiu-band__text > *", root);

    if (prefersReducedMotion()) {
      gsap.set([...previews, ...text], { autoAlpha: 1 });
      return;
    }

    gsap.set(previews, { y: 24, autoAlpha: 0 });
    gsap.set(text, { y: 16, autoAlpha: 0 });

    gsap
      .timeline({ scrollTrigger: { trigger: root, start: "top 85%", once: true } })
      .to(previews, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" })
      .to(text, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: "power2.out" }, "-=0.3");
  }, [], rootRef);

  return (
    <section className="arxiu-band" ref={rootRef}>
      <div className="arxiu-band__previews" aria-hidden="true">
        {previewGalleries.map((gallery, i) => {
          const cover = galleryCovers[gallery.tag];
          return (
            <div
              key={`${gallery.slug}-${gallery.year}`}
              className="arxiu-band__preview"
              style={{ "--i": i }}
            >
              {cover && <img src={cloudinaryCover(cover)} alt="" />}
            </div>
          );
        })}
      </div>
      <div className="arxiu-band__text">
        <span className="arxiu-band__title">{t("festivals.arxiu-band-title")}</span>
        <p className="arxiu-band__lead">{t("festivals.arxiu-band-lead")}</p>
        <NavLink to="/festivals/arxiu" className="arxiu-band__cta">
          {t("festivals.arxiu-band-cta")}
        </NavLink>
      </div>
    </section>
  );
}
