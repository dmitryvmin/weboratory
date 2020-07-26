import { getSelection } from "./getSelection";

function getRange(sel = getSelection()): Range | undefined {
  if (!sel) {
    return;
  }

  if (sel.rangeCount < 1) {
    return;
  }

  return sel.getRangeAt(0);
}

export { getRange };
