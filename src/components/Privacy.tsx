import './Privacy.css';
import calendar from '../images/cal.svg';
import lock from '../images/lock.svg';
import megaphone from '../images/mega.svg';

import React, { Component } from 'react';

export default class Privacy extends Component {
  render() {
    return (
      <div className="Privacy">
        <h2>Privacy Policy</h2>
        <img src={calendar} alt="Data held for two months" />
        <p>your data is erased in 28 days</p>
        <img src={lock} alt="Only accessible to authorised contact" />
        <p>we'll only share it with the business' authorised contact</p>
        <img src={megaphone} alt="Not for marketing" />
        <p>we won't use it for marketing</p>
        <p><a href="privacy.pdf">visit the complete policy here</a></p>
      </div>
    );
  }
}