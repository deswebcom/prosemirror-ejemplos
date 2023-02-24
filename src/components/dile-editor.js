import { LitElement, html, css } from 'lit';
//import { MarkdownEditorView } from './lib/markdown-editor-view.js';
import './dile-editor-markdown.js';

export class DileEditor extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .ProseMirror {
        position: relative;
        word-wrap: break-word;
        white-space: pre-wrap;
        white-space: break-spaces;
        -webkit-font-variant-ligatures: none;
        font-variant-ligatures: none;
        font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */

        border: 1px solid red;
        padding: 0 10px;
      }

      .ProseMirror p:first-child,
      .ProseMirror h1:first-child,
      .ProseMirror h2:first-child,
      .ProseMirror h3:first-child,
      .ProseMirror h4:first-child,
      .ProseMirror h5:first-child,
      .ProseMirror h6:first-child {
        margin-top: 10px;
      }
    `
  ];

  static get properties() {
    return {
      value: { type: String },
    };
  }

  constructor() {
    super();
    this.value = this.innerHTML;
    // document.addEventListener('dile-editor-change', (e) => {
    //   this.value = e.detail.content;
    // })
  }

  updated(changedProperties) {
    if(changedProperties.has('value') && this.isValueExternalyUpdated) {
      this.updateEditorContent(this.value);
    }
  }

  firstUpdated() {
    console.log(this);
    this.editor = this.shadowRoot.getElementById('editor');
  }

  render() {
    return html`
      <dile-editor-markdown 
        id="editor"
        @dile-editor-change=${this.updateValue}
      ></dile-editor-markdown>
    `;
  }

  updateValue(e) {
    this.value = e.detail.content;
  }

  getEditorMarkdown() {
    return this.editor.getEditorMarkdown();
  }

  updateEditorContent(value) {
    this.editor.updateEditorContent(value);
  }

  get isValueExternalyUpdated() {
    return this.getEditorMarkdown() != this.value
  }
}
customElements.define('dile-editor', DileEditor);
