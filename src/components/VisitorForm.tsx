import './VisitorForm.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import { spinner } from '../actions';

class VisitorForm extends Component<any, any> {

  private _id:number;
  private _locationID:number;

  constructor(props:any) {
    super(props);
    this._id = 0;
    this._locationID =
      typeof queryString.parse(window.location.search).id === "undefined" ? 1 : parseInt(queryString.parse(window.location.search).id as string);
    this.state = {
      name: "",
      phone: "",
      formDisplay: "inline-block",
      formButton: "Check In",
      formButtonDisabled: false,
      errorMsg: "",
      coffeeDisplay: "none"
    }
  }

  private _nameChange = (e:React.FocusEvent<HTMLInputElement>) => {
    this.setState({name: e.target.value});
  }

  private _phoneChange = (e:React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) e.target.value = "+61";
    e.target.value = e.target.value.replace(/[^0-9|+]/, '');
    if (e.target.value.length > 12) e.target.value = e.target.value.substr(0, 12);
    this.setState({phone: e.target.value})
  }

  private _formSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
    this.setState({formButtonDisabled: true});
    this.props.spinner();
    if (this._id === 0) {
      this.setState({formButton: "Sending..."});
      axios.post('api/entry/' + this._locationID, {
        name: this.state.name,
        phone: this.state.phone
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data.success) {
          this._id = response.data.data.id;
          this.setState({
            formDisplay: "none",
            formButton: "Check Out",
            formButtonDisabled: false,
            coffeeDisplay: "inline-flex",
            errorMsg: ""
          });
        }
      }).catch((error) => {
        this.setState({
          formButton: "Check In",
          formButtonDisabled: false,
          errorMsg: error.response.data.messages[0]
        });
      }).finally(this.props.spinner());
    } else {
      this.setState({formButton: "Sending..."});
      axios.patch("api/exit/" + this._id).then((response) => {
        if (response.data.success) {
          this.setState({
            formButton: "Goodbye",
            errorMsg: ""
          });
        }
      }).catch((error) => {
        this.setState({
          formButtonDisabled: false,
          errorMsg: error.response.data.messages[0]
        });
      }).finally(this.props.spinner());
    }
    e.preventDefault();
  }

  render() {
    return (
      <div className="VisitorForm">
        <form className="pure-form pure-form-aligned" onSubmit={this._formSubmit}>
          <fieldset>
          <div className="pure-control-group">
              <input type="text" placeholder="Name" style={{display: this.state.formDisplay}} onChange={this._nameChange} value={this.state.name} />
          </div>
          <div className="pure-control-group">
              <input type="text" placeholder="Phone number" style={{display: this.state.formDisplay}} onChange={this._phoneChange} onFocus={this._phoneChange} value={this.state.phone} />
          </div>
          <div className="submit-group  ">
            <button type="submit" className="pure-button pure-button-primary" disabled={this.state.formButtonDisabled}>{this.state.formButton}</button>
          </div>
          </fieldset>
        </form>
        <p className="error">{this.state.errorMsg}</p>
        <p>This is a free <a href="https://github.com/SimpleProgrammingAU">open-source project</a> to help Australian businesses during the COVID-19 recovery. For more details, see the <a href="proposal.pdf">project letter</a>.</p>
        <a className="bmc-button" style={{display: this.state.coffeeDisplay}} target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/SimplePrg"><img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Support Development" />
          <span style={{marginLeft: "5px", fontSize: "28px !important"}}>Support Development</span>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state:any) => {
  return { };
}

export default connect(mapStateToProps, { spinner })(VisitorForm);