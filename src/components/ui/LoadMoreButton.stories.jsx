import LoadMoreButton from "./LoadMoreButton";

export default {
  title: "Components/LoadMoreButton",
  component: LoadMoreButton,
  decorators: [(Story) => <div style={{ background: "var(--color-cream)", padding: "1rem" }}><Story /></div>],
};

export const Default = {
  args: {},
};
