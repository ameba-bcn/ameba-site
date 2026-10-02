// Imatge de mostra per a les stories que necessiten una portada.
//
// Ha de ser un data-URI, no una ruta: les previews de design-sync són fitxers
// HTML autònoms sense el `staticDirs` de Storybook, així que ni una ruta
// root-relative (`/foo.jpg`) ni un `import` de Vite (que també resol a
// `/assets/foo-hash.jpg`) s'hi veuen. Vegeu .design-sync/NOTES.md.
const svg = (from, to, label) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${from}"/><stop offset="100%" stop-color="${to}"/>
      </linearGradient></defs>
      <rect width="800" height="600" fill="url(#g)"/>
      <text x="50%" y="50%" fill="#f4f1ea" font-family="Montserrat,Arial,sans-serif"
            font-size="46" font-weight="700" text-anchor="middle"
            dominant-baseline="middle">${label}</text>
    </svg>`
  );

export const storyCoverImage = svg("#1d1d1b", "#e8452c", "AMEBA");
export const storyCoverImageAlt = svg("#e8452c", "#1d1d1b", "AMEBA");
