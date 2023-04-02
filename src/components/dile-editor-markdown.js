import { LitElement, html, css } from 'lit';
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { menuPlugin } from './prosemirror/menu-plugin.js';
import { history } from "prosemirror-history";
import './dile-editor-toolbar.js';

export class DileEditorMarkdown extends LitElement {
  
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  constructor() {
    super();
    const editorElement = this;
    const dispatchChange = this.dispatchChange.bind(this);

    const state = this.createState('');
    const view = new EditorView(editorElement, {
      state,
      dispatchTransaction(transaction) {
        let newState = view.state.apply(transaction)
        view.updateState(newState);
        dispatchChange(newState);
      }
    })
    this.view = view;
    //this.updateEditorContent(content);
    console.log('fin constructor editor markdown');
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  getEditorMarkdown() {
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }

  createState(content) {
    return EditorState.create({
      doc: defaultMarkdownParser.parse(content),
      plugins: [
        history(),
        keymap(baseKeymap),
        menuPlugin,
      ]
    })
  }

  updateEditorContent(content) {
    this.view.updateState(this.createState(content));
  }

  dispatchChange(newState) {
    this.dispatchEvent(new CustomEvent('dile-editor-change', {
      detail: {
        content: defaultMarkdownSerializer.serialize(newState.doc)
      }
    }));
  }
}
customElements.define('dile-editor-markdown', DileEditorMarkdown);
