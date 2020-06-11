import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Redux
import { createStore } from "redux";
import myReducer from "./reducers/index";
import { Provider } from "react-redux";

let store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  rootElement
);
