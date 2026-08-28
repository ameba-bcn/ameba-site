import MegaTitle from "./MegaTitle";

export default {
  title: "Components/MegaTitle",
  component: MegaTitle,
  decorators: [
    (Story) => (
      <div style={{ background: "var(--color-cream)", padding: "1rem", position: "relative", height: "160px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: { title: "Associació" },
};

export const LongTitle = {
  args: { title: "L'Associació de Música Electrònica de Barcelona" },
};
