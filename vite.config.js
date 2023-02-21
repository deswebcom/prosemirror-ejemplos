import { resolve } from 'path'
import { defineConfig } from 'vite'

const outDir = resolve(__dirname, 'dist');
export default defineConfig({
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hello_world: resolve(__dirname, 'ejemplos', '01-hola-mundo-prosemirror.html'),
        commands: resolve(__dirname, 'ejemplos', '02-commandos-prosemirror.html'),
        initEditor: resolve(__dirname, 'ejemplos', '03-inicializacion-documento.html'),
        menu: resolve(__dirname, 'ejemplos', '04-bold-button.html'),
      },
    },
  },
})