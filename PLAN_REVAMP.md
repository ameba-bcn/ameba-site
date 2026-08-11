# Plan de migración web — AMEBA (rediseño 2026)

> Checklist único, ejecutable en Claude Code sobre `ameba-bcn/ameba-site` (React 19 + Vite, react-router 6, zustand, i18next, CSS plano por componente).
> **Alcance:** home + navbar + footer. **Mapeo decidido:** las rutas actuales se mantienen tal cual — solo cambian de sitio (del menú al footer). Para Lab se crea una vista vacía.

---

## Contexto del código real

- Rutas actuales (en `src/App.jsx`): `/` (Home), `/activitats` (Agenda), `/botiga`, `/socis` (Soci@s), `/gallery` (Arxiu), `/memberships` (Fes-te soci), `/login`, `/legal`, `/checkout`, `/profile`, etc.
- Navbar: `src/components/navbar/Navbar.jsx` + `NavbarButtons.jsx` (desktop) + `NavbarButtonsMobile.jsx` (móvil), estilos en `Navbar.style.css`. Incluye `Cart`, `MenuLog` (login/perfil) y switch CAT/CAST inline.
- Home: `src/pages/home/Home.jsx` → `Associacio` (cover), `Manifesto`, `Activitats` + marquesina `LettersMove`.
- Footer global: `src/contacte/Contacte.jsx` (newsletter + `MediaLinks` + colaboradores + legal), montado en `App.jsx` bajo las rutas.
- Tokens: `src/index.css` (`--color-cream`, `--color-amarillo`, `--color-naranja`, `--color-rojo`, `--color-negro`…).
- i18n: `react-i18next`, claves tipo `menu.botiga`, `footer.colab`; idiomas `ca`/`es` en localStorage (`i18nextLng`).

### Nueva IA (rediseño)

Menú: **Associació** (crema) · **Festivals** (amarillo) · **Lab** (naranja) · **Shop** (rojo) + iconos usuario / carrito / idioma.
Pierden sitio en el menú: Agenda (`/activitats`), Arxiu (`/gallery`), Fes-te soci (`/memberships`), Soci@s (`/socis`), Login → **se recuperan en el footer y en el icono de usuario**. Ninguna ruta cambia de URL — solo cambia desde dónde se accede.

---

## Checklist

### 1. Tokens y tipografía — `src/index.css`

- [ ] Ajustar/añadir tokens a los colores del rediseño (mantener nombres existentes para no romper `Button.css` y compañía):
  ```css
  --color-cream: #f2e3c9; /* Associació */
  --color-amarillo: #f5e400; /* Festivals */
  --color-naranja: #e8912d; /* Lab */
  --color-rojo: #e05a3a; /* Shop / CTA */
  --color-negro: #1d1d1b;
  ```
  ⚠ Muestrear los hex definitivos del arte final antes de commitear.
- [ ] Añadir alias semánticos: `--section-associacio`, `--section-festivals`, `--section-lab`, `--section-shop`.
- [ ] Clase utilitaria `.outline-display` para titulares outline (display condensada + `-webkit-text-stroke: 2px var(--color-negro); color: transparent;`). La display actual es "Bebas Neue" — confirmar si el rediseño usa otra (parece más condensada tipo Archivo/Anton).

### 2. Navbar — `src/components/navbar/`

- [ ] `NavbarButtons.jsx`: sustituir los 6 links por 4 `NavLink` con cuadrado de color:
  - Associació → ancla de la home `/#associacio` (su banda de sección)
  - Festivals → ancla `/#festivals`
  - Lab → `/lab` (**nueva vista vacía**, ver §2b)
  - Shop → `/botiga` (ruta existente)
  - Cada item: `<span class="nav-color-chip">` con su `--section-*`; estado activo con el chip relleno/label resaltado como en el mock.
- [ ] Grupo derecho de iconos:
  - **Usuario**: reusar `MenuLog` (logueado → perfil; no → `/login`). Es la vía principal de acceso a Login/Perfil al salir del menú.
  - **Carrito**: `Cart` existente, restyle a icono.
  - **Idioma**: convertir el par CAT/CAST en icono/toggle compacto; conservar `handleChangeLanguage` tal cual (i18next + reload).
