import { HistoryRecord } from "@components/Editor/types";

function makeNewRecord(html: string): HistoryRecord {
  return {
    html,
  };
}

export { makeNewRecord };
