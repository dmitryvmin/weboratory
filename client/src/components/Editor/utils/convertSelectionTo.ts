import { getActiveRecord } from "@components/Editor/utils/getActiveRecord";
import { getHtmlIdxFromTextIdx } from "@components/Editor/utils/getHtmlIdxFromTextIdx";
import { getCaretPosition } from "@components/Editor/utils/getCaretPosition";
import styles from "@components/Editor/styles.module.scss";
import { makeNewRecord } from "@components/Editor/utils/makeNewRecord";
import { addNewRecordToState } from "@components/Editor/utils/addNewRecordToState";

function convertSelectionTo(style) {
    // const { current: editor } = editorRef;
    // if (!editor) {
    //   return;
    // }
    // const { html } = getActiveRecord(contentHistory, activeRecordIdx);
    // const { start, end } = caretPos;
    // const [from, to] = [start, end].sort((a, b) => a - b);
    // let newHtml;
    //
    // switch (style) {
    //   case "H1":
    //     const selected = (to > from) ? editor.innerText.slice(from, to) : "Header";
    //     const [htmlFrom, htmlTo] = getHtmlIdxFromTextIdx(from, to, editor.innerText, html);
    //     if (!htmlFrom || !htmlTo) {
    //       const htmlPos = getCaretPosition(editor);
    //       if (!htmlPos) {
    //         return;
    //       }
    //       newHtml = insertElIntoHtml(
    //         html,
    //         `<h1 className="${styles.editorStyleH1}">${selected}</h1>`,
    //         htmlPos,
    //         htmlPos,
    //       );
    //     }
    //     else {
    //       newHtml = insertElIntoHtml(
    //         html,
    //         `<h1 className="${styles.editorStyleH1}">${selected}</h1>`,
    //         htmlFrom,
    //         htmlTo,
    //       );
    //     }
    //     break;
    // }
    //
    // const newRecord = makeNewRecord(newHtml);
    // addNewRecordToState(setContentHistory, newRecord);
    //
    // setIsEditMenuVisible(false);
}

export {convertSelectionTo};