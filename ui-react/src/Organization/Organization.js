import React, { Component } from 'react';
import OrgLayout from './OrgLayout';
import OrgChallenges from './OrgChallenges';
import './Organization.css';


class Organization extends Component {

  render() {
    return (
      <OrgLayout>
        <OrgChallenges />
      </OrgLayout>

    );
  }
}

export default Organization;
