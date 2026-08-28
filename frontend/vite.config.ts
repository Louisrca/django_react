import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// The bundle is served by Django through django-vite:
//  - dev  : Django renders tags pointing at the Vite dev server on :5173
//  - prod : `vite build` writes hashed assets + manifest into dist/, and
//           Django resolves them via dist/.vite/manifest.json
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Assets are exposed under Django's STATIC_URL.
  base: "/static/",
  build: {
    manifest: true,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      // One entry per Django page. Add more here as pages get a React root.
      input: {
        main: `${import.meta.dirname}/src/main.tsx`,
      },
    },
  },
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    // Absolute URLs for assets requested from the Django-served page.
    origin: "http://localhost:5173",
    cors: true,
  },
});
