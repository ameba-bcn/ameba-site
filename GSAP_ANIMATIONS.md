# Ameba — Animacions GSAP (Home)

Spec per implementar a `ameba-site` amb **GSAP 3 + ScrollTrigger + SplitText** (`ScrollSmoother` opcional). Res de llibreries d'scroll addicionals.

## Principis

1. **La marca manda.** Ameba és tipografia condensada, contorns, blocs plans i colors durs. Les animacions han de sentir-se **mecàniques i seques**: `power3.out`, `expo.out`, durades 0.5–0.9s. Res de rebots (`elastic`, `back`), res de fades llargs.
2. **Un gest per bloc.** Cada secció té UNA animació protagonista; la resta són suports d'1–2 propietats. Si dues coses competeixen, guanya la tipografia.
3. **Reveal, no parpelleig.** L'estat inicial s'aplica amb `gsap.set()` dins un `gsap.context()`, mai amb CSS que deixi el contingut invisible si el JS falla → sempre sota `if (!prefersReducedMotion)`.
4. **Res es mou dos cops.** `once: true` a tots els reveals d'entrada; només parallax, marquesina i comptadors segueixen l'scroll.

## Setup

```js
gsap.registerPlugin(ScrollTrigger, SplitText);

const ctx = gsap.context(() => {
  /* tot el codi d'aquest doc */
}, rootRef);
return () => ctx.revert(); // cleanup a l'unmount de React
```

- `ScrollTrigger.config({ ignoreMobileResize: true })` — evita re-càlculs pel toolbar del mòbil.
- `ScrollTrigger.normalizeScroll(true)` només si s'activa `ScrollSmoother`.
- Un `ScrollTrigger.refresh()` després que les imatges del hero carreguin (`img.decode()`), o els triggers es calculen amb altures errònies.
- **Reduced motion**: `ScrollTrigger.matchMedia` / `gsap.matchMedia()` amb `"(prefers-reduced-motion: reduce)"` → només `autoAlpha` 0→1, 0.2s, sense moviment ni pin.

---

## 1. Header

**1.1 Entrada (load)** — timeline curta, un sol cop:

- Punt del logo: `scale 0 → 1`, 0.4s, `expo.out`.
- Wordmark "AMEBA": `SplitText` per caràcters, `yPercent 110 → 0`, `stagger 0.03`, `power3.out`, overflow hidden al contenidor.
- Ítems de nav: `y -8 → 0`, `autoAlpha 0 → 1`, `stagger 0.05`.

**1.2 Auto-hide en scroll** — `ScrollTrigger` amb `onUpdate` sobre la direcció:

- Scroll avall > 80px: `yPercent -100`, 0.35s `power2.out`.
- Scroll amunt: torna a `0`. Sempre visible a `scrollY < 100`.

**1.3 Indicador de secció activa** — un `ScrollTrigger` per secció de color (`#associacio`, `#festivals`, `#lab`, `#shop`); a `onEnter` s'animen alhora:

- El quadret de color de l'ítem actiu: `scaleY 1 → 1.35` + color de la secció.
- El subratllat: `scaleX 0 → 1`, `transformOrigin: left`, 0.3s.
- El fons del header pot passar de `--color-negro` a un `rgba` del color de la secció (opcional, 0.5s).

**1.4 Menú mòbil (drawer)** — timeline reversible, guardada en un ref:

- Panell: `clipPath` de `inset(0 0 100% 0)` a `inset(0 0 0% 0)`, 0.5s `expo.out`.
- Ítems: `SplitText` per línia, `yPercent 100 → 0`, `stagger 0.06`, comencen a `-=0.25`.
- Blocs de color de cada ítem: `scaleY 0 → 1`, `transformOrigin: bottom`, dins el mateix stagger.
- Botons del peu: `y 20 → 0`, `autoAlpha`, al final.
- `.reverse()` en tancar (no una segona timeline).

---

## 2. Tira promocional

- Entrada: `height 0 → auto` + `autoAlpha`, 0.4s.
- Tancar: `gsap.to(strip, { height: 0, autoAlpha: 0, duration: 0.35, onComplete: unmount })` — que el contingut de sota pugi animat, no de cop.
- La fletxa ">>>" de l'enllaç: `x 0 → 6` en loop `yoyo`, 0.8s, només en hover (desktop).

---

## 3. Hero

**3.1 Titular per línies (el gest principal)**

