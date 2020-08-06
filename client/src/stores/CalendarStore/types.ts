import { Dispatch, ReactNode, SetStateAction } from "react";
import { TimeScaleEnum } from "@stores/CalendarStore/constants";

export type TimeScaleEnumKeys = typeof TimeScaleEnum;
export type TimeScaleEnumValues = TimeScaleEnumKeys[number];

export type TimeMarker = {
  start: Date;
  end: Date;
  idx: number,
}

export type ICalendarState = {
  timeScale: TimeScaleEnumValues;
  isOpen: boolean;
  centerTimeMarker: TimeMarker | undefined;
  xPosition: number;
};

export type ICalendarContext = [
  ICalendarState,
  Dispatch<SetStateAction<ICalendarState>>,
];

export type ICalendarProvider = {
  children: ReactNode;
}

export type TimeSegmentInfo = {
  segmentLabel: string;
  segmentCount: number
};

type UseCalendarFunction = {
  setCalendarIsOpen: any;
  zoomIn: any;
  zoomOut: any;
  isFirstPeriod: any;
  isLastPeriod: any;
  moveLeft: any;
  moveRight: any;
  setCenterTimeMarker: any;
}

export type UseCalendar = ICalendarState & UseCalendarFunction;

export type TypeTimeSegments = { [k: string]: TimeSegmentInfo };
