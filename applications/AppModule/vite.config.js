import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { svgBuilder } from './src/plugins/svgBuilder'
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const ElementPlus = require("unplugin-element-plus/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/icons/svg/'),
    PkgConfig(),
    OptimizationPersist(),
    inject({
      'window.Quill': ['@vueup/vue-quill', 'Quill'],
      Quill: ['@vueup/vue-quill', 'Quill'],
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        //自定义的主题文件
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
        })],
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
        })],
      }),
      ElementPlus({
        useSource: true,
      }),
    ],
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 2000,
    hot: true,
    proxy: {
      // '/cnbi': {
      //   target: 'http://192.168.2.207:9005',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/cnbi/, '')
      // },
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
