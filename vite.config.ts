import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dynamicImportVars from 'vite-plugin-dynamic-import';
import { resolve } from 'path';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImportVars()],
  build: {
    // rollupOptions: {
    //   input: {
    //     server: resolve(__dirname, './src/server/server.ts'),
    //     index: resolve(__dirname, './src/main.tsx')
    //   }
    // },
    outDir: './docs',
  },
  base: './',
});
