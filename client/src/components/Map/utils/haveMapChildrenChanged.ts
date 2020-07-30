import { log } from "@utils/Logger";

/**
 * Checks whether Map component children types have changed
 * to determine whether the Map component should rerender
 */
const haveMapChildrenChanged = (
  nextChildren: any,
  prevChildren?: any,
) => {

  let haveChanged = false;

  // If prev children have not been set, the map should re-render
  if (!prevChildren && nextChildren) {
    haveChanged = true;
  }
  if (!!prevChildren && !!nextChildren) {

    // Compare maps previous and next child elements
    if (prevChildren.key !== nextChildren.key) {
      haveChanged = true;
    }

    // Compare maps previous and next child element[]
    else {

      const prevChildrenF = prevChildren.flat();
      const nextChildrenF = nextChildren.flat();

      // Compare maps previous and next child elements
      for (let i = 0; i < nextChildrenF.length; i++) {

        const prevEl = prevChildrenF[i];
        const nextEl = nextChildrenF[i];

        // For quick diff, first compare types
        if (typeof prevEl !== typeof nextEl) {
          haveChanged = true;
          break;
        }

        // For comparing Element and Elements[], compare the keys
        if (
          prevEl?.key && nextEl?.key &&
          prevEl?.key === nextEl?.key
        ) {
          haveChanged = true;
          break;
        }
        if (
          Array.isArray(prevEl) && prevEl[0] &&
          Array.isArray(nextEl) && nextEl[0] &&
          prevEl[0].key !== nextEl[0].key
        ) {
          haveChanged = true;
          break;
        }
      }
    }
  }

  return haveChanged;
};

export { haveMapChildrenChanged };