- `SplitText` per línies; cada línia dins un `<span>` amb `overflow: hidden`.
- `yPercent 100 → 0`, `duration 0.8`, `stagger 0.09`, `expo.out`.
- El bloc negre de fons de cada línia entra abans: `scaleX 0 → 1`, `transformOrigin: left`, 0.5s, `stagger 0.09`, i el text arrenca `-=0.35`.

**3.2 Parallax de la foto** — `ScrollTrigger` amb `scrub: true`:

- Imatge: `yPercent 0 → 12` i `scale 1.08 → 1` al llarg de `top top → bottom top`.
- El titular es mou al revés (`yPercent 0 → -25`) i perd opacitat (`autoAlpha → 0.2`) — profunditat sense pin.

**3.3 Tarjeta de socis (desktop)**

- Entrada amb el hero: `x 40 → 0`, `autoAlpha`, 0.6s, retard 0.4s.
- Botons: hover `y -2` (ja al DS) + `scaleX` del fons des de l'esquerra en `power2.out`.

---

## 4. Seccions de color (Associació / Festivals / Lab / Shop)

El patró que repeteix a les quatre. **Trigger a `top 75%`**, `once: true`.

**4.1 Títol fantasma en contorn (la firma de la pàgina)**

- `SplitText` per caràcters, `xPercent -8 → 0` + `autoAlpha 0 → 1`, `stagger 0.04`, `power3.out`.
- Reforç del contorn: animar `-webkit-text-stroke-width` de `0px → 1px` (0.6s) perquè les lletres "es dibuixin".
- **Deriva amb l'scroll**: el títol sencer `xPercent 0 → -6` amb `scrub: 1` al llarg de la secció — les paraules gegants llisquen a velocitat diferent del contingut.

**4.2 Imatge**

- Reveal per màscara: `clipPath` de `inset(0 100% 0 0)` a `inset(0 0% 0 0)` (des del costat on viu la imatge en cada secció), 0.9s `expo.out`.
- Dins, la `<img>` fa `scale 1.15 → 1` alhora — el clàssic "la màscara obre i la foto s'assenta".
- Parallax lleu amb `scrub`: `yPercent -6 → 6`.

**4.3 Columna de punts**

- `scale 0 → 1` + `autoAlpha`, `stagger 0.05` des de dalt, `power2.out`.
- Opcional (bonic i barat): `stagger: { from: "start", amount: 0.4 }` i un `y` de ±3px en loop infinit molt suau.

**4.4 Text**

- Intro en cursiva: `y 16 → 0` + `autoAlpha`, 0.5s.
- Cos: igual, `-=0.3`.
- Res de split per paraules aquí — el titular ja té el protagonisme.

**4.5 Botó "+"**

- Entrada: `rotate -90 → 0` + `scale 0 → 1`, 0.5s `power3.out`.
- Hover: `rotate 90`, 0.3s. Click (navegació): `scale 1 → 1.6` + `autoAlpha 0` mentre es fa la transició de ruta.

**4.6 Transició entre bandes de color**
Les seccions són blocs plans de color enganxats: donar-los un tall net.

- `ScrollTrigger` per secció amb `scrub: true`: la banda entra amb `clipPath: inset(0 0 100% 0) → inset(0 0 0% 0)` en els primers 15% de viewport. Efecte "cortina de color" en comptes de vora dura.
- Alternativa més barata i també correcta: `scaleY` d'una línia divisòria d'1px de `0 → 1` a `top 90%`.

---

## 5. Franja de captació (vermella)

- Fons: `scaleX 0 → 1`, `transformOrigin: left`, 0.6s `expo.out`.
- Ítems de la llista: `x -12 → 0` + `autoAlpha`, `stagger 0.08`, comencen a `-=0.3`.
- Botons: `y 14 → 0`, `stagger 0.06`.

---

## 6. Footer

**6.1 Columnes d'enllaços** — `y 20 → 0` + `autoAlpha`, `stagger 0.06`, trigger `top 85%`.

**6.2 "NEWSLETTER"** — `SplitText` per caràcters, `yPercent 100 → 0`, `stagger 0.035`, `expo.out`, contenidor amb `overflow: hidden`.

**6.3 Formulari**

- Input: la vora inferior creix `scaleX 0 → 1` en focus, 0.3s.
- Submit: timeline d'estat — `boto → width del spinner` (o simplement `autoAlpha` del label ↔ spinner), i a l'èxit un check que entra amb `scale 0 → 1` `expo.out` i el missatge amb `y 8 → 0`.
- Error: `x` shake curt (`0.06s`, 4 repeticions, amplitud 4px) — l'única excepció a "res de rebots".

