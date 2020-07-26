import { HistoryRecord } from "@components/Editor/types";

function getLastContentRecord(contentHistory: HistoryRecord[]): HistoryRecord | undefined {
  return contentHistory[contentHistory.length - 1];
}

export {getLastContentRecord};
