import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "typeface-roboto";
import registerServiceWorker from "./registerServiceWorker";
import Controller from "./screens/Controller.js";
//import { BrowserRouter } from "react-router-dom";
import { Router, Route, BrowserRouter, Switch, Link } from "react-router-dom";
//import { Home } from "./screens/home/Home";
// import { Details } from "./screens/details/Details";
// import { BookShow } from "./screens/bookshow/BookShow";

ReactDOM.render(
  <BrowserRouter>
    <Controller />
    {/* <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/details" component={Details} />
      <Route path="/bookshow" component={BookShow} />
    </Switch> */}
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
