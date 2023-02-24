import { LitElement, html, css } from 'lit';
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from "prosemirror-markdown";
import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";

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

    let state = EditorState.create({
      schema,
    });

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

  updateEditorContent(content) {
    let newState = EditorState.create({
      doc: defaultMarkdownParser.parse(content),
    })
    this.view.updateState(newState);
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
