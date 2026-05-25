import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  logLevel: "error",
  build: {
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          "vendor-react": ["react", "react-dom"],
          // Query library
          "vendor-query": ["@tanstack/react-query"],
          // Radix UI primitives (tree-shaken)
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-scroll-area",
          ],
          // Icons
          "vendor-icons": ["lucide-react"],
        },
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 5173,
    proxy: {
      // In dev, proxy /api/* to the local wrangler pages dev server
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
