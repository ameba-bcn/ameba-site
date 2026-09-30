import { useState } from "react";
import ToogleButton from "./ToogleButton";

export default {
  title: "Components/ToogleButton",
  component: ToogleButton,
};

function ControlledToggle(args) {
  const [firstActive, setFirstActive] = useState(args.firstActive ?? true);
  return (
    <ToogleButton {...args} firstActive={firstActive} setFirstActive={setFirstActive} />
  );
}

export const Default = {
  render: (args) => <ControlledToggle {...args} />,
  args: {
    text1: "Mensual",
    text2: "Anual",
    firstActive: true,
  },
};

export const SecondActive = {
  render: (args) => <ControlledToggle {...args} />,
  args: {
    text1: "Mensual",
    text2: "Anual",
    firstActive: false,
  },
};
