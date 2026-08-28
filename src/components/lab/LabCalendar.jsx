import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Icon from "../ui/Icon";
import { buildCalendarGrid, dateKey } from "./calendarGrid";
import "./LabCalendar.css";

const WEEKDAY_KEYS = ["dl", "dt", "dc", "dj", "dv", "ds", "dm"];

export default function LabCalendar({ activityDateSet, selectedDate, onSelectDate }) {
  const [t] = useTranslation("translation");
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  const cells = useMemo(() => buildCalendarGrid(month), [month]);
  const selectedKey = selectedDate ? dateKey(selectedDate) : null;

  const changeMonth = (delta) => {
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));
  };

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
      <div className="lab-calendar__grid">
        {WEEKDAY_KEYS.map((key) => (
          <div key={key} className="lab-calendar__weekday">
            {t(`lab.calendar.${key}`)}
          </div>
        ))}
        {cells.map((cell) => {
          const hasActivity = activityDateSet.has(cell.key);
          const isSelected = cell.key === selectedKey;
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
