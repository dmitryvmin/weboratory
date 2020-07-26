import { getSelection } from "./getSelection";
import { getRange } from "./getRange";
import { TSelectionPosition } from "@components/Editor/types";

function getSelectionCharacterOffsetWithin(element): TSelectionPosition | undefined {
  let start = 0;
  let end = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;

  const sel = getSelection();

  if (!sel) {
    // else if ((sel = doc.selection) && sel.type != "Control") {
    //   const textRange = sel.createRange();
    //   const preCaretTextRange = doc.body.createTextRange();
    //   preCaretTextRange.moveToElementText(element);
    //   preCaretTextRange.setEndPoint("EndToStart", textRange);
    //   start = preCaretTextRange.text.length;
    //   preCaretTextRange.setEndPoint("EndToEnd", textRange);
    //   end = preCaretTextRange.text.length;
    // }
    return;
  }

  const range = getRange(sel);
  if (!range) {
    return;
  }

  const dir = sel.anchorOffset <= sel.focusOffset ? "->" : "<-";
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.startContainer, range.startOffset);
  start = preCaretRange.toString().length;
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  end = preCaretRange.toString().length;

  return { start, end, dir };
}

export { getSelectionCharacterOffsetWithin };
