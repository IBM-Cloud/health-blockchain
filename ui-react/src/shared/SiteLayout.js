import React, { Component } from 'react';
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
  links: null,
  children: null,
  className: null
};


SiteLayout.propTypes = {
  links: PropTypes.array,
  children: PropTypes.object,
  className: PropTypes.string
};

export default SiteLayout;
