import DOMPurify from "dompurify";

// Force any link that survives sanitization to open safely (no reverse-tabnabbing,
// no referrer leakage of tokens present in the current URL).
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
    node.setAttribute("rel", "noopener noreferrer");
  }
});

/**
 * Sanitize rich-text HTML (event/article/member descriptions coming from the
 * backend / TinyMCE). Strips scripts, event handlers, iframes and other active
 * content. Backed by DOMPurify (battle-tested against mutation-XSS).
 */
export function sanitizeHTML(html) {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_URI_REGEXP:
      /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.:-]|$))/i,
  });
}

// Hosts allowed to be embedded via <iframe> in member-project media links.
const ALLOWED_EMBED_HOSTS = [
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "player.vimeo.com",
  "w.soundcloud.com",
  "bandcamp.com",
  "open.spotify.com",
  "mixcloud.com",
  "www.mixcloud.com",
];

function isAllowedEmbedSrc(src) {
  try {
    const url = new URL(src, window.location.origin);
    if (url.protocol !== "https:") return false;
    return ALLOWED_EMBED_HOSTS.some(
      (host) => url.hostname === host || url.hostname.endsWith("." + host)
    );
  } catch {
    return false;
  }
}

/**
 * Sanitize an <iframe> embed snippet (member-project media links).
 * Only allows a single iframe pointing at an allowlisted host; everything
 * else (img/onerror payloads, scripts, extra markup) is stripped.
 * Returns "" if nothing safe remains.
 */
export function sanitizeEmbed(html) {
  if (!html) return "";
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["iframe"],
    ALLOWED_ATTR: [
      "src",
      "width",
      "height",
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "loading",
      "title",
      "style",
    ],
  });

  // Enforce the host allowlist on the resulting iframe src.
  const doc = new DOMParser().parseFromString(clean, "text/html");
  const iframe = doc.body.querySelector("iframe");
  if (!iframe || !isAllowedEmbedSrc(iframe.getAttribute("src") || "")) {
    return "";
  }
  return doc.body.innerHTML;
}
