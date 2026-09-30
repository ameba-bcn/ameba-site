import { useState } from "react";
import ImageLoader from "./ImageLoader";

export default {
  title: "Components/ImageLoader",
  component: ImageLoader,
};

function ImageLoaderDemo(args) {
  const [images, setImages] = useState(args.images ?? []);
  return <ImageLoader {...args} images={images} setImages={setImages} />;
}

export const Empty = {
  render: (args) => <ImageLoaderDemo {...args} />,
  args: {},
};

export const WithTooltip = {
  render: (args) => <ImageLoaderDemo {...args} />,
  args: { tooltip: "Puja fins a 5 imatges en format JPG, PNG o GIF" },
};
