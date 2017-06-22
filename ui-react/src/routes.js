import React from 'react';
import { Router, Route } from 'react-router';

import User from './User/User';
import OrgLogin from './Organization/OrgLogin';
import OrgChallenges from './Organization/OrgChallenges';
import NewChallenge from './Organization/NewChallenge';
import ChallengeDetails from './Organization/ChallengeDetails';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={User} />
    <Route path="/organization" component={OrgLogin} />
    <Route path="/organization/challenges" component={OrgChallenges} />
    <Route path="/organization/newChallenge" component={NewChallenge} />
    <Route path="/organization/challenge/:challengeId" component={ChallengeDetails} />
  </Router>
);

export default Routes;
