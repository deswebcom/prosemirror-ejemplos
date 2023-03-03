import { LitElement, html, css } from 'lit';
import '@dile/dile-icon/dile-icon.js';

export class DileEditorToolbarItem extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
        align-items: center;
        --dile-icon-color: #aaa;
        cursor: pointer;
      }
      .active {
        --dile-icon-color: var(--dile-editor-toolbar-color, #303030);
      }
    `
  ];

  static get properties() {
    return {
      icon: { type: Object },
      active: { type: Boolean },
      commandName: { type: String },
    };
  }

  render() {
    return html`
      <dile-icon 
        class="${this.active ? 'active' : ''}" 
        .icon=${this.icon} 
        @click=${this.doCommand}
      ></dile-icon>  
    `;
  }

  doCommand() {
    if(this.active) {
      this.dispatchEvent(new CustomEvent('dile-tollbar-command', { 
        detail: {
          name: this.commandName
        }
      }));
    }
  }
}
customElements.define('dile-editor-toolbar-item', DileEditorToolbarItem);
