import "./App.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import axios from "axios";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Footer, Header, Privacy, Spinner, VisitorForm } from "./";
import { saveLocationData, updateLocationID } from "../actions";
import { Action, LocationData } from "../interfaces";

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    props.updateLocationID(
      typeof queryString.parse(window.location.search).id === "undefined"
        ? "8634291744168120016"
        : (queryString.parse(window.location.search, {parseNumbers: false}).id as string).toString()
    );
    this.state = {
      invalidID: false,
    }
  }
  componentDidMount() {
    axios
      .get(
        "../api/account/" +
          (typeof queryString.parse(window.location.search).id === "undefined"
            ? "8634291744168120016"
            : (queryString.parse(window.location.search, {parseNumbers: false})).id as string).toString(),
        {
          data: {},
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.success) this.props.saveLocationData(response.data.data);
        else this.setState({invalidID: true});
      })
      .catch((e) => {
        console.error(e);
        this.setState({invalidID: true});
      });
  }

  render() {
    const formDisplay = (this.state.invalidID) ? <><h2>CovidVault</h2><p className="warning">Business or location not found. Please scan the QR code again, or ask staff for assistance.</p></> : <VisitorForm kiosk={typeof queryString.parse(window.location.search).kiosk !== "undefined"} />;
    return (
      <>
        <CssBaseline />
        <div className="App">
          <Spinner />
              <Container className="container" maxWidth="sm">
                <Header />
                {formDisplay}
              </Container>
              <Container className="container end" maxWidth="sm">
                <Privacy />
              </Container>
          <Footer />
        </div>
        </>
    );
  }
}

const mapStateToProps = (state: AppStateTransfer) => {
  const { locationID } = state;
  return {
    locationID,
  };
};

export default connect(mapStateToProps, { saveLocationData, updateLocationID })(App);

interface AppProps {
  locationID: string;
  saveLocationData: (data: LocationData) => Action<LocationData>;
  updateLocationID: (id:string) => Action<string>;
}

interface AppState {
  invalidID: boolean;
}

interface AppStateTransfer {
  locationID: string;
}
