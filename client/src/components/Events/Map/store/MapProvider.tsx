// Libs
import React, { FC, useState } from "react";

// Map store
import { IMapContext, IMapProvider } from "@components/Events/Map/store/types";
import { MapInitialState } from "@components/Events/Map/store/constants";
import { MapContext } from "@components/Events/Map/store/MapContext";

const MapProvider: FC<IMapProvider> = ({ children }) => {

  const [state, setState] = useState<IMapContext>(MapInitialState);

  return (
    <MapContext.Provider value={[state, setState]}>
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider };
