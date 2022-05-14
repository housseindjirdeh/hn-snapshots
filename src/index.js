import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import transit from 'transit-immutable-js';

import configureStore from '../src/store/configureStore';
import { history, middleware as routerMiddleware } from '../src/store/history'

import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = configureStore({
  routerMiddleware,
  preloadedState: preloadedState ? transit.fromJSON(preloadedState) : undefined,
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
