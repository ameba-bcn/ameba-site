# Ameba — Animacions GSAP · Vistes internes

Complement de `GSAP_ANIMATIONS.md` (home). El **setup, els principis, el reduced-motion i la higiene de rendiment de la secció 8 d'aquell document s'apliquen igual aquí** i no es repeteixen. Aquest doc cobreix Associació, Festivals, Lab i Shop.

## Vocabulari compartit per les quatre vistes

Les quatre pàgines tenen la mateixa capçalera de pàgina, així que el gest ha de ser **idèntic** a totes: el que canvia és el color, no el moviment.

### A. Entrada de pàgina (page enter)
Timeline única disparada al muntar, abans de qualsevol ScrollTrigger:

1. **Banda de color de fons**: `clipPath: inset(0 0 100% 0) → inset(0 0 0% 0)`, 0.6s `expo.out`. La pàgina "baixa la persiana" del seu color.
2. **Títol gegant en contorn** (`Associació` / `Festivals` / `Lab` / `Shop`): `SplitText` per caràcters, `yPercent 100 → 0` amb el contenidor en `overflow: hidden`, `stagger 0.045`, `expo.out`, comença `-=0.3`. En paral·lel, `-webkit-text-stroke-width: 0 → 1px` (0.7s) perquè les lletres es dibuixin.
3. **Imatge del hero**: màscara `clipPath: inset(0 100% 0 0) → inset(0 0 0 0)`, 0.9s `expo.out`, amb la `<img>` interior fent `scale 1.12 → 1` alhora. `-=0.5`.
4. **Columna de punts**: `scale 0 → 1` + `autoAlpha`, `stagger 0.05`, `-=0.4`.
5. **Paràgrafs**: `y 16 → 0` + `autoAlpha`, `stagger 0.08`, `-=0.3`.

### B. Deriva del títol amb l'scroll
`ScrollTrigger` amb `scrub: 1` sobre el títol de la vista: `xPercent 0 → -8` i `autoAlpha 1 → 0.35` al llarg del hero. Les paraules gegants llisquen a velocitat diferent del contingut — és la firma visual de la marca.

### C. Parallax del hero (només `min-width: 760px`)
Imatge `yPercent 0 → 10` amb `scrub: true`. A mòbil, res: la màscara d'entrada ja fa la feina.

### D. Transició entre vistes
En navegar entre seccions de color, la banda de la vista d'entrada fa el `clipPath` d'A.1 **per sobre** de la sortint (overlay de color a pantalla completa, 0.5s), i el títol nou entra amb A.2. Dona continuïtat: sempre és el color qui condueix el canvi de pàgina.

---

# 1. Associació

Cream, la vista més editorial. Aquí el moviment ha de ser **contingut i seqüencial**, no espectacular.

## 1.1 Blocs QUI SOM? / QUÈ FEM? / PER QUÈ?
Trigger a `top 75%`, `once: true`, `stagger 0.12` entre els tres blocs. Per bloc:
- **Blob negre**: `scale 0 → 1` + `rotate -12 → 0`, 0.6s `expo.out`. Si s'usa `AmebaBlob` del DS, animar-ne també la morfologia (`borderRadius` interpolat entre dues formes) en loop lent de 8s — el blob és el logotip viu de l'associació i mereix respirar.
- **Títol en contorn**: split per caràcters, `yPercent 100 → 0`, `stagger 0.03`, `-=0.35`.
- **Paràgraf**: `y 14 → 0` + `autoAlpha`, `-=0.25`.

## 1.2 Franja "FES-TE SOCI/SÒCIA … DES DE 10€ ANUALS"
- Fons vermell: `scaleX 0 → 1`, `transformOrigin: left`, 0.6s `expo.out`.
- Titular: split **per paraules** (no per caràcters — és molt llarg), `yPercent 100 → 0`, `stagger 0.05`, `-=0.35`.
- Bullets: `x -12 → 0` + `autoAlpha`, `stagger 0.08`.
- Botó "INSCRIU-TE!": `y 14 → 0` + `scale 0.94 → 1`, al final.

## 1.3 Banda negra "DES DE 2014 DONANT SUPORT…"
El moment més dramàtic de la pàgina; mereix un `pin` curt al desktop.
- `ScrollTrigger` amb `pin: true`, `scrub: 1`, `end: "+=60%"` (només `min-width: 760px`).
- Les tres línies del titular en contorn entren **una per una lligades a l'scroll**: `yPercent 100 → 0` + `-webkit-text-stroke-width 0 → 1px`, escalonades dins el scrub.
- El bloc de la dreta (text + botó "PROJECTES SOCIS/SÒCIES") entra a la segona meitat del pin: `x 30 → 0` + `autoAlpha`.
- A mòbil: sense pin, reveal normal a `top 75%` amb `stagger 0.1` per línia.

## 1.4 ELS NOSTRES PRINCIPIS (1 · 2 · 3)
- Títol de secció amb el split estàndard.
- Per cada principi, `stagger 0.15`:
  - Banda vermella: `scaleX 0 → 1` des de l'esquerra, 0.5s.
  - Número en contorn: `yPercent 100 → 0` + `scale 1.3 → 1`, `expo.out`, `-=0.3`.
  - Text: `y 12 → 0` + `autoAlpha`.
