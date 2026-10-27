import { describe, it, expect } from "vitest";
import { isInjectedScriptEvent } from "./sentry";

const eventWithFrames = (...files) => ({
  exception: {
    values: [
      {
        type: "RangeError",
        stacktrace: { frames: files.map((abs_path) => ({ abs_path, lineno: 1 })) },
      },
    ],
  },
});

describe("isInjectedScriptEvent", () => {
  it("descarta un stack que solo apunta al documento (script inyectado por el navegador)", () => {
    const event = eventWithFrames(
      "https://example.org/some-page/",
      "https://example.org/some-page/",
      "https://example.org/some-page/"
    );
    expect(isInjectedScriptEvent(event)).toBe(true);
  });

  it("conserva los errores con algún frame de nuestro bundle", () => {
    const event = eventWithFrames(
      "https://example.org/some-page/",
      "https://example.org/assets/index-abc123.js"
    );
    expect(isInjectedScriptEvent(event)).toBe(false);
  });

  it("reconoce ficheros .js con query string y módulos .mjs", () => {
    expect(isInjectedScriptEvent(eventWithFrames("https://example.org/a.js?v=2"))).toBe(false);
    expect(isInjectedScriptEvent(eventWithFrames("https://example.org/a.mjs"))).toBe(false);
  });

  it("conserva eventos sin stack trace (mensajes, errores sin frames)", () => {
    expect(isInjectedScriptEvent({ message: "hola" })).toBe(false);
    expect(isInjectedScriptEvent({ exception: { values: [{ type: "Error" }] } })).toBe(false);
  });
});
