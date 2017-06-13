import React, { Component } from 'react';
import OrgLayout from './OrgLayout';
import OrgChallenges from './OrgChallenges';
import './Organization.css';


class Organization extends Component {

  render() {
    return (
      <div className="organization">
        <OrgLayout>
          <OrgChallenges />
        </OrgLayout>
      </div>
    );
  }
}

export default Organization;
