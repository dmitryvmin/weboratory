// Libs
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import createSentryMiddleware from "redux-sentry-middleware";
import * as Sentry from "@sentry/browser";

// App
import { loggerMiddleware } from "@stores/globalStore/middleware/loggerMiddleware";
import { monitorReducersEnhancer } from "@stores/globalStore/enhancers/monitorReducersEnhancer";
import { createEpicMiddleware } from "redux-observable";
import { rootReducer } from "@stores/globalStore/rootReducer";
import { rootEpic } from "@stores/globalStore/rootEpic";

Sentry.init();
const epicMiddleware = createEpicMiddleware();

/**
 * Global store
 */
function configureStore(preloadedState = undefined) {

  /**
   * Apply middlewares
   */
  const middlewares = [
    loggerMiddleware,
    thunkMiddleware,
    createSentryMiddleware(Sentry),
    epicMiddleware,
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares);

  /**
   * Apply enhancer
   */
  const enhancers = [
    middlewareEnhancer,
    monitorReducersEnhancer as any,
  ]
  const composedEnhancers = composeWithDevTools(...enhancers);

  /**
   * Init store
   */
  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  epicMiddleware.run(rootEpic);

  return store;
}

export { configureStore };
