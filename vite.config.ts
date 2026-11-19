import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
