import { defineConfig } from "vite";
import { resolve } from "path";
import { name } from './package.json'
import react from "@vitejs/plugin-react";
import qiankun from 'vite-plugin-qiankun'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    // react(),
    qiankun(name, { // 微应用名字，与主应用注册的微应用名字保持一致
      useDevMode: true
    })
  ],
  resolve: {
    extensions: [".js", ".jsx",".tsx", ".json"],
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
