import * as Sentry from "@sentry/react";

const dsn = import.meta.env.VITE_SENTRY_DSN;
const environment = import.meta.env.VITE_SENTRY_ENVIRONMENT || "production";

if (dsn && environment === "production") {
  Sentry.init({
    dsn,
    environment,
    release: import.meta.env.VITE_VERSION,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // Evita capturar datos personales (perfil, carnet) y tokens en pantalla.
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Ruido conocido de scripts ajenos a la app (escáner de enlaces de
    // Outlook/Office 365 inyecta código que rechaza promesas con este texto).
    ignoreErrors: [
      "Object Not Found Matching Id:",
      "Non-Error promise rejection captured with value: Object Not Found",
    ],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    // Elimina cabeceras/tokens de autenticación antes de enviar el evento.
    beforeSend(event) {
      const scrub = (headers) => {
        if (!headers) return;
        for (const key of Object.keys(headers)) {
          if (key.toLowerCase() === "authorization") headers[key] = "[Filtered]";
        }
      };
      scrub(event.request?.headers);
      if (Array.isArray(event.exception?.values)) {
        for (const val of event.exception.values) {
          const req = val?.mechanism?.data?.config?.headers;
          scrub(req);
        }
      }
      return event;
    },
  });
}
