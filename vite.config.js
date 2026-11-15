import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// NOTE: this file previously held a Tailwind config by mistake (left over from
// upstream). Vite still built via plugin-react auto-detection, but there was no
// real Vite config — which meant no control over the preview/dev server's SPA
// fallback (deep-link refreshes 404'd → blank page) and no chunk-loading safety.
// The real Tailwind config lives in tailwind.config.js.
export default defineConfig({
  plugins: [react()],
  server: {
    // SPA fallback so deep links like /about-us resolve to index.html in dev.
    historyApiFallback: true,
  },
  preview: {
    // Same fallback for `vite preview` (deep-link refreshes won't 404).
    historyApiFallback: true,
  },
  build: {
    // Smaller, cache-friendly chunks so a single stale chunk doesn't blank
    // the whole app after a redeploy.
    chunkSizeWarningLimit: 900,
  },
});
