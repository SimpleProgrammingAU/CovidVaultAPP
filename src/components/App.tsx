import "./App.css";

import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import Header from "./Header";
import Privacy from "./Privacy";
import VisitorForm from "./VisitorForm";
import Spinner from "./Spinner";
import Footer from "./Footer";
import CornerLink from "./CornerLink";
import KioskForm from "./KioskForm";

export default class App extends Component {
  render() {
    const form = typeof queryString.parse(window.location.search).kiosk === "undefined" ? <VisitorForm /> : <KioskForm />;
    return (
      <BrowserRouter>
        <div className="App">
          <Spinner />
          <CornerLink />
          <div className="container">
            <Switch>
              <Route path="/covid/">
                <section>
                  <Header />
                  {form}
                </section>
                <section>
                  <Privacy />
                </section>
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
