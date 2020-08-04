// Libs
import React, { FC, useState } from "react";

// Map store
import { EditorContext } from "./EditorContext";
import { EditorState, IEditorProvider } from "@stores/EditorStore/types";
import { HistoryRecord, TEditMarker, TSelectionPosition } from "@components/Editor/types";
import { defaultPosition } from "@components/Editor/constants";

/**
 * Map Context Provider
 */
const EditorProvider: FC<IEditorProvider> = ({ children }) => {

  const [contentHistory, setContentHistory] = useState<HistoryRecord[]>([]);

  const [isEditMenuVisible, setIsEditMenuVisible] = useState<boolean>(false);

  const [activeRecordIdx, setActiveRecordIdx] = useState<number>(0);

  const [cursorCoords, setCursorCoords] = useState<DOMRect | ClientRect | undefined>(undefined);

  const [caretPos, setCaretPos] = useState<TSelectionPosition>(defaultPosition);

  const [staticMarkup, setStaticMarkup] = useState<string>("");

  const [editMarkers, setEditMarkers] = useState<TEditMarker[]>([]);

  return (
    <EditorContext.Provider value={[
      {
        contentHistory,
        isEditMenuVisible,
        activeRecordIdx,
        cursorCoords,
        caretPos,
        staticMarkup,
        editMarkers,
      },
      {
        setContentHistory,
        setIsEditMenuVisible,
        setActiveRecordIdx,
        setCursorCoords,
        setCaretPos,
        setStaticMarkup,
        setEditMarkers,
      },
    ]}>
      {children}
    </EditorContext.Provider>
  );
};

export { EditorProvider };
