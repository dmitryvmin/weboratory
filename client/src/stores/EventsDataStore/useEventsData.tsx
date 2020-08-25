// Libs
import { useContext } from "react";

// Store
import { EventsDataContext } from "@stores/EventsDataStore/EventsDataContext";

// Utils
import { getEventsForTimePeriodInterval } from "@components/Calendar/utils/getEventsForTimePeriodInterval";
import { generateEventsMockData } from "@components/Calendar/__mocks__/generateEventsMockData";
import { TimeTable } from "@components/Calendar/hooks/useTimeTable/TimeTable";

// Types
import { EventsDataState, UseEventsDataReturnType } from "@stores/EventsDataStore/types";
import { EventsDataMap } from "@components/Calendar/common/types";

/**
 * Calendar Data API Facade
 */
function useEventsData(): UseEventsDataReturnType {

  const [state, dispatch] = useContext(EventsDataContext);

  const {
    eventsData,
    intervalEventsDataMap,
  } = state;

  /**
   * =============== State Setters ===============
   */
  function setAllEventsData() {
    const mockData = generateEventsMockData();

    dispatch((s): EventsDataState => ({
      ...s,
      eventsData: mockData,
    }));
  }

  function setIntervalEventsDataMap(
    calendarTimePeriod,
    calendarDate,
    visibleSlideCount,
  ) {

    if (!eventsData || !eventsData.length) {
      return;
    }

    const _intervalEventsDataMap = getIntervalEventsDataMap(
      calendarTimePeriod,
      calendarDate,
      visibleSlideCount,
    );

    dispatch((s): EventsDataState => ({
      ...s,
      intervalEventsDataMap: _intervalEventsDataMap,
    }));
  }

  /**
   * =============== Utils ===============
   */
  function getIntervalEventsDataMap(
    calendarTimePeriod,
    calendarDate,
    visibleSlideCount,
  ): EventsDataMap {

    const { floorDate, ceilingDate } = TimeTable.getTimeTableDates({
      calendarTimePeriod,
      calendarDate,
      visibleSlideCount,
    });

    const eventsDataMap = getEventsForTimePeriodInterval({
      timePeriod: calendarTimePeriod,
      intervalStart: floorDate,
      intervalEnd: ceilingDate,
      eventsData,
    });

    console.log("@@ eventsDataMap", eventsData, eventsDataMap);

    return eventsDataMap;
  }

  /**
   * =============== Hook props ===============
   */
  return ({
    eventsData,
    intervalEventsDataMap,
    setAllEventsData,
    setIntervalEventsDataMap,
    getIntervalEventsDataMap,
  });
}

export { useEventsData };
