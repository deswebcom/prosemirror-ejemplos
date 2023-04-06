import { LitElement, html, css } from 'lit';
import '@dile/dile-icon/dile-icon.js';
import './dile-editor-link-dialog';

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
      active: { type: Boolean },
      item: { type: Object },
    };
  }

  render() {
    return html`
      <dile-icon 
        class="${this.active ? 'active' : ''}" 
        .icon=${this.item.icon} 
        @click=${this.doCommand}
      ></dile-icon> 
      <dile-editor-link-dialog id="linkDialog"></dile-editor-link-dialog> 
    `;
  }

  doCommand() {
    if(this.active) {
      if(this.item.dialog) {
        this.shadowRoot.getElementById(this.item.dialog).open();
      } else {
        this.dispatchEvent(new CustomEvent('dile-toolbar-command', { 
          detail: {
            item: this.item
          }
        }));
      }
    }
  }
}
customElements.define('dile-editor-toolbar-item', DileEditorToolbarItem);
