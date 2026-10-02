import { render } from "@testing-library/react";
import AmebaLogo from "./AmebaLogo";

describe("AmebaLogo", () => {
  it("es renderitza sense passar-li fill", () => {
    const { container } = render(<AmebaLogo />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("aplica el fill rebut", () => {
    const { container } = render(<AmebaLogo fill="var(--color-rojo)" />);
    expect(container.querySelector("path")).toHaveAttribute(
      "fill",
      "var(--color-rojo)"
    );
  });
});
