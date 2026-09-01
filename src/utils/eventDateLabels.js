import { formatDateToHour } from "./utils";

// Day/month names aren't exposed anywhere else in the app (every other date
// display uses numeric d-m-Y / HH:mm) — event detail pages that spell out
// "Dissabte 21 de maig" share these instead of duplicating them per page.
export const DAY_NAMES = {
  ca: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
  es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
};
export const MONTH_NAMES = {
  ca: ["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
};

export function formatDateChip(datetime) {
  const d = new Date(datetime);
  return `${d.getDate()}.${d.getMonth() + 1}.${String(d.getFullYear()).slice(-2)} | ${formatDateToHour(datetime).replace(":", ".")}h`;
}

export function formatDayLine(datetime, lang) {
  const d = new Date(datetime);
  return `${DAY_NAMES[lang][d.getDay()]} ${d.getDate()} de ${MONTH_NAMES[lang][d.getMonth()]}`;
}
