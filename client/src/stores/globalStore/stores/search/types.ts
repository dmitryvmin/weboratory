export type SearchMode = "CLOSED" | "OPEN";

export type SearchStateType = {
  searchMode: SearchMode;
  searchedAddress: string | undefined;
};