import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Logo from './Logo';
import './SiteLayout.css';

class SiteLayout extends Component {

  render() {
    return (
      <div className="site-layout">
        <div className="site-header">
          <div className="site-header-inner">
            <Logo />
            <div className="site-links">
              {this.props.links}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href="https://github.com/IBM-Bluemix/health-blockchain">GitHub</a>
            </div>
          </div>
        </div>
        <div className={`site-body ${this.props.className ? this.props.className : ''}`}>
          <div className="site-body-inner">
            {this.props.children}
          </div>
        </div>
        <div className="site-footer">
          <div className="site-footer-inner">
            <div className="footerInfo">Built with <a href="https://www.ibm.com/cloud-computing/bluemix/">IBM Bluemix</a> and <a href="https://www.ibm.com/blockchain/">IBM Blockchain</a></div>
          </div>
        </div>
      </div>
    );
  }
}

SiteLayout.defaultProps = {
  links: [],
  children: [],
  className: null
};

SiteLayout.propTypes = {
  links: PropTypes.arrayOf(Link).optional,
  children: PropTypes.array.optional,
  className: PropTypes.string.optional
};

export default SiteLayout;
