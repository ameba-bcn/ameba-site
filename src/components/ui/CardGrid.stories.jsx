import CardGrid from "./CardGrid";

export default {
  title: "Components/CardGrid",
  component: CardGrid,
};

export const Default = {
  args: {
    children: Array.from({ length: 4 }).map((_, i) => (
      <div key={i} style={{ background: "var(--color-negro)", color: "var(--color-cream)", padding: "1rem", textAlign: "center" }}>
        Card {i + 1}
      </div>
    )),
  },
};
