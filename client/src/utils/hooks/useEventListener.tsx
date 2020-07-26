import { useEffect } from "react";

const useEventListener = (
  target: HTMLElement | Document,
  type: keyof HTMLElementEventMap,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[keyof HTMLElementEventMap]) => any,
  ...options
) => {
  useEffect(() => {
      if (!target) {
        return;
      }
      target.addEventListener(type, listener, ...options);
      return () => {
        target.removeEventListener(type, listener, ...options);
      };
    },
    [
      target,
      type,
      listener,
      options,
    ],
  );
};

export { useEventListener };
