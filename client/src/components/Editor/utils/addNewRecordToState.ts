import { Dispatch, SetStateAction } from "react";
import { HistoryRecord } from "@components/Editor/types";

function addNewRecordToState(
  setContentHistory: Dispatch<SetStateAction<HistoryRecord[]>>,
  record?: HistoryRecord,
) {
  if (!record) {
    console.log(`@@ No new record to save to state: ${record}.`);
    return;
  }
  setContentHistory((state) => [
    ...state,
    record,
  ]);
}

export { addNewRecordToState };
