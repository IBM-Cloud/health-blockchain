import React, { Component } from 'react';
import OrgChallenges from './OrgChallenges';
import OrgLayout from './OrgLayout';


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
