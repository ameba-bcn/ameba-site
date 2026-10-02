import CardLayout from "./CardLayout";
import { storyCoverImage, storyCoverImageAlt } from "../../../test/mocks/storyImage";

const CARD_LIST = [
  { id: 1, name: "Concert Ameba Fest", image: storyCoverImage, tags: ["Música"], created: "2026-06-01" },
  { id: 2, name: "Taller de producció", image: storyCoverImageAlt, tags: ["Taller"], created: "2026-05-15" },
  { id: 3, name: "Xerrada cultura electrònica", image: storyCoverImage, tags: [], created: "2026-04-20" },
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
