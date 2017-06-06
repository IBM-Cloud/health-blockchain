import React from 'react';
import { Router, Route } from 'react-router';

import User from './User/User';
import Organization from './Organization/Organization';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={User} />
    <Route path="/organization" component={Organization} />
  </Router>
);

export default Routes;
