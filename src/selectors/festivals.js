// Festivals don't have their own API endpoint (see INSTRUCCIONES_NUEVAS_VISTAS.md
// decision #2) — they're events/ entries with type === "festival". Isolated
// here so the real endpoint can be swapped in later without touching the
// Festivals view.
export const selectFestivals = (agenda = []) =>
  agenda.filter((e) => e.type === "festival");

export const selectLabActivities = (agenda = []) =>
  agenda.filter((e) => e.type !== "festival");
