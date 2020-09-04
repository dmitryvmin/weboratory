// Constants
import { EventSearchCriteria } from "@stores/globalStore/stores/search/searchDefaults";
import { SEARCH_BY_ITEM_HEIGHT } from "@components/MapSearch/components/SearchByMenu/constants";

// Types
import { EventSearchCriteriaValue } from "@stores/globalStore/stores/search/types";

export function getItemIdx(value: EventSearchCriteriaValue) {
  for (let i = 0; i < EventSearchCriteria.length; i++) {
    const thisItem = EventSearchCriteria[i];
    if (thisItem.value === value) {
      return i;
    }
  }
}

export function getMenuOffsetForItem(itemIdx: number) {
  return (itemIdx === 0) ? itemIdx : -itemIdx * SEARCH_BY_ITEM_HEIGHT;
}

export function getItemY(searchBy: EventSearchCriteriaValue) {
  let activeIdx = getItemIdx(searchBy);

  if (activeIdx === undefined) {
    console.warn("Couldn't get idx for searchBy value:", searchBy);
    activeIdx = 0;
  }

  const offset = getMenuOffsetForItem(activeIdx);

  console.log("SCROLL INFO", "index", activeIdx, "offset", offset);
  return offset;
}