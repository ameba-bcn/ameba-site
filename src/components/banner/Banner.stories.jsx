import Banner from "./Banner";
import { storyCoverImage } from "../../test/mocks/storyImage";

export default {
  title: "Components/Banner",
  component: Banner,
};

export const Default = {
  args: {
    image: storyCoverImage,
    alt: "Ameba Barcelona",
    title: "L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA",
  },
};

export const WithLink = {
  args: {
    image: storyCoverImage,
    link: "https://ameba.cat",
    alt: "Ameba Barcelona",
    title: "FES-TE SOCI D'AMEBA",
  },
};
