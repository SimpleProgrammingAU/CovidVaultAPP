import "./VisitorForm.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import axios, { AxiosResponse } from "axios";
import queryString from "query-string";
import { spinner } from "../actions";
import ordinal from "ordinal";

class VisitorForm extends Component<any, any> {
  private _id: number;
  private _locationID: string;

  constructor(props: any) {
    super(props);
    this._id = 0;
    this._locationID =
      typeof queryString.parse(window.location.search).id === "undefined"
        ? "1"
        : (queryString.parse(window.location.search).id as string).toString();
    this.state = {
      name: localStorage.getItem("name") === null ? "" : localStorage.name,
      phone: localStorage.getItem("phone") === null ? "" : localStorage.phone,
      formDisplay: "inline-block",
      formButton: "Check In",
      formButtonDisabled: false,
      errorMsg: "",
      successMsg: "",
      coffeeDisplay: "none",
      followOnText: "",
      followOnImg: "",
      followOnURL: "",
    };
    
  }

  private _nameChange = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  };

  private _phoneChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) e.target.value = "+61";
    e.target.value = e.target.value.replace(/[^0-9|+]/, "");
    if (e.target.value.length > 12) e.target.value = e.target.value.substr(0, 12);
    this.setState({ phone: e.target.value });
  };

  private _formSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    this.setState({ formButtonDisabled: true });
    this.props.spinner();
    if (this._id === 0) {
      this.setState({ formButton: "Sending..." });
      axios
        .post(
          "api/entry/" + this._locationID,
          {
            name: this.state.name,
            phone: this.state.phone,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            this._id = parseInt(response.data.data.id);
            localStorage.name = this.state.name;
            localStorage.phone = this.state.phone;
            this.setState({
              formDisplay: "none",
              formButton: "Check Out",
              formButtonDisabled: false,
              coffeeDisplay: "inline-flex",
              errorMsg: "",
              successMsg: `You are the ${ordinal(this._id)} person to check-in using CovidVault. Your support is helping Australia be a safer place as we grapple with the challenges of COVID-19.`,
            });
          }
        })
        .catch((error) => {
          this.setState({
            formButton: "Check In",
            formButtonDisabled: false,
            errorMsg: error.response.data.messages[0],
            successMsg: "",
          });
        })
        .finally(this.props.spinner());
    } else {
      this.setState({ formButton: "Sending..." });
      axios
        .patch("api/exit/" + this._id)
        .then((response) => {
          if (response.data.success) {
            this.setState({
              formButton: "Goodbye",
              errorMsg: "",
              successMsg: "You have been successfully checked out. Goodbye.",
            });
          }
        })
        .catch((error) => {
          this.setState({
            formButtonDisabled: false,
            errorMsg: error.response.data.messages[0],
            successMsg: "",
          });
        })
        .finally(this.props.spinner());
    }
    e.preventDefault();
  };

  componentDidMount() {
    axios
      .get("api/followon/" + this._locationID)
      .then((response: AxiosResponse) => {
        if (response.data.success) {
          const { data } = response.data;
          const expiry = data.expiry === null ? null : new Date(response.data.data.expiry);
          if (expiry === null || expiry.getTime() > Date.now()) {
            this.setState({
              followOnText: data.text,
              followOnImg: data.img,
              followOnURL: data.url,
            });
          }
        }
      })
      .catch((e) => {
        if (e.response.data.statusCode !== 404) console.error(e.response.data.messages[0]);
      });
  }

  render() {
    const errorMsg = this.state.errorMsg.length === 0 ? null : <p className="error">{this.state.errorMsg}</p>;
    const successMsg = this.state.successMsg.length === 0 ? null : <p className="success">{this.state.successMsg}</p>;
    const followOnText =
      this.state.successMsg.length > 0 && this.state.followOnText.length > 0 ? (
        <p className="followon">
          <a href={this.state.followOnURL}>{this.state.followOnText}</a>
        </p>
      ) : null;
    const followOnImg =
      this.state.successMsg.length > 0 && this.state.followOnImg.length > 0 ? (
        <a href={this.state.followOnURL}>
          <img style={{maxWidth: '100%'}} src={`images/${this.state.followOnImg}`} alt="Promotional link" />
        </a>
      ) : null;
    return (
      <div className="VisitorForm">
        {successMsg}
        <form className="pure-form pure-form-aligned" onSubmit={this._formSubmit}>
          <fieldset>
            <div className="pure-control-group">
              <input
                type="text"
                placeholder="Name"
                style={{ display: this.state.formDisplay }}
                onChange={this._nameChange}
                value={this.state.name}
              />
            </div>
            <div className="pure-control-group">
              <input
                type="text"
                placeholder="Phone number"
                style={{ display: this.state.formDisplay }}
                onChange={this._phoneChange}
                onFocus={this._phoneChange}
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
        {followOnText}
        {followOnImg}
        {errorMsg}
        <p>
          This is a free <a href="https://github.com/SimpleProgrammingAU">open-source project</a> to help Australian businesses
          during the COVID-19 recovery. For more details, see the <a href="./files/proposal.pdf">project letter</a>.
        </p>
        <a
          className="bmc-button"
          style={{ display: this.state.coffeeDisplay }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.buymeacoffee.com/SimplePrg"
        >
          <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Support Development" />
          <span style={{ marginLeft: "5px", fontSize: "28px !important" }}>Support Development</span>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, { spinner })(VisitorForm);
