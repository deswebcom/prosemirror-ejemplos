import { LitElement, html, css } from 'lit';
import { schema } from "prosemirror-schema-basic"
import { EditorState } from "prosemirror-state"
import { EditorView } from "prosemirror-view"

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

  firstUpdated() {
    let state = EditorState.create({ schema })
    let view = new EditorView(this.shadowRoot.getElementById('editor'), {
      state,
    })
  }

  render() {
    return html`
      <div id="editor"></div>
    `;
  }
}
customElements.define('dile-editor', DileEditor);