- [ ] Nuevas claves i18n `menu.associacio`, `menu.festivals`, `menu.lab`, `menu.shop` en los JSON de traducción (ca/es).
- [ ] **Banner promo** bajo la navbar (fondo crema): "Fes-te **soci/sòcia** d'Ameba…" + ">>>>>> Descobreix més fent click aquí" → `/memberships`. Reusar/extender `src/components/banner/Banner.jsx`; texto vía i18n. **Solo en la home y cerrable**: botón × accesible; persistir el cierre en `sessionStorage` (clave `promoBannerClosed`) vía `safeStorage`, renderizar solo cuando `location.pathname === "/"`.

#### 2b. Vista Lab — `src/pages/lab/Lab.jsx` (nueva)

- [ ] Crear página vacía placeholder: `PageMeta`, fondo `--section-lab`, título outline "Lab" y nota "próximament" (i18n). Añadir `<Route path="/lab">` en `App.jsx` con `lazyWithRetry`.
- [ ] `NavbarButtonsMobile.jsx`: replicar los 4 items + iconos; mantener hamburguesa y `useUIStore`.
- [ ] `Navbar.style.css`: barra negra fija, conservar el comportamiento hide-on-scroll actual.

### 3. Home — `src/pages/home/`

- [ ] **Hero** (`views/cover/Associacio.jsx` → renombrar a `Hero.jsx`): foto full-bleed duotono (`AmebaPortadaDesktop/Mobile.jpg` o nueva del CMS vía `fetchCover`), titular outline sobre cajas negras ("DES DE 2014 DONANT SUPORT AL TALENT LOCAL DE LA CIUTAT!"), tarjeta roja con bullets + botones **FES-TE SOCI!** (→ `/memberships`) y **ACCÉS SOCIS** (→ `/login` o perfil si `isLoggedIn`).
- [ ] **Nuevo componente `SectionBand.jsx`** (uno solo, parametrizado: `{ id, color, title, image, lead, body, to }`): banda a color con megatítulo outline de fondo (`aria-hidden`), imagen duotono, lead itálica + párrafos, botón **(+)**. Renderizar 4 instancias: Associació, Festivals, Lab, Shop. Alternar lado del detalle de puntos.
  - Copy: usar el lorem ipsum del mock como placeholder vía claves i18n (`home.band.associacio.lead`, etc.) — se sustituirá más adelante.
  - Botones (+): Associació y Festivals sin destino propio aún (ocultar el (+) o anclar en su banda); Lab → `/lab`; Shop → `/botiga`.
- [ ] Reubicar contenido actual de la home:
  - `Manifesto` → sale de la home (destino: página Associació, fase posterior). No borrar el componente.
  - `Activitats` (grid agenda) → sale de la home; `/activitats` sigue siendo su vista completa.
  - `LettersMove` (marquesinas) → conservar como separadores si encaja con el rediseño; si no, retirar de Home sin borrar el componente (lo usa `Contacte`).

### 4. Footer — `src/contacte/Contacte.jsx` (rutas huérfanas)

- [ ] Añadir bloque de **columnas de enlaces** antes de la newsletter (el mock no lo contempla — decisión de proyecto):
  - _Associació_: Fes-te soci → `/memberships` · Soci@s → `/socis`
  - _Lab_: Agenda → `/activitats` · Arxiu → `/gallery`
  - _Info_: Newsletter (ancla al form) · Legal → `/legal` · info@ameba.cat
  - Etiquetas vía i18n reutilizando las claves de menú existentes (`menu.soci-menu`, `menu.arxiu`…).
- [ ] Conservar: `NewsletterFormLayout`, `MediaLinks` (Instagram, SoundCloud, Facebook, YouTube), colaboradores (`useDataStore().collaborators`), línea legal.
- [ ] Restyle a fondo negro del rediseño; actualizar "AMEBA 2022©" → año dinámico.

### 5. Redirects y SEO

- [ ] **No hay redirects**: todas las URLs se mantienen. Solo añadir la ruta nueva `/lab`.
- [ ] `PageMeta` de Home: actualizar title/description/OG al nuevo posicionamiento; añadir `/lab` a `public/sitemap.xml`.

### 6. i18n, accesibilidad, QA

- [ ] Todas las cadenas nuevas en ca + es (navbar, banner, hero, bandas, footer). Nada hardcodeado.
- [ ] Contraste AA de texto negro sobre amarillo/naranja/rojo; megatítulos outline decorativos con `aria-hidden="true"`.
- [ ] Focus visible en los 4 items, iconos y botón (+); banner promo cerrable por teclado (× con `aria-label`).
- [ ] QA: `/activitats`, `/gallery`, `/memberships`, `/socis`, `/login` accesibles desde footer/icono usuario; carrito e idioma funcionan desde los nuevos iconos; móvil (breakpoints `MOBILE_BIG` 1519px); tests existentes en verde (`yarn test:run`).

