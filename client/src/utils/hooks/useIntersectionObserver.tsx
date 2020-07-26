import React, { useEffect, useState } from "react";

export type IIntersectionObserverHook = {
  threshold: number;
  root?: any;
  rootMargin?: any;
}

const useIntersectionObserver = (
  ref,
  { threshold, root, rootMargin }: IIntersectionObserverHook,
) => {
  // configure the state
  const [state, setState] = useState<any>({
    inView: false,
    triggered: false,
    entry: undefined,
  });

  const observer = new IntersectionObserver(
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
        observerInstance.unobserve(ref.current);
      }
      return;
    },
    {
      threshold: threshold || 0,
      root: root || null,
      rootMargin: rootMargin || "0%",
    },
  );

  useEffect(() => {
    // check that the element exists, and has not already been triggered
    if (ref.current && !state.triggered) {
      observer.observe(ref.current);
    }
  });

  return [state.inView, state.entry];
};

export { useIntersectionObserver };