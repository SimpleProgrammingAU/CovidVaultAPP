import "./KioskForm.css";

import React, { Component } from "react";
import queryString from "query-string";
import Axios from "axios";
import ordinal from "ordinal";

class KioskForm extends Component<any, any> {
  private _locationID: string;
  private _countdown: number;

  constructor(props: any) {
    super(props);
    this._locationID =
      typeof queryString.parse(window.location.search).id === "undefined"
        ? "1"
        : (queryString.parse(window.location.search).id as string).toString();
    this._countdown = 0;
    this.state = {
      name: "",
      phone: "",
      formButton: "Check In",
      formButtonDisabled: false,
      successMsg: "",
      errorMsg: "",
    };
  }

  private _resetCountdown = (n?: number): void => {
    if (typeof n === "number") {
      this._countdown = n;
      this._resetCountdown();
    } else {
      this.setState({ formButton: --this._countdown });
      if (this._countdown > 0) setTimeout(this._resetCountdown, 1000);
      else
        this.setState({
          name: "",
          phone: "",
          formButton: "Check In",
          formButtonDisabled: false,
          successMsg: "",
          errorMsg: "",
        });
    }
  };

  private _formUpdate = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === "name") this.setState({ name: e.target.value });
    else if (e.target.name === "phone") {
      if (e.target.value.length < 3) e.target.value = "+61";
      e.target.value = e.target.value.replace(/[^0-9|+]/, "");
      if (e.target.value.length > 12) e.target.value = e.target.value.substr(0, 12);
      this.setState({ phone: e.target.value });
    }
  };

  private _formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    this.setState({
      formButtonDisabled: true,
      formButton: "Sending...",
    });
    Axios.post(
      "api/entry/" + this._locationID,
      {
        name: this.state.name,
        phone: this.state.phone,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.data.success) {
          this.setState({
            successMsg: `Thank you ${this.state.name}, you are the ${ordinal(parseInt(response.data.data.id))} person to check-in using CovidVault. Your support is helping Australia be a safer place as we grapple with the challenges of COVID-19.`,
          });
          this._resetCountdown(6);
        }
      })
      .catch((e) => {
        this.setState({
          formButton: "Check In",
          formButtonDisabled: false,
          successMsg: "",
          errorMsg: `${e.response.data.messages[0]} Please try again.`,
        });
      });
    e.preventDefault();
  };

  render() {
    const errorMsg = this.state.errorMsg.length === 0 ? null : <p className="error">{this.state.errorMsg}</p>;
    const successMsg = this.state.successMsg.length === 0 ? null : <p className="success">{this.state.successMsg}</p>;
    return (
      <div className="KioskForm">
        {successMsg}
        <form className="pure-form pure-form-aligned" onSubmit={this._formSubmit}>
          <fieldset>
            <div className="pure-control-group">
              <input type="text" placeholder="Name" name="name" onChange={this._formUpdate} value={this.state.name} />
            </div>
            <div className="pure-control-group">
              <input
                type="text"
                placeholder="Phone number"
                name="phone"
                onChange={this._formUpdate}
                onFocus={this._formUpdate}
                value={this.state.phone}
              />
            </div>
            <div className="submit-group">
              <button type="submit" className="pure-button pure-button-primary" disabled={this.state.formButtonDisabled}>
                {this.state.formButton}
              </button>
            </div>
          </fieldset>
        </form>
        {errorMsg}
        <p>This is a free and open-source project to help Australian businesses during the COVID-19 recovery.</p>
      </div>
    );
  }
}

export default KioskForm;
