import "./Funding.css";

import React, { Component } from "react";

export default class Funding extends Component<FundingProps, FundingState> {
  render() {
    return this.props.display ? (
      <a className="bmc-button" target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/SimplePrg">
        <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Support Development" />
        <span style={{ marginLeft: "5px", fontSize: "28px !important" }}>Support Development</span>
      </a>
    ) : null;
  }
}

interface FundingProps {
  display: boolean;
}

interface FundingState {}
