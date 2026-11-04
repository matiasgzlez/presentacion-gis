import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  // MapLibre 6 carga su worker como módulo relativo a import.meta.url:
  // si Vite lo pre-empaqueta, la ruta del worker se rompe.
  optimizeDeps: { exclude: ["maplibre-gl"] },
  worker: { format: "es" },
});
