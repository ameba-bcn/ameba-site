/**
 * Safe wrappers around localStorage / sessionStorage.
 * Handles SecurityError thrown when storage is blocked
 * (incognito mode, disabled cookies, sandboxed iframes, etc.).
 */

function safeGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    // silently fail — storage unavailable
  }
}

function safeRemove(storage, key) {
  try {
    storage.removeItem(key);
  } catch {
    // silently fail
  }
}

export const safeLocalStorage = {
  getItem: (key) => safeGet(localStorage, key),
  setItem: (key, value) => safeSet(localStorage, key, value),
  removeItem: (key) => safeRemove(localStorage, key),
};

export const safeSessionStorage = {
  getItem: (key) => safeGet(sessionStorage, key),
  setItem: (key, value) => safeSet(sessionStorage, key, value),
  removeItem: (key) => safeRemove(sessionStorage, key),
};
