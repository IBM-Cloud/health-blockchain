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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  navigate() {
    this.setState({ errorMessage: '' });
    this.props.onNavigate();
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ errorMessage: '' });
    fetch(this.props.isLogin ? '/login' : '/signup', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: this.state.email, password: this.state.password
      })
    }).then(response => response.json())
    .then((body) => {
      if (body.ok) {
        this.props.onSubmit();
      } else {
        this.setState({ errorMessage: body.message });
      }
    });
  }

  render() {
    return (
      <div className="card">
        <div className="loginbox">
          <form onSubmit={this.handleSubmit}>
            <div className="loginform">
              <div className="loginfield">
                <img src="images/username.svg" className="icon" alt="user" />
                <input
                  id="email"
                  className="logininput" type="text" name="email"
                  placeholder="E-mail address"
                  onChange={this.handleInputChange}
                  value={this.state.email}
                />
              </div>
              <div className="loginfield">
                <img src="images/password.svg" className="icon" alt="password" />
                <input
                  id="password"
                  className="logininput"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleInputChange}
                  value={this.state.password}
                />
              </div>
              <button className="loginbutton" onClick={this.submit}>{ this.props.isLogin ? "Login" : "Sign Up" }</button>
            </div>
          </form>
          <div className="loginnew">
            <a href="#" className="signuplink" onClick={this.navigate}>
              { this.props.isLogin ? "Add a new account" : "Existing account?" }
            </a>
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
