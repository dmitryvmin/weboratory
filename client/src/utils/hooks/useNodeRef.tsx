// Libs
import React, { useState, useCallback } from "react";

/**
 * Return a reference to the element it is set on
 * https://bit.ly/2mh3piB
 */

function useNodeRef<T>(): { node: T | undefined, ref: (newNode: any) => void } {

  const [node, setNode] = useState<T>();

  const ref = useCallback((newNode: T) => {
    setNode(newNode);
  }, []);

  return ({
    node,
    ref,
  });
}

export { useNodeRef };
