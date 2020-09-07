import "./Header.css";
import React, { Component } from "react";
import { connect } from 'react-redux';

class Header extends Component<HeaderProps, HeaderState> {
  render() {
    const { locationName, logoURL } = this.props;
    if (logoURL.length > 0)
      return (
        <div className="Header">
          <img src={"./images/" + logoURL} alt="Logo" />
        </div>
      );
    else
      return (
        <div className="Header">
          <h1>{locationName}</h1>
        </div>
      );
  }
}

const mapStateToProps = (state: HeaderMapState) => {
  const {locationName, logoURL} = state;
  return {
    locationName,
    logoURL,
  };
};

export default connect(mapStateToProps, { })(Header);

interface HeaderProps {
  locationName: string;
  logoURL: string;
}
interface HeaderState {}
interface HeaderMapState{
  locationName:string;
  logoURL: string;
}