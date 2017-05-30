import React, { Component } from 'react';
import './Phone.css';

class Phone extends Component {
  login() {
    console.log('login', this);
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
          <div className="card">
            <div className="loginbox">
              <div className="loginform">
                <div className="loginfield">
                  <img src="images/username.svg" className="icon" role="presentation" />
                  <input
                    id="email"
                    className="logininput" type="text" name="email"
                    placeholder="E-mail address"
                  />
                </div>
                <div className="loginfield">
                  <img src="images/password.svg" className="icon" role="presentation" />
                  <input
                    id="password" className="logininput"
                    type="password" name="password"
                    placeholder="Password"
                  />
                </div>
                <button className="loginbutton" onClick={this.login}>Login</button>
                <div className="loginnew">
                  <a className="signuplink" href="./signup">Add a new account</a>
                </div>
              </div>
              <div className="messagearea" id="messagearea" />
            </div>
          </div>

        </div>
        <div className="border">
          <div className="home" />
        </div>
      </div>
    );
  }
}

export default Phone;
