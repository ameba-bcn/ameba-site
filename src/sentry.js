import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error tracking and monitoring
 * Only runs in production environment
 */
export const initSentry = () => {
  // Only initialize in production
  if (process.env.NODE_ENV !== "production") {
    console.log("Sentry: Skipping initialization in development mode");
    return;
  }

  // Check if DSN is configured
  if (!process.env.REACT_APP_SENTRY_DSN) {
    console.warn(
      "Sentry: REACT_APP_SENTRY_DSN not configured. Error tracking disabled."
    );
    return;
  }

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,

    // Environment (production, staging, etc.)
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || "production",

    // Release version from package.json
    release: `ameba-site@${process.env.REACT_APP_VERSION || "unknown"}`,

    // Performance Monitoring
    integrations: [
      // React Router integration for route tracking
      Sentry.browserTracingIntegration(),

      // Replay sessions for debugging
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Performance monitoring sample rate (10% of transactions)
    tracesSampleRate: 0.1,

    // Session replay sample rate
    // Capture 10% of all sessions, 100% of sessions with errors
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Filter out errors we don't care about
    beforeSend(event, hint) {
      // Don't send errors from development
      if (window.location.hostname === "localhost") {
        return null;
      }

      // Filter out browser extension errors
      if (
        event.exception?.values?.[0]?.stacktrace?.frames?.some((frame) =>
          frame.filename?.includes("extension://")
        )
      ) {
        return null;
      }

      // Filter out network errors that are user-related (offline, etc)
      if (event.exception?.values?.[0]?.type === "NetworkError") {
        return null;
      }

      return event;
    },

    // Ignore specific errors
    ignoreErrors: [
      // Random plugins/extensions
      "top.GLOBALS",
      "Can't find variable: ZiteReader",
      "jigsaw is not defined",
      "ComboSearch is not defined",

      // Facebook flakiness
      "fb_xd_fragment",

      // ISP optimizing proxy - `Cache-Control: no-transform` seems to reduce this
      "bmi_SafeAddOnload",
      "EBCallBackMessageReceived",

      // See http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
      "Script error.",

      // Network errors
      "NetworkError",
      "Network request failed",
      "Failed to fetch",
      "Load failed",

      // Browser specific
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
    ],

    // Add context to all events
    initialScope: {
      tags: {
        app: "ameba-site",
      },
    },
  });

  console.log("Sentry: Initialized successfully");
};

/**
 * Set user context for Sentry
 * Call this after user logs in
 *
 * @param {Object} user - User object
 * @param {string} user.id - User ID
 * @param {string} user.email - User email
 * @param {string} user.username - Username
 */
export const setSentryUser = (user) => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  if (user && user.id) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } else {
    // Clear user on logout
    Sentry.setUser(null);
  }
};

/**
 * Add breadcrumb for debugging
 *
 * @param {string} message - Breadcrumb message
 * @param {Object} data - Additional data
 * @param {string} level - Severity level (info, warning, error)
 */
export const addSentryBreadcrumb = (message, data = {}, level = "info") => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  Sentry.addBreadcrumb({
    message,
    data,
    level,
    timestamp: Date.now() / 1000,
  });
};

/**
 * Capture exception manually
 *
 * @param {Error} error - Error to capture
 * @param {Object} context - Additional context
 */
export const captureException = (error, context = {}) => {
  if (process.env.NODE_ENV !== "production") {
    console.error("Sentry (dev mode):", error, context);
    return;
  }

  Sentry.captureException(error, {
    extra: context,
  });
};

/**
 * Capture message manually
 *
 * @param {string} message - Message to capture
 * @param {string} level - Severity level
 */
export const captureMessage = (message, level = "info") => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Sentry (dev mode):", message);
    return;
  }

  Sentry.captureMessage(message, level);
};

export default Sentry;
