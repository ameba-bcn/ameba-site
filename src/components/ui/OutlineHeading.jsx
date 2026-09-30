import React from "react";
import "./OutlineHeading.css";

export default function OutlineHeading({
  as: Tag = "h2",
  children,
  className = "",
  tone = "dark",
}) {
  return (
    <Tag
      className={`outline-heading outline-heading--${tone} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
