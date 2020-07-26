import * as React from "react";
import {useRef, useEffect, useState} from "react";

const isClient = typeof window === "object";

/**
 * React sensor hook that tracks dimensions of the browser window.
 */
const useWindowOffset = () => {
  const frame = useRef(0);
  const [state, setState] = useState<{ pageYOffset: number; pageXOffset: number }>({
    pageYOffset: window.pageYOffset,
    pageXOffset: window.pageXOffset,
});

  useEffect(() => {
    if (isClient) {
      const handler = () => {
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
          setState({
            pageYOffset: window.pageYOffset,
            pageXOffset: window.pageXOffset,
          });
        });
      };

      window.addEventListener("scroll", handler);

      return () => {
        cancelAnimationFrame(frame.current);
        window.removeEventListener("scroll", handler);
      };
    }
  }, []);

  return {
    pageXOffset: state.pageXOffset,
    pageYOffset: state.pageYOffset,
  };
};

export {useWindowOffset};
