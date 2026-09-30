# AMEBA FRONTEND

Frontend de l'Associació de Música Electrònica de Barcelona. React 19 + Vite, Zustand, i18next (ca/es), Stripe.

## Requirements

- Node.js 22+
- yarn 1.22 (o npm)

## Environment variables

Copia `.env.example` a `.env.local` y rellena los valores (`VITE_API_HOST`, `VITE_SENTRY_DSN`, etc.).

## Available Scripts

### `npm start` / `npm run dev`

Arranca el dev server de Vite en [http://localhost:3000](http://localhost:3000), con proxy de `/api` hacia el backend en el puerto 8000.

### `npm test`

Lanza Vitest en modo watch. También:

- `npm run test:run` — una sola pasada
- `npm run test:coverage` — con cobertura

### `npm run build`

Build de producción en la carpeta `build/`.

### `npm run preview`

Sirve el build de producción en local para verificarlo.

## Run local (stack completo)

Levanta los contenedores del repo devops: el backend queda en el puerto 8000 y este frontend en el 3000.

## Docker

Build y run de la imagen (sirve los ficheros estáticos del build):

```
docker build . -t ameba-site
docker run ameba-site
```

El CI (GitHub Actions) construye y publica la imagen en GHCR (`ghcr.io/ameba-bcn/ameba-frontend`) en cada push a `master` o `dev`.
