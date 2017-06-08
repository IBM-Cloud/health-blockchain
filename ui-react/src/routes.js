import React from 'react';
import { Router, Route } from 'react-router';

import User from './User/User';
import Organization from './Organization/Organization';
import NewChallenge from './Organization/NewChallenge';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={User} />
    <Route path="/organization" component={Organization} />
    <Route path="/organization/newChallenge" component={NewChallenge} />
  </Router>
);

export default Routes;
