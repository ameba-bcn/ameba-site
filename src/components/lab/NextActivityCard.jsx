import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatPrice, priceMayDiscount, formatISODateToDate, formatDateToHour } from "../../utils/utils";
import CountdownTimer from "../countdown/CountdownTimer";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
import "./NextActivityCard.css";

export default function NextActivityCard({ activity }) {
  const [t] = useTranslation("translation");
  const rootRef = useRef(null);
  const emptyRef = useRef(null);

  // §3.2 — box entrance (clipPath open + content slide up), empty state
  // just fades in (no movement — it shouldn't call attention to itself).
  useGsapContext(() => {
    const root = rootRef.current;
    if (!root) return;

    if (activity) {
      const content = root.querySelector(".next-activity-card__panel");
      if (prefersReducedMotion()) {
        gsap.set([root, content], { autoAlpha: 1, clipPath: "none", y: 0 });
        return;
      }
      gsap.set(root, { clipPath: "inset(0 0 100% 0)" });
      if (content) gsap.set(content, { y: 10, autoAlpha: 0 });
      gsap
        .timeline()
        .to(root, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.out" })
        .to(content, { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.3");
      return;
    }

    if (emptyRef.current) {
      if (prefersReducedMotion()) {
        gsap.set(emptyRef.current, { autoAlpha: 0.75 });
        return;
      }
      gsap.set(emptyRef.current, { autoAlpha: 0 });
      gsap.to(emptyRef.current, { autoAlpha: 0.75, duration: 0.4 });
    }
  }, [activity], rootRef);

  if (!activity) {
    return (
      <div className="next-activity-card__empty" ref={rootRef}>
        <span ref={emptyRef}>{t("lab.cap-activitat-propera")}</span>
      </div>
    );
  }

  const { id, name, header, images, price = 0, discount, address, datetime } = activity;

  return (
    <NavLink to={`/lab/${id}`} className="next-activity-card" ref={rootRef}>
      <img className="next-activity-card__image" src={images?.[0]} alt={header || name} />
      <div className="next-activity-card__panel">
        <div className="next-activity-card__date">
          {formatISODateToDate(datetime)} - {formatDateToHour(datetime)}H
        </div>
        <div className="next-activity-card__title">{header || name}</div>
        <div className="next-activity-card__row">
          {price === 0
            ? t("events.button.gratis").toUpperCase()
            : priceMayDiscount(formatPrice(price), discount, null, t("form.descompte"))}
        </div>
        {address && <div className="next-activity-card__row">{address}</div>}
        <div className="next-activity-card__countdown">
          <CountdownTimer targetDate={datetime} />
        </div>
      </div>
    </NavLink>
  );
}
