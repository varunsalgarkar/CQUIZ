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
