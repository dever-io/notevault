import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base: "./"` makes built assets reference URLs relative to index.html so
// the bundle works under https://agntdev.github.io/notevault/ (subpath).
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: { port: 5173 },
});
