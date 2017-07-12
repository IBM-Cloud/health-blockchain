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
    this.state = {
      loggedIn: false
    };
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isLoggedIn();
  }

  isLoggedIn() {
    API.loggedInUser().then((json) => {
      if (json.organization) {
        this.setState({ loggedIn: true });
      } else {
        this.redirectToLogin();
      }
    });
  }

  redirectToLogin() {
    if (browserHistory.getCurrentLocation().pathname !== '/organization') {
      browserHistory.push('/organization');
    }
  }

  logout() {
    API.logout().then(() => {
      this.setState({ loggedIn: false });
      this.redirectToLogin();
    });
  }

  render() {
    let links = <Link to="/"><img className="bannerLink" src="/images/phone.svg" title="USER" alt="USER"></img></Link>;
    if (this.state.loggedIn) {
      links = [
        <a href="/organization" onClick={this.logout}><img className="bannerLink" src="/images/sign-out.svg" title="SIGN OUT" alt="SIGN OUT"></img></a>,
        <Link to="/"><img className="bannerLink" src="/images/phone.svg" title="USER" alt="USER"></img></Link>
      ];
    }
    return (<SiteLayout
      {...this.props}
      className="org-layout-container"
      links={links}
    />);
  }

}

export default OrgLayout;
