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
        boldButton: resolve(__dirname, 'ejemplos', '04-bold-button.html'),
        plugins: resolve(__dirname, 'ejemplos', '05-plugins.html'),
        menu: resolve(__dirname, 'ejemplos', '06-menu.html'),
        serializar: resolve(__dirname, 'ejemplos', '07-serializar-html.html'),
        schemaList: resolve(__dirname, 'ejemplos', '08-schema-list.html'),
        schemaMarkdown: resolve(__dirname, 'ejemplos', '09-schema-markdown.html'),
        editorMarkdown: resolve(__dirname, 'ejemplos', '10-editor-markdown.html'), 
      },
    },
  },
})