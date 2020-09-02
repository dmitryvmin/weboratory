import React, { useCallback, useEffect, useMemo, useState } from "react";

export type IIntersectionObserverHook = {
  threshold: number;
  root?: any;
  rootMargin?: any;
}

const useIntersectionObserver = (
  ref: any,
  { threshold, root, rootMargin }: IIntersectionObserverHook,
) => {

  // configure the state
  const [state, setState] = useState<any>({
    inView: false,
    triggered: false,
    entry: undefined,
  });

  const observer = useMemo(() => {
    if (!ref || !root) {
      return;
    }
    return createObserver();
  }, [ref, root])

  function createObserver(){
    return new IntersectionObserver(
      (entries, observerInstance) => {
        // checks to see if the element is intersecting
        if (entries[0].intersectionRatio > 0) {
          // if it is update the state, we set triggered as to not re-observe the element
          setState({
            inView: true,
            triggered: true,
            entry: observerInstance,
          });
          // unobserve the element
          observerInstance?.unobserve(ref);
        }
        return;
      },
      {
        threshold: threshold || 0,
        root: root || null,
        rootMargin: rootMargin || "0%",
      },
    );
  }

  useEffect(() => {
    // check that the element exists, and has not already been triggered
    if (ref && !state.triggered && observer) {
      observer.observe(ref);
    }
  }, [ref, root]);

  return [state.inView, state.entry];
};

export { useIntersectionObserver };