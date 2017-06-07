import React, { Component } from 'react';
import { AppContainer } from 'carbon-components-react';
import OrgChallenges from './OrgChallenges';
import Logo from '../User/Logo';
import './Organization.css';

class Organization extends Component {

  render() {
    return (
      <AppContainer theme="light">
        <div className="banner">
          <div className="inner-banner">
            <Logo />
            <div className="about"><a href="./about.html">ABOUT</a></div>
          </div>
        </div>
        <div className="organizationContainer">
          <OrgChallenges />
        </div>
      </AppContainer>

    );
  }
}

export default Organization;
