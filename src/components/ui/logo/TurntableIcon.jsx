import React from "react";
import deckSrc from "../../../assets/svg/ameba-deck.svg";

/**
 * The footer turntable artwork. The deck body is solid cream and the platter,
 * the play/pause pad and the rest of the controls are cut out of it, so the
 * overlays the footer positions on top (logo, play button) show through the
 * holes. Geometry, in the SVG's trimmed viewBox (47.99 42.65 506.35 399.51):
 *   platter label ring — centre 251.55,239.78 · inner radius 56.97
 *   play/pause pad    — 68.48,385.12 · 47.47 x 35.06
 */
const TurntableIcon = ({ width = 240, height = 189, ...props }) => (
  <img src={deckSrc} width={width} height={height} alt="" {...props} />
);

export default TurntableIcon;
