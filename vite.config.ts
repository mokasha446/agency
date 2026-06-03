import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: ["log"],
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react-router") ||
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("@react-router")
            ) {
              return "vendor-react";
            }
            return "vendor-libs";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
