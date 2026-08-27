Ameba is a Barcelona electronic-music association's site — a bold, high-contrast brand: near-black pages, cream/orange/red accents, condensed display type. Built from the real `ameba-site` app source (not a published package), extracted via Storybook.

## Styling idiom: CSS custom properties, no utility classes

Every color and type value is a `var(--token)` defined in `styles.css`'s `:root`. Use these exact names — never hex codes or invented tokens:

- **Colors**: `--color-negro` (#1d1d1b, the near-black page/ink color), `--color-cream` (#f2e3c9), `--color-naranja` (orange), `--color-rojo` (red), `--color-amarillo` (yellow), `--color-gris`, `--color-gris-claro`, `--color-white`, `--color-success`.
- **Legacy short aliases** (Button and a few others use these instead of the `--color-*` form — same values): `--negro`, `--naranja`, `--rojo`, `--amarillo`, `--white`, `--primary` (= naranja), `--warning` (= amarillo), `--danger` (= rojo), `--success`.
- **Section tints**: `--section-associacio`, `--section-festivals`, `--section-lab`, `--section-shop` — themed backgrounds per site area.
- **Type**: `--font-display` ("Bebas Neue" — condensed, uppercase, for headings/buttons/titles), `--font-body` ("Montserrat" — body text). Both load from Google Fonts at runtime (already wired into `styles.css`'s `@import`s — no extra setup). Display scale: `--display-xl` / `--display-lg` / `--display-md` (fluid `clamp()` sizes for hero titles).

The whole site defaults to a **dark page**: `html { background-color: var(--color-negro) }`. Design on that assumption — text/components meant to sit directly on the page should use light colors (`--color-cream`, `--color-white`) or lean on components that already carry their own contrasting background (e.g. `Button`'s solid variants). A few components (`Button`'s `boton--primary--outline`, `PageLayout`'s default title color, `SearchBox`'s input) use `--negro`/`--color-negro` for text/borders — by design for when they sit inside a **light card/section**, not directly on the dark page. Compose those inside a light-background container.

## Setup: most components need nothing; Router-dependent ones need a Router

Most components (`Button`, `Icon`, `Tooltip`, `Dropdown`, `InputField`, spinners, etc.) are plain — no provider, no context. Four components read React Router context directly: `Breadcrums`, `CardLayout`, `CardView`, `PromoBanner` (they use `NavLink`/`useNavigate`/`useLocation`). If composing a design around one of these, wrap it in a Router (e.g. `react-router-dom`'s `MemoryRouter`/`BrowserRouter`) — without one they throw. `PromoBanner` also only renders when the current route is `/`.

## Where the truth lives

Read `styles.css` (and its `@import`ed `_ds_bundle.css`) for the exact token values and every component's real compiled CSS before styling anything — it's the same CSS the live site ships. Each component's own `.prompt.md` documents its specific props.

## Example: composing with real tokens

```jsx
import { Button, Icon } from '<bundle>';

<div style={{ background: 'var(--color-cream)', padding: 24 }}>
  <Button buttonStyle="boton--primary--solid" buttonSize="boton--medium">
    <Icon icon="shoppingCart" width="20" height="20" /> Afegir a cistella
  </Button>
</div>
```

`Button`'s look comes entirely from its `buttonStyle` (`boton--primary--solid` | `boton--primary--outline` | `boton--primary--disabled` | `boton--orange--solid` | `boton--back-orange--solid`) and `buttonSize` (`boton--medium` | `boton--small` | `boton--big` | `boton--megaxxl`) string props — not children classes.
