// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 1. Tailwind CSS Vite Plugin goes here (in the main Vite plugins array)
    tailwindcss(),

    // 2. The React plugin, which contains the Babel options
    react({
      // The Babel config block is ONLY for Babel plugins
      babel: {
        plugins: [
          // Use the correct format for the React Compiler
          ["babel-plugin-react-compiler"],

          // !! IMPORTANT: Remove the incorrect Tailwind plugin entry from here !!
          // (The previous error was likely from trying to put [tailwindcss()] here)
        ],
      },
    }),
  ],
});
