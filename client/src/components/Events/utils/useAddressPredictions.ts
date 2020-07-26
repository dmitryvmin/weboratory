import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

function useAddressPredictions(input) {
  const [predictions, setPredictions] = useState<any[]>([]);

  const autocomplete = useRef<any>();

  if (!autocomplete.current) {
    autocomplete.current =
      new window.google.maps.places.AutocompleteService();
  }

  function getPlacePredictions(input) {
    autocomplete.current.getPlacePredictions(
      { input },
      predictions => {
        setPredictions(
          predictions.map(prediction => prediction.description),
        );
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
  }, [input]);

  return predictions;
}

export { useAddressPredictions };
