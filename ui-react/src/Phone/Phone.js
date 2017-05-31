import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Phone.css';


class Phone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

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
          <div className="home" />
        </div>
      </div>
    );
  }
}

Phone.propTypes = {
  children: PropTypes.Object
};

export default Phone;
