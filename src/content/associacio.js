// Contenido estático de /associacio — no hay endpoint de API para esto
// (decisión #3 de INSTRUCCIONES_NUEVAS_VISTAS.md). Los textos de cabecera,
// botones y números vienen tal cual del render del diseñador; los párrafos
// de cuerpo (i18n keys bajo "associacio") son copy de relleno coherente con
// el resto de la app, pendiente de revisión editorial real.

export const BLOBS = ["qui-som", "que-fem", "per-que"];

export const PRINCIPIS_COUNT = 3;

// { labelKey, value, color } — orden y paleta tal cual el render.
export const STATS = [
  { key: "artistes-programats", value: "100", color: "var(--color-amarillo)" },
  { key: "tallers", value: "300", color: "var(--color-amarillo)" },
  { key: "festivals", value: "50", color: "var(--color-naranja)" },
  { key: "socis-1", value: "1K", color: "var(--color-naranja)" },
  { key: "seguidors", value: "16K", color: "var(--color-rojo)" },
  { key: "assistents", value: "35K", color: "var(--color-rojo)" },
  { key: "xerrades", value: "50", color: "var(--color-cream)" },
  { key: "socis-2", value: "1K", color: "var(--color-cream)" },
];

export const WORK_GROUPS = [
  "gestio",
  "art",
  "cultura",
  "produccio",
  "rrss",
  "booking",
  "clubs",
  "radio",
];
