import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core", "pinia"],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: true,
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
