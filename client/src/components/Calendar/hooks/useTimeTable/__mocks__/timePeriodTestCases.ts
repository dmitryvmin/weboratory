import { TimePeriod } from "@components/Calendar/common/types";
import { TestDateMapsType, getTestDateMaps } from "@components/Calendar/hooks/useTimeTable/utils/getTestDateMaps";

type TimePeriodTestCaseType = {
  timePeriod: TimePeriod;
  dateMaps: TestDateMapsType;
  path: TimePeriod[];
}

const timePeriodTestCases: TimePeriodTestCaseType[] = [
  {
    timePeriod: "YEAR",
    dateMaps: getTestDateMaps("YEAR"),
    path: ["YEAR"],
  },
  {
    timePeriod: "MONTH",
    dateMaps: getTestDateMaps("MONTH"),
    path: ["YEAR", "MONTH"],
  },
  {
    timePeriod: "DAY",
    dateMaps: getTestDateMaps("DAY"),
    path: ["YEAR", "MONTH", "DAY"],
  },
];

export { timePeriodTestCases };