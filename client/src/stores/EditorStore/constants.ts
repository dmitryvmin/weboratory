import { EditorState } from "@stores/EditorStore/types";

export const EditorInitialState: EditorState = {
  contentHistory: [],
  isEditMenuVisible: false,
  activeRecordIdx: undefined,
  cursorCoords: undefined,
  caretPos: undefined,
  staticMarkup: undefined,
  editMarkers: undefined,
};
