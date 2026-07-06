import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ── Deploy slot ──────────────────────────────────────────────────────────────
// The path this sub-app is served from on GitHub Pages, with leading AND
// trailing slashes. Served at the site root → "/". If this app ever moves into
// a subfolder, change this ONE line (e.g. "/landingpage/") and rebuild — every
// built asset URL is derived from it.
const BASE = "/";

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
});
