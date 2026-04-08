import { describe, it, expect } from "vitest";
import { validate } from "./MembershipValidate";

describe("MembershipForm validate", () => {
  it("returns no errors for complete valid data", () => {
    const values = {
      username: "testuser",
      first_name: "Joan",
      last_name: "Garcia",
      identity_card: "12345678A",
      phone_number: "612345678",
    };
    expect(validate(values)).toEqual({});
  });

  it("returns username error when empty", () => {
    const values = { username: "", first_name: "Joan", last_name: "Garcia", identity_card: "12345678A", phone_number: "612345678" };
    const errors = validate(values);
    expect(errors.username).toBeDefined();
  });

  it("returns first_name error when empty", () => {
    const values = { username: "test", first_name: "", last_name: "Garcia", identity_card: "12345678A", phone_number: "612345678" };
    const errors = validate(values);
    expect(errors.first_name).toBeDefined();
  });

  it("returns last_name error when empty", () => {
    const values = { username: "test", first_name: "Joan", last_name: "", identity_card: "12345678A", phone_number: "612345678" };
    const errors = validate(values);
    expect(errors.last_name).toBeDefined();
  });

  it("returns identity_card error when empty", () => {
    const values = { username: "test", first_name: "Joan", last_name: "Garcia", identity_card: "", phone_number: "612345678" };
    const errors = validate(values);
    expect(errors.identity_card).toBeDefined();
  });

  it("returns phone_number error when empty", () => {
    const values = { username: "test", first_name: "Joan", last_name: "Garcia", identity_card: "12345678A", phone_number: "" };
    const errors = validate(values);
    expect(errors.phone_number).toBeDefined();
  });

  it("returns phone_number error for invalid format", () => {
    const values = { username: "test", first_name: "Joan", last_name: "Garcia", identity_card: "12345678A", phone_number: "123" };
    const errors = validate(values);
    expect(errors.phone_number).toBeDefined();
  });

  it("returns multiple errors when multiple fields empty", () => {
    const values = { username: "", first_name: "", last_name: "", identity_card: "", phone_number: "" };
    const errors = validate(values);
    expect(Object.keys(errors).length).toBe(5);
  });
});
