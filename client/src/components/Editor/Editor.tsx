// Libs
import React, { FC, useEffect, useState, useRef } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import HtmlToReactParser from "html-to-react";
import ReactDOMServer from "react-dom/server";
import Tippy from "@tippyjs/react";

// Types
import { HistoryRecord, TEditMarker, TEditor, TSelectionPosition } from "./types";

// Styles
import styles from "./styles.module.scss";
import "highlight.js/styles/github.css";

// Utils
import { log } from "@utils/Logger";
import { usePortal } from "@utils/hooks/usePortal";

// Components
import { restorePosition } from "@components/Editor/utils/restorePosition";
import { getSelectionCharacterOffsetWithin } from "@components/Editor/utils/getSelectionCharacterOffsetWithin";
import { Button } from "@components/UI/Button";
import { getCaretPosition } from "@components/Editor/utils/getCaretPosition";
import { getCursorPosition } from "@components/Editor/utils/getCursorPosition";
import { defaultPosition } from "@components/Editor/constants";
import { makeNewRecord } from "@components/Editor/utils/makeNewRecord";
import { addNewRecordToState } from "@components/Editor/utils/addNewRecordToState";
import { getActiveRecord } from "@components/Editor/utils/getActiveRecord";
import { getLastContentRecord } from "@components/Editor/utils/getLastContentRecord";
import { getHtmlIdxFromTextIdx } from "@components/Editor/utils/getHtmlIdxFromTextIdx";
import { renderStaticMarkup } from "@components/Editor/utils/renderStaticMarkup";
import { useObservable } from "@utils/hooks/useObservable";
import { editorServiceSingleton } from "@api/services/editorService";

/**
 * Editor
 */
