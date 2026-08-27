import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    buttonStyle: {
      control: "select",
      options: [
        "boton--primary--solid",
        "boton--primary--outline",
        "boton--primary--disabled",
        "boton--orange--solid",
        "boton--back-orange--solid",
      ],
    },
    buttonSize: {
      control: "select",
      options: ["boton--medium", "boton--small", "boton--big", "boton--megaxxl"],
    },
    hoverStyle: {
      control: "select",
      options: ["bg-red", "bg-cream", "bg-orange"],
    },
  },
};

export const Primary = {
  args: {
    children: "Comprar entrades",
    buttonStyle: "boton--primary--solid",
    buttonSize: "boton--medium",
  },
};

export const Outline = {
  args: {
    children: "Veure més",
    buttonStyle: "boton--primary--outline",
    buttonSize: "boton--medium",
  },
};

export const Orange = {
  args: {
    children: "Fes-te soci",
    buttonStyle: "boton--orange--solid",
    buttonSize: "boton--big",
  },
};

export const Small = {
  args: {
    children: "Afegir",
    buttonStyle: "boton--primary--solid",
    buttonSize: "boton--small",
  },
};

export const Disabled = {
  args: {
    children: "Esgotat",
    buttonStyle: "boton--primary--disabled",
    buttonSize: "boton--medium",
    disabled: true,
  },
};

export const Loading = {
  args: {
    children: "Processant",
    buttonStyle: "boton--primary--solid",
    buttonSize: "boton--medium",
    loading: true,
  },
};
