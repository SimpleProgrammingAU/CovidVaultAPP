import "./Header.css";
import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component<HeaderProps, HeaderState> {
  render() {
    const { hasAvatar, locationID, locationName } = this.props;
    if (hasAvatar)
      return (
        <div className="Header">
          <img src={`https://www.covidvault.com.au/api/controller/render.php?id=${locationID}&type=account`} alt="Logo" />
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
  const { hasAvatar, locationID, locationName } = state;
  return {
    hasAvatar,
    locationID,
    locationName,
  };
};

export default connect(mapStateToProps, {})(Header);

interface HeaderProps {
  hasAvatar: boolean;
  locationID: string;
  locationName: string;
}
interface HeaderState {}
interface HeaderMapState {
  hasAvatar: boolean;
  locationID: string;
  locationName: string;
}
