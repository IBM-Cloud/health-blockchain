import React, { Component } from 'react';
import OrgLayout from './OrgLayout';
import OrgLogin from './OrgLogin';
import OrgChallenges from './OrgChallenges';
import API from '../callAPI';

import './Organization.css';


class Organization extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isLoggedIn();
  }

  isLoggedIn() {
    API.getRequest('/api/users/isLoggedIn').then(json =>
          json.organization && this.setState({ loggedIn: true }));
  }

  render() {
    return (
      <OrgLayout isLoggedIn={this.state.loggedIn}>
        <div className="organization">
          {this.state.loggedIn ?
            <OrgChallenges />
            :
            <OrgLogin onLogin={() => this.setState({ loggedIn: true })} />
          }
        </div>
      </OrgLayout>
    );
  }
}

export default Organization;
