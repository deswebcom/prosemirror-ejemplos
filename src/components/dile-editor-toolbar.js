import { LitElement, html, css } from 'lit';
import { boldCommand, italicCommand, setCodeCommand, setParagraphCommand } from './prosemirror/markdown-commands.js';
import { codeIcon, formatBoldIcon, formatItalicIcon, notesIcon } from '@dile/icons'
import './dile-editor-toolbar-item.js';

export class DileEditorToolbar extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
      }
      dile-editor-toolbar-item {
        margin-right: 0.4rem;
      }
    `
  ];

  static get properties() {
    return {
      editorView: { type: Object },
      toolbarItems: { type: Array },
    };
  }

  constructor() {
    super();
    this.toolbarItems = [
      {
        command: boldCommand,
        commandName: 'bold',
        active: true,
        icon: formatBoldIcon,
      },
      {
        command: italicCommand,
        commandName: 'italic',
        active: true,
        icon: formatItalicIcon,
      },
      {
        command: setCodeCommand,
        commandName: 'code',
        active: true,
        icon: codeIcon,
      },
      {
        command: setParagraphCommand,
        commandName: 'paragraph',
        active: true,
        icon: notesIcon,
      },
    ];
  }

  render() {
    return html`
      ${this.toolbarItems.map(item => html`
        <dile-editor-toolbar-item 
          ?active=${item.active} 
          commandName="${item.commandName}" 
          .icon=${item.icon}
          @dile-tollbar-command=${this.doCommand}
        ></dile-editor-toolbar-item>
      `)}
    `;
  }

  doCommand(e) {
    let commandName = e.detail.name;
    let commandElement = this.toolbarItems.find( item => item.commandName == commandName);
    commandElement.command(this.editorView.state, this.editorView.dispatch);
    this.editorView.focus();
  }

  reviewActiveElements() {
    console.log('reviewActiveElements');
    this.toolbarItems = this.toolbarItems.map( item => {
      let active = item.command(this.editorView.state, null, this.editorView)
      return {
        ...item,
        active
      }
    })
  }
}
customElements.define('dile-editor-toolbar', DileEditorToolbar);
