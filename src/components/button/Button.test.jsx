import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

// Simula lo que hace el traductor de Chrome: cambia cada nodo de texto
// por <font><font>texto traducido</font></font>.
function translateTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    if (!node.textContent.trim()) return;
    const outer = document.createElement("font");
    const inner = document.createElement("font");
    inner.textContent = `translated ${node.textContent}`;
    outer.appendChild(inner);
    node.parentNode.replaceChild(outer, node);
  });
}

describe("Button", () => {
  it("cambia al spinner aunque el navegador haya traducido el texto", () => {
    const { rerender } = render(<Button type="submit">Entra</Button>);
    const button = screen.getByRole("button");

    translateTextNodes(button);
    expect(button.textContent).toContain("translated Entra");

    expect(() => rerender(<Button type="submit" loading>Entra</Button>)).not.toThrow();
    expect(button.querySelector(".boton__content")).toBeNull();
  });

  it("vuelve al texto después del spinner", () => {
    const { rerender } = render(<Button loading>Entra</Button>);
    rerender(<Button>Entra</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Entra");
  });
});
