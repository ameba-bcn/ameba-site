import Icon from "./Icon";

const ICON_NAMES = [
  "receipt", "link", "clear", "place", "calendar", "money", "people", "plus",
  "minus", "shoppingCart", "trash", "user", "language", "replay", "arrowDown",
  "arrowUp", "arrowRight", "arrowLeft", "search", "facebook", "youtube",
  "instagram", "soundcloud", "ticket", "menu", "assist", "free", "cancelled",
  "pdf-file", "tooltip",
];

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    icon: { control: "select", options: ICON_NAMES },
  },
};

export const Single = {
  args: { icon: "shoppingCart", width: "32", height: "32" },
};

export const AllIcons = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}
        >
          <Icon icon={name} width="28" height="28" />
          <span style={{ fontSize: "11px" }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
