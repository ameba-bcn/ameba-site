import { captureException, addSentryBreadcrumb } from "../sentry";

/**
 * Environment-aware logging utility
 * Replaces console.log, console.warn, console.error throughout the app
 */

/**
 * Log informational messages (development only)
 * @param {...any} args - Arguments to log
 */
export const log = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
};

/**
 * Log warning messages (development only)
 * @param {...any} args - Arguments to log
 */
export const warn = (...args) => {
  if (process.env.NODE_ENV === "development") {
    console.warn(...args);
  }
  // Add breadcrumb for Sentry in production
  if (process.env.NODE_ENV === "production") {
    addSentryBreadcrumb("Warning", { message: args.join(" ") }, "warning");
  }
};

/**
 * Log error messages (always logs, sends to Sentry in production)
 * @param {...any} args - Arguments to log
 */
export const error = (...args) => {
  console.error(...args);

  // Send to Sentry in production
  if (process.env.NODE_ENV === "production") {
    const errorObj = args.find((arg) => arg instanceof Error);
    if (errorObj) {
      captureException(errorObj, {
        additionalData: args.filter((arg) => !(arg instanceof Error)),
      });
    } else {
      addSentryBreadcrumb("Error", { message: args.join(" ") }, "error");
    }
  }
};

/**
 * Log API errors with context
 * @param {string} endpoint - API endpoint that failed
 * @param {Error} err - Error object
 * @param {Object} context - Additional context
 */
export const apiError = (endpoint, err, context = {}) => {
  const errorMessage = `API Error: ${endpoint}`;

  if (process.env.NODE_ENV === "development") {
    console.error(errorMessage, err, context);
  }

  if (process.env.NODE_ENV === "production") {
    captureException(err, {
      endpoint,
      ...context,
      errorType: "API Error",
    });
  }
};

/**
 * Log authentication errors
 * @param {string} action - Auth action (login, logout, token refresh, etc.)
 * @param {Error} err - Error object
 */
export const authError = (action, err) => {
  const errorMessage = `Auth Error: ${action}`;

  if (process.env.NODE_ENV === "development") {
    console.error(errorMessage, err);
  }

  if (process.env.NODE_ENV === "production") {
    captureException(err, {
      action,
      errorType: "Authentication Error",
    });
  }
};

/**
 * Log Redux action errors
 * @param {string} actionType - Redux action type
 * @param {Error} err - Error object
 * @param {Object} payload - Action payload
 */
export const reduxError = (actionType, err, payload = {}) => {
  const errorMessage = `Redux Error: ${actionType}`;

  if (process.env.NODE_ENV === "development") {
    console.error(errorMessage, err, payload);
  }

  if (process.env.NODE_ENV === "production") {
    captureException(err, {
      actionType,
      payload,
      errorType: "Redux Action Error",
    });
  }
};

export default {
  log,
  warn,
  error,
  apiError,
  authError,
  reduxError,
};
