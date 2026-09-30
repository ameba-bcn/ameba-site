import AmebaBlob from "./AmebaBlob";

export default {
  title: "Components/AmebaBlob",
  component: AmebaBlob,
  argTypes: {
    color: { control: "select", options: ["amarillo", "black", "cream", "naranja", "rojo"] },
  },
};

export const Default = {
  args: { color: "black", size: 96 },
};

export const Orange = {
  args: { color: "naranja", size: 96 },
};

export const Red = {
  args: { color: "rojo", size: 96 },
};
