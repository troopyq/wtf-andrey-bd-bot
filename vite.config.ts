import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dynamicImportVars from 'vite-plugin-dynamic-import';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImportVars()],
  build: {
    outDir: './docs',
  },
  base: './',
});
