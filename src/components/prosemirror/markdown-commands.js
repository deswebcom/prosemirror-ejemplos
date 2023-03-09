import {
  toggleMark,
  setBlockType
} from "prosemirror-commands";
import {
  schema,
} from "prosemirror-markdown";

export const boldCommand = toggleMark(schema.marks.strong);
export const italicCommand = toggleMark(schema.marks.em);
export const setCodeCommand = setBlockType(schema.nodes.code_block);
export const setParagraphCommand = setBlockType(schema.nodes.paragraph);

export function headingCommandCreator(level) {
  return setBlockType(schema.nodes.heading, { level });
}