import PlusButton from "./PlusButton";

export default {
  title: "Components/PlusButton",
  component: PlusButton,
  argTypes: {
    plusStyle: { control: "select", options: ["plus--ligth", "plus--obscure", "plus--red"] },
    plusSize: { control: "select", options: ["plus--small", "plus--medium", "plus--big"] },
  },
};

export const Light = {
  args: { plusStyle: "plus--ligth", plusSize: "plus--medium" },
};

export const Obscure = {
  args: { plusStyle: "plus--obscure", plusSize: "plus--medium" },
};

export const Red = {
  args: { plusStyle: "plus--red", plusSize: "plus--big" },
};
