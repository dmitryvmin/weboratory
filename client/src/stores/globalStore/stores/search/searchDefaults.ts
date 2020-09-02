import { EventSearchCriterium, SearchStateType } from "@stores/globalStore/stores/search/types";

export const searchInitialState: SearchStateType = {
  searchMode: "OPEN",
  searchedAddress: undefined,
  searchBy: "tags",
};

export const EventSearchCriteria: EventSearchCriterium[] = [
  {
    label: "@ address",
    value: "address",
  },
  {
    label: "# tags",
    value: "tags",
  },
  {
    label: "ⓘ info",
    value: "info",
  },
];
