import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": resolve("src"),
    },
  },
  server: {
    host: "0.0.0.0", // 暴露内网ip
    port: 2005,
    cors: true,
  },
});
