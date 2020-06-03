import './Spinner.css'

import React, { Component } from 'react';
import { connect } from 'react-redux';

const spinner = require('../images/spinner.svg');

class Spinner extends Component<any> {

  private _getClass = ():string => {
    if (this.props.loading) return "Spinner loading";
    else return "Spinner"
  }

  render() {
    return (
      <div className={this._getClass()}>
        <img src={spinner} alt="Loading" />
      </div>
    );
  }
}

const mapStateToProps = (state:any) => {
  return {
      loading: state.spinner
  };
}

export default connect(mapStateToProps, { })(Spinner);