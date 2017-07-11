import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import OrgLayout from './OrgLayout';
import Credentials from './Credentials';
import API from '../callAPI';
import './OrgLogin.css';


class OrgLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      email: '',
      password: '',
      organization: '',
      errorMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleIsLoginChange = this.handleIsLoginChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.isLoggedIn();
  }

  isLoggedIn() {
    API.loggedInUser().then(json =>
          json.organization && browserHistory.push('/organization/challenges'));
  }

  handleInputChange(event) {
    console.log(event);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleIsLoginChange() {
    this.setState({
      errorMessage: '',
      isLogin: !this.state.isLogin
    });
  }

  handleSubmit(event) {
    event.preventDefault(); // Don't submit the form. We will call the API ourself.
    this.setState({ errorMessage: '' });
    API.loginOrSignup(this.state.isLogin ? 'login' : 'signup',
      this.state.email, this.state.password,
      this.state.isLogin ? null : this.state.organization)
    .then((body) => {
      if (body.ok) {
        if (body.organization) {
          // this.props.onLogin();
          browserHistory.push('/organization/challenges');
        } else {
          this.setState({ errorMessage: 'User does not have org access.' });
        }
      } else {
        this.setState({ errorMessage: body.message });
      }
    });
  }
  render() {
    return (
      <OrgLayout>

        <div className="orgLoginContainer">
          <div className="orgLoginTitle">ORGANIZATION LOGIN</div>
          <Credentials
            handleInputChange={this.handleInputChange}
            email={this.state.email}
            password={this.state.password}
            handleSubmit={this.handleSubmit}
            errorMessage={this.state.errorMessage}
            isLogin={this.state.isLogin}
          />

          <div
            className="org-loginnew"
            onClick={this.handleIsLoginChange}
            role="presentation"
          >
            { this.state.isLogin ? 'Add a new account' : 'Existing account?' }
          </div>
        </div>
      </OrgLayout>
    );
  }
}

export default OrgLogin;
