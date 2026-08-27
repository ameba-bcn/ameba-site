import OutlineHeading from "./OutlineHeading";

export default {
  title: "Components/OutlineHeading",
  component: OutlineHeading,
  decorators: [(Story) => <div style={{ background: "var(--color-cream)", padding: "1rem" }}><Story /></div>],
};

export const Default = {
  args: { children: "QUI SOM?" },
};

export const AsH3 = {
  args: { as: "h3", children: "GESTIÓ" },
};
