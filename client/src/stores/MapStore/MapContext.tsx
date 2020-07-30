// Libs
import { createContext } from "react";

// Map store
import { IMapContext } from "./types";
import { MapInitialState } from "./constants";

const MapContext = createContext<IMapContext>([MapInitialState, () => {}]);

export { MapContext };
