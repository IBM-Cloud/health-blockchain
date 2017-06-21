import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Profile/Profile.css';
import { browserHistory } from 'react-router';
import API from '../callAPI';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    event.preventDefault(); // Don't submit the form. We will call the API ourself.
    this.setState({ errorMessage: '' });
    const response = API.loginOrSignup(this.props.isLogin ? 'login' : 'signup', this.state.email, this.state.password);
    response.then((user) => {
      if (user.ok) {
        if (user.organization) {
          browserHistory.push('/organization');
        } else {
          this.props.onSubmit();
        }
      } else {
        this.setState({ errorMessage: user.message });
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
                  className="logininput"
                  type="text"
                  name="email"
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
              <button className="loginbutton" onClick={this.submit}>{ this.props.isLogin ? 'Login' : 'Sign Up' }</button>
            </div>
          </form>
          <div
            className="loginnew"
            onClick={this.navigate}
            role="presentation"
          >
            { this.props.isLogin ? 'Add a new account' : 'Existing account?' }
          </div>
          <div className="messagearea" id="messagearea">
            {this.state.errorMessage}
          </div>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
export default Login;
