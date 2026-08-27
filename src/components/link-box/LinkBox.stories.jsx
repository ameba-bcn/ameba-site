import LinkBox from "./LinkBox";

export default {
  title: "Components/LinkBox",
  component: LinkBox,
};

export const ReadOnly = {
  args: {
    label: "previsualització",
    mediaLinks: ["https://www.ameba.cat"],
  },
};

export const EditMode = {
  args: {
    label: "enllaços",
    editMode: true,
    mediaLinks: ["https://www.ameba.cat", "https://www.instagram.com/amebabcn"],
    setMediaLinks: () => {},
  },
};
