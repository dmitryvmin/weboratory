import { TimeMarker, TimePeriod } from "@stores/CalendarStore/types";
import { CalendarEvent } from "@components/Calendar/types";

export type SlideProps = {
  timeScale: TimePeriod;
  data: CalendarEvent[];
  marker: TimeMarker;
};
