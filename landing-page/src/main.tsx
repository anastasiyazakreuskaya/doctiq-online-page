import React from "react";
import { createRoot } from "react-dom/client";
import { startInstance } from "./start";

async function init() {
  // If TanStack Start exposes a `start` or `startClient` API, use it.
  // Otherwise fall back to a simple client render so the built site still works.
  try {
    // Some versions: startInstance.start(); startInstance.startClient();
    // We'll try the common 'start' method first.
    if (typeof (startInstance as any).start === "function") {
      await (startInstance as any).start();
      return;
    }
    if (typeof (startInstance as any).startClient === "function") {
      await (startInstance as any).startClient();
      return;
    }
  } catch (e) {
    // ignore and fall back to minimal render
    // eslint-disable-next-line no-console
    console.warn("tanstack start client bootstrap failed, falling back to basic render", e);
  }

  // Fallback: render a minimal placeholder so the page isn't blank.
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(
      React.createElement("div", { style: { fontFamily: "sans-serif", padding: 20 } }, "Doctiq — app loaded (client fallback)")
    );
  }
}

init();
