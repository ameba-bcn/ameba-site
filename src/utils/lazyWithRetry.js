import { lazy } from "react";

/**
 * Wraps React.lazy with retry logic to handle stale chunk errors after deployments.
 * When a chunk fails to load (e.g., 'text/html' is not a valid JavaScript MIME type),
 * it forces a full page reload once to fetch the latest assets.
 */
export default function lazyWithRetry(importFn) {
  return lazy(() =>
    importFn().catch(() => {
      const hasReloaded = sessionStorage.getItem("chunk_reload");
      if (!hasReloaded) {
        sessionStorage.setItem("chunk_reload", "1");
        window.location.reload();
        return new Promise(() => {}); // never resolves — page is reloading
      }
      sessionStorage.removeItem("chunk_reload");
      return importFn(); // retry once after reload; let it throw if still fails
    })
  );
}
