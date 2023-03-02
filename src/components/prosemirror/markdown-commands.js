import {
  toggleMark
} from "prosemirror-commands";
import {
  schema,
} from "prosemirror-markdown";

export const boldCommand = toggleMark(schema.marks.strong);