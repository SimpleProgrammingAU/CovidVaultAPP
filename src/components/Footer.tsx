import './Footer.css';

import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <p>The <a href="https://www.covidvault.com.au/">CovidVault</a> application is free for any Australian business.</p>
        <p>This is an open-source project - click thru to the <a href="https://github.com/SimpleProgrammingAU/CovidVaultAPI">API source</a> and the <a href="https://github.com/SimpleProgrammingAU/CovidVaultAPP">application source</a> at Github.</p>
        <p>Proudly hosted by <a href="https://www.simpleprogramming.com.au/">Simple Programming</a></p>
      </div>
    );
  }
}