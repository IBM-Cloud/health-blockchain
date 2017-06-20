import React, { Component } from 'react';
import { Link } from 'react-router';

import SiteLayout from '../shared/SiteLayout';
import './OrgLayout.css';
import './carbon-components.css';

class OrgLayout extends Component {

  render() {
    return (<SiteLayout
      {...this.props}
      className="org-layout-container"
      links={[<Link to="/">USER</Link>]}
    />);
  }

}

export default OrgLayout;
