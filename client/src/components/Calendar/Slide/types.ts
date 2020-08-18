import { CalendarEvent, TimeMarker, TimePeriod } from "@components/Calendar/store/types";

export type SlideProps = {
  timeScale: TimePeriod;
  data: CalendarEvent[];
  marker: TimeMarker;
};
