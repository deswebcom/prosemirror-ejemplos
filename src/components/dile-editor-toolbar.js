import { LitElement, html, css } from 'lit';
import { boldCommand, italicCommand, setCodeCommand } from './prosemirror/markdown-commands.js';
import '@dile/dile-icon/dile-icon.js';
import { homeIcon, attachmentIcon, cookieIcon } from '@dile/icons'

export class DileEditorToolbar extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        --dile-icon-color: var(--dile-editor-toolbar-color, #303030);
      }

    `
  ];

  constructor() {
    super();
    this.commands = {
      bold: boldCommand,
      italic: italicCommand,
      setCode: setCodeCommand,
    }
  }
  static get properties() {
    return {
      editorView: { type: Object },
    };
  }

  render() {
    return html`
      <dile-icon .icon=${homeIcon} @click=${this.doCommand('bold')}></dile-icon>  
      <dile-icon .icon=${attachmentIcon} @click=${this.doCommand('italic') }></dile-icon>  
      <dile-icon .icon=${cookieIcon} @click=${this.doCommand('setCode') }></dile-icon>  
    `;
  }

  doCommand(command) {
    return () => {
      this.commands[command](this.editorView.state, this.editorView.dispatch);
      this.editorView.focus();
    }
  }

  reviewActiveElements() {
    console.log('reviewActiveElements');
    for(let command in this.commands) {
      let active = this.commands['bold'](this.editorView.state, null, this.editorView)
      if(active) {
        console.log(command, ' debería estar activo');
      } else {
        console.log(command, ' debería estar INACTIVO');
      }
    }
    //let active = command(this.editorView.state, null, this.editorView)
  }
}
customElements.define('dile-editor-toolbar', DileEditorToolbar);
