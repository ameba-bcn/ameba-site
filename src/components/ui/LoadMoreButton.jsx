import React from "react";
import { useTranslation } from "react-i18next";
import "./LoadMoreButton.css";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";

export default function LoadMoreButton({ onClick, label }) {
  const [t] = useTranslation("translation");

  const handleClick = (e) => {
    if (!prefersReducedMotion()) {
      gsap.to(e.currentTarget, { y: 4, duration: 0.1, yoyo: true, repeat: 1 });
    }
    onClick?.(e);
  };

  return (
    <button type="button" className="load-more-button" onClick={handleClick}>
      {label ?? t("general.veure-mes")}
    </button>
  );
}
