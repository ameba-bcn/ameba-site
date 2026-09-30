import { useState } from "react";
import FilterBar from "./FilterBar";

const ITEMS = ["Tallers", "Xerrades", "Itineraris", "Club Lectura", "Radio", "Streams", "Jams"];

export default {
  title: "Components/FilterBar",
  component: FilterBar,
};

function FilterBarDemo(args) {
  const [activeItem, setActiveItem] = useState(args.activeItem ?? null);
  return <FilterBar {...args} activeItem={activeItem} onSelect={setActiveItem} />;
}

export const Outline = {
  render: (args) => <FilterBarDemo {...args} />,
  args: { items: ITEMS.slice(0, 3), allLabel: "Tot" },
};

export const Solid = {
  decorators: [(Story) => <div style={{ background: "var(--section-lab)", padding: "1rem" }}><Story /></div>],
  render: (args) => <FilterBarDemo {...args} />,
  args: { items: ITEMS, allLabel: null, variant: "solid", resetLabel: "Borrar filtres" },
};
