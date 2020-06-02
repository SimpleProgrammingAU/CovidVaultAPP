import './App.css';

import React, { Component } from 'react';
import Header from './Header';
import Privacy from './Privacy';
import VisitorForm from './VisitorForm';
import Spinner from './Spinner';
import Footer from './Footer';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Spinner />
        <div className="container">
          <section>
            <Header />
            <VisitorForm />
          </section>
          <section>
            <Privacy />
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}