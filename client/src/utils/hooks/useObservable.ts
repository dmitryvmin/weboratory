import { useEffect, useState } from "react";
import { Observable } from "rxjs";

function useObservable<T>(observable?: Observable<T>): T | undefined {
  const [state, setState] = useState<T>();

  useEffect(() => {
    if (!observable) {
      console.log("No Observable provided to the useObservable hook.");
      return;
    }
    const sub = observable.subscribe((state) => {
      setState(state);
    });
    return () => {
      return sub.unsubscribe();
    }
  }, [observable]);

  return state;
};

export { useObservable };
