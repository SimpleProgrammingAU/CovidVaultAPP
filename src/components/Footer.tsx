import './Footer.css';

import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <p>The CovidVault application is free for any Australian business.</p>
        <p>This is an open-source project. The API source can be found <a href="https://github.com/SimpleProgrammingAU/CovidVaultAPI">here</a>. The application source can be found <a href="https://github.com/SimpleProgrammingAU/CovidVaultAPP">here</a>.</p>
        <p>Proudly hosted by <a href="https://www.simpleprogramming.com.au/">Simple Programming</a></p>
      </div>
    );
  }
}