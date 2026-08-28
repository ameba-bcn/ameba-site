import PowerTitle from "./PowerTitle";

export default {
  title: "Components/PowerTitle",
  component: PowerTitle,
};

export const Solid = {
  args: { title: "Activitats" },
};

export const Outline = {
  // Outline titles are always used on a colored section background (see
  // PageLayout section="…") — the stroke color matches the app's default
  // dark canvas, so this decorator gives it a light backdrop to be visible.
  decorators: [(Story) => <div style={{ background: "var(--color-cream)" }}><Story /></div>],
  args: { title: "Shop", variant: "outline" },
};

export const WithSubtitle = {
  args: { title: "Festivals", subtitle: "Històric" },
};
