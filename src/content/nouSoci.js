// Contenido estático de /nou-soci — no hay endpoint de API para las cifras
// de la banda de estadísticas ni para las bandas de "què inclou"/"com
// funciona"/FAQ (decisión #3 de INSTRUCCIONES_NUEVAS_VISTAS.md, misma
// convención que src/content/associacio.js). El precio, la descripción y
// la imagen sí vienen de useDataStore().membership[0] (ver NouSoci.jsx).

export const STATS = [
  { value: "312", labelKey: "nouSoci.stat-actius" },
  { value: "42", labelKey: "nouSoci.stat-activitats" },
  { value: "75%", labelKey: "nouSoci.stat-descompte" },
];

export const BENEFITS = [
  "lab",
  "entrades",
  "projecte",
  "assemblea",
  "mastering",
  "comunitat",
];

export const STEPS = ["cistella", "dades", "carnet"];

export const FAQ = ["artista", "renovacio", "carnet", "diners"];
