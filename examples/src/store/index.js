import { createStore, applyMiddleware, compose } from "redux";
import { responsiveStoreEnhancer } from "redux-responsive";
import createSagaMiddleware from "redux-saga";
import createLogger from "redux-logger";
import promise from "redux-promise";
import reducer from "./reducer";
import sagasManager from "./SagasManager";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

export default function configureStore(initialState) {
  const finalCreateStore = composeEnhancers(
    applyMiddleware(sagaMiddleware, promise, logger),
    responsiveStoreEnhancer
    // window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer, initialState);
  sagaMiddleware.run(sagasManager.getRootSaga());
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducer", () => {
      const nextReducer = require("./reducer"); // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
