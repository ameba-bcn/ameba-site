import CardLayout from "./CardLayout";

const CARD_LIST = [
  { id: 1, name: "Concert Ameba Fest", image: "https://ameba.cat/AmebaPortadaDesktop.jpg", tags: ["Música"], created: "2026-06-01" },
  { id: 2, name: "Taller de producció", image: "https://ameba.cat/AmebaPortadaMobile.jpg", tags: ["Taller"], created: "2026-05-15" },
  { id: 3, name: "Xerrada cultura electrònica", image: "https://ameba.cat/AmebaPortadaDesktop.jpg", tags: [], created: "2026-04-20" },
];

export default {
  title: "Components/CardLayout",
  component: CardLayout,
};

export const Default = {
  args: { cardList: CARD_LIST, urlRoot: "activitats" },
};

export const Loading = {
  args: { cardList: [], urlRoot: "activitats", loading: true },
};

export const Empty = {
  args: { cardList: [], urlRoot: "activitats" },
};
