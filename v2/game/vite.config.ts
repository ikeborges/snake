import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  test: {
    root: "./",
    globals: false,
  },
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        game: "./game.html",
        ranking: "./ranking.html",
      },
      output: {
        dir: "dist",
      },
    },
  },
});
