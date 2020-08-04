import { getLastContentRecord } from "@components/Editor/utils/getLastContentRecord";
import { getCaretPosition } from "@components/Editor/utils/getCaretPosition";
import { makeNewRecord } from "@components/Editor/utils/makeNewRecord";
import { addNewRecordToState } from "@components/Editor/utils/addNewRecordToState";

function insertCodeBlock() {
  // const { current: editor } = editorRef;
  // if (!editor) {
  //   return;
  // }
  //
  // const record = getLastContentRecord(contentHistory);
  // if (!record) {
  //   return;
  // }
  //
  // const pos = getCaretPosition(editor);
  // if (!pos) {
  //   return;
  // }
  //
  // const insertedHtml = `<pre><code><span className="language-javascript">function test() {console.log("hello");}</span></code></pre>`;
  //
  // const html = record.html.slice(0, pos) + insertedHtml + record.html.slice(pos);
  //
  // const newRecord = makeNewRecord(html);
  // if (!newRecord) {
  //   return;
  // }
  //
  // addNewRecordToState(setContentHistory, newRecord);
}

export {insertCodeBlock};
