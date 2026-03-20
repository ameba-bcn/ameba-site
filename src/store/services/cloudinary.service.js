import axios from "axios";
import { CLOUDINARY_CLOUD_NAME } from "../../utils/constants";

const fetchImagesByTag = (tag) => {
  return axios.get(
    `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${tag}.json`,
  );
};

const CloudinaryService = {
  fetchImagesByTag,
};

export default CloudinaryService;
