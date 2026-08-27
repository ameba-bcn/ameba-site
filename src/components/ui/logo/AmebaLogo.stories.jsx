import AmebaLogo from "./AmebaLogo";

export default {
  title: "Components/AmebaLogo",
  component: AmebaLogo,
};

export const Default = {
  args: { width: 120, height: 120, fill: "black" },
};

export const Colored = {
  args: { width: 120, height: 120, fill: "var(--color-rojo)" },
};
