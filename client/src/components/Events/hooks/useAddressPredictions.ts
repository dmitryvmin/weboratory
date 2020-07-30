// Libs
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

declare var google;

/**
 * Return predictions for an input address
 */
function useAddressPredictions(input) {
  const [predictions, setPredictions] = useState<string[]>([]);

  const autocomplete = useRef<any>(new window.google.maps.places.AutocompleteService());

  function getPlacePredictions(input) {
    autocomplete.current.getPlacePredictions(
      { input },
      predictions => {
        if (!predictions) {
          return;
        }
        const newPredictions = predictions.map((p) => p.description);
        setPredictions(newPredictions);
      },
    );
  }

  const debouncedGetPlacePredictions = useCallback(
    debounce(getPlacePredictions, 500),
    [],
  );

  useEffect(() => {
    if (!input) {
      setPredictions([]);
    }
    else {
      debouncedGetPlacePredictions(input);
    }
  }, [
    input,
  ]);

  return predictions;
}

export { useAddressPredictions };
