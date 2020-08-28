import { CalendarMode } from "@stores/globalStore/stores/calendar/types";

export function deriveCalMode(
  calMode: CalendarMode,
  isOpen: boolean,
): CalendarMode | undefined {

  if (calMode === "CLOSED") {
    if (isOpen) {
      return "DOCKED";
    }
  }
  if (calMode === "DOCKED") {
    if (isOpen) {
      return "FULLSCREEN";
    }
    else {
      return "CLOSED";
    }
  }
  if (calMode === "FULLSCREEN") {
    if (!isOpen) {
      return "DOCKED";
    }
  }
}
