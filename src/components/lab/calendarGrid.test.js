import { describe, it, expect } from "vitest";
import { buildCalendarGrid, activityDateSet, dateKey } from "./calendarGrid";

describe("buildCalendarGrid", () => {
  it("always returns a fixed 42-cell (6x7) grid", () => {
    expect(buildCalendarGrid(new Date(2026, 1, 1)).length).toBe(42); // Feb 2026, 28 days
    expect(buildCalendarGrid(new Date(2026, 7, 1)).length).toBe(42); // Aug 2026, 31 days
  });

  it("starts the grid on a Monday", () => {
    const grid = buildCalendarGrid(new Date(2026, 7, 1));
    expect(grid[0].date.getDay()).toBe(1);
  });

  it("marks which cells belong to the target month", () => {
    // August 2026: Aug 1 is a Saturday, so the grid includes trailing July
    // days before it and leading September days after it end.
    const grid = buildCalendarGrid(new Date(2026, 7, 1));
    const inMonth = grid.filter((c) => c.inCurrentMonth);
    expect(inMonth).toHaveLength(31);
    expect(grid.some((c) => !c.inCurrentMonth)).toBe(true);
  });
});

describe("activityDateSet", () => {
  it("builds a set of YYYY-MM-DD keys from activity datetimes", () => {
    const set = activityDateSet([
      { datetime: "2026-08-15T19:00:00Z" },
      { datetime: "2026-08-15T09:00:00Z" },
      { datetime: "2026-08-20T19:00:00Z" },
    ]);
    expect(set.size).toBe(2);
    expect(set.has(dateKey(new Date("2026-08-15T19:00:00Z")))).toBe(true);
  });
});
