import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* HashRouter: client-side routes live after the "#", so refreshes and deep
        links resolve to index.html on any flat static host — no server rewrites. */}
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
