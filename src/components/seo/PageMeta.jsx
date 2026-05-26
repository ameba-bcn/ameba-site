/**
 * SEO metadata component.
 * Manages <title>, <meta> (description, OG, Twitter), and optional JSON-LD
 * structured data via imperative DOM manipulation.
 */
import { useEffect } from "react";

const SITE_NAME = "AMEBA";
const DEFAULT_DESCRIPTION =
  "L'Associació de Música Electrònica de Barcelona. Agenda d'activitats, booking d'artistes, botiga i comunitat.";
const DEFAULT_IMAGE = "https://ameba.cat/AmebaLogo.png";
const SITE_URL = "https://ameba.cat";

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function PageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  jsonLd,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Associació de Música Electrònica de Barcelona`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", image);
    setMeta("property", "og:url", fullUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);

    return () => {
      document.title = prevTitle;
    };
  }, [fullTitle, description, image, fullUrl, type]);

  useEffect(() => {
    if (!jsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    script.dataset.pageMeta = "true";
    document.head.appendChild(script);
    return () => script.remove();
  }, [jsonLd]);

  return null;
}