### 7. Mejoras técnicas oportunistas (detectadas en el repo)

**CSS / design system**

- [ ] **Tokens tipográficos**: `font-family: "Bebas Neue"` está hardcodeada en **+100 sitios** (App.css, Navbar.style.css, CardView, Forms…) y "Montserrat" en ~20. Crear en `:root`:
  ```css
  --font-display: "Bebas Neue", sans-serif;
  --font-body: "Montserrat", sans-serif;
  ```
  y hacer find&replace global. Si el rediseño cambia la display, se cambiará en una sola línea.
- [ ] **Carga de fuentes**: `index.css` solo importa Montserrat vía Google Fonts (render-blocking); verificar dónde se carga Bebas Neue (`index.html`). Ideal: self-host ambas con `@font-face` + `font-display: swap` y `preload`.
- [ ] `body` usa la pila de sistema, no Montserrat → definir `font-family: var(--font-body)` en `body` y limpiar declaraciones repetidas.
- [ ] **Escala tipográfica y espaciado**: tamaños mágicos por todo el código (220px, 160px, 120px, 100px, 90px…) con media queries duplicadas en `PowerTitle.css`, `SectionTitle.css`, `App.css`. Crear `--display-xl/lg/md` con `clamp()` y eliminar la mitad de las media queries.
- [ ] **Limpiar `App.css`** (dead code detectado): `.wordsMove`/`@keyframes wordsInMove` (colores debug red/green/blue), `.Article`, `.BookingContent`, `.SupportContent`, `#colabo { position: flex }` (propiedad inválida), prefijos obsoletos (`-khtml-`, `-o-`, `@-moz-keyframes`…). En `NavbarButtons.jsx`, borrar los bloques comentados (#SUPPORTYOURLOCALS, BOOKING).
- [ ] **Accesibilidad crítica**: `App.css` tiene `.app *:focus { outline: 0 }` — elimina el focus de TODA la web. Quitarlo y sustituir por `:focus-visible` con estilo de marca (encaja con §6).
- [ ] Reducir `!important` (Navbar.style.css, index.css, App.css los usan como parche de especificidad); aprovechar el restyle de navbar/footer para eliminarlos ahí.
- [ ] **Duotonos del rediseño**: no pre-procesar imágenes; usar Cloudinary (ya integrado, `cloudinaryUrl`) o CSS `filter: grayscale(1)` + `mix-blend-mode: multiply` sobre el color de banda — una sola imagen sirve para las 4 bandas.

**Dependencias (`package.json`)**

- [ ] `html2canvas` + `jspdf` (~500KB combinados): usados solo para el carnet de socio (`/member-card`). Ya hay lazy routes — verificar que se importan dinámicamente solo ahí; si no, convertir a `import()` dinámico.
- [ ] `react-player` ^2.6.2: versión antigua; auditar dónde se usa — si solo reproduce un embed puntual, valorar sustituir por iframe nativo.
- [ ] `@tinymce/tinymce-react`: solo lo usa el perfil de socio (TextArea). Cargarlo lazy si no lo está. ⚠ **`TEXT_EDITOR_KEY` está commiteada en `constants.js`** — mover a variable de entorno (`VITE_TINYMCE_KEY`) y rotar la clave.
- [ ] `i18next` v21 / `react-i18next` v11: dos majors por detrás; actualizar de paso permite quitar el `window.location.reload()` del cambio de idioma (ver abajo).
- [ ] `formik`: mantener (muy usado en forms), pero no añadir nuevas deps para navbar/home — todo lo nuevo con CSS y React puros.

**Comportamiento**

- [ ] Cambio de idioma sin `window.location.reload()`: `constants.js` lee `i18nextLng` en tiempo de import (los mensajes de error quedan congelados hasta recargar) — convertir `ERROR` en función `getErrors(lang)` o claves i18n normales, y dejar que i18next re-renderice.
- [ ] "AMEBA 2022©" hardcodeado en `Contacte.jsx` → `new Date().getFullYear()` (ya en §4).

---

## Decisiones tomadas

- Mapeo: rutas actuales intactas, acceso movido del menú al footer. Lab = vista vacía nueva.
- Copy: lorem ipsum del mock como placeholder por ahora.
- Banner promo: solo home, cerrable (sessionStorage).

## Pendientes

1. Copy real de hero y bandas.
2. Hex y tipografía display definitivos del rediseño.
3. Contenido futuro de Festivals y de la página Lab.