- Detall: el número pot fer `xPercent 0 → -10` amb `scrub` mentre la banda passa pel viewport.

## 1.5 Xifres (100 / 300 / 50 / 1K / 16K / 35K / 50 / 1K)
La peça amb més potencial de la vista.
- **Columnes**: `scaleY 0 → 1`, `transformOrigin: bottom`, `stagger 0.07`, 0.6s `expo.out`. Trigger `top 80%`.
- **Comptadors**: proxy `{ v: 0 }` amb `snap: { v: 1 }`, 1.2s `power2.out`, formatant `1K`/`16K`/`35K` al `onUpdate`. Arrenquen `-=0.4` respecte la seva columna.
- **Etiqueta vertical**: `yPercent 100 → 0` dins la columna amb `overflow: hidden`.
- **Al carrusel mòbil**: `ScrollTrigger` amb `horizontal: true` + `containerAnimation`, o més simple, disparar el comptador amb un `IntersectionObserver` sobre el contenidor horitzontal. No crear 8 triggers verticals que ja estan tots "dins" del viewport.

## 1.6 Grups de treball (GESTIÓ, ART, CULTURA…)
- `ScrollTrigger.batch` sobre les 8 fitxes: `y 24 → 0` + `autoAlpha`, `stagger: { each: 0.07, grid: "auto" }`, `once: true`.
- Cercle de cada fitxa: `strokeDashoffset` animat si es converteix a SVG (el cercle "es dibuixa", 0.7s) — si es queda com a `border-radius`, `scale 0 → 1` amb `expo.out`.
- Hover desktop: cercle `scale 1.08` + títol en contorn que **s'omple** (`-webkit-text-stroke-width 1px → 0` i `color: transparent → var(--color-negro)`), 0.3s. Aquest fill-on-hover és molt Ameba i val la pena a tota la pàgina.

---

# 2. Festivals

Groc dur. Aquí mana la **imatge a sangre** i la graella de cartells.

## 2.1 Banda d'imatge b/n a tota amplada
- Entrada: `clipPath: inset(0 0 100% 0) → inset(0 0 0 0)`, 0.9s `expo.out`, trigger `top 85%`.
- Parallax: `scale 1.15 → 1` amb `scrub: true` al llarg de tot el seu pas pel viewport (desktop) — la textura respira.
- Opcional i molt eficaç: `filter: grayscale(1) → grayscale(0.2)` lligat al scrub, de manera que la imatge "s'encén" quan és al centre del viewport.

## 2.2 Fila de punts sobre la banda
`scale 0 → 1` amb `stagger 0.04` d'esquerra a dreta, just abans que obri la màscara de la imatge.

## 2.3 "Històric festivals" + filtres
- Títol: `y 14 → 0` + `autoAlpha`.
- Dropdowns ANY / FESTIVAL: `y 10 → 0`, `stagger 0.06`.
- **Obertura del dropdown**: panell amb `clipPath: inset(0 0 100% 0) → inset(0 0 0 0)`, 0.35s, i opcions amb `y -6 → 0` + `autoAlpha`, `stagger 0.03`. Tancar = `.reverse()`.
- **Aplicar filtre → FLIP**: `Flip.getState(cards)`, actualitzar la llista, `Flip.from(state, { duration: 0.55, ease: "power3.inOut", stagger: 0.03, absolute: true, onEnter: el => gsap.fromTo(el, {autoAlpha:0, scale:0.92}, {autoAlpha:1, scale:1, duration:0.4}), onLeave: el => gsap.to(el, {autoAlpha:0, scale:0.92, duration:0.3}) })`. Això és el que fa que la graella se senti cara.

## 2.4 Graella de cartells
- `ScrollTrigger.batch`, `y 30 → 0` + `autoAlpha`, `stagger: { each: 0.08, grid: "auto" }`, `once: true`. **Mai un trigger per tarjeta.**
- Reveal intern del cartell: `clipPath: inset(0 0 100% 0) → inset(0 0 0 0)` + `scale 1.08 → 1`, dins el mateix batch.
- **Hover desktop**: imatge `scale 1.06`, franja negra del títol `y -4`, badge de data `y -2` i `background` que passa a `--color-amarillo` amb text negre; 0.3s `power2.out`, `overwrite: "auto"`.
- **Badge de data**: en entrar la tarjeta, `xPercent -100 → 0` amb `overflow: hidden` al contenidor — entra lliscant des de l'esquerra, com una etiqueta que s'enganxa.
- Franja de preu (quan existeix): `scaleX 0 → 1` des de l'esquerra, `-=0.2`.

---

# 3. Lab

Taronja. És la vista **més funcional** (calendari + filtres + graella); l'animació ha de servir la lectura, no decorar.

