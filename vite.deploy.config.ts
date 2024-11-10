import { defineConfig } from "vite";

defineConfig({
  build: {
    rollupOptions: {
      input: "index.html",
      output: {
        dir: "dist",
      },
    },
  },
});
