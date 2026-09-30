import { useState } from "react";
import InputField from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
};

function ControlledInput(args) {
  const [value, setValue] = useState(args.value ?? "");
  return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export const Default = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    id: "email",
    name: "email",
    type: "email",
    label: "Correu electrònic",
    placeholder: "nom@exemple.com",
  },
};

export const WithTooltip = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    id: "dni",
    name: "dni",
    type: "text",
    label: "DNI",
    placeholder: "12345678A",
    tooltip: "Necessitem el teu DNI per emetre el carnet de soci",
  },
};

export const Invalid = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    id: "phone",
    name: "phone",
    type: "text",
    label: "Telèfon",
    value: "abc",
    valid: false,
  },
};
