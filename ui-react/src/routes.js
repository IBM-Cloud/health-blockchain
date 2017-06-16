import React from 'react';
import { Router, Route } from 'react-router';

import User from './User/User';
import Organization from './Organization/Organization';
import NewChallenge from './Organization/NewChallenge';
import ChallengeDetails from './Organization/ChallengeDetails';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={User} />
    <Route path="/organization" component={Organization} />
    <Route path="/organization/newChallenge" component={NewChallenge} />
    <Route path="/organization/challenge/:challengeId" component={ChallengeDetails} />
  </Router>
);

export default Routes;
