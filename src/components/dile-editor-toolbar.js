import { LitElement, html, css } from 'lit';
import { 
  boldCommand, 
  italicCommand, 
  setCodeCommand, 
  setParagraphCommand, 
  headingCommandCreator, 
  setUnorderedListCommand,
  setOrderedListCommand, 
  liftCommand,
  codeMarkCommand,
} from './prosemirror/markdown-commands.js';
import { undo, redo } from "prosemirror-history";
import { 
  formatBoldIcon, 
  formatItalicIcon, 
  notesIcon,
  codeIcon, 
  redoIcon, 
  undoIcon,
  formatIndentDecreaseIcon, 
  formatListBulletedIcon, 
  formatListNumberedIcon,
} from '@dile/icons'
import './dile-editor-toolbar-item.js';
import '@dile/dile-select/dile-select.js';

export class DileEditorToolbar extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        border: 1px solid red;
        padding: 4px;
      }
      dile-editor-toolbar-item {
        margin-right: 0.4rem;
      }
      dile-select {
        min-width: 100px;
        margin-bottom: 0;
        --dile-input-border-width: 0;
        --dile-input-padding: 3px;
      }
      .marks, .blocks {
        display: flex;
        align-items: center;
      }
      .blocks {
        --dile-icon-color: var(--dile-editor-toolbar-color, #303030);
        border-left: 2px solid #ccc;
        margin-left: 10px;
        padding-left: 10px;
      }
      .blocks dile-icon {
        margin-right: 5px;
      }
    `
  ];

  static get properties() {
    return {
      editorView: { type: Object },
      toolbarItems: { type: Array },
      blockItems: { type: Array },
      undoItems: { type: Array },
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
        command: codeMarkCommand,
        commandName: 'code_mark',
        active: true,
        icon: codeIcon,
      },
      {
        command: setUnorderedListCommand,
        commandName: 'unordered_list',
        active: true,
        icon: formatListBulletedIcon,
      },
      {
        command: setOrderedListCommand,
        commandName: 'ordered_list',
        active: true,
        icon: formatListNumberedIcon,
      },
      {
        command: liftCommand,
        commandName: 'lift',
        active: true,
        icon: formatIndentDecreaseIcon,
      },
    ];

    this.undoItems = [
      {
        command: undo,
        commandName: 'undo',
        active: true,
        icon: undoIcon,
      },
      {
        command: redo,
        commandName: 'redo',
        active: true,
        icon: redoIcon,
      }
    ];

    this.blockItems = [
      {
        command: setParagraphCommand,
        commandName: 'paragraph',
      },
      {
        command: headingCommandCreator(1),
        commandName: 'h1',
      },
      {
        command: headingCommandCreator(2),
        commandName: 'h2',
      },
      {
        command: headingCommandCreator(3),
        commandName: 'h3',
      },
      {
        command: setCodeCommand,
        commandName: 'code',
      },
      
    ];
  }

  firstUpdated() {
    
    this.blockselect = this.shadowRoot.getElementById('blockselect');
  }

  render() {
    return html`
      ${this.showItems(this.toolbarItems, 'marks')}
      ${this.paragraphTypes}
      ${this.showItems(this.undoItems, 'blocks')}
    `;
  }

  showItems(items, cssClass) {
    return html`
      <div class="${cssClass}">
        ${items.map(item => html`
          <dile-editor-toolbar-item 
            ?active=${item.active} 
            commandName="${item.commandName}" 
            .icon=${item.icon}
            @dile-tollbar-command=${this.doCommand}
          ></dile-editor-toolbar-item>
        `)}
      </div>
    `;
  }

  get paragraphTypes() {
    return html`
      <div class="blocks">
        <dile-icon .icon=${notesIcon}></dile-icon>
        <dile-select 
          id="blockselect" 
          name="blockselect" 
          @element-changed=${this.blockElementChanged} 
          quietOnStart
        >
          <select slot="select">
            ${this.blockItems.map(item => html`
              <option value="${item.commandName}">${item.commandName}</option>
            `)}
          </select>
        </dile-select>
      </div>
    `
  }

  doCommand(e) {
    let commandName = e.detail.name;
    let commandElement;
    commandElement = this.toolbarItems.find( item => item.commandName == commandName);
    if(!commandElement) {
      commandElement = this.undoItems.find(item => item.commandName == commandName);
    }
    commandElement.command(this.editorView.state, this.editorView.dispatch);
    this.editorView.focus();
  }

  reviewActiveElements() {
    console.log('reviewActiveElements');
    this.toolbarItems = this.computeActive(this.toolbarItems);
    this.undoItems = this.computeActive(this.undoItems);
    let currentBlock = this.blockItems.find(item => !item.command(this.editorView.state, null, this.editorView))
    console.log('akkkii', currentBlock.commandName);
    this.blockselect.quietChange(currentBlock.commandName);
  }

  computeActive(items) {
    return items.map(item => {
      let active = item.command(this.editorView.state, null, this.editorView)
      return {
        ...item,
        active
      }
    });
  }

  blockElementChanged(e) {
    console.log('blockElementChanged', e.detail.name, e.detail.value);
    let commandName = e.detail.value;
    let commandElement = this.blockItems.find(item => item.commandName == commandName);
    commandElement.command(this.editorView.state, this.editorView.dispatch);
    this.editorView.focus();
  }
}
customElements.define('dile-editor-toolbar', DileEditorToolbar);
