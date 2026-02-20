import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
  // Явно указываем Vite, что эти расширения файлов нужно обрабатывать как статические ресурсы
  assetsInclude: [
    "**/*.mp3",
    "**/*.webp",
    "**/*.png",
    "**/*.jpg",
    "**/*.jpeg",
    "**/*.svg",
    "**/*.ico",
  ],
});
