import { describe, it, expect } from "vitest";
import { selectFestivals, selectLabActivities } from "./festivals";

const AGENDA = [
  { id: 1, name: "Ameba Parkfest", type: "parkfest" },
  { id: 2, name: "Taller de producció", type: "taller" },
  { id: 3, name: "Club Lectura", type: "club-lectura" },
  { id: 4, name: "Altre Festival", type: "festival" },
  { id: 5, name: "Festa Major de Gràcia", type: "festa major" },
];

describe("selectFestivals", () => {
  it("returns events of type parkfest, festival or festa major", () => {
    expect(selectFestivals(AGENDA).map((e) => e.id)).toEqual([1, 4, 5]);
  });

  it("returns an empty array for an empty/missing agenda", () => {
    expect(selectFestivals([])).toEqual([]);
    expect(selectFestivals(undefined)).toEqual([]);
  });
});

describe("selectLabActivities", () => {
  it("returns every event that isn't a festival type", () => {
    expect(selectLabActivities(AGENDA).map((e) => e.id)).toEqual([2, 3]);
  });
});
