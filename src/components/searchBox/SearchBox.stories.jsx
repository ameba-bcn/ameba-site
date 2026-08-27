import { useState } from "react";
import SearchBox from "./SearchBox";

export default {
  title: "Components/SearchBox",
  component: SearchBox,
};

function SearchBoxDemo(args) {
  const [searchInput, setSearchInput] = useState(args.searchInput ?? "");
  return <SearchBox {...args} searchInput={searchInput} setSearchInput={setSearchInput} />;
}

export const Expanded = {
  render: (args) => <SearchBoxDemo {...args} />,
  args: { searchText: "Cerca activitats..." },
};

export const IconOnly = {
  render: (args) => <SearchBoxDemo {...args} />,
  args: { hidden: true },
};
