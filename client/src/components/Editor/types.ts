import { EditorService } from "@api/services";

export type TEditor = {
  content?: string;
  onEditorChange: any;
};

export type CursorPosition = {
  top: string;
  left: string;
}

export type Options = {
  tab: string;
}

export type HistoryRecord = {
  html: string;
  // pos: TSelectionPosition;
}

export type TSelectionPosition = {
  start: number;
  end: number;
  dir: "->" | "<-";
}

export type TEditMarker = {
  x: number;
  y: number;
  el: Element;
}
