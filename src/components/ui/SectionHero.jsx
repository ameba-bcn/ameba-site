import React from "react";
import MegaTitle from "./MegaTitle";
import DotsColumn from "./DotsColumn";
import "./SectionHero.css";

// A 1px SVG stroke on the mega title's huge glyphs (up to 320px) anti-
// aliases fine on a Retina/high-DPI screen, but on a standard-density
// (1x) display there just aren't enough physical pixels to smooth a
// line that thin — confirmed on a real Windows/Chromium machine:
// bumping stroke-width to 2 there fixed it live in devtools, and
// bumping the OS/browser zoom (which also raises the effective
// resolution) fixed it too, with no code change. There's no reliable
// "is this Windows" media feature (or a good reason to special-case an
// OS rather than the screen that's actually thin-stroke-hostile), so
// this targets the real condition instead: any 1x-ish display, whatever
// the OS. Retina users keep the original hairline look.
const isLowDprDisplay =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  !window.matchMedia("(min-resolution: 2dppx)").matches;

export default function SectionHero({
  title,
  image,
  imageAlt,
  lead,
  children,
  section,
  variant = "default",
  bgColor,
  titleColor,
  titleFit = true,
  dotsPosition = "start",
}) {
  // `section` alone still resolves the legacy per-page tint (--section-x);
  // bgColor overrides it so a future reuse isn't forced to register a new
  // CSS variable just to pick a color.
  const resolvedBgColor = bgColor || (section ? `var(--section-${section})` : undefined);

  const classes = [
    "section-hero",
    `section-hero--${section}`,
    variant === "mega" && "section-hero--mega",
    dotsPosition === "end" && "section-hero--dots-end",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      style={resolvedBgColor ? { "--hero-bg-color": resolvedBgColor } : undefined}
    >
      <DotsColumn className="section-hero__dots" />
      {/* Spans the visual + text columns (wider than just the image) —
          stacking order is image < title < text, so it shows through
          behind the copy instead of just behind the picture. Sections that
          need the title to bleed past its box (per their own reference)
          pass titleFit={false} to skip the shrink-to-fit and render at
          natural size instead — the page's own overflow-x:hidden clips it. */}
      <MegaTitle
        title={title}
        className="section-hero__outline-title"
        fit={titleFit}
        strokeColor={titleColor}
        renderAs={variant === "mega" ? "svg" : "text"}
        strokeWidth={variant === "mega" ? (isLowDprDisplay ? 2 : 1) : 2}
      />
      <div className="section-hero__visual">
        <div className="section-hero__image-wrap">
          <img className="section-hero__image" src={image} alt={imageAlt || ""} />
        </div>
      </div>
      <div className="section-hero__text">
        {lead && <p className="section-hero__lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
