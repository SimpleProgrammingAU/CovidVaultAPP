import './VisitorForm.css';

import React, { Component } from 'react';

export default class VisitorForm extends Component {

  private forceAU = (e:React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3) e.target.value = "+61";
    e.target.value = e.target.value.replace(/[^0-9|+]/, '');
    if (e.target.value.length > 12) e.target.value = e.target.value.substr(0, 12);
  }

  render() {
    return (
      <div className="VisitorForm">
        <form className="pure-form pure-form-aligned">
          <fieldset>
          <div className="pure-control-group">
              <input type="text" placeholder="Name" />
          </div>
          <div className="pure-control-group">
              <input type="text" placeholder="Phone number" onChange={this.forceAU} onFocus={this.forceAU} />
          </div>
          <div className="submit-group  ">
            <button type="submit" className="pure-button pure-button-primary">Submit</button>
          </div>
          </fieldset>
        </form>
        <p>This is a free <a href="https://github.com/SimpleProgrammingAU">open-source project</a> to help Australian businesses during the COVID-19 recovery.</p>
      </div>
    );
  }
}