## 3.1 Calendari
- **Entrada**: capçalera de dies `y -8 → 0` + `autoAlpha` amb `stagger 0.03`; cel·les amb `autoAlpha 0 → 1` + `scale 0.9 → 1`, `stagger: { grid: [6,7], from: "start", amount: 0.5 }`.
- **Canvi de mes** (fletxes): timeline direccional — les cel·les surten `xPercent ∓8` + `autoAlpha 0` (0.2s, `stagger { grid, amount: 0.15 }`), es re-renderitza, i entren des del costat contrari (0.3s). L'etiqueta del mes fa `yPercent ∓100` dins un contenidor amb `overflow: hidden`.
- **Dia amb activitat**: punt indicador amb `scale 0 → 1` `expo.out` en carregar el mes, i pulse molt suau (`scale 1 → 1.15`, 1.4s, `yoyo`, `repeat: -1`) **només** al dia d'avui.
- **Hover de cel·la**: `background` a `--color-negro` + text cream, 0.15s. Res de moviment aquí: és una graella de dades.

## 3.2 "Propera activitat"
- Caixa negra: `clipPath` d'obertura + contingut amb `y 10 → 0`.
- Estat buit ("No hi ha cap activitat propera"): `autoAlpha 0 → 0.75`, sense moviment — un estat buit no ha de cridar l'atenció.
- Si hi ha activitat: compte enrere amb `CountdownTimer` del DS; animar només el dígit que canvia (`yPercent 100 → 0` dins `overflow: hidden`), mai el bloc sencer.

## 3.3 Filtres CONCERT / TALLER / XERRADA
- Entrada: `y 10 → 0` + `autoAlpha`, `stagger 0.05`.
- **Activació**: el fons negre del chip entra amb `scaleX 0 → 1` des de l'esquerra (0.25s `power2.out`) i el text canvia a cream a mig camí. Desactivar = `scaleX → 0` cap a la dreta.
- **Re-flow de la graella**: el mateix `Flip` de 2.3. Amb 12 tarjetes és on més es nota.
- "BORRAR FILTRES": en clicar, un `x` shake curt de 3px als chips actius mentre es desactiven.

## 3.4 Graella d'activitats + "Veure més"
- Mateix `batch` que Festivals (2.4), amb els mateixos hovers.
- **"Veure més"**: les 4 tarjetes noves entren amb `y 30 → 0` + `autoAlpha`, `stagger 0.08`, i el botó baixa acompanyant el creixement de la graella (que ho faci el layout, no una animació d'altura). Micro-detall: `y 4` al botó en el click.

---

# 4. Shop

Vermell. Catàleg pur: **el producte és el protagonista**, l'animació ha de fer que les fotos es vegin bé.

## 4.1 Graella de productes
- `ScrollTrigger.batch` idèntic (2.4).
- **Badge de preu**: `xPercent -100 → 0` lliscant des de l'esquerra amb `overflow: hidden`, `-=0.2` respecte la tarjeta. En hover, `scale 1.08` i canvi a `--color-amarillo`.
- **Hover de producte** (desktop): foto `scale 1.07`, franja negra del títol `y -4`; 0.3s `power2.out`.
- **Hover amb segona imatge** (si el catàleg en té): crossfade `autoAlpha` entre les dues fotos, 0.35s — és l'estàndard de qualsevol botiga i aquí encaixa sense trair la marca.

## 4.2 Afegir a la cistella
- Botó: `scale 0.96` en `pointerdown`, tornada amb `power2.out`.
- Confirmació: una còpia de la miniatura vola cap a la icona de cistella del header — `Flip.fit()` o `MotionPath` curt, 0.6s `power2.inOut`, i la icona de cistella fa `scale 1 → 1.25 → 1` amb el comptador pujant. És l'única animació "juganera" de tot el sistema i està justificada perquè és feedback d'una acció.

## 4.3 "Veure més"
Igual que Lab (3.4).

## 4.4 Fitxa de producte (si s'implementa)
- Galeria: canvi d'imatge amb `clipPath` horitzontal segons direcció, 0.4s.
- Selector de talla: el requadre actiu es mou entre opcions amb `Flip` (un sol element que viatja), 0.3s `power3.inOut`.

---

# 5. Pressupost per vista

| Vista | ScrollTriggers | Pins | Plugins |
|---|---|---|---|
| Associació | ~14 (1 batch) | 1 (desktop) | ScrollTrigger, SplitText |
| Festivals | ~8 (1 batch) | 0 | + Flip |
| Lab | ~10 (1 batch) | 0 | + Flip |
| Shop | ~7 (1 batch) | 0 | + Flip |

Si una vista passa de ~20 triggers, gairebé sempre és que s'ha creat un trigger per element on tocava un `batch`.

# 6. Ordre d'implementació

1. Hook compartit `usePageEnter()` amb el bloc A (banda + títol + hero) — les quatre vistes en depenen.
2. `useSectionReveal()` per als reveals genèrics de text.
3. `useCardGrid()` amb `ScrollTrigger.batch` + hovers — cobreix Festivals, Lab i Shop de cop.
4. `Flip` als filtres (Lab primer, que té 3 chips i 12 tarjetes).
5. Peces singulars: xifres i pin d'Associació, calendari de Lab, add-to-cart de Shop.
