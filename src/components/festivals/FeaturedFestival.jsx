import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { gsap, DESKTOP_QUERY, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
import "./FeaturedFestival.css";

// §2.1 "Banda d'imatge b/n a tota amplada" — entrance mask + desktop
// scale/grayscale parallax. Shared by both the real-festival render and
// the (same class name) image-only placeholder below.
function useFeaturedFestivalReveal() {
  const rootRef = useRef(null);

  useGsapContext(() => {
    const root = rootRef.current;
    const image = root?.querySelector(".featured-festival__image");
    if (!root || !image) return;

    if (prefersReducedMotion()) {
      gsap.set(root, { autoAlpha: 1, clipPath: "none" });
      return;
    }

    gsap.set(root, { clipPath: "inset(0 0 100% 0)" });
    gsap.to(root, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: { trigger: root, start: "top 85%", once: true },
    });

    gsap.matchMedia().add(DESKTOP_QUERY, () => {
      gsap.fromTo(
        image,
        { scale: 1.15, filter: "grayscale(1)" },
        {
          scale: 1,
          filter: "grayscale(0.2)",
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  }, [], rootRef);

  return rootRef;
}

export default function FeaturedFestival({ festival }) {
  const rootRef = useFeaturedFestivalReveal();
  if (!festival) return null;

  const { id, name, images, address } = festival;

  return (
    <NavLink
      to={`/festivals/${id}`}
      className="featured-festival"
      ref={rootRef}
      aria-label={name}
    >
      <img
        className="featured-festival__image"
        src={images?.[0]}
        alt={name}
      />
      <div className="featured-festival__panel">
        <div className="featured-festival__title">{name}</div>
        {/* TODO modelo: barri — no existe en events/, solo tenemos address */}
        {address && (
          <div className="featured-festival__meta">{address}</div>
        )}
      </div>
    </NavLink>
  );
}

export { useFeaturedFestivalReveal };
