// Pure helpers for LabCalendar, kept dependency-free (native Date only, per
// INSTRUCCIONES_NUEVAS_VISTAS.md — no date-fns) so the grid math is testable
// without rendering anything.

export const dateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

// Monday-first weekday index: getDay() is 0 (Sun) .. 6 (Sat).
const mondayIndex = (date) => (date.getDay() + 6) % 7;

// Fixed 6-week (42-cell) grid so the calendar's height never jumps between
// months. `month` is any Date within the target month.
export function buildCalendarGrid(month) {
  const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - mondayIndex(firstOfMonth));

  const cells = [];
  for (let i = 0; i < 42; i += 1) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + i);
    cells.push({
      date,
      key: dateKey(date),
      inCurrentMonth: date.getMonth() === month.getMonth(),
    });
  }
  return cells;
}

// Set of "YYYY-MM-DD" keys for every activity's date, for O(1) lookup.
export function activityDateSet(activities = []) {
  return new Set(activities.map((a) => dateKey(new Date(a.datetime))));
}

export const isToday = (key) => key === dateKey(new Date());
