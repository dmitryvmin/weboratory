import {getRange} from "./getRange";

function getCaretPosition(node): number | undefined {
  const range = getRange();
  if (!range) {
    return;
  }

  const preCaretRange: Range = range.cloneRange();
  const tmp: HTMLDivElement = document.createElement("div");
  let caretPosition: number;

  preCaretRange.selectNodeContents(node);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  tmp.appendChild(preCaretRange.cloneContents());
  caretPosition = tmp.innerHTML.length;

  return caretPosition;
}

export {getCaretPosition};
