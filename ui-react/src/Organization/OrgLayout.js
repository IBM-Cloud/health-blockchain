import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';

import API from '../callAPI';
import SiteLayout from '../shared/SiteLayout';
import './OrgLayout.css';
import './carbon-components.css';

class OrgLayout extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    API.postRequest('/api/users/logout')
      .then(() => browserHistory.push('/organization'));
  }

  render() {
    let links = <Link to="/">USER</Link>;
    if (this.props.isLoggedIn) {
      links = [
        <a href="" onClick={this.logout}>Logout</a>,
        <Link to="/">USER</Link>
      ];
    }
    return (<SiteLayout
      {...this.props}
      className="org-layout-container"
      links={links}
    />);
  }

}

OrgLayout.defaultProps = {
  isLoggedIn: false
};

OrgLayout.propTypes = {
  isLoggedIn: PropTypes.boolean
};

export default OrgLayout;
