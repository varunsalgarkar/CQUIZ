import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages serves this project repo at /CQUIZ/, not the site
  // root, so build output needs every asset path prefixed with that.
  // Doesn't affect local dev (still served from / on :8082).
  base: mode === "production" ? "/CQUIZ/" : "/",
  // A fresh value on every build, appended as a "?v=" query param to
  // questions.json / pep_logo.png (see gameData.ts, GameStart.tsx).
  // Those two live under public/ with fixed filenames, so — unlike
  // the JS/CSS bundles, which Vite hashes automatically — a new
  // deploy doesn't change their URL, and browsers/CDNs can keep
  // serving an old cached copy indefinitely. The query string forces
  // a cache miss on every rebuild without needing a full rename.
  define: {
    __BUILD_TIME__: JSON.stringify(Date.now()),
  },
  server: {
    host: "::",
    port: 8082,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
