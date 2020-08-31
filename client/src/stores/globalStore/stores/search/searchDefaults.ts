import { SearchStateType } from "@stores/globalStore/stores/search/types";

export const searchInitialState: SearchStateType = {
  searchMode: "CLOSED",
  searchedAddress: undefined,
};