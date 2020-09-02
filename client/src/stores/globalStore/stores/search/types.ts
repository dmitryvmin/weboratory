export type SearchStateType = {
  searchMode: SearchModeType;
  searchedAddress: SearchedAddressType | undefined;
  searchBy: EventSearchCriteriaValue;
};

export type SearchModeType = "CLOSED" | "OPEN";

export type SearchedAddressType = string;

export type EventSearchCriteriaLabel =  "@ address" | "# tags" | "ⓘ info";

export type EventSearchCriteriaValue = "address" | "tags" | "info";

export type EventSearchCriterium = {
  label: EventSearchCriteriaLabel;
  value: EventSearchCriteriaValue;
}