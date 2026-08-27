import PromoBanner from "./PromoBanner";

export default {
  title: "Components/PromoBanner",
  component: PromoBanner,
};

// PromoBanner only renders on "/" and reads sessionStorage — both are
// satisfied by the app-wide MemoryRouter(["/"]) decorator in .storybook/preview.jsx.
export const Default = {
  args: {},
};
