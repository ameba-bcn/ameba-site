import { useState } from "react";
import Breadcrums from "./Breadcrums";

const STEPS = [
  { path: "profile", label: "PERFIL" },
  { path: "orders", label: "COMANDES" },
  { path: "membership", label: "SOCIS" },
];

export default {
  title: "Components/Breadcrums",
  component: Breadcrums,
};

function BreadcrumsDemo(args) {
  const [step, setStep] = useState(args.step ?? 0);
  return <Breadcrums {...args} step={step} changeStep={setStep} />;
}

export const Default = {
  render: (args) => <BreadcrumsDemo {...args} />,
  args: { steps: STEPS, step: 0 },
};
