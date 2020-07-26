import { getRange } from "./getRange";

/**
 * Returns position of cursor on the page.
 * @param toStart Position of beginning of selection or end of selection.
 */
function getCursorPosition(toStart = true): DOMRect | ClientRect | undefined {

  const range = getRange();
  if (!range) {
    return;
  }

  const cursor = document.createElement("span");
  cursor.textContent = "|";

  range.cloneRange();
  range.collapse(toStart);
  range.insertNode(cursor);

  const rect = cursor.getBoundingClientRect();
  // const { x, y, height } = rect;
  // const top = (window.scrollY + y + height) + "px";
  // const left = (window.scrollX + x) + "px";
  cursor.parentNode?.removeChild(cursor);

  return rect;
}

export { getCursorPosition };
