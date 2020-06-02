import './Spinner.css'

import React, { Component } from 'react';
import spinner from '../images/spinner.svg';

export default class Spinner extends Component {
  render() {
    return (
      <div className="Spinner">
        <img src={spinner} alt="Loading" />
      </div>
    );
  }
}