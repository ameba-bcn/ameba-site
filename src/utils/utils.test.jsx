import { describe, it, expect, vi } from "vitest";
import {
  formatPrice,
  isMemberCheckout,
  mergeCartIds,
  deepComparision,
  isEmptyObject,
  priceMayDiscount,
  getIDValuesFromArrayObj,
  deleteStringDecimals,
  truncate,
  sortByDate,
  sortByProperty,
  isDateExpired,
} from "./utils";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  },
}));

describe("isMemberCheckout", () => {
  it("returns true when cart contains a subscription item", () => {
    expect(isMemberCheckout([{ is_subscription: true }])).toBe(true);
  });

  it("returns false when no subscription items", () => {
    expect(isMemberCheckout([{ is_subscription: false }])).toBe(false);
  });

  it("returns false for empty array", () => {
    expect(isMemberCheckout([])).toBe(false);
  });

  it("returns true when mixed items include one subscription", () => {
    const items = [{ is_subscription: false }, { is_subscription: true }];
    expect(isMemberCheckout(items)).toBe(true);
  });
});

describe("mergeCartIds", () => {
  it("merges two arrays with no duplicates", () => {
    expect(mergeCartIds([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("deduplicates overlapping IDs", () => {
    expect(mergeCartIds([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("handles empty first array", () => {
    expect(mergeCartIds([], [1, 2])).toEqual([1, 2]);
  });

  it("handles empty second array", () => {
    expect(mergeCartIds([1, 2], [])).toEqual([1, 2]);
  });

  it("handles both empty arrays", () => {
    expect(mergeCartIds([], [])).toEqual([]);
  });
});

describe("formatPrice", () => {
  it("returns price with euro sign for integer", () => {
    expect(formatPrice(25)).toBe("25€");
  });

  it("returns price with two decimals for non-integer", () => {
    expect(formatPrice(25.5)).toBe("25.50€");
  });

  it("returns original string if already has euro sign", () => {
    expect(formatPrice("25.50 €")).toBe("25.50 €");
  });

  it("strips .00€ suffix", () => {
    expect(formatPrice("25.00€")).toBe("25€");
  });

  it("handles empty string", () => {
    expect(formatPrice("")).toBe("");
  });

  it("handles string number", () => {
    expect(formatPrice("30")).toBe("30€");
  });

  it("handles decimal string", () => {
    expect(formatPrice("12.99")).toBe("12.99€");
  });
});

describe("deepComparision", () => {
  it("returns true for identical objects", () => {
    expect(deepComparision({ a: 1 }, { a: 1 })).toBe(true);
  });

  it("returns false for different objects", () => {
    expect(deepComparision({ a: 1 }, { a: 2 })).toBe(false);
  });

  it("returns false when obj1 is null", () => {
    expect(deepComparision(null, { a: 1 })).toBe(false);
  });

  it("returns false when obj2 is undefined", () => {
    expect(deepComparision({ a: 1 }, undefined)).toBe(false);
  });
});

describe("isEmptyObject", () => {
  it("returns true for empty object", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it("returns false for object with keys", () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
  });
});

describe("priceMayDiscount", () => {
  it("returns price as-is when no discount", () => {
    expect(priceMayDiscount("25.00 €", null, null, "descompte")).toBe("25.00 €");
  });

  it("returns price as-is when discount is 0", () => {
    expect(priceMayDiscount("25.00 €", 0, null, "descompte")).toBe("25.00 €");
  });

  it("returns JSX when discount present", () => {
    const result = priceMayDiscount("25.00 €", 20, "AMEBA20", "descompte", "20.00 €");
    expect(typeof result).toBe("object"); // JSX fragment
  });
});

describe("getIDValuesFromArrayObj", () => {
  it("extracts IDs from array of objects", () => {
    expect(getIDValuesFromArrayObj([{ id: 1 }, { id: 2 }])).toEqual([1, 2]);
  });

  it("returns empty array for no input", () => {
    expect(getIDValuesFromArrayObj()).toEqual([]);
  });
});

describe("deleteStringDecimals", () => {
  it("removes decimals and adds euro sign", () => {
    expect(deleteStringDecimals("25.00")).toBe("25€");
  });

  it("returns empty string for falsy input", () => {
    expect(deleteStringDecimals("")).toBe("");
    expect(deleteStringDecimals(null)).toBe("");
  });
});

describe("truncate", () => {
  it("returns string as-is if shorter than length", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates and adds ellipsis if longer", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
  });
});

describe("sortByDate", () => {
  it("sorts array by datetime descending", () => {
    const arr = [
      { datetime: "2024-01-01" },
      { datetime: "2024-06-01" },
      { datetime: "2024-03-01" },
    ];
    const result = sortByDate(arr);
    expect(result[0].datetime).toBe("2024-06-01");
    expect(result[2].datetime).toBe("2024-01-01");
  });
});

describe("sortByProperty", () => {
  it("sorts ascending by default", () => {
    const arr = [{ name: "C" }, { name: "A" }, { name: "B" }];
    const result = sortByProperty(arr, "name");
    expect(result[0].name).toBe("A");
  });

  it("sorts descending when asc is false", () => {
    const arr = [{ name: "C" }, { name: "A" }, { name: "B" }];
    const result = sortByProperty(arr, "name", false);
    expect(result[0].name).toBe("C");
  });
});

describe("isDateExpired", () => {
  it("returns false for null input", () => {
    expect(isDateExpired(null)).toBe(false);
  });

  it("returns true for past date", () => {
    expect(isDateExpired("01/01/2020")).toBe(true);
  });

  it("returns false for future date", () => {
    expect(isDateExpired("01/01/2099")).toBe(false);
  });
});

describe("notificationToast", () => {
  it("calls toast.success for success type", async () => {
    const { toast } = await import("react-toastify");
    const { default: notificationToast } = await import("./utils");
    notificationToast("Test", "success");
    expect(toast.success).toHaveBeenCalled();
  });

  it("calls toast.error for error type", async () => {
    const { toast } = await import("react-toastify");
    const { default: notificationToast } = await import("./utils");
    notificationToast("Error", "error");
    expect(toast.error).toHaveBeenCalled();
  });

  it("calls toast.warning for warning type", async () => {
    const { toast } = await import("react-toastify");
    const { default: notificationToast } = await import("./utils");
    notificationToast("Warn", "warning");
    expect(toast.warning).toHaveBeenCalled();
  });

  it("calls toast.info for info type", async () => {
    const { toast } = await import("react-toastify");
    const { default: notificationToast } = await import("./utils");
    notificationToast("Info", "info");
    expect(toast.info).toHaveBeenCalled();
  });
});
