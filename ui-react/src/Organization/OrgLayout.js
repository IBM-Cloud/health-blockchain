import React, { Component } from 'react';
import Logo from '../User/Logo';
import './OrgLayout.css';
import './carbon-components.css';
import './OrgChallenges.css';

class OrgLayout extends Component {

  render() {
    return (
      <div>
        <div className="banner">
          <div className="inner-banner">
            <Logo />
            <div className="about"><a href="https://github.com/IBM-Bluemix/health-blockchain">ABOUT</a></div>
          </div>
        </div>
        <div className="organizationContainer">
          {this.props.children}
        </div>
      </div>

    );
  }
}

export default OrgLayout;
