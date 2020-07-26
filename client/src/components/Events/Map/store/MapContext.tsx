// Libs
import { createContext } from "react";

// Map store
import { IMapContext } from "@components/Events/Map/store/types";
import { MapInitialState } from "@components/Events/Map/store/constants";

const MapContext = createContext<IMapContext>([MapInitialState, () => {}]);

export { MapContext };
