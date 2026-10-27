import * as Sentry from "@sentry/react";

// Chrome en iOS (WKWebView) inyecta sus propios scripts en la página — p. ej.
// el traductor, que envuelve el texto en <font> — y sus frames llegan con la
// URL del documento como fichero (`/activate/:229`), no con un .js. Nuestro
// código siempre corre desde ficheros .js del bundle (el script inline de
// index.html solo envuelve sessionStorage en try/catch), así que un stack sin
// ningún frame de un .js no es nuestro.
const SCRIPT_FILE_RE = /\.m?js(\?|#|$)/i;

export function isInjectedScriptEvent(event) {
  const values = event?.exception?.values;
  if (!Array.isArray(values) || values.length === 0) return false;
  const frames = values.flatMap((val) => val?.stacktrace?.frames || []);
  if (frames.length === 0) return false;
  return !frames.some((frame) => SCRIPT_FILE_RE.test(frame?.abs_path || frame?.filename || ""));
}

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
    // Ruido conocido de scripts ajenos a la app:
    // - Escáner de enlaces de Outlook/Office 365: inyecta código que rechaza
    //   promesas con este texto.
    // - Navegador in-app de Facebook/Instagram en Android: su script inyectado
    //   (iabjs://navigation_performance_logger_android) llama a postMessage
    //   contra el bridge nativo cuando la WebView ya lo ha destruido.
    ignoreErrors: [
      "Object Not Found Matching Id:",
      "Non-Error promise rejection captured with value: Object Not Found",
      "Error invoking postMessage",
      "Java object is gone",
    ],
    // Descarta cualquier evento cuyo stack venga de scripts inyectados por
    // navegadores in-app o extensiones, no de nuestro bundle.
    denyUrls: [/^iabjs:\/\//i, /^chrome-extension:\/\//i, /^moz-extension:\/\//i],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    // Elimina cabeceras/tokens de autenticación antes de enviar el evento.
    beforeSend(event) {
      if (isInjectedScriptEvent(event)) return null;
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
