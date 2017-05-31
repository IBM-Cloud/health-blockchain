import React, { Component } from 'react';
import './Phone/Phone.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: 'rvennam@us.ibm.com',
      password: 'password',
      errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  login() {
    fetch('/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.email, password: this.state.password
      })
    }).then((response) => {
      console.log(response);
      if (response.ok) {
        return response;
      }
      this.setState({ errorMessage: 'Network response was not ok.' });
      return response;
    });
  }
  render() {
    return (
      <div className="card">
        <div className="loginbox">
          <div className="loginform">
            <div className="loginfield">
              <img src="images/username.svg" className="icon" role="presentation" />
              <input
                id="email"
                className="logininput" type="text" name="email"
                placeholder="E-mail address"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
            </div>
            <div className="loginfield">
              <img src="images/password.svg" className="icon" role="presentation" />
              <input
                id="password" className="logininput"
                type="password" name="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </div>
            <button className="loginbutton" onClick={this.login}>Login</button>
            <div className="loginnew">
              <a className="signuplink" href="./signup">Add a new account</a>
            </div>
          </div>
          <div className="messagearea" id="messagearea">
            {this.state.errorMessage}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
