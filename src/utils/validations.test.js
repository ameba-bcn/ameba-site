import { describe, it, expect } from "vitest";
import {
  emailValidation,
  passwordValidation,
  usernameValidation,
  phoneValidation,
  codeValidation,
  isValidUrl,
  iframesValidation,
  urlValidation,
} from "./validations";

describe("emailValidation", () => {
  it("returns false (valid) for proper email", () => {
    expect(emailValidation("test@ameba.cat")).toBe(false);
  });

  it("returns true (invalid) for missing @", () => {
    expect(emailValidation("testameba.cat")).toBe(true);
  });

  it("returns true (invalid) for missing domain", () => {
    expect(emailValidation("test@")).toBe(true);
  });

  it("returns false for empty value", () => {
    expect(emailValidation("")).toBe(false);
  });

  it("returns false for null", () => {
    expect(emailValidation(null)).toBe(false);
  });
});

describe("passwordValidation", () => {
  it("returns false (valid) for 7-19 chars", () => {
    expect(passwordValidation("abcdefg")).toBe(false);
  });

  it("returns true (invalid) for 6 chars", () => {
    expect(passwordValidation("abcdef")).toBe(true);
  });

  it("returns true (invalid) for 20+ chars", () => {
    expect(passwordValidation("a".repeat(20))).toBe(true);
  });

  it("returns false for empty value", () => {
    expect(passwordValidation("")).toBe(false);
  });
});

describe("usernameValidation", () => {
  it("returns false (valid) for 2-19 chars", () => {
    expect(usernameValidation("testuser")).toBe(false);
  });

  it("returns true (invalid) for single char", () => {
    expect(usernameValidation("a")).toBe(true);
  });

  it("returns true (invalid) for 20+ chars", () => {
    expect(usernameValidation("a".repeat(20))).toBe(true);
  });

  it("returns false for empty", () => {
    expect(usernameValidation("")).toBe(false);
  });
});

describe("phoneValidation", () => {
  it("returns false (valid) for mobile starting with 6", () => {
    expect(phoneValidation("612345678")).toBe(false);
  });

  it("returns false (valid) for mobile starting with 7", () => {
    expect(phoneValidation("712345678")).toBe(false);
  });

  it("returns false (valid) for +34 prefix", () => {
    expect(phoneValidation("+34612345678")).toBe(false);
  });

  it("returns true (invalid) for too short", () => {
    expect(phoneValidation("6123")).toBe(true);
  });

  it("returns true (invalid) for non-phone string", () => {
    expect(phoneValidation("notaphone")).toBe(true);
  });

  it("returns false for empty value", () => {
    expect(phoneValidation("")).toBe(false);
  });
});

describe("codeValidation", () => {
  it("returns true for exactly 6 characters", () => {
    expect(codeValidation("ABC123")).toBe(true);
  });

  it("returns false for 5 characters", () => {
    expect(codeValidation("ABC12")).toBe(false);
  });

  it("returns false for 7 characters", () => {
    expect(codeValidation("ABC1234")).toBe(false);
  });

  it("returns false for empty value", () => {
    expect(codeValidation("")).toBe(false);
  });
});

describe("isValidUrl", () => {
  it("returns true for https URL", () => {
    expect(isValidUrl("https://ameba.cat")).toBe(true);
  });

  it("returns true for http URL", () => {
    expect(isValidUrl("http://ameba.cat")).toBe(true);
  });

  it("returns false for random string", () => {
    expect(isValidUrl("not a url")).toBe(false);
  });
});

describe("iframesValidation", () => {
  it("returns true for valid iframe", () => {
    expect(
      iframesValidation('<iframe src="https://example.com"></iframe>'),
    ).toBe(true);
  });

  it("returns false for non-iframe", () => {
    expect(iframesValidation("just text")).toBe(false);
  });

  it("returns false for empty", () => {
    expect(iframesValidation("")).toBe(false);
  });
});

describe("urlValidation", () => {
  it("returns true for valid URL", () => {
    expect(urlValidation("https://ameba.cat/events")).toBe(true);
  });

  it("returns false for empty string", () => {
    expect(urlValidation("")).toBe(false);
  });
});
