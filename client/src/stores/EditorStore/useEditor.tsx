// Libs
import { useContext, useState } from "react";

// Editor store
import { IEditorContext, UseEditor } from "./types";
import { HistoryRecord, TEditMarker, TSelectionPosition } from "@components/Editor/types";
import { defaultPosition } from "@components/Editor/constants";
import { EditorContext } from "./index";

/**
 * Map context facade
 */
const useEditor = (): UseEditor => {

  /**
   * ==================== Hooks ====================
   */
  const [
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
  ] = useContext<IEditorContext>(EditorContext);


  /**
   * ==================== State Setters ====================
   */


  /**
   * ==================== Public functions ====================
   */
  function setRecordIdx(idx: number) {
    return function() {
      setActiveRecordIdx(activeRecordIdx + idx);
    };
  }


  /**
   * Return map state and public utilities
   */
  return ({
    contentHistory,
    isEditMenuVisible,
    activeRecordIdx,
    cursorCoords,
    caretPos,
    staticMarkup,
    editMarkers,

    // State Setters
    setContentHistory,
    setIsEditMenuVisible,
    setActiveRecordIdx,
    setCursorCoords,
    setCaretPos,
    setStaticMarkup,
    setEditMarkers,

    // Public functions
    setRecordIdx,
  });
};

export { useEditor };
