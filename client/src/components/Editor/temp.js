// Handle editor selection
// https://stackoverflow.com/questions/46109139/javascript-selectionchange-event-for-a-particular-element-only
// useEffect(() => {
//   const { current: editor } = editorRef;
//   if (!editor) {
//     return;
//   }
//   console.log("@@ EFFECT handleSelectionChange", caretPos);
//   editor.addEventListener("selectstart", handleEditorSelection);
//
//   return () => {
//     editor.removeEventListener("selectstart", handleEditorSelection);
//   };
// }, [
//   caretPos,
//   editorRef.current,
// ]);
//
// useEffect(() => {
//   console.log("@@ editorRef");
// }, [editorRef.current]);

// useEffect(() => {
//   const { current: editor } = editorRef;
//   if (!editor) {
//     return;
//   }
//
//   return () => {
//     document.removeEventListener("selectionchange", handleEditorSelection);
//     document.removeEventListener("mouseleave", handleEditorSelection);
//   };
// }, [contentHistory]);

// useEffect(() => {
//   const { current: editor } = editorRef;
//   if (!editor) {
//     return;
//   }
//
//   document.addEventListener("selectionchange", handleSelectionChange);
//
//   return () => {
//     document.removeEventListener("selectionchange", handleSelectionChange);
//   };
// }, [caretPos]);
//
//
// useEffect(() => {
//   const { current: editor } = editorRef;
//   if (!editor) {
//     return;
//   }
//
//   document.addEventListener("selectstart", handleSelectStart);
//
//   return () => {
//     document.removeEventListener("selectstart", handleSelectStart);
//   };
// }, [caretPos]);


// Filter out clicks that are outside the editor
// useEffect(() => {
//
//   function handleClick(ev) {
//     const { current: editor } = editorRef;
//     if (!editor) {
//       return;
//     }
//     isOutside.current = editor !== ev.target && !editor.contains(ev.target);
//   }
//
//   document.addEventListener("click", handleClick);
//
//   return () => {
//     document.removeEventListener("click", handleClick);
//   }
// }, []);

// function handleSelectionChange() {
//   const { current: editor } = editorRef;
//   if (!editor) {
//     return;
//   }
//
//   console.log("@@ handleSelectionChange");
//
//   // handleEditorSelection();
//
//   // document.addEventListener("selectionchange", handleEditorSelection);
//   //
//   // editor.addEventListener("mouseleave", () => {
//   //   document.removeEventListener("selectionchange", handleEditorSelection);
//   // });
// }

// const highlight = function(mutationsList, observer) {
//   for (let mutation of mutationsList) {
//     if (mutation.type === "childList") {
//       console.log("A child node has been added or removed.");
//       mutation.addedNodes.forEach((node) => {
//         if (node?.tagName === "PRE") {
//           hljs.highlightBlock(node);
//         }
//       });
//     }
//     else if (mutation.type === "attributes") {
//       console.log("The " + mutation.attributeName + " attribute was modified.");
//     }
//   }
// };

import { getSelectionCharacterOffsetWithin } from "@components/Editor/utils/getSelectionCharacterOffsetWithin";

// function handleEditorSelection() {
//
//   const { current: editor } = editorRef;
//   if (!editor) {
//     console.log(`No editor ref: ${editor}.`);
//     return;
//   }

  // const isClickOutside = editor !== ev.target && !editor.contains(ev.target);
  // console.log("isClickOutside", isClickOutside);
  // if (isClickOutside) {
  //   return;
  // }

  // const pos = getSelectionCharacterOffsetWithin(editor);
  // if (!pos) {
  //   console.log(`Couldn't get selection position: ${pos}.`);
  //   return;
  // }

  // if (JSON.stringify(pos) === JSON.stringify(caretPos)) {
  //   return;
  // }

  // console.log(`Handling editor selection. Caret position start: ${pos.start} end: ${pos.end}.`);

  // setCaretPos(pos);

  // const lastRecord = getActiveRecord(contentHistory, activeRecordIdx);
  // if (!lastRecord) {
  //   return;
  // }

  // const newRecord = {
  //   pos,
  //   html: record.html,
  // };

  // const cursorCoords = getCursorPosition();
  // setCursorCoords(cursorCoords);

  // const newRecord = makeNewRecord(lastRecord.html);
  // addNewRecordToState(setContentHistory, newRecord);

  // setContentHistory((state) => {
  //   return (
  //     [
  //       ...state,
  //       newRecord,
  //     ]
  //   );
  // });
// }

// Run highlight script when editor content is updated
// useEffect(() => {
//   const { current: editor } = editorRef;
//   if (!editor) {
//     return;
//   }
//   const config = { attributes: true, childList: true, subtree: true };
//   const observer = new MutationObserver(highlight);
//   observer.observe(editor, config);
//
//   return () => observer.disconnect();
//
// }, []);