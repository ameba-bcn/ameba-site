import Banner from "./Banner";

export default {
  title: "Components/Banner",
  component: Banner,
};

export const Default = {
  args: {
    image: "https://ameba.cat/AmebaPortadaDesktop.jpg",
    alt: "Ameba Barcelona",
    title: "L'ASSOCIACIÓ DE MÚSICA ELECTRÒNICA DE BARCELONA",
  },
};

export const WithLink = {
  args: {
    image: "https://ameba.cat/AmebaPortadaDesktop.jpg",
    link: "https://ameba.cat",
    alt: "Ameba Barcelona",
    title: "FES-TE SOCI D'AMEBA",
  },
};
