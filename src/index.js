import React from "react";
import ReactDOM from "react-dom";
import "./globalStyles.css";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <QueryParamProvider ReactRouterRoute={Route}>
      <App />
    </QueryParamProvider>
  </Router>,
  rootElement
);
