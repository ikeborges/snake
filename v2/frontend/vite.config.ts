import { defineConfig } from "vite";

export default defineConfig({
  test: {
    root: "./test",
    globals: false,
  },
  build: {
    rollupOptions: {
      input: {
        game: "./pages/game.html",
      },
    },
  },
});
