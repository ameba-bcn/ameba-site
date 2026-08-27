import EmbeddedSpinner from "./EmbeddedSpinner";

export default {
  title: "Components/Spinners/EmbeddedSpinner",
  component: EmbeddedSpinner,
  decorators: [
    (Story) => (
      <div style={{ background: "#222", padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Inline = {
  args: {},
};

export const Alone = {
  args: { alone: true },
};
