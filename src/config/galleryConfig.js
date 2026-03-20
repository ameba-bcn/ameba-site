/**
 * Gallery configuration - defines all available album galleries.
 *
 * Structure mirrors Cloudinary folders: {event_name}/{year}/
 *
 * To add a new gallery:
 * 1. Upload images to Cloudinary in folder: {event_name}/{year}/
 * 2. Tag all images with: {slug}_{year} (e.g. "ameba_parkfest_2024")
 * 3. Add an entry here with the same tag
 *
 * Cloudinary setup:
 * - Enable "Resource list" in Settings > Security
 * - Optionally create an Upload Preset that auto-tags based on folder
 *
 * The cover image is automatically fetched from the first image of each album.
 */

export const galleries = [
  {
    slug: "ameba-parkfest",
    year: "2015",
    title: "AMEBA PARKFEST 15",
    date: "2015",
    tag: "ameba_parkfest_2015",
  },
  {
    slug: "ameba-parkfest",
    year: "2016",
    title: "AMEBA PARKFEST 16",
    date: "2016",
    tag: "ameba_parkfest_2016",
  },
  {
    slug: "ameba-parkfest",
    year: "2017",
    title: "AMEBA PARKFEST 17",
    date: "2017",
    tag: "ameba_parkfest_2017",
  },
  {
    slug: "ameba-parkfest",
    year: "2018",
    title: "AMEBA PARKFEST 18",
    date: "2018",
    tag: "ameba_parkfest_2018",
  },
  {
    slug: "ameba-parkfest",
    year: "2019",
    title: "AMEBA PARKFEST 19",
    date: "2019",
    tag: "ameba_parkfest_2019",
  },
  {
    slug: "ameba-parkfest",
    year: "2022",
    title: "AMEBA PARKFEST 22",
    date: "2022",
    tag: "ameba_parkfest_2022",
  },
  {
    slug: "ameba-parkfest",
    year: "2023",
    title: "AMEBA PARKFEST 23",
    date: "2023",
    tag: "ameba_parkfest_2023",
  },
  {
    slug: "ameba-parkfest",
    year: "2024",
    title: "AMEBA PARKFEST 24",
    date: "2024",
    tag: "ameba_parkfest_2024",
  },
  {
    slug: "ameba-parkfest",
    year: "2025",
    title: "AMEBA PARKFEST 25",
    date: "2025",
    tag: "ameba_parkfest_2025",
  },
];

export const getGalleryBySlug = (slug, year) => {
  return galleries.find((g) => g.slug === slug && g.year === year);
};
