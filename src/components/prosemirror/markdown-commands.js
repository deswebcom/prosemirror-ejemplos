import {
  toggleMark,
  setBlockType,
  lift,
} from "prosemirror-commands";
import {
  schema,
} from "prosemirror-markdown";
import { wrapInList } from "prosemirror-schema-list"

export const boldCommand = toggleMark(schema.marks.strong);
export const italicCommand = toggleMark(schema.marks.em);
export const setCodeCommand = setBlockType(schema.nodes.code_block);
export const setParagraphCommand = setBlockType(schema.nodes.paragraph);
export const setUnorderedListCommand = wrapInList(schema.nodes.bullet_list);
export const setOrderedListCommand = wrapInList(schema.nodes.ordered_list);
export const liftCommand = lift;

export function headingCommandCreator(level) {
  return setBlockType(schema.nodes.heading, { level });
}