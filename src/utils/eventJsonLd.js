// Shared MusicEvent JSON-LD builder for event detail pages (Festivals, Lab).
export function buildEventJsonLd(data, id, basePath) {
  if (!data?.name) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: data.header || data.name,
    url: `https://ameba.cat/${basePath}/${id}`,
    organizer: {
      "@type": "Organization",
      name: "AMEBA — Associació de Música Electrònica de Barcelona",
      url: "https://ameba.cat",
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: data.cancelled
      ? "https://schema.org/EventCancelled"
      : "https://schema.org/EventScheduled",
  };
  if (data.datetime) ld.startDate = data.datetime;
  if (data.address) {
    ld.location = { "@type": "Place", name: data.address };
  }
  if (data.images?.length > 0) ld.image = data.images;
  return ld;
}
