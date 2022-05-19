import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import transit from "transit-immutable-js";
import Loadable from "react-loadable";

import configureStore from "../src/store/configureStore";
import { history, middleware as routerMiddleware } from "../src/store/history";

import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  routerMiddleware,
  preloadedState: window.__REDUX_STATE__,
});

// const store = configureStore(window.__REDUX_STATE__ || {});

delete window.__REDUX_STATE__;

const AppBundle = (
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  </Provider>
);

window.onload = () => {
  Loadable.preloadReady().then(() => {
      ReactDOM.hydrate(
          AppBundle,
          document.getElementById('root')
      );
  });
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
