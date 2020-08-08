import { TimeMarker, TimeScaleValues } from "@stores/CalendarStore/types";
import { CalendarEvent } from "@components/Calendar/types";

export type SlideProps = {
  timeScale: TimeScaleValues;
  data: CalendarEvent[];
  marker: TimeMarker;
};
