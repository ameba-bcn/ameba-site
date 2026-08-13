import React from "react";
import AmebaLogo from "../ui/logo/AmebaLogo";
import "./AmebaDots.css";

/**
 * Decoración vertical: el logo Ameba en negro repetido como puntitos,
 * cada uno con una ligera rotación.
 */
export default function AmebaDots({ count = 10, size = 14 }) {
  return (
    <div className="ameba-dots" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="ameba-dots__dot"
          style={{ transform: `rotate(${(i * 36) % 360}deg)` }}
        >
          <AmebaLogo width={size} height={size} fill="var(--color-negro)" />
        </span>
      ))}
    </div>
  );
}
