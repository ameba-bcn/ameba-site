import React from "react";
import "./OutlineHeading.css";

export default function OutlineHeading({
  as: Tag = "h2",
  children,
  className = "",
}) {
  return (
    <Tag className={`outline-heading ${className}`.trim()}>{children}</Tag>
  );
}
