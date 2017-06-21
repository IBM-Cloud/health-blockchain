import React, { Component } from 'react';
import { TextInput, Button, FormGroup, Select, SelectItem } from 'carbon-components-react';
import API from '../callAPI';
import './OrgLogin.css';

class Credentials extends Component {

  render() {
    return (
      <div>
        <FormGroup>
          <TextInput
            className="some-class"
            id="email"
            name="email"
            labelText="Username"
            onChange={this.props.handleInputChange}
            value={this.props.email}
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            type="password"
            className="some-class"
            id="password"
            name="password"
            labelText="Password"
            onChange={this.props.handleInputChange}
            value={this.props.password}
          />
        </FormGroup>

        {!this.props.isLogin ? <FormGroup>
          <Select
            name="organization"
            id="organization"
            onChange={this.props.handleInputChange}
            labelText="Organization"
            defaultValue="placeholder-item"
          >
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Select your organization"
            />
            <SelectItem text="Cloud Insurance Co." value="Cloud Insurance Co." />
            <SelectItem text="Employer Co." value="Employer Co." />
            <SelectItem text="Pharma Co." value="Pharma Co." />
          </Select>
        </FormGroup> : ''}

        <Button onClick={this.props.handleSubmit}>Submit</Button>
        <div className="loginErrorMessage">{this.props.errorMessage}</div>
      </div>);
  }
}

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
          this.props.onLogin();
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
      <div className="orgLoginContainer">
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
    );
  }
}

export default OrgLogin;
