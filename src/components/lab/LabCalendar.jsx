import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import { buildCalendarGrid, dateKey, isToday } from "./calendarGrid";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
import "../tooltip/Tooltip.css";
import "./LabCalendar.css";

const WEEKDAY_KEYS = ["dl", "dt", "dc", "dj", "dv", "ds", "dm"];

export default function LabCalendar({
  activityDateSet,
  festivalDateSet = new Set(),
  activityTitlesByDate = new Map(),
  festivalTitlesByDate = new Map(),
  selectedDate,
  onSelectDate,
}) {
  const [t, i18next] = useTranslation("translation");
  const locale = i18next.language === "es" ? "es-ES" : "ca-ES";
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const direction = useRef(1);
  const gridRef = useRef(null);

  const cells = useMemo(() => buildCalendarGrid(month), [month]);
  const selectedKey = selectedDate ? dateKey(selectedDate) : null;

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const set = new Set([currentYear, month.getFullYear()]);
    activityDateSet.forEach((key) => set.add(Number(key.slice(0, 4))));
    festivalDateSet.forEach((key) => set.add(Number(key.slice(0, 4))));
    return Array.from(set).sort((a, b) => a - b);
  }, [activityDateSet, festivalDateSet, month]);

  const changeMonth = (delta) => {
    direction.current = delta;
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  };

  const changeYear = (year) => {
    direction.current = year > month.getFullYear() ? 1 : -1;
    setMonth((m) => new Date(year, m.getMonth(), 1));
  };

  // §7 Lab calendar: cells stagger in on first mount, and slide out/in
  // from the direction of travel whenever the month changes.
  useGsapContext(() => {
    const days = gsap.utils.toArray(".lab-calendar__day", gridRef.current);
    if (!days.length) return;

    if (prefersReducedMotion()) {
      gsap.set(days, { autoAlpha: 1 });
      return;
    }

    gsap.fromTo(
      days,
      { xPercent: direction.current * 6, autoAlpha: 0 },
      {
        xPercent: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: { grid: [6, 7], from: "start", amount: 0.5 },
        ease: "power2.out",
      },
    );

    // §3.1 — today's dot: pops in, then a very soft continuous pulse.
    const todayDot = gridRef.current.querySelector(".lab-calendar__today-dot");
    if (todayDot) {
      gsap.fromTo(
        todayDot,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          delay: 0.3,
          ease: "expo.out",
          onComplete: () => {
            gsap.to(todayDot, { scale: 1.15, duration: 1.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
          },
        },
      );
    }
  }, [month], gridRef);

  return (
    <div className="lab-calendar">
      <div className="lab-calendar__nav">
        <button
          type="button"
          aria-label="Mes anterior"
          onClick={() => changeMonth(-1)}
        >
          <Icon icon="arrowLeft" width="18" height="18" />
        </button>
        <span className="lab-calendar__month">
          {month.toLocaleDateString(locale, { month: "long" })}
        </span>
        <button type="button" aria-label="Mes següent" onClick={() => changeMonth(1)}>
          <Icon icon="arrowRight" width="18" height="18" />
        </button>
        <select
          className="lab-calendar__year"
          aria-label="Any"
          value={month.getFullYear()}
          onChange={(e) => changeYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="lab-calendar__grid" ref={gridRef}>
        {WEEKDAY_KEYS.map((key) => (
          <div key={key} className="lab-calendar__weekday">
            {t(`lab.calendar.${key}`)}
          </div>
        ))}
        {cells.map((cell) => {
          const hasActivity = activityDateSet.has(cell.key);
          const isFestival = festivalDateSet.has(cell.key);
          const isSelected = cell.key === selectedKey;
          const today = isToday(cell.key);
          const titles = (
            (isFestival ? festivalTitlesByDate : activityTitlesByDate).get(cell.key) || []
          ).join(", ");

          // `.lab-calendar__day` is already `position: relative`, so the
          // tooltip span (from Tooltip.css) can hang directly off it —
          // no extra wrapper div, which would otherwise become the real
          // grid cell in place of the button/link and break sizing.
          const classes = [
            "lab-calendar__day",
            hasActivity ? "lab-calendar__day--active" : "",
            isFestival ? "lab-calendar__day--festival" : "",
            !cell.inCurrentMonth ? "lab-calendar__day--muted" : "",
            isSelected ? "lab-calendar__day--selected" : "",
            titles ? "tooltip-wrapper" : "",
          ]
            .filter(Boolean)
            .join(" ");

          if (isFestival) {
            return (
              <Link
                key={cell.key}
                to="/festivals"
                className={classes}
                aria-label={`${cell.date.toLocaleDateString(locale)} — dia de festival`}
              >
                {cell.date.getDate()}
                {today && <span className="lab-calendar__today-dot" aria-hidden="true" />}
                {titles && <span className="tooltipSpan">{titles}</span>}
              </Link>
            );
          }

          if (!hasActivity) {
            return (
              <div key={cell.key} className={classes} title={cell.date.toLocaleDateString(locale)}>
                {cell.date.getDate()}
                {today && <span className="lab-calendar__today-dot" aria-hidden="true" />}
              </div>
            );
          }

          return (
            <button
              key={cell.key}
              type="button"
              className={classes}
              onClick={() => onSelectDate(isSelected ? null : cell.date)}
              aria-pressed={isSelected}
              aria-label={`${cell.date.toLocaleDateString(locale)} — dia amb activitat`}
            >
              {cell.date.getDate()}
              {today && <span className="lab-calendar__today-dot" aria-hidden="true" />}
              {titles && <span className="tooltipSpan">{titles}</span>}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <button
          type="button"
          className="lab-calendar__clear"
          onClick={() => onSelectDate(null)}
        >
          <Icon icon="clear" width="14" height="14" />
          {t("lab.veure-tota-agenda")}
        </button>
      )}
    </div>
  );
}
