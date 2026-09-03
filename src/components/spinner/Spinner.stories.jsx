import Spinner from "./Spinner";

export default {
  title: "Components/Spinners/Spinner",
  component: Spinner,
};

export const Default = {
  args: { size: 100 },
};

export const Small = {
  args: { size: 24 },
};

export const Alone = {
  args: { size: 64, alone: true },
};
