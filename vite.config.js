import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Sdb002.github.io is a user site, so it is served from the domain root ("/").
export default defineConfig({
  plugins: [react()],
});
