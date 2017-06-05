import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Phone.css';


class Phone extends Component {

  render() {
    return (
      <div className="phone">
        <div className="border">
          <div className="camera">
            <div className="border-row">
              <div className="sensor" />
              <div className="speaker" />
            </div>
          </div>
        </div>
        <div className="screen">
          {this.props.children}
        </div>
        <div className="border">
          <div className="home" role="presentation" onClick={this.props.homeButton} />
        </div>
      </div>
    );
  }
}

Phone.propTypes = {
  children: PropTypes.node,
  homeButton: PropTypes.func
};

export default Phone;