const Editor: FC<TEditor> = ({ content, onEditorChange }) => {

  /**
   * Local State
   */
    // Keeps track of the Editor history
  const [contentHistory, setContentHistory] = useState<HistoryRecord[]>([]);

  const [isEditMenuVisible, setIsEditMenuVisible] = useState<boolean>(false);

  const [activeRecordIdx, setActiveRecordIdx] = useState<number>(0);

  const [cursorCoords, setCursorCoords] = useState<DOMRect | ClientRect | undefined>(undefined);

  const [caretPos, setCaretPos] = useState<TSelectionPosition>(defaultPosition);

  const [staticMarkup, setStaticMarkup] = useState<string>("");

  const [editMarkers, setEditMarkers] = useState<TEditMarker[]>([]);

  /**
   * Hooks
   */
    // Ref to the Editor div
  const editorRef = useRef<HTMLDivElement>(null);

  // const editorState$ = useObservable(editorServiceSingleton.onEditorState());
  // const editorContent$ = useObservable(editorServiceSingleton.onEditorContent());

  const { Portal } = usePortal();

  // const isOutside = useRef<boolean>(false);

  /**
   * Effects
   */
  // Remove spellcheck styling
  useEffect(() => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.setAttribute("spellcheck", "false");
  }, [editorRef]);

  // Configure highlighter.js library after component mounts
  useEffect(() => {
    hljs.configure({
      useBR: true,
    });
    hljs.registerLanguage("javascript", javascript);
  }, []);

  // Update editor with state from props on mount
  useEffect(() => {
    if (content === undefined) {
      return;
    }
    // Add content to local state
    const record = makeNewRecord(content);
    addNewRecordToState(setContentHistory, record);
  }, [content]);

  // After editor html has been updated
  // 1. restore the cursor to the previous position
  // 2. update the observable state
  useEffect(() => {
    const { current: editor } = editorRef;
    if (!editor) {
      console.log(`@@ Couldn't retrieve editor ref: ${editor}.`);
      return;
    }

    const record = getLastContentRecord(contentHistory);
    if (!record) {
      console.log(`@@ Couldn't retrieve last record: ${record}.`);
      return;
    }

    restorePosition(caretPos, editor);

  }, [
    caretPos,
    staticMarkup,
  ]);

  useEffect(() => {

    const record = getActiveRecord(contentHistory, activeRecordIdx);
    if (!record) {
      return;
    }

    const markup = renderStaticMarkup(record);
    if (!markup) {
      return;
    }

    setStaticMarkup(markup);

  }, [
    contentHistory,
    activeRecordIdx,
  ]);

  // Update editor observable with latest content
  useEffect(() => {
    const record = getActiveRecord(contentHistory, activeRecordIdx);
    if (!record) {
      return;
    }
    onEditorChange(record.html);
  }, [contentHistory]);

  useEffect(() => {
    const { current: editor } = editorRef;
    if (!editor) {
      console.log(`@@ Couldn't retrieve editor ref: ${editor}.`);
      return;
    }

    const markers: TEditMarker[] = [];

    Array.from(editor.children).forEach((el) => {
      if (el.nodeName === "PRE") {
        hljs.highlightBlock(el);
      }
      if (el.nodeName !== "BR" && el.nodeName !== "#text") {
        const { x, y } = el.getBoundingClientRect();
        const marker = {
          x: x,
          y: y,
          el,
        };

        markers.push(marker);
      }
    });

    setEditMarkers(markers);

  }, [staticMarkup]);


  /**
   * Editor Handlers
   */
  function insertCodeBlock() {
    const { current: editor } = editorRef;
    if (!editor) {
      return;
    }

    const record = getLastContentRecord(contentHistory);
    if (!record) {
      return;
    }

    const pos = getCaretPosition(editor);
    if (!pos) {
      return;
    }

    const insertedHtml = `<pre><code><span className="language-javascript">function test() {console.log("hello");}</span></code></pre>`;

    const html = record.html.slice(0, pos) + insertedHtml + record.html.slice(pos);

    const newRecord = makeNewRecord(html);
    if (!newRecord) {
      return;
    }

    addNewRecordToState(setContentHistory, newRecord);
  }

  function insertElIntoHtml(
    html: string,
    el: any,
    start: number,
    end?: number,
  ) {
    return html.slice(0, start) + el + html.slice(end ?? start);
  }

  function convertSelectionTo(style) {
    return function() {
      const { current: editor } = editorRef;
      if (!editor) {
        return;
      }
      const { html } = getActiveRecord(contentHistory, activeRecordIdx);
      const { start, end } = caretPos;
      const [from, to] = [start, end].sort((a, b) => a - b);
      let newHtml;

      switch (style) {
        case "H1":
          const selected = (to > from) ? editor.innerText.slice(from, to) : "Header";
          const [htmlFrom, htmlTo] = getHtmlIdxFromTextIdx(from, to, editor.innerText, html);
          if (!htmlFrom || !htmlTo) {
            const htmlPos = getCaretPosition(editor);
            if (!htmlPos) {
              return;
            }
            newHtml = insertElIntoHtml(
              html,
              `<h1 className="${styles.editorStyleH1}">${selected}</h1>`,
              htmlPos,
              htmlPos,
            );
          }
          else {
            newHtml = insertElIntoHtml(
              html,
              `<h1 className="${styles.editorStyleH1}">${selected}</h1>`,
              htmlFrom,
              htmlTo,
            );
          }
          break;
      }

      const newRecord = makeNewRecord(newHtml);
      addNewRecordToState(setContentHistory, newRecord);

      setIsEditMenuVisible(false);
    };
  }

  /**
   * Event Handlers
   */

  function setRecordIdx(idx: number) {
    return function() {
      setActiveRecordIdx(activeRecordIdx + idx);
    };
  }

  function handleEditorOnKeyDown(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      document.execCommand("insertHTML", false, "<br/>");
      return;
    }
  }

  function handleEditorOnKeyUp(ev) {
    const { current: editor } = editorRef;
    if (!editor) {
      return;
    }

    if (ev.key === "Enter") {
      return;
    }

    const html = ev.target.innerHTML;
    const pos = getSelectionCharacterOffsetWithin(editor);

    if (!pos) {
      console.log(`Missing pos ${pos}.`);
      return;
    }
    if (html === undefined) {
      console.log(`Missing html ${html}.`);
      return;
    }

    const lastRecord = getLastContentRecord(contentHistory);
    if (lastRecord?.html === html) {
      return;
    }

    setCaretPos(pos);

    if (isEditMenuVisible) {
      setIsEditMenuVisible(false);
    }

    const newRecord = makeNewRecord(html);
    addNewRecordToState(setContentHistory, newRecord);

    setActiveRecordIdx(0);
  }

  function handleEditorOnClick(ev) {
    console.log(`Editor was clicked.`);

    // const cursorCoords = getCursorPosition();
    // setCursorCoords(cursorCoords);

    // handleEditorSelection();
  }

  function handleOnMouseUp() {
    const { current: editor } = editorRef;
    if (!editor) {
      console.log(`No editor ref: ${editor}.`);
      return;
    }

    const pos = getSelectionCharacterOffsetWithin(editor);
    if (!pos) {
      console.log(`Couldn't get selection position: ${pos}.`);
      return;
    }

    console.log(`Handling onMouseUp. Caret position start: ${pos.start} end: ${pos.end}.`);
    setCaretPos(pos);

    const cursorCoords = getCursorPosition();
    setCursorCoords(cursorCoords);
  }

  function handleOnPaste(ev) {
    ev.preventDefault();

    const { current: editor } = editorRef;
    if (!editor) {
      return;
    }

    const data = ev.clipboardData.getData("text/plain");
    if (!data) {
      return;
    }

    const caretPosition = getCaretPosition(editor);
    if (!caretPosition) {
      return;
      ;
    }
    const activeRecord = getActiveRecord(contentHistory, activeRecordIdx);
    const newHtml = insertElIntoHtml(activeRecord.html, data, caretPosition);
    const newRecord = makeNewRecord(newHtml);
    addNewRecordToState(setContentHistory, newRecord);
  }

  function toggleEditMenu() {
    setIsEditMenuVisible(!isEditMenuVisible);
  }

  /**
   * Render functions
   */


  // function renderEditMenu() {
  //   if (!isEditMenuVisible || !cursorCoords) {
  //     return null;
  //   }
  //
  //   const {x, y} = cursorCoords as DOMRect;
  //   const style = {
  //     transform: `translate3d(${x - 60}px, ${y - 40}px, 0)`,
  //   };
  //
  //   console.log("@@ Rendering Edit Menu.");
  //
  //   return (
  //     <Portal>
  //       <div className={styles.editMenu} style={style}>
  //         <div onClick={convertSelectionTo("H1")} className={styles.editMenuButton}>H1</div>
  //         <div onClick={insertCodeBlock} className={styles.editMenuButton}>Code</div>
  //       </div>
  //     </Portal>
  //   );
  // }

  // function handleSave() {
  //   const record = getActiveRecord(contentHistory, activeRecordIdx);
  //   editorState.setEditorContent({ content: record.html });
  //   // TODO: pass save event with rxjs
  //   onSave(record.html);
  // }

  function handleEditMarker(marker: TEditMarker, idx: number) {
    return function() {

      // Remove element from editor
      const activeRecord = getActiveRecord(contentHistory, activeRecordIdx);
      const htmlToReactParser = new HtmlToReactParser.Parser();
      const editorEls = htmlToReactParser.parse(activeRecord.html);
      let idxCount = 0;
      const newEditorEls = editorEls.filter(({ key, type }) => {
        if (!key || type === "br") {
          return true;
        }
        else {
          if (idxCount === idx) {
            idxCount++;
            return false;
          }
          else {
            idxCount++;
            return true;
          }
        }
      });
      const staticMarkup = ReactDOMServer.renderToStaticMarkup(newEditorEls);
      const newRecord = makeNewRecord(staticMarkup);
      addNewRecordToState(setContentHistory, newRecord);

      // Reset active record idx
      setActiveRecordIdx(0);

      // Remove marker from state
      setEditMarkers((state) => {
        return state.splice(idx, 1);
      });
    };
  }

  function renderEditMarkers() {
    if (!isEditMenuVisible) {
      return;
    }
    return (
      <Portal bindTo={document.getElementById("root")}>
        {editMarkers.map((m, idx) => {

          const style = {
            transform: `translate3d(${m.x + 4}px, ${m.y - 15}px, 0)`,
          };

          return (
            <div
              key={`editMarker-${idx}`}
              onClick={handleEditMarker(m, idx)}
              className={styles.editMarker}
              style={style}
            >
              <div/>
            </div>
          );
        })}
      </Portal>
    );
  }

  /**
   * Render
   */
  return (
    <div className={styles.editorContainer}>
      {renderEditMarkers()}
      {/*{renderEditMenu()}*/}
      <div className={styles.editorMenu}>
        <Button onClick={toggleEditMenu}>Edit</Button>
        <Button
          disabled={contentHistory.length < 2}
          onClick={setRecordIdx(-1)}
        >
          Back
        </Button>
        <Button
          disabled={activeRecordIdx > -1}
          onClick={setRecordIdx(1)}
        >
          Forward
        </Button>
        {/*<Button onClick={toggleEditMenu}>*/}
        {/*  Edit Menu {isEditMenuVisible ? "on" : "off"}*/}
        {/*</Button>*/}
        <Button onClick={convertSelectionTo("H1")}>H1</Button>
        <Button onClick={insertCodeBlock}>Code</Button>
      </div>
      <div
        id="editor"
        contentEditable={true}
        className={styles.editor}
        ref={editorRef}
        suppressContentEditableWarning={true}
        onKeyUp={handleEditorOnKeyUp}
        onKeyDown={handleEditorOnKeyDown}
        onMouseUp={handleOnMouseUp}
        onPaste={handleOnPaste}
        // onClick={handleEditorOnClick}
        dangerouslySetInnerHTML={{ __html: staticMarkup }}
      />
    </div>
  );
};

Editor.displayName = "Editor";

export { Editor };
