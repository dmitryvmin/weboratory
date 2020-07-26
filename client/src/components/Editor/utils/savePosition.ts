import {getPosition} from "./getPosition";
import {getSelection} from "@components/Editor/utils/getSelection";
import {TSelectionPosition} from "../types";

function saveSelection(editor): TSelectionPosition | undefined {

  const s = getSelection();
  if (!s) {
    return;
  }

  const pos = {
    start: 0,
    end: 0,
  } as TSelectionPosition;

  getPosition(editor, el => {

    if (
      el === s.anchorNode && // anchorNode - the Node in which the selection begins
      el === s.focusNode // focusNode - the Node in which the selection ends
    ) {
      pos.start += s.anchorOffset; // returns the number of characters that the selection's anchor is offset within the Selection.anchorNode
      pos.end += s.focusOffset; // returns the number of characters that the selection's focus is offset within the Selection.focusNode
      pos.dir = s.anchorOffset <= s.focusOffset ? "->" : "<-";
      return "stop";
    }

    if (el === s.anchorNode) {
      pos.start += s.anchorOffset;
      if (!pos.dir) {
        pos.dir = "->";
      }
      else {
        return "stop";
      }
    }
    else if (el === s.focusNode) {
      pos.end += s.focusOffset;
      if (!pos.dir) {
        pos.dir = "<-";
      }
      else {
        return "stop";
      }
    }

    if (el.nodeType === Node.TEXT_NODE) {
      if (pos.dir != "->") {
        pos.start += el.nodeValue!.length;
      }
      if (pos.dir != "<-") {
        pos.end += el.nodeValue!.length;
      }
    }
    else {
      console.log("@@ Not a text node.");
    }
  });

  return pos;
}

export {saveSelection};
