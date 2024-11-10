import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";

export default defineConfig(({ command }) => {
  const plugins: any[] = [motionCanvas()];
  if (command === "serve") {
    plugins.push(ffmpeg());
  }
  return {
    plugins,
    build: {
      rollupOptions: {
        output: {
          dir: "out",
          entryFileNames: "[name].js",
        },
      },
    },
  };
});
