import './Header.css';
import logo from '../images/test-logo.png';

import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="Header">
        <img src={logo} alt="Logo" />
      </div>
    );
  }
}