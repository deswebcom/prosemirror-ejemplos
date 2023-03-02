import { Plugin } from "prosemirror-state";

const toolbarElement = 'dile-editor-toolbar';

export const menuPlugin = new Plugin({
  view(editorView) {
    if (!editorView.dom.parentElement.querySelector(toolbarElement)) {
      const toolbar = document.createElement(toolbarElement);
      toolbar.editorView = editorView;
      editorView.dom.parentNode.insertBefore(toolbar, editorView.dom);
    }
    return {
      update() {
        console.log('menu plugin view update');
      }
    };
  }
});
