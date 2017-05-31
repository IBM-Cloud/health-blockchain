import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './Phone/Phone.css';


class Logo extends Component {

  render() {
    return (
      <div className="logoholder">
        <div className="title">
          <a href="/">FITCHAIN</a>
        </div>
        <div className="chain">
          <div className="join" />
          <div className="link" />
          <div className="join" />
          <div className="link" />
          <div className="join" />
          <div className="link" />
          <div className="join" />
          <div className="link" />
          <div className="join" />
          <div className="link" />
          <div className="join" />
          <div className="link" />
          <div className="join" />
        </div>
      </div>
    );
  }
}

Logo.propTypes = {
};

export default Logo;
