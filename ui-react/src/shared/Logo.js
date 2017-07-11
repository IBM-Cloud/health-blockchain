import React, { Component } from 'react';
import './Logo.css';

class Logo extends Component {

  render() {
    return (
      <div className="logoholder">
        <div className="title">
          <div className="logolink">F</div>
          <div className="logolink">I</div>
          <div className="logolink">T</div>
          <div className="logolink">C</div>
          <div className="logolink">H</div>
          <div className="logolink">A</div>
          <div className="logolink">I</div>
          <div className="logolink">N</div>
          {/* <a href="/">FITCHAIN</a> */}
        </div>
      </div>
    );
  }
}

export default Logo;
