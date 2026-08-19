import { lazy } from "react";
import { safeSessionStorage } from "./safeStorage";

/**
 * Wraps React.lazy with retry logic to handle stale chunk errors after deployments.
 * When a chunk fails to load (e.g., 'text/html' is not a valid JavaScript MIME type),
 * it forces a full page reload once to fetch the latest assets.
 */
export default function lazyWithRetry(importFn) {
  return lazy(async () => {
    let module;
    try {
      module = await importFn();
    } catch {
      const hasReloaded = safeSessionStorage.getItem("chunk_reload");
      if (!hasReloaded) {
        safeSessionStorage.setItem("chunk_reload", "1");
        window.location.reload();
        return new Promise(() => {}); // never resolves — page is reloading
      }
      safeSessionStorage.removeItem("chunk_reload");
      module = await importFn(); // retry once after reload; let it throw if still fails
    }
    // Evita el críptico "Cannot read properties of undefined (reading 'default')"
    // de React.lazy si el import resuelve sin módulo válido.
    if (!module || !module.default) {
      throw new Error("Lazy chunk resolved without a default export");
    }
    return module;
  });
}
