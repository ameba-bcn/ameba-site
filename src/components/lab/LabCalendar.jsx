import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import { buildCalendarGrid, dateKey, isToday } from "./calendarGrid";
import { gsap, prefersReducedMotion } from "../../utils/gsapSetup";
import useGsapContext from "../../hooks/use-gsap-context";
import "./LabCalendar.css";

const WEEKDAY_KEYS = ["dl", "dt", "dc", "dj", "dv", "ds", "dm"];

export default function LabCalendar({ activityDateSet, selectedDate, onSelectDate }) {
  const [t] = useTranslation("translation");
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const direction = useRef(1);
  const gridRef = useRef(null);

  const cells = useMemo(() => buildCalendarGrid(month), [month]);
  const selectedKey = selectedDate ? dateKey(selectedDate) : null;

  const changeMonth = (delta) => {
    direction.current = delta;
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
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
          {month.toLocaleDateString("ca-ES", { month: "long", year: "numeric" })}
        </span>
        <button type="button" aria-label="Mes següent" onClick={() => changeMonth(1)}>
          <Icon icon="arrowRight" width="18" height="18" />
        </button>
      </div>
      <div className="lab-calendar__grid" ref={gridRef}>
        {WEEKDAY_KEYS.map((key) => (
          <div key={key} className="lab-calendar__weekday">
            {t(`lab.calendar.${key}`)}
          </div>
        ))}
        {cells.map((cell) => {
          const hasActivity = activityDateSet.has(cell.key);
          const isSelected = cell.key === selectedKey;
          const today = isToday(cell.key);
          const classes = [
            "lab-calendar__day",
            hasActivity ? "lab-calendar__day--active" : "",
            !cell.inCurrentMonth ? "lab-calendar__day--muted" : "",
            isSelected ? "lab-calendar__day--selected" : "",
          ]
            .filter(Boolean)
            .join(" ");

          if (!hasActivity) {
            return (
              <div key={cell.key} className={classes} title={cell.date.toLocaleDateString("ca-ES")}>
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
              aria-label={`${cell.date.toLocaleDateString("ca-ES")} — dia amb activitat`}
            >
              {cell.date.getDate()}
              {today && <span className="lab-calendar__today-dot" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
