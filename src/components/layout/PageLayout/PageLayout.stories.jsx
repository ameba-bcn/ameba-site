import PageLayout from "./PageLayout";

export default {
  title: "Components/PageLayout",
  component: PageLayout,
};

export const Default = {
  args: {
    title: "Activitats",
    children: <p style={{ padding: "1rem" }}>Contingut de la pàgina.</p>,
  },
};

export const Loading = {
  args: {
    title: "Activitats",
    loading: true,
  },
};

export const Centered = {
  args: {
    title: "Contacte",
    centered: true,
    children: <p style={{ padding: "1rem" }}>Contingut centrat.</p>,
  },
};

export const WithSectionTint = {
  args: {
    section: "lab",
    promo: true,
    children: <p style={{ padding: "1rem" }}>Contingut de la secció Lab.</p>,
  },
};
