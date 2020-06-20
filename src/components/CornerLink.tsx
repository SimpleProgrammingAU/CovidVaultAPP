import "./CornerLink.css";

import React, { Component } from "react";

export default class CornerLink extends Component {
  _click() {
    window.location.assign("https://www.simpleprogramming.com.au/covid/dashboard");
  }
  render() {
    return <div className="CornerLink" onClick={this._click}></div>;
  }
}
