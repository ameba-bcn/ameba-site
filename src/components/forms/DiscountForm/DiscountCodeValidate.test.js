import { describe, it, expect } from "vitest";
import { validate } from "./DiscountCodeValidate";

describe("DiscountCode validate", () => {
  it("returns no errors for valid 6-char code", () => {
    expect(validate({ code: "ABC123" })).toEqual({});
  });

  it("returns required error when code is empty", () => {
    const errors = validate({ code: "" });
    expect(errors.code).toBeDefined();
  });

  it("returns format error when code is 5 chars", () => {
    const errors = validate({ code: "ABC12" });
    expect(errors.code).toBeDefined();
  });

  it("returns format error when code is 7 chars", () => {
    const errors = validate({ code: "ABC1234" });
    expect(errors.code).toBeDefined();
  });

  it("returns required error when code is undefined", () => {
    const errors = validate({});
    expect(errors.code).toBeDefined();
  });
});
