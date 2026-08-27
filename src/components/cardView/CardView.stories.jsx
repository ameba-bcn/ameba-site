import CardView from "./CardView";

const EVENT_DATA = {
  name: "Ameba Fest 2026",
  header: "Ameba Fest 2026",
  images: ["https://ameba.cat/AmebaPortadaDesktop.jpg"],
  datetime: "2031-06-15T20:00:00.000Z",
  address: "Razzmatazz, Barcelona",
  description: "Un festival de música electrònica amb els millors DJs locals.",
  price: 18,
  stock: 42,
  discount: 0,
  cancelled: false,
};

const PRODUCT_DATA = {
  name: "Samarreta Ameba",
  images: ["https://ameba.cat/AmebaPortadaDesktop.jpg"],
  description: "Samarreta oficial d'Ameba, 100% cotó orgànic.",
  price: 22,
  price_range: "22 €",
  has_stock: true,
  discount: 0,
  variants: [
    { attributes: [{ value: "s" }], stock: 5 },
    { attributes: [{ value: "m" }], stock: 3 },
    { attributes: [{ value: "l" }], stock: 0 },
  ],
};

const MEMBERSHIP_DATA = {
  name: "Soci Anual",
  images: ["https://ameba.cat/AmebaPortadaDesktop.jpg"],
  description: "Fes-te soci i gaudeix de descomptes en tots els esdeveniments.",
  benefits: "Entrades amb descompte, accés prioritari, newsletter exclusiva.",
  price: 30,
  price_range: "30 €",
  has_stock: true,
};

export default {
  title: "Components/CardView",
  component: CardView,
  parameters: { layout: "fullscreen" },
};

export const Event = {
  args: { productData: EVENT_DATA, kind: "activitat", handleAddClick: () => {} },
};

export const Product = {
  args: { productData: PRODUCT_DATA, kind: "producte", handleAddClick: () => {} },
};

export const Membership = {
  args: { productData: MEMBERSHIP_DATA, kind: "soci", handleAddClick: () => {} },
};
