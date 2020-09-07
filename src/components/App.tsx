import "./App.css";

import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import axios from "axios";
import { Container, CssBaseline } from "@material-ui/core";
import { CornerLink, Footer, Header, Privacy, Spinner, VisitorForm } from "./";
import { saveLocationData, updateLocationID } from "../actions";

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    props.updateLocationID(
      typeof queryString.parse(window.location.search).id === "undefined"
        ? "1"
        : (queryString.parse(window.location.search).id as string).toString()
    );
  }
  componentDidMount() {
    axios
      .get(
        "api/account/" +
          (typeof queryString.parse(window.location.search).id === "undefined"
            ? "1"
            : (queryString.parse(window.location.search).id as string).toString()),
        {
          data: {},
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.success) this.props.saveLocationData(response.data.data);
      })
      .catch((e) => {
        console.error(e);
        //if (typeof e.response !== "undefined") console.error(e.response.data.messages[0]);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <CssBaseline />
        <div className="App">
          <Spinner />
          <CornerLink />
          <Switch>
            <Route path="/covid/">
              <Container className="container" maxWidth="sm">
                <Header />
                <VisitorForm kiosk={typeof queryString.parse(window.location.search).kiosk !== "undefined"} />
              </Container>
              <Container className="container end" maxWidth="sm">
                <Privacy />
              </Container>
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { locationID } = state;
  return {
    locationID,
  };
};

export default connect(mapStateToProps, { saveLocationData, updateLocationID })(App);

interface AppProps {
  locationID: number;
  saveLocationData: Function;
  updateLocationID: Function;
}

interface AppState {
  locationID: number;
}
