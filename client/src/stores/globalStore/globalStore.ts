// Libs
import { applyMiddleware, createStore, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

// App
import { rootReducer } from "@stores/globalStore/reducers";
import { loggerMiddleware } from "@stores/globalStore/middleware/loggerMiddleware";
import { monitorReducersEnhancer } from "@stores/globalStore/enhancers/monitorReducersEnhancer";
import { createEpicMiddleware } from "redux-observable";

const middlewareEnhancer = applyMiddleware(loggerMiddleware, thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer, monitorReducersEnhancer);

function configureStore(preloadedState = undefined) {
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [loggerMiddleware, thunkMiddleware, epicMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers: any = [middlewareEnhancer, monitorReducersEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}

export { configureStore };
