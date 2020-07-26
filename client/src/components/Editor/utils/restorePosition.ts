import { getPosition } from "./getPosition";
import { TSelectionPosition } from "../types";

function restorePosition(pos: TSelectionPosition, editorRef: HTMLDivElement) {
  const s = window.getSelection()!;
  let startNode: Node | undefined;
  let startOffset = 0;
  let endNode: Node | undefined;
  let endOffset = 0;

  let dir;
  let start;
  let end;

  if (!pos.dir) {
    dir = "->";
  }
  else {
    dir = pos.dir;
  }

  // Flip start and end if the direction reversed
  if (dir === "<-") {
    start = pos.end;
    end = pos.start;
  }

  if (pos.start < 0) {
    start = 0;
  }
  else {
    start = pos.start;
  }

  if (pos.end < 0) {
    end = 0;
  }
  else {
    end = pos.end;
  }

  let current = 0;

  getPosition(editorRef, (el: Node) => {
    if (el.nodeType !== Node.TEXT_NODE) {
      return;
    }

    const len = el.nodeValue?.length ?? 0;

    if (current + len >= start) {
      if (!startNode) {
        startNode = el;
        startOffset = start - current;
      }
      if (current + len >= end) {
        endNode = el;
        endOffset = end - current;
        return "stop";
      }
    }

    current += len;
  });

  // If everything deleted place cursor at editor
  if (!startNode) {
    startNode = editorRef;
  }
  if (!endNode) {
    endNode = editorRef;
  }

  // Flip back the selection
  if (pos.dir == "<-") {
    [startNode, startOffset, endNode, endOffset] = [endNode, endOffset, startNode, startOffset];
  }

  if (!startNode || !endNode) {
    return;
  }

  try {
    s.setBaseAndExtent(startNode, startOffset, endNode, endOffset);
  }
  catch(err) {
    console.log(`Couldn't restore position: ${err}`);
  }
}

export { restorePosition };
