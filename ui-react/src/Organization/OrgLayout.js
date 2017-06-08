import React, { Component } from 'react';
import { AppContainer } from 'carbon-components-react';
import Logo from '../User/Logo';
import './OrgLayout.css';
import './carbon-components.css';
import './OrgChallenges.css';

class OrgLayout extends Component {

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
          {this.props.children}
        </div>
      </AppContainer>

    );
  }
}

export default OrgLayout;
