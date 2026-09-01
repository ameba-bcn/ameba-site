import AmebaCard from "./AmebaCard";
import CardGrid from "./CardGrid";

export default {
  title: "Components/AmebaCard",
  component: AmebaCard,
};

export const Default = {
  args: {
    to: "/botiga/1",
    image: "https://ameba.cat/AmebaPortadaDesktop.jpg",
    imageAlt: "Samarreta Ameba",
    badge: "20€",
    title: "Samarreta Ameba Fstvl 2026",
  },
};

export const FullRow = {
  args: {
    to: "/lab/1",
    image: "https://ameba.cat/AmebaPortadaDesktop.jpg",
    imageAlt: "Ameba Fest",
    badge: "29.4.2026 - 19H",
    title: "Ameba Fest 2026",
    subtitle: "Nou Barris",
    highlight: "GRATIS",
    meta: "Parc de Josep Serra Martí",
  },
};

export const Grid = {
  render: () => (
    <CardGrid>
      {Array.from({ length: 4 }).map((_, i) => (
        <AmebaCard
          key={i}
          to={`/botiga/${i}`}
          image="https://ameba.cat/AmebaPortadaDesktop.jpg"
          imageAlt="Samarreta Ameba"
          badge="20€"
          title="Samarreta Ameba Fstvl 2026"
        />
      ))}
    </CardGrid>
  ),
};
