import { LitElement, html, css } from 'lit';
import { boldCommand } from './prosemirror/markdown-commands.js';


export class DileEditorToolbar extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      editorView: { type: Object },
    };
  }

  render() {
    return html`
      <button @click=${this.doBold}>Bold</button>  
    `;
  }

  doBold() {
    console.log('booooold');
    console.log(this.editorView);
    boldCommand(this.editorView.state, this.editorView.dispatch);
    this.editorView.focus();

  }
}
customElements.define('dile-editor-toolbar', DileEditorToolbar);
