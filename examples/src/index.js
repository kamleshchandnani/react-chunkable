import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import configureStore from "./store";
import Routes from "./routes";

const store = configureStore();

// const { whyDidYouUpdate } = require("why-did-you-update")
// whyDidYouUpdate(React)
const renderRoot = (appRoutes) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Routes />
      </AppContainer>
    </Provider>,
    document.getElementById("app")
  );
};
renderRoot(Routes);
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["./routes"], () => {
    renderRoot(Routes);
  });
}
