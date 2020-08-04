import { Dispatch, ReactNode, SetStateAction } from "react";

export type EditorState = {
  contentHistory: any;
  isEditMenuVisible: any;
  activeRecordIdx: any;
  cursorCoords: any;
  caretPos: any;
  staticMarkup: any;
  editMarkers: any;
}

export type IEditorContext = [
  EditorState,
  {
    setContentHistory: Dispatch<SetStateAction<any>>;
    setIsEditMenuVisible: Dispatch<SetStateAction<any>>;
    setActiveRecordIdx: Dispatch<SetStateAction<any>>;
    setCursorCoords: Dispatch<SetStateAction<any>>;
    setCaretPos: Dispatch<SetStateAction<any>>;
    setStaticMarkup: Dispatch<SetStateAction<any>>;
    setEditMarkers: Dispatch<SetStateAction<any>>;
  },
];

export type IEditorProvider = {
  children?: ReactNode;
}

export type UseEditorFns = {
  setContentHistory: any;
  setIsEditMenuVisible: any;
  setActiveRecordIdx: any;
  setCursorCoords: any;
  setCaretPos: any;
  setStaticMarkup: any;
  setEditMarkers: any;
  // Public fns
  setRecordIdx: any;
}

export type UseEditor = UseEditorFns & EditorState;
