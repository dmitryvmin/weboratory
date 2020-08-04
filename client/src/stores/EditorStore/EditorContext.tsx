// Libs
import { createContext } from "react";

// Map store
import { IEditorContext } from "./types";
import { EditorInitialState } from "./constants";

const EditorContext = createContext<IEditorContext>([EditorInitialState, {} as any]);

export { EditorContext };
