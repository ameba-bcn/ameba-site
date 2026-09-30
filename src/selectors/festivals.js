// Festivals don't have their own API endpoint (see INSTRUCCIONES_NUEVAS_VISTAS.md
// decision #2) — they're events/ entries whose type is one of FESTIVAL_TYPES.
// Isolated here so the real endpoint can be swapped in later without
// touching the Festivals view.
export const FESTIVAL_TYPES = ["parkfest", "festival", "festa major"];

export const selectFestivals = (agenda = []) =>
  agenda.filter((e) => FESTIVAL_TYPES.includes(e.type));

export const selectLabActivities = (agenda = []) =>
  agenda.filter((e) => !FESTIVAL_TYPES.includes(e.type));
