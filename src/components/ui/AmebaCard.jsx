import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import AmebaCardTitle from "./AmebaCardTitle";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import "./AmebaCard.css";

// GSAP needs resolved colors to interpolate a backgroundColor/color tween
// smoothly — an unresolved `var(--color-x)` string works for a one-shot
// `.set()` but not for a `.to()` crossfade between two colors.
const FALLBACK_COLORS = { "--color-amarillo": "#f5e400", "--color-negro": "#1d1d1b", "--color-cream": "#f2e3c9" };
const resolved = {};
const resolveColor = (name) => {
  if (resolved[name]) return resolved[name];
  if (typeof window === "undefined") return FALLBACK_COLORS[name];
  resolved[name] = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || FALLBACK_COLORS[name];
  return resolved[name];
};

export default function AmebaCard({
  to,
  image,
  imageAlt,
  badge,
  title,
  subtitle,
  highlight,
  meta,
  aspect = "1/1",
  imageFit = "cover",
}) {
  const imageRef = useRef(null);
  const titleBlockRef = useRef(null);
  const badgeRef = useRef(null);
  const highlightRef = useRef(null);

  // §2.4/§4.1 card hover — desktop only in practice (no mouseenter on touch).
  const handleEnter = () => {
    if (prefersReducedMotion()) return;
    gsap.to(imageRef.current, { scale: 1.06, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    gsap.to(titleBlockRef.current, { y: -4, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: -2,
        backgroundColor: resolveColor("--color-amarillo"),
        color: resolveColor("--color-negro"),
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };
  const handleLeave = () => {
    if (prefersReducedMotion()) return;
    gsap.to(imageRef.current, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    gsap.to(titleBlockRef.current, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        y: 0,
        backgroundColor: resolveColor("--color-negro"),
        color: resolveColor("--color-cream"),
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <NavLink
      to={to}
      className="ameba-card"
      aria-label={title}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="ameba-card__media" style={{ aspectRatio: aspect }}>
        {badge && (
          <span className="ameba-card__badge" ref={badgeRef}>
            {badge}
          </span>
        )}
        <img
          ref={imageRef}
          className="ameba-card__image"
          style={{ objectFit: imageFit }}
          src={image}
          alt={imageAlt || ""}
        />
      </div>
      <div className="ameba-card__title-block" ref={titleBlockRef}>
        <AmebaCardTitle
          padding="16px 16px 0"
          color="var(--color-cream)"
          fontStyle="normal"
        >
          {title}
        </AmebaCardTitle>
        {subtitle && <div className="ameba-card__subtitle">{subtitle}</div>}
      </div>
      {highlight && (
        <div className="ameba-card__highlight" ref={highlightRef}>
          {highlight}
        </div>
      )}
      {meta && <div className="ameba-card__meta">{meta}</div>}
    </NavLink>
  );
}
