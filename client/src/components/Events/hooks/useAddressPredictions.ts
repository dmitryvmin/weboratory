// Libs
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { NUM_OF_PREDICTIONS } from "@components/Events/constants";

/**
 * Return predictions for an input address
 */
function useAddressPredictions(input) {

  const [predictions, setPredictions] = useState<string[]>([]);

  const autocomplete = useRef<any>(new google.maps.places.AutocompleteService());

  function getPlacePredictions(input) {
    autocomplete.current.getPlacePredictions(
      { input },
      predictions => {
        if (!predictions) {
          return;
        }
        const newPredictions = predictions
          .map((p) => p.description)
          .slice(0, NUM_OF_PREDICTIONS);

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
