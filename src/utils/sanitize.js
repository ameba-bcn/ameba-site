/**
 * Sanitize HTML using the native DOMParser API.
 * Removes dangerous elements (script, iframe, etc.) and inline event handlers.
 */
export function sanitizeHTML(html) {
  if (!html) return "";

  const doc = new DOMParser().parseFromString(html, "text/html");

  // Remove dangerous elements
  doc
    .querySelectorAll("script,style,iframe,object,embed,form,link,meta,base")
    .forEach((el) => el.remove());

  // Remove event-handler attributes and javascript: hrefs
  doc.body.querySelectorAll("*").forEach((el) => {
    for (const { name, value } of [...el.attributes]) {
      if (
        name.startsWith("on") ||
        (name === "href" && value.trimStart().startsWith("javascript:"))
      ) {
        el.removeAttribute(name);
      }
    }
  });

  return doc.body.innerHTML;
}
