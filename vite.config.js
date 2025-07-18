import { fileURLToPath, URL } from 'url';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';


import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'document-reader',
        },
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: [],
      resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      dts: 'src/types/components.d.ts',
    }),
    visualizer({ open: true, filename: 'dist/stats.html', gzipSize: true, brotliSize: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