**6.4 Icones de xarxes** — entrada `scale 0 → 1`, `stagger 0.06`; hover `y -3` + `scale 1.12`, 0.25s.

**6.5 Marquesina inferior** — substituir el `@keyframes` actual per GSAP perquè sigui controlable:

```js
const loop = gsap.to(track, {
  xPercent: -50,
  duration: 22,
  ease: "none",
  repeat: -1,
});
// velocitat lligada a l'scroll: accelera mentre l'usuari scrolleja
ScrollTrigger.create({
  onUpdate: (self) =>
    gsap.to(loop, {
      timeScale: 1 + Math.abs(self.getVelocity()) / 2000,
      duration: 0.4,
      overwrite: true,
    }),
});
```

Aquest detall (la marquesina que s'accelera amb l'scroll) és el que més "vida" dona per menys codi.

---

## 7. Vistes internes (mateix vocabulari)

- **Associació · blobs QUI SOM / QUÈ FEM / PER QUÈ**: cercle negre `scale 0 → 1` `expo.out` + títol en contorn amb el split de 4.1, `stagger 0.12` entre els tres blocs.
- **Associació · xifres**: comptadors amb `snap: { textContent: 1 }` sobre un proxy, 1.2s, disparats a `top 80%`; les columnes de color entren amb `scaleY 0 → 1`, `transformOrigin: bottom`, `stagger 0.06`. Al carrusel mòbil, `ScrollTrigger` amb `horizontal: true` i `containerAnimation` per disparar cada columna quan entra pel costat.
- **Associació · principis 1/2/3**: número en contorn `yPercent 100 → 0` dins la banda vermella, que al seu torn fa `scaleX 0 → 1`.
- **Festivals / Lab / Shop · grids de tarjetes**: `ScrollTrigger.batch` amb `y 30 → 0` + `autoAlpha`, `stagger: { each: 0.08, grid: "auto" }`, `once: true`. **Important**: `batch` i no un trigger per tarjeta (12 triggers = jank al mòbil).
- **Tarjetes, hover (desktop)**: imatge `scale 1.06`, franja negra del títol `y 0 → -4`, badge de data/preu `y -2`; tot 0.3s `power2.out`, revertit amb `overwrite: "auto"`.
- **Lab · calendari**: cel·les amb `autoAlpha 0 → 1` `stagger { grid: [6,7], from: "start", amount: 0.5 }`; en canviar de mes, sortida `xPercent ∓6` + entrada des del costat contrari (segons direcció).
- **Filtres (Lab/Festivals)**: en filtrar, `FLIP` — `gsap.registerPlugin(Flip)`, `Flip.getState(cards)` abans i `Flip.from(state, { duration: 0.5, ease: "power3.inOut", stagger: 0.03, absolute: true, onEnter/onLeave })`. Això és el que fa que un filtre se senti car.
- **"Veure més"**: les noves tarjetes entren amb el `batch` normal; el botó fa `y 4` en click.

---

## 8. Rendiment i higiene

- Anima **només** `transform`, `opacity`, `clipPath` i `scale`. Mai `top/left/width/height` en scroll (excepte el collapse de la tira promo).
- `will-change: transform` només mentre l'animació corre (GSAP ja ho gestiona amb `force3D`).
- `SplitText`: sempre `revert()` al cleanup i re-split al `resize` amb debounce, o els salts de línia queden congelats.
- Sense `pin` al mòbil: `gsap.matchMedia()` amb `"(min-width: 760px)"` per parallax i pins; a mòbil, reveals simples.
- Comptar els triggers: objectiu < 25 a la home. Un `ScrollTrigger.batch` per grid, no per element.
- Test amb throttling de CPU 4x: si el scrub va a batzegades, pujar `scrub` de `true` a `1` (lerp) abans de tocar res més.

## 9. Ordre d'implementació suggerit

1. Setup + reduced motion + marquesina GSAP (baix risc, guany immediat).
2. Hero: split del titular + parallax.
3. Patró de secció de color (4.1–4.5) com a hook reutilitzable `useSectionReveal()`.
4. Header: auto-hide + secció activa + drawer.
5. Footer + formulari.
6. Grids amb `batch` i `Flip` als filtres de les vistes internes.
