import { useEffect, useRef } from "react";

const useClientRect = ref => {
  const clientRec = useRef<any>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    clientRec.current = ref.current.getBoundingClientRect();
  }, [ref]);

  return ({
    x: clientRec.current?.x ?? 0,
    y: clientRec.current?.y ?? 0,
    top: clientRec.current?.top ?? 0,
    left: clientRec.current?.left ?? 0,
    width: clientRec.current?.width ?? 0,
    height: clientRec.current?.height ?? 0,
  });
};

export {useClientRect};
