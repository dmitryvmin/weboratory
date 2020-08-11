// Libs
import { Dispatch, ReactNode, SetStateAction } from "react";

// App
import { ValueOf } from "@utils/TS";
import { TimeScaleMap } from "@stores/CalendarStore/constants";
import { CalendarEvent } from "@components/Calendar/types";

// export type TimeScaleEnumKeys = keyof typeof TimeScaleEnum;
// export type TimeScaleEnumValues = ValueOf<typeof TimeScaleEnum>;

export type TimeScaleKeys = typeof TimeScaleMap;
export type TimeScaleValues = TimeScaleKeys[number];
export type TimeSegmentMapInterface = { [arg: string]: TimeScaleValues };
export type TimeFormatMapInterface = { [arg: string]: string };

export type TimeMarker = {
  start: Date;
  end: Date;
}

export type DateMap = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  // second: number;
}

export type CalendarState = {
  timeScale: TimeScaleValues;
  isOpen: boolean;
  xPosition: number;
  calendarMarker: Date;
  intervalData: CalendarEvent[] | undefined;
  // sliderRef: HTMLDivElement | null;
};

export type CalendarContextInterface = [
  CalendarState,
  Dispatch<SetStateAction<CalendarState>>,
];

export type CalendarProviderInterface = {
  children: ReactNode;
}

export type TimeSegmentInfo = {
  segmentPeriod: TimeScaleValues;
};

type UseCalendarFunction = {
  setCalendarIsOpen: any;
  zoomIn: any;
  zoomOut: any;
  isFirstPeriod: any;
  isLastPeriod: any;
  moveLeft: any;
  moveRight: any;
  setCalendarMarker: any;
  setIntervalData: any;
  // setSliderRef: any;
}

export type UseCalendar = CalendarState & UseCalendarFunction;

export type TimeSegments = { [k: string]: string};
