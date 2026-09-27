import { describe, it, expect } from "vitest";
import { validate } from "./DeliveryMethodValidate";

const validValues = {
  shipping_name: "Jane Doe",
  shipping_address: "Carrer Fictici, 1",
  shipping_postal_code: "08001",
  shipping_city: "Barcelona",
};

describe("DeliveryMethod validate", () => {
  it("returns no errors for a complete, valid mainland-Spain address", () => {
    expect(validate(validValues)).toEqual({});
  });

  it("returns required errors for every empty field", () => {
    const errors = validate({});
    expect(errors.shipping_name).toBeDefined();
    expect(errors.shipping_address).toBeDefined();
    expect(errors.shipping_city).toBeDefined();
    expect(errors.shipping_postal_code).toBeDefined();
  });

  it("returns a format error for a Balearic Islands postal code (07xxx)", () => {
    const errors = validate({ ...validValues, shipping_postal_code: "07001" });
    expect(errors.shipping_postal_code).toBeDefined();
  });

  it("returns a format error for a Canary Islands postal code (35xxx/38xxx)", () => {
    expect(
      validate({ ...validValues, shipping_postal_code: "35001" })
        .shipping_postal_code,
    ).toBeDefined();
    expect(
      validate({ ...validValues, shipping_postal_code: "38001" })
        .shipping_postal_code,
    ).toBeDefined();
  });

  it("returns a format error for Ceuta/Melilla postal codes (51xxx/52xxx)", () => {
    expect(
      validate({ ...validValues, shipping_postal_code: "51001" })
        .shipping_postal_code,
    ).toBeDefined();
    expect(
      validate({ ...validValues, shipping_postal_code: "52001" })
        .shipping_postal_code,
    ).toBeDefined();
  });

  it("accepts mainland postal codes across the covered range", () => {
    for (const code of ["01001", "08001", "28001", "33001", "50001"]) {
      expect(validate({ ...validValues, shipping_postal_code: code })).toEqual({});
    }
  });
});
