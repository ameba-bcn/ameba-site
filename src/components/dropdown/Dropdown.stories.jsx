import { useState } from "react";
import Dropdown from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

function DropdownDemo(args) {
  const [open, setIsOpen] = useState(args.open ?? true);
  return (
    <div style={{ position: "relative", height: "160px" }}>
      <button onClick={() => setIsOpen((o) => !o)}>Toggle</button>
      <Dropdown {...args} open={open} setIsOpen={setIsOpen}>
        <div style={{ padding: "8px 16px" }}>Opció 1</div>
        <div style={{ padding: "8px 16px" }}>Opció 2</div>
        <div style={{ padding: "8px 16px" }}>Opció 3</div>
      </Dropdown>
    </div>
  );
}

export const Open = {
  render: (args) => <DropdownDemo {...args} />,
  args: { open: true },
};

export const Closed = {
  render: (args) => <DropdownDemo {...args} />,
  args: { open: false },
};
