import SectionHero from "./SectionHero";

export default {
  title: "Components/SectionHero",
  component: SectionHero,
  parameters: { layout: "fullscreen" },
};

export const Shop = {
  args: {
    title: "Shop",
    section: "shop",
    image: "https://ameba.cat/AmebaPortadaDesktop.jpg",
    imageAlt: "Shop",
    lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    children: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras diam
        sem, molestie sed orci nec, eleifend porta arcu.
      </p>
    ),
  },
};

export const Lab = {
  args: {
    title: "Lab",
    section: "lab",
    image: "https://ameba.cat/AmebaPortadaDesktop.jpg",
    imageAlt: "Lab",
    lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
};
