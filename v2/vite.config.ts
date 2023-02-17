import { defineConfig } from "vite";

export default defineConfig({
  root: "public",
  server: {
    port: 5000,
  },
  test: {
    root: "./",
    globals: false,
  },
});
