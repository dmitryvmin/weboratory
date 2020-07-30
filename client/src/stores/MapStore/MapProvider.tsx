// Libs
import React, { FC, useState, useMemo, Dispatch, SetStateAction } from "react";

// Map store
import { IMapProvider, IMapState, IMapContext } from "./types";
import { MapInitialState } from "./constants";
import { MapContext } from "./MapContext";

/**
 * Map Context Provider
 */
const MapProvider: FC<IMapProvider> = ({ children }) => {

  const [state, setState] = useState<IMapState>(MapInitialState);

  return (
    <MapContext.Provider value={[state, setState]}>
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider };
