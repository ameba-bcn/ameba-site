import Tooltip from "./Tooltip";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
};

export const Default = {
  args: {
    tooltipContent: "Informació addicional sobre aquest camp",
    children: <span>Passa el ratolí per aquí</span>,
  },
};
