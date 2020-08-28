import { EditorState } from "@components/Editor/EditorStore/types";

export const EditorInitialState: EditorState = {
  contentHistory: [],
  isEditMenuVisible: false,
  activeRecordIdx: undefined,
  cursorCoords: undefined,
  caretPos: undefined,
  staticMarkup: undefined,
  editMarkers: undefined,
};
