import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import './SiteLayout.css';

class SiteLayout extends Component {

  render() {
    return (
      <div className="site-layout">
        <div className="site-header">
          <div className="site-header-inner">
            <Logo/>
            <div className="site-links">
              {this.props.links}
            </div>
          </div>
        </div>
        <div className={`site-body ${this.props.className
          ? this.props.className
          : ''}`}>
          <div className="site-body-inner">
            {this.props.children}
          </div>
        </div>
        <div className="builttext">

            <div className="built">Built with
            <a href="https://www.ibm.com/cloud-computing/bluemix/">IBM Bluemix </a>
              and
            <a href="https://www.ibm.com/blockchain/"> IBM Blockchain</a>
            </div>
              <a  href="https://github.com/IBM-Bluemix/health-blockchain">
            <div className="githubarea">
              <div className="githublabel">view on github</div>
                <img className="githubimage" border="0" alt="W3Schools" src="images/github.svg" width="24" height="24"></img>
            </div>
          </a>
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
