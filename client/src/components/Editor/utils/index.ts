/**
 * Returns selected text.
 */
export function selectedText() {
  const s = window.getSelection()!;
  if (s.rangeCount === 0) return "";
  return s.getRangeAt(0).toString();
}

/**
 * Returns text before the cursor.
 * @param editor Editor DOM node.
 */
export function textBeforeCursor(editor: Node) {
  const s = window.getSelection()!;
  if (s.rangeCount === 0) return "";

  const r0 = s.getRangeAt(0);
  const r = document.createRange();
  r.selectNodeContents(editor);
  r.setEnd(r0.startContainer, r0.startOffset);
  return r.toString();
}

/**
 * Returns text after the cursor.
 * @param editor Editor DOM node.
 */
export function textAfterCursor(editor: Node) {
  const s = window.getSelection()!;
  if (s.rangeCount === 0) return "";

  const r0 = s.getRangeAt(0);
  const r = document.createRange();
  r.selectNodeContents(editor);
  r.setStart(r0.endContainer, r0.endOffset);
  return r.toString();
}