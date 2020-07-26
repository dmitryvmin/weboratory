import { HistoryRecord } from "@components/Editor/types";

function getActiveRecord(
  contentHistory: HistoryRecord[],
  activeRecordIdx: number,
  ) {
  return contentHistory[contentHistory.length - 1 + activeRecordIdx];
}

export {getActiveRecord};
