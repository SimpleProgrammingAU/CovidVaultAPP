import "./Header.css";
import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";

export default class Header extends Component<any, any> {
  private _id: number;

  constructor(props: any) {
    super(props);
    this._id =
      typeof queryString.parse(window.location.search).id === "undefined"
        ? 1
        : parseInt(queryString.parse(window.location.search).id as string);
    this.state = {
      name: "",
      logo: "",
    };
  }

  componentDidMount() {
    axios
      .get("api/account/" + this._id, {
        data: {},
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            name: response.data.data.name,
            logo: response.data.data.logo,
          });
        }
      })
      .catch((e) => {
        console.error(e.response.data.messages[0])
      })
      .finally(() => {});
  }

  render() {
    if (this.state.logo.length > 0)
      return (
        <div className="Header">
          <img src={"images/" + this.state.logo} alt="Logo" />
        </div>
      );
    else
      return (
        <div className="Header">
          <h1>{this.state.name}</h1>
        </div>
      );
  }
}
