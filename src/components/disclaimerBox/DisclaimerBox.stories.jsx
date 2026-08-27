import DisclaimerBox from "./DisclaimerBox";

export default {
  title: "Components/DisclaimerBox",
  component: DisclaimerBox,
};

export const Default = {
  args: {
    text: "Aquest esdeveniment té l'aforament limitat.",
    id: "disclaimer-default",
  },
};

export const Closable = {
  args: {
    text: "Pots tancar aquest avís.",
    id: "disclaimer-closable",
    closable: true,
  },
};
