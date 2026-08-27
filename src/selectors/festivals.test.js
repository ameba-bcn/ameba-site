import { describe, it, expect } from "vitest";
import { selectFestivals, selectLabActivities } from "./festivals";

const AGENDA = [
  { id: 1, name: "Ameba Parkfest", type: "festival" },
  { id: 2, name: "Taller de producció", type: "taller" },
  { id: 3, name: "Club Lectura", type: "club-lectura" },
  { id: 4, name: "Altre Festival", type: "festival" },
];

describe("selectFestivals", () => {
  it("returns only events with type festival", () => {
    expect(selectFestivals(AGENDA).map((e) => e.id)).toEqual([1, 4]);
  });

  it("returns an empty array for an empty/missing agenda", () => {
    expect(selectFestivals([])).toEqual([]);
    expect(selectFestivals(undefined)).toEqual([]);
  });
});

describe("selectLabActivities", () => {
  it("returns every event that isn't a festival", () => {
    expect(selectLabActivities(AGENDA).map((e) => e.id)).toEqual([2, 3]);
  });
});
