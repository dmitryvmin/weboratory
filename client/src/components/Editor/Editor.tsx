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
import { editorServiceSingleton } from "@api/services/EditorService";
import { useEditor } from "@components/Editor/EditorStore";

/**
 * Editor
 */
const Editor: FC<TEditor> = ({ content, onEditorChange }) => {

  /**
   * ========== Context hooks
   */
  const
    {
      contentHistory,
      isEditMenuVisible,
      activeRecordIdx,
      cursorCoords,
      caretPos,
      staticMarkup,
      editMarkers,
      setContentHistory,
      setIsEditMenuVisible,
      setActiveRecordIdx,
      setCursorCoords,
      setCaretPos,
      setStaticMarkup,
      setEditMarkers,
    } = useEditor();

  // const editorState$ = useObservable(editorServiceSingleton.onEditorState());
  // const editorContent$ = useObservable(editorServiceSingleton.onEditorContent());

  /**
   * ========== Component hooks
   */
    // Ref to the Editor div
  const editorRef = useRef<HTMLDivElement>(null);

  /**
   * ========== Util hooks
   */
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

  function insertElIntoHtml(
    html: string,
    el: any,
    start: number,
    end?: number,
  ) {
    return html.slice(0, start) + el + html.slice(end ?? start);
  }

  /**
   * Event Handlers
   */
  function handleEditorOnKeyDown(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      document.execCommand("insertHTML", false, "<br/> ");
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
    <>
      {renderEditMarkers()}
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
    </>
  );
};

Editor.displayName = "Editor";

export { Editor };
