import React, { useRef } from "react";
import { Link } from "react-router-dom";
import AmebaDots from "../../../../components/layout/AmebaDots";
import AmebaBlob from "../../../../components/ui/logo/AmebaBlob";
import MegaTitle from "../../../../components/ui/MegaTitle";
import plusIcon from "../../../../assets/images/general/plus-icon.png";
import { gsap, SplitText, DESKTOP_QUERY, prefersReducedMotion } from "../../../../utils/gsapSetup";
import useGsapContext from "../../../../hooks/use-gsap-context";
import "./SectionBand.css";

/**
 * Banda de sección de la home (rediseño 2026).
 * Megatítulo outline a todo el ancho (por encima de la imagen, por debajo
 * del texto) + imagen duotono + lead/body + botón (+).
 * `to` opcional: sin destino no se renderiza el (+).
 * `morePosition` opcional: {left, right, top} (valores CSS) para colocar
 * el (+) en un sitio distinto en cada sección.
 * `dotsPosition` opcional: "image" (bottom-left de la imagen, default),
 * "image-top-right" (fila horizontal sobre la esquina superior derecha
 * de la imagen), "top-right" (esquina superior derecha de la sección)
 * o "bottom-left" (esquina inferior izquierda de la sección).
 *
 * Animations: GSAP_ANIMATIONS.md §4 — this is the reusable "section de
 * color" reveal pattern, instantiated once per band by Home.jsx.
 */
export default function SectionBand({
  id,
  color,
  title,
  image,
  lead,
  body,
  to,
  morePosition = {},
  dotsPosition = "image",
  reverse = false,
}) {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const moreInnerRef = useRef(null);

  useGsapContext(() => {
    const root = rootRef.current;
    const megatitleOuter = root.querySelector(".section-band__megatitle");
    const megaText = root.querySelector(".section-band__megatitle .mega-title__text");
    const media = root.querySelector(".section-band__media");
    const dots = gsap.utils.toArray(".ameba-dots__dot", root);
    const lead = root.querySelector(".section-band__lead");
    const body = root.querySelector(".section-band__body");
    const image = imageRef.current;
    const more = moreInnerRef.current;
    const revealTargets = [megaText, media, image, lead, body, more, ...dots].filter(Boolean);

    if (prefersReducedMotion()) {
      gsap.set(revealTargets, { autoAlpha: 0 });
      gsap.to(revealTargets, {
        autoAlpha: 1,
        duration: 0.2,
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });
      return;
    }

    const split = megaText ? new SplitText(megaText, { type: "chars" }) : null;
    const chars = split?.chars || [];
    // Reveal direction mirrors the side the image actually lives on
    // (flex-direction flips with `reverse` — see SectionBand.css).
    const openClip = reverse ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

    gsap.set(chars, { xPercent: -8, autoAlpha: 0 });
    if (megaText) gsap.set(megaText, { webkitTextStrokeWidth: "0px" });
    if (media) gsap.set(media, { clipPath: openClip });
    if (image) gsap.set(image, { scale: 1.15 });
    gsap.set(dots, { scale: 0, autoAlpha: 0 });
    if (lead) gsap.set(lead, { y: 16, autoAlpha: 0 });
    if (body) gsap.set(body, { y: 16, autoAlpha: 0 });
    if (more) gsap.set(more, { rotate: -90, scale: 0 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 75%", once: true },
    });

    tl.to(chars, { xPercent: 0, autoAlpha: 1, stagger: 0.04, duration: 0.5, ease: "power3.out" }, 0);
    if (megaText) tl.to(megaText, { webkitTextStrokeWidth: "1px", duration: 0.6 }, 0);
    if (media) tl.to(media, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.out" }, 0.1);
    if (image) tl.to(image, { scale: 1, duration: 0.9, ease: "expo.out" }, 0.1);
    if (dots.length) tl.to(dots, { scale: 1, autoAlpha: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" }, 0.15);
    if (lead) tl.to(lead, { y: 0, autoAlpha: 1, duration: 0.5 }, 0.25);
    if (body) tl.to(body, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.3");
    if (more) tl.to(more, { rotate: 0, scale: 1, duration: 0.5, ease: "power3.out" }, 0.25);

    // Desktop-only parallax/drift — no scrub or pins on mobile (§8).
    gsap.matchMedia().add(DESKTOP_QUERY, () => {
      if (megatitleOuter) {
        gsap.to(megatitleOuter, {
          xPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
      if (image) {
        gsap.to(image, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }
    });
  }, [reverse], rootRef);

  const handleMoreEnter = () => gsap.to(moreInnerRef.current, { rotate: 90, duration: 0.3 });
  const handleMoreLeave = () => gsap.to(moreInnerRef.current, { rotate: 0, duration: 0.3 });
  const handleMoreClick = () => {
    if (prefersReducedMotion()) return;
    gsap.to(moreInnerRef.current, { scale: 1.6, autoAlpha: 0, duration: 0.25, ease: "power1.in" });
  };

  return (
    <section
      className={`section-band${reverse ? " section-band--reverse" : ""}`}
      id={id}
      style={{ "--band-color": color }}
      ref={rootRef}
    >
      <MegaTitle as="h2" title={title} className="section-band__megatitle" />
      <div className="section-band__content">
        {image && (
          <div className="section-band__media">
            {dotsPosition.startsWith("image") && (
              <div
                className={`section-band__dots${
                  dotsPosition === "image-top-right"
                    ? " section-band__dots--image-top-right"
                    : ""
                }`}
              >
                <AmebaDots />
              </div>
            )}
            <img
              ref={imageRef}
              src={image}
              alt=""
              className="section-band__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        <div className="section-band__detail">
          <p className="section-band__lead">{lead}</p>
          {body && <p className="section-band__body">{body}</p>}
        </div>
      </div>
      {(dotsPosition === "top-right" || dotsPosition === "bottom-left") && (
        <div
          className={`section-band__dots section-band__dots--${dotsPosition}`}
        >
          <AmebaDots />
        </div>
      )}
      <div className="section-band__rule" aria-hidden="true" />
      {to && (
        <Link
          className="section-band__more"
          to={to}
          aria-label={title}
          onMouseEnter={handleMoreEnter}
          onMouseLeave={handleMoreLeave}
          onClick={handleMoreClick}
          style={{
            "--more-left": morePosition.left,
            "--more-right": morePosition.right,
            "--more-top": morePosition.top,
          }}
        >
          {/* GSAP (rotate/scale) animates this inner span only — the
              outer Link keeps its own CSS transform (translateY centering
              at desktop widths), which an inline transform here would
              otherwise clobber. */}
          <span className="section-band__more-inner" ref={moreInnerRef}>
            <AmebaBlob
              color="black"
              className="section-band__more-blob section-band__more-blob--base"
            />
            {/* Ameba superior del color de la banda: camuflada con el fondo,
                al girar deja asomar la negra como medialunas */}
            <AmebaBlob
              color="var(--band-color)"
              className="section-band__more-blob section-band__more-blob--spin"
            />
            <img src={plusIcon} alt="" width="104" height="104" />
          </span>
        </Link>
      )}
    </section>
  );
}
