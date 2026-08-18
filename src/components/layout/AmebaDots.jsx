import React from "react";
import AmebaBlob from "../ui/logo/AmebaBlob";
import "./AmebaDots.css";

/**
 * Decoración vertical: la silueta ameba (logo-ameba.svg) en negro repetida
 * como puntitos, cada uno con una ligera rotación.
 */
export default function AmebaDots({ count = 10, size = 14, color = "black" }) {
  return (
    <div className="ameba-dots" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="ameba-dots__dot"
          style={{ transform: `rotate(${(i * 36) % 360}deg)` }}
        >
          <AmebaBlob color={color} size={size} />
        </span>
      ))}
    </div>
  );
}